import { getStorage, ref, getDownloadURL, getMetadata } from 'firebase/storage';
import { app } from '../firebase-config'; // Need standard firebase app init

/**
 * global-pdf-viewer.ts
 * Utterly secure, URL-masked, DOM-injected PDF Engine.
 * Intercepts all PDF links, drops into instant fullscreen, and renders on-canvas
 * while blocking all download/print/screenshot keyboard shortcuts.
 */

// 1. Listen for clicks on PDF links globally
document.addEventListener('click', async (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const a = target.closest('a');

    if (!a) return;

    const href = a.getAttribute('href') || a.href || '';
    if (!href) return;

    const isPdf = href.toLowerCase().includes('.pdf') || href.includes('firebasestorage.googleapis.com');
    // For our internal legacy routing params
    const hasViewerParam = href.includes('pdf-viewer.html');

    if (isPdf || hasViewerParam) {
        e.preventDefault();
        e.stopPropagation();

        let rawPdfUrl = href;
        if (hasViewerParam) {
            const params = new URLSearchParams(href.substring(href.indexOf('?')));
            rawPdfUrl = decodeURIComponent(params.get('url') || href);
        }

        // 2. MASK URL
        window.history.pushState({ pdfOpen: true }, '', window.location.pathname);

        // 3. BOOT IN-PAGE RENDERER AND TRIGGER FULLSCREEN NATIVELY ON CONTAINER
        await bootSecurePdfViewer(rawPdfUrl);
    }
}, true); // Capture phase


/* ── HARDWARE FULLSCREEN IGNITER ─────────────────────────────── */
// Fullscreen triggered natively on the container element
function triggerStrictFullscreen(element: HTMLElement) {
    try {
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

        // iOS Safari Workaround
        let video = document.getElementById('ios-fullscreen-hack') as HTMLVideoElement;
        if (!video) {
            video = document.createElement('video');
            video.id = 'ios-fullscreen-hack';
            video.style.cssText = 'position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;';
            video.playsInline = true;
            document.body.appendChild(video);
        }
        if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
        }
    } catch (e) {
        console.warn("Fullscreen API failed", e);
    }
}

/* ── APP-LOCKED DOWNLOAD MANAGER (Bridged to Injector) ────────── */
(window as any).FirebaseCacheManager = {
    // Fetches size using Firebase Metadata instead of HTTP HEAD
    async getFileSize(url: string): Promise<string | null> {
        let finalUrl = url;
        if (url.includes('pdf-viewer.html')) {
            const params = new URLSearchParams(url.substring(url.indexOf('?')));
            finalUrl = decodeURIComponent(params.get('url') || url);
        }

        if (!finalUrl.includes('firebasestorage.googleapis.com')) return null;
        try {
            const urlObj = new URL(finalUrl);
            const pathParts = urlObj.pathname.split('/o/');
            if (pathParts.length > 1) {
                const objectPath = decodeURIComponent(pathParts[1]);
                const storage = getStorage(app);
                const fileRef = ref(storage, objectPath);

                const meta = await getMetadata(fileRef);
                const bytes = meta.size;

                if (bytes >= 1024 * 1024) {
                    return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
                }
                return Math.round(bytes / 1024) + 'KB';
            }
        } catch (e) {
            console.warn("Failed to get Firebase metadata for size", e);
        }
        return null; // Fallback
    },

    // Secures a fresh token, downloads via Stream, and locks in CacheAPI
    async downloadPdfSafely(btnElement: HTMLElement, pdfUrl: string, pdfName: string) {
        if (!pdfUrl) return;
        const originalText = btnElement.innerHTML;
        try {
            (btnElement as HTMLButtonElement).disabled = true;
            btnElement.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;
            btnElement.style.animation = 'spin 1s linear infinite';
            btnElement.style.background = 'rgba(148, 163, 184, 0.15)';
            btnElement.style.color = '#94a3b8';

            // Extract the true absolute URL if it's hidden inside legacy routing params
            let finalUrlToFetch = pdfUrl;
            if (pdfUrl.includes('pdf-viewer.html')) {
                const params = new URLSearchParams(pdfUrl.substring(pdfUrl.indexOf('?')));
                finalUrlToFetch = decodeURIComponent(params.get('url') || pdfUrl);
            }

            // 1. Bypass Expired Tokens (400 Error Prevention)
            if (finalUrlToFetch.includes('firebasestorage.googleapis.com')) {
                const urlObj = new URL(finalUrlToFetch);
                const pathParts = urlObj.pathname.split('/o/');
                if (pathParts.length > 1) {
                    const objectPath = decodeURIComponent(pathParts[1]);
                    const storage = getStorage(app);
                    const fileRef = ref(storage, objectPath);
                    finalUrlToFetch = await getDownloadURL(fileRef);
                }
            }

            // Fire global toast
            if ((window as any).showToast) (window as any).showToast(`Downloading ${pdfName}...`, 'info');

            const response = await fetch(finalUrlToFetch, { mode: 'cors' });
            if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);

            // Use ReadableStream to track progress
            const contentLength = response.headers.get('content-length');
            const total = contentLength ? parseInt(contentLength, 10) : 0;
            let loaded = 0;

            const reader = response.body?.getReader();
            if (!reader) throw new Error("Could not read response body");

            const chunks: Uint8Array[] = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                if (value) {
                    chunks.push(value);
                    loaded += value.length;
                    if (total > 0) {
                        const percent = Math.round((loaded / total) * 100);
                        // Visually fill the button itself like a radial pie chart / progress ring
                        btnElement.innerHTML = `<span style="font-size:11px; font-weight:700;">${percent}%</span>`;
                        btnElement.style.background = `rgba(180, 83, 9, 0.2)`;
                        btnElement.style.color = '#fff';
                        btnElement.style.border = '1px solid rgba(180, 83, 9, 0.4)';
                    } else {
                        btnElement.style.animation = 'spin 1.5s linear infinite';
                    }
                }
            }

            // Combine chunks into single Blob and prepare Cache Request
            const blob = new Blob(chunks as any, { type: 'application/pdf' });
            const cacheResponse = new Response(blob);

            // 3. Persist natively inside browser Cache API (App-Locked)
            const cache = await caches.open('jkssb-pdf-cache-v1');

            // Clean URL for cache key (strip token)
            const cacheUrlArr = finalUrlToFetch.split('?');
            const cleanCacheUrl = cacheUrlArr[0].includes('firebasestorage')
                ? cacheUrlArr.join('?') // keep token for firebase backwards compat
                : cacheUrlArr[0];

            await cache.put(cleanCacheUrl, cacheResponse);

            // 4. Set 30-Day Expiry Timebomb
            const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
            const expiry = Date.now() + thirtyDaysMs;

            const downloadsStr = localStorage.getItem('jkssb_downloads');
            const downloads = downloadsStr ? JSON.parse(downloadsStr) : {};

            downloads[cleanCacheUrl] = { name: pdfName, expiresAt: expiry };
            localStorage.setItem('jkssb_downloads', JSON.stringify(downloads));

            // 5. Update UI state permanently 
            btnElement.style.animation = 'none';
            btnElement.style.border = 'none';
            btnElement.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            btnElement.style.background = 'rgba(16, 185, 129, 0.15)'; // Faint green
            btnElement.style.color = '#10b981';
            btnElement.style.cursor = 'default';
            (btnElement as HTMLButtonElement).disabled = true;

            if ((window as any).showToast) {
                (window as any).showToast('Downloaded successfully ✓', 'success');
            }

        } catch (e) {
            console.error('Download failed', e);
            if ((window as any).showToast) (window as any).showToast('Download failed. Try again.', 'error');

            btnElement.style.animation = 'none';
            btnElement.style.border = 'none';
            btnElement.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
            btnElement.style.background = 'rgba(239, 68, 68, 0.15)';
            btnElement.style.color = '#ef4444';

            setTimeout(() => {
                (btnElement as HTMLButtonElement).disabled = false;
                btnElement.innerHTML = originalText;
                btnElement.style.background = 'var(--gradient-primary, #e07b2a)';
                btnElement.style.color = '#fff';
            }, 3000);
        }
    }
};


/* ── RENDER ENGINE & SECURITY LOCKDOWN ───────────────────────── */
async function bootSecurePdfViewer(pdfUrl: string) {
    if (document.getElementById('secure-pdf-master')) return; // Already running

    // 1. INJECT DOM OVERLAY
    const master = document.createElement('div');
    master.id = 'secure-pdf-master';
    master.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        background: #111;
        overflow-y: auto;
        overflow-x: auto; /* Allow horizontal pan */
        -webkit-overflow-scrolling: touch;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
    `;

    // Add anti-screenshot / security blocker class (uses CSS filters conceptually)
    master.className = 'strict-security-blur';

    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'pdf-canvas-container';
    canvasContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
    `;
    master.appendChild(canvasContainer);

    // 2. FLOATING EXIT BUTTON
    const exitBtn = document.createElement('button');
    exitBtn.innerHTML = 'Exit Viewer';
    exitBtn.style.cssText = `
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 2147483648;
        background: rgba(15, 23, 42, 0.85);
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
        padding: 8px 16px;
        border-radius: 20px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(4px);
    `;
    master.appendChild(exitBtn);

    // Auto-hide logic
    let hideTimer: any;
    const resetTimer = () => {
        exitBtn.style.opacity = '1';
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            exitBtn.style.opacity = '0';
        }, 3000);
    };
    master.addEventListener('pointerdown', resetTimer);
    master.addEventListener('touchstart', resetTimer);
    resetTimer();

    document.body.appendChild(master);

    // TRIGGER FULLSCREEN IMMEDIATELY AFTER MOUNT
    triggerStrictFullscreen(master);

    // Exit Button Logic
    exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        safelyDestroyViewer();
    });

    // 3. APPLY SECURITY LISTENERS
    applySecurityLockdown();

    // 4. LOAD PDF.js
    await loadPdfJsIntoMemory();

    // 5. RENDER PDF (Memory/Cache Aware)
    await renderPdfToCanvasList(pdfUrl, canvasContainer);
}


/* ── DESTRUCTION ROUTINE ──────────────────────────────────────── */
function safelyDestroyViewer() {
    const master = document.getElementById('secure-pdf-master');
    if (master) {
        master.innerHTML = '';
        master.remove();
    }

    // Clean up hardware fullscreen
    try {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    } catch (e) { }

    // Clean up History state if we popped it
    if (window.history.state?.pdfOpen) {
        window.history.back(); // Undo the pushState
    }

    removeSecurityLockdown();
}

// Ensure destruction on browser BACK button
window.addEventListener('popstate', (e) => {
    if (document.getElementById('secure-pdf-master')) {
        safelyDestroyViewer();
    }
});

// Ensure destruction if Fullscreen is forced-closed (e.g. Escape key)
document.addEventListener('fullscreenchange', handleFsChange);
document.addEventListener('webkitfullscreenchange', handleFsChange);
document.addEventListener('mozfullscreenchange', handleFsChange);
document.addEventListener('MSFullscreenChange', handleFsChange);

function handleFsChange() {
    const doc = document as any;
    const isFs = doc.fullscreenElement || doc.webkitIsFullScreen || doc.mozFullScreen || doc.msFullscreenElement;
    if (!isFs && document.getElementById('secure-pdf-master')) {
        safelyDestroyViewer();
    }
}


/* ── STRICT KEYBOARD & MOUSE LOCKDOWN ────────────────────────── */
const securityInterceptor = (e: KeyboardEvent | MouseEvent) => {
    // Block Right Click
    if (e.type === 'contextmenu') {
        e.preventDefault();
        return false;
    }
    // Block specific keystrokes
    if (e.type === 'keydown') {
        const k = e as KeyboardEvent;
        // Block screenshots & printing & dev tools
        if (
            k.key === 'PrintScreen' ||
            k.code === 'PrintScreen' ||
            (k.ctrlKey && ['p', 's', 'c', 'a'].includes(k.key.toLowerCase())) ||
            (k.metaKey && ['p', 's', 'c', 'a'].includes(k.key.toLowerCase())) ||
            k.key === 'F12' ||
            (k.ctrlKey && k.shiftKey && k.key.toLowerCase() === 'i')
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
};

const blockDrag = (e: DragEvent) => e.preventDefault();

function applySecurityLockdown() {
    window.addEventListener('contextmenu', securityInterceptor, { capture: true });
    window.addEventListener('keydown', securityInterceptor as EventListener, { capture: true });
    window.addEventListener('dragstart', blockDrag, { capture: true });
    window.addEventListener('drop', blockDrag, { capture: true });
}

function removeSecurityLockdown() {
    window.removeEventListener('contextmenu', securityInterceptor, { capture: true });
    window.removeEventListener('keydown', securityInterceptor as EventListener, { capture: true });
    window.removeEventListener('dragstart', blockDrag, { capture: true });
    window.removeEventListener('drop', blockDrag, { capture: true });
}


/* ── PDF.JS RENDER PIPELINE ───────────────────────────────────── */
async function loadPdfJsIntoMemory(): Promise<void> {
    if ((window as any).pdfjsLib) return;

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            const pdfjsLib = (window as any).pdfjsLib;
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// We load the PDF fully into Canvas nodes.
async function renderPdfToCanvasList(url: string, container: HTMLElement) {
    try {
        // Show loading state securely inside the overlay
        const loadingDiv = document.createElement('div');
        loadingDiv.style.cssText = 'color: white; margin-top: 40vh; font-family: Poppins, sans-serif; font-size: 16px;';
        loadingDiv.innerHTML = 'Loading Document Securely...';
        container.appendChild(loadingDiv);

        const lib = (window as any).pdfjsLib;

        let pdfData: Uint8Array | null = null;
        let finalUrlToFetch = url;

        // --- NEW: Firebase Expired Token 400 Bypass ---
        // If this is a firebasestorage link, the stored token is likely expired.
        // We must extract the file path and fetch a fresh URL.
        if (url.includes('firebasestorage.googleapis.com')) {
            try {
                // Typical format: https://firebasestorage.googleapis.com/v0/b/bucket/o/path%2Ffile.pdf?alt=media&token=...
                const urlObj = new URL(url);
                const pathParts = urlObj.pathname.split('/o/'); // splits at the object marker
                if (pathParts.length > 1) {
                    const objectPath = decodeURIComponent(pathParts[1]); // e.g. "pdfs/1772028060630_POLLUTION .pdf"
                    const storage = getStorage(app);
                    const fileRef = ref(storage, objectPath);
                    finalUrlToFetch = await getDownloadURL(fileRef); // Fetch fresh token!
                    console.log("[PDF Viewer] Fetched fresh Firebase token automatically.");
                }
            } catch (tokenErr) {
                console.warn("[PDF Viewer] Could not refresh Firebase token, falling back to original URL.", tokenErr);
            }
        }

        // 1. Try to fetch from internal Cache API (if App-Locked Download)
        if ('caches' in window) {
            try {
                // Strip confusing query params for exact cache matching
                const cacheUrlArr = url.split('?');
                const cleanCacheUrl = cacheUrlArr[0].includes('firebasestorage')
                    ? cacheUrlArr.join('?') // keep token for firebase
                    : cacheUrlArr[0];

                const cache = await caches.open('jkssb-pdf-cache-v1');
                const cachedResponse = await cache.match(cleanCacheUrl, { ignoreSearch: true });
                if (cachedResponse) {
                    const buffer = await cachedResponse.arrayBuffer();
                    pdfData = new Uint8Array(buffer);
                }
            } catch (e) { }
        }

        // 2. Fallback to direct fetch to bypass strict PDF.js CORS preflights
        // USING THE FRESH URL `finalUrlToFetch` INSTEAD OF `url`
        if (!pdfData) {
            try {
                const res = await fetch(finalUrlToFetch, { mode: 'cors' });
                if (!res.ok) throw new Error(`Network response was not ok (${res.status})`);
                const buffer = await res.arrayBuffer();
                pdfData = new Uint8Array(buffer);
            } catch (fetchErr) {
                // If cors blocks explicit fetch, let PDF.js attempt its internal legacy fetcher
                console.warn("Fetch failed, falling back to PDF.js native loader:", fetchErr);
            }
        }

        // 3. Load purely from memory blob OR native URL if fetch failed
        const loadingTask = pdfData
            ? lib.getDocument({ data: pdfData })
            : lib.getDocument({ url: finalUrlToFetch, withCredentials: false });

        const pdfDoc = await loadingTask.promise;

        loadingDiv.remove();

        // 3. Render all pages to canvases sequentially so you can scroll smoothly
        const totalPages = pdfDoc.numPages;

        for (let i = 1; i <= totalPages; i++) {
            const page = await pdfDoc.getPage(i);

            // Adjust scale for high DPI mobile screens to keep text perfectly crisp
            const pixelRatio = window.devicePixelRatio || 1;
            // Native width calculation to fit viewport perfectly on mobile
            let viewport = page.getViewport({ scale: 1.0 });
            let scale = (window.innerWidth - 12) / viewport.width;
            if (scale > 1.8) scale = 1.8; // Cap for large screens
            if (scale < 0.5) scale = 0.5;

            viewport = page.getViewport({ scale });

            const wrap = document.createElement('div');
            wrap.style.cssText = `
                position: relative;
                margin-bottom: 8px;
                background: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                border-radius: 4px;
                overflow: hidden;
            `;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;

            // Higher resolution backing store
            canvas.width = viewport.width * pixelRatio;
            canvas.height = viewport.height * pixelRatio;
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;
            canvas.style.display = 'block';

            ctx.scale(pixelRatio, pixelRatio);

            wrap.appendChild(canvas);
            container.appendChild(wrap);

            // Render
            await page.render({ canvasContext: ctx, viewport }).promise;
        }

    } catch (e: any) {
        console.error('PDF Render Error', e);
        const errDesc = e?.message || e?.name || String(e);
        container.innerHTML = `
            <div style="color:#ef4444; margin-top:30vh; font-family:Poppins; text-align:center; padding: 0 20px;">
                <h3>Failed to load document</h3>
                <p style="font-size: 13px; opacity: 0.8; word-break: break-all;">Error Details: ${errDesc}</p>
                <p style="font-size: 12px; margin-top:20px;">(If this says "Network response was not ok" or "Failed to fetch", your Firebase Storage bucket is actively blocking this website. You must apply the CORS rules in Google Cloud Shell).</p>
            </div>
        `;
    }
}

// Auto-boot if accessed directly as a standalone page (e.g. opened in new tab)
if (window.location.pathname.includes('pdf-viewer.html')) {
    const params = new URLSearchParams(window.location.search);
    const rawUrl = params.get('url');
    if (rawUrl) {
        // Boot automatically as soon as the DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => bootSecurePdfViewer(rawUrl));
        } else {
            bootSecurePdfViewer(rawUrl);
        }
    }
}
