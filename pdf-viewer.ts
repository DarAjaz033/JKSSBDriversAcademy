// pdf-viewer.ts — Secure In-App PDF Viewer using PDF.js
// PDFs are rendered to canvas — not loaded as native browser PDF (prevents download)

// Load PDF.js from CDN dynamically so we can use it as a module
declare const pdfjsLib: any;

// ── Security Setup ──────────────────────────────────────────────────────────

// Block right-click everywhere
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Block drag to desktop / drag to save
document.addEventListener('dragstart', (e) => e.preventDefault());

// Block keyboard shortcuts that could capture content
document.addEventListener('keydown', (e) => {
    const blocked = [
        e.ctrlKey && e.key === 's',   // Ctrl+S (save)
        e.ctrlKey && e.key === 'p',   // Ctrl+P (print)
        e.ctrlKey && e.key === 'a',   // Ctrl+A (select all)
        e.ctrlKey && e.key === 'c',   // Ctrl+C (copy)
        e.ctrlKey && e.shiftKey && e.key === 'I', // DevTools
        e.key === 'F12',              // DevTools
        e.ctrlKey && e.key === 'u',   // View source
        e.metaKey && e.key === 's',   // Cmd+S (mac)
        e.metaKey && e.key === 'p',   // Cmd+P (mac)
        e.key === 'PrintScreen',      // Windows Print Screen
        e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5') // Mac Screenshots
    ];
    if (blocked.some(Boolean)) e.preventDefault();
});

// Block middle click (open in new tab)
document.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });

// Security overlay blocks touch/mouse on canvas
const overlay = document.getElementById('security-overlay')!;
overlay.addEventListener('contextmenu', (e) => e.preventDefault());
overlay.addEventListener('dragstart', (e) => e.preventDefault());
// Allow scroll through the transparent overlay by forwarding wheel/touch to scroll container
const scrollEl = document.getElementById('canvas-scroll')!;
overlay.addEventListener('wheel', (e) => {
    scrollEl.scrollTop += e.deltaY;
}, { passive: true });
overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
overlay.addEventListener('touchmove', handleTouchMove, { passive: false });

let touchStartY = 0;
function handleTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY; }
function handleTouchMove(e: TouchEvent) {
    const diff = touchStartY - e.touches[0].clientY;
    scrollEl.scrollTop += diff;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
}

// ── Parse URL parameters ─────────────────────────────────────────────────────

const params = new URLSearchParams(window.location.search);
const pdfUrl = params.get('url') || '';
const pdfName = params.get('name') || 'Document';

document.getElementById('pdf-title')!.textContent = pdfName;
document.getElementById('loading-name')!.textContent = pdfName;
// ── Fullscreen & Lockdown Logic ──────────────────────────────────────────────

let isExplicitlyExiting = false;

// Strict vendor-prefixed requestFullscreen (Must be synchronous!)
const requestFullscreenStrict = (element: HTMLElement) => {
    const el = element as any;
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
    } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
    }

    // iOS Safari workaround: iOS blocking fullscreen on plain DIVs.
    // Use a hidden video element's webkitEnterFullscreen as a hack payload.
    const iosHackVideo = document.getElementById('ios-fullscreen-hack') as any;
    if (iosHackVideo && iosHackVideo.webkitEnterFullscreen) {
        iosHackVideo.webkitEnterFullscreen();
    }
};

// Attempt to forcefully enter fullscreen upon the user's first interaction
const attemptFullscreen = () => {
    try {
        const doc = document as any;
        const isFullscreen = document.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement;

        if (!isFullscreen) {
            requestFullscreenStrict(document.documentElement);
            document.body.classList.add('pdf-active');
        }
    } catch (e) {
        // Silently fail if interaction wasn't trusted enough yet
    }
};

// Floating Exit Button Logic
let exitBtnTimeout: any;
const floatingBtn = document.getElementById('floating-exit-btn');

const showFloatingBtn = () => {
    if (!floatingBtn) return;
    floatingBtn.classList.add('show');
    clearTimeout(exitBtnTimeout);
    exitBtnTimeout = setTimeout(() => {
        floatingBtn.classList.remove('show');
    }, 3000); // Auto-hide after 3 seconds
};

document.addEventListener('pointerdown', showFloatingBtn);
document.addEventListener('touchstart', showFloatingBtn);
document.addEventListener('mousemove', showFloatingBtn);

// ── Strict Teardown & Exit ───────────────────────────────────────────────────

const handleExit = () => {
    isExplicitlyExiting = true;

    // Immediately destroy all references and UI to prevent lingering PDF views
    pdfDoc = null;
    document.body.innerHTML = '';

    // Exit fullscreen strictly
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen().catch(() => { });
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen().catch(() => { });
    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen().catch(() => { });
    else if (doc.msExitFullscreen) doc.msExitFullscreen().catch(() => { });

    document.body.classList.remove('pdf-active');

    // Return silently to previous state
    window.history.back();
};

document.addEventListener('fullscreenchange', () => {
    const isFullscreen = document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).mozFullScreenElement || (document as any).msFullscreenElement;
    if (!isFullscreen && !isExplicitlyExiting) {
        handleExit();
    }
});

if (floatingBtn) floatingBtn.addEventListener('click', handleExit);
document.getElementById('explicit-close-btn')?.addEventListener('click', handleExit);

// ── Load PDF.js from CDN ─────────────────────────────────────────────────────

async function loadPdfJs(): Promise<void> {
    return new Promise((resolve, reject) => {
        if ((window as any).pdfjsLib) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            const pdfjsLib = (window as any).pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ── Viewer State ─────────────────────────────────────────────────────────────

let pdfDoc: any = null;
let currentPage = 1;
let totalPages = 0;
const SCALE = Math.min(window.innerWidth / 600, 1.8);

// ── Render engine ────────────────────────────────────────────────────────────

const renderedPagesCache = new Map<number, HTMLElement>();

async function renderPage(pageNum: number, isBackground = false): Promise<HTMLElement | null> {
    if (!pdfDoc) return null;

    // Return instantly from memory cache if already rendered
    if (renderedPagesCache.has(pageNum)) {
        return renderedPagesCache.get(pageNum)!;
    }

    try {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: SCALE });

        const wrap = document.createElement('div');
        wrap.className = 'page-canvas-wrap';
        wrap.id = `pdf-page-${pageNum}`;

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d')!;
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Block any potential link overlays that PDF.js sometimes native-renders
        const annotationLayer = document.createElement('div');
        annotationLayer.style.position = 'absolute';
        annotationLayer.style.inset = '0';
        annotationLayer.style.zIndex = '10';
        annotationLayer.style.pointerEvents = 'none';

        wrap.appendChild(canvas);
        wrap.appendChild(annotationLayer);

        // Save to fast memory cache
        renderedPagesCache.set(pageNum, wrap);

        return wrap;
    } catch (e) {
        console.warn(`[PDF Render] Failed page ${pageNum}:`, e);
        return null;
    }
}

async function renderInitialPages(): Promise<void> {
    const container = document.getElementById('pages-wrap')!;
    container.innerHTML = '';
    renderedPagesCache.clear();

    const progress = document.getElementById('loading-progress')!;

    // 1. Instantly render and mount the first 3 pages (or total if less)
    const initialBatch = Math.min(3, totalPages);
    for (let i = 1; i <= initialBatch; i++) {
        progress.textContent = `Rendering page ${i} of ${totalPages}...`;
        const wrap = await renderPage(i);
        if (wrap) container.appendChild(wrap);
    }

    // 2. Hide loading screen immediately so user can read page 1
    (document.getElementById('loading') as HTMLElement).style.display = 'none';

    // 3. Lazy-load the remaining pages silently in the background
    if (totalPages > initialBatch) {
        lazyLoadRemainingPages(initialBatch + 1, container);
    }
}

async function lazyLoadRemainingPages(startPage: number, container: HTMLElement) {
    for (let i = startPage; i <= totalPages; i++) {
        // Render silently
        const wrap = await renderPage(i, true);
        if (wrap && pdfDoc) {
            // Append to DOM sequentially so scrolling is unbroken
            container.appendChild(wrap);
        }
    }
}

// ── Load the PDF ─────────────────────────────────────────────────────────────

async function loadPdf(): Promise<void> {
    if (!pdfUrl) {
        showError('No PDF URL provided. Please go back and select a document.');
        return;
    }

    try {
        await loadPdfJs();

        const lib = (window as any).pdfjsLib;

        // Let PDF.js handle the URL directly (bypasses some manual fetch CORS issues)
        pdfDoc = await lib.getDocument(pdfUrl).promise;
        totalPages = pdfDoc.numPages;

        document.getElementById('total-pages')!.textContent = `/ ${totalPages}`;
        document.getElementById('page-info')!.textContent = `1 / ${totalPages}`;
        (document.getElementById('page-input') as HTMLInputElement).max = String(totalPages);

        await renderInitialPages();
        setupNavigation();

    } catch (err: any) {
        console.error('[PDFViewer]', err);
        showError('Could not load the PDF. Please check your connection or try again.');
    }
}

function showError(msg: string): void {
    (document.getElementById('loading') as HTMLElement).style.display = 'none';
    const errScreen = document.getElementById('error-screen') as HTMLElement;
    errScreen.style.display = 'flex';
    document.getElementById('error-msg')!.textContent = msg;
}

// ── Navigation ─────────────────────────────────────────────────────────────

function scrollToPage(pageNum: number): void {
    currentPage = Math.max(1, Math.min(pageNum, totalPages));
    (document.getElementById('page-input') as HTMLInputElement).value = String(currentPage);
    document.getElementById('page-info')!.textContent = `${currentPage} / ${totalPages}`;

    const pages = document.querySelectorAll<HTMLElement>('.page-canvas-wrap');
    if (pages[currentPage - 1]) {
        pages[currentPage - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    updateNavBtns();
}

function updateNavBtns(): void {
    (document.getElementById('btn-first') as HTMLButtonElement).disabled = currentPage <= 1;
    (document.getElementById('btn-prev') as HTMLButtonElement).disabled = currentPage <= 1;
    (document.getElementById('btn-next') as HTMLButtonElement).disabled = currentPage >= totalPages;
    (document.getElementById('btn-last') as HTMLButtonElement).disabled = currentPage >= totalPages;
}

function setupNavigation(): void {
    document.getElementById('btn-first')!.addEventListener('click', () => scrollToPage(1));
    document.getElementById('btn-prev')!.addEventListener('click', () => scrollToPage(currentPage - 1));
    document.getElementById('btn-next')!.addEventListener('click', () => scrollToPage(currentPage + 1));
    document.getElementById('btn-last')!.addEventListener('click', () => scrollToPage(totalPages));

    const input = document.getElementById('page-input') as HTMLInputElement;
    input.addEventListener('change', () => {
        const val = parseInt(input.value, 10);
        if (!isNaN(val)) scrollToPage(val);
    });

    // Track scroll-based current page
    const scroll = document.getElementById('canvas-scroll')!;
    scroll.addEventListener('scroll', () => {
        const pages = document.querySelectorAll<HTMLElement>('.page-canvas-wrap');
        const scrollTop = scroll.scrollTop + 80;
        let activePage = 1;
        pages.forEach((p, i) => {
            if (p.offsetTop <= scrollTop) activePage = i + 1;
        });
        if (activePage !== currentPage) {
            currentPage = activePage;
            input.value = String(currentPage);
            document.getElementById('page-info')!.textContent = `${currentPage} / ${totalPages}`;
            updateNavBtns();
        }
    }, { passive: true });

    updateNavBtns();
}

// ── Boot ────────────────────────────────────────────────────────────────────

const btnOpenPdf = document.getElementById('btn-open-pdf');
if (btnOpenPdf) {
    btnOpenPdf.addEventListener('click', () => {
        // 1. Synchronously execute Fullscreen strictly mapped to this physical click
        attemptFullscreen();

        // 2. Hide Opening UI, Show Spinner 
        document.getElementById('open-overlay')!.style.display = 'none';
        document.getElementById('loading-indicator')!.style.display = 'flex';

        // 3. Initiate PDF Network Load
        loadPdf();
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.warn('[PDFViewer] ServiceWorker registration failed: ', err);
        });
    });
}
