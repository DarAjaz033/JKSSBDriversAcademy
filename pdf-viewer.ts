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
document.getElementById('lobby-title')!.textContent = pdfName;

// ── Fullscreen & Lockdown Logic ──────────────────────────────────────────────

let isExplicitlyExiting = false;

document.getElementById('open-pdf-btn')?.addEventListener('click', async () => {
    try {
        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        }
    } catch (e) {
        console.warn('Fullscreen request failed:', e);
    }
    document.body.classList.add('pdf-active');
    document.getElementById('pdf-lobby')!.style.display = 'none';

    // Only load the PDF AFTER they click open to ensure we have the interaction token
    loadPdf();
});

document.addEventListener('fullscreenchange', () => {
    // If the browser exited fullscreen but we didn't explicitly click the close button
    if (!document.fullscreenElement && !isExplicitlyExiting) {
        document.getElementById('exit-warning')?.classList.add('active');
    }
});

document.getElementById('resume-pdf-btn')?.addEventListener('click', async () => {
    try {
        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        }
    } catch (e) { }
    document.getElementById('exit-warning')?.classList.remove('active');
});

const handleExit = () => {
    isExplicitlyExiting = true;
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(e => console.warn(e));
    }
    document.body.classList.remove('pdf-active');
    window.history.back();
};

document.getElementById('warning-close-btn')?.addEventListener('click', handleExit);
document.getElementById('explicit-close-btn')?.addEventListener('click', handleExit);

// ── Load PDF.js from CDN ─────────────────────────────────────────────────────

async function loadPdfJs(): Promise<void> {
    return new Promise((resolve, reject) => {
        if ((window as any).pdfjsLib) { resolve(); return; }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
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

async function renderPage(pageNum: number): Promise<void> {
    if (!pdfDoc) return;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });

    const wrap = document.createElement('div');
    wrap.className = 'page-canvas-wrap';

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
    annotationLayer.style.pointerEvents = 'none'; // Ensure canvas grabs events, but links are dead

    wrap.appendChild(canvas);
    wrap.appendChild(annotationLayer);

    return wrap as any;
}

async function renderAllPages(): Promise<void> {
    const container = document.getElementById('pages-wrap')!;
    container.innerHTML = '';

    const progress = document.getElementById('loading-progress')!;
    for (let i = 1; i <= totalPages; i++) {
        progress.textContent = `Rendering page ${i} of ${totalPages}...`;
        const wrap = await renderPage(i) as any;
        container.appendChild(wrap);
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

        // Fetch the PDF via a fetch request to prevent direct URL access
        const response = await fetch(pdfUrl, { mode: 'cors', credentials: 'omit' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();

        pdfDoc = await lib.getDocument({ data: arrayBuffer }).promise;
        totalPages = pdfDoc.numPages;

        document.getElementById('total-pages')!.textContent = `/ ${totalPages}`;
        document.getElementById('page-info')!.textContent = `1 / ${totalPages}`;
        (document.getElementById('page-input') as HTMLInputElement).max = String(totalPages);

        await renderAllPages();
        setupNavigation();

        // Hide loading
        (document.getElementById('loading') as HTMLElement).style.display = 'none';

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

// ── Boot sequence now waits for Lobby Interaction ───────────────────────────

// Do not call loadPdf() automatically anymore. It is called by the Open Btn.
// loadPdf();
