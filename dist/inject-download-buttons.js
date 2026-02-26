/**
 * inject-download-buttons.js
 * Scans the DOM for any PDF links (`<a>` tags going to pdf-viewer.html).
 * Automatically fetches their size (in MB) and injects an App-Locked Download button.
 */

const runInjectScanner = () => {
    scanAndInjectButtons();
};

// 1. Run initially for any static links
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runInjectScanner);
} else {
    runInjectScanner();
}

// 2. Setup a MutationObserver to instantly catch dynamic Firestore DOM injections
const observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const record of mutations) {
        if (record.addedNodes.length > 0) {
            shouldScan = true;
            break;
        }
    }
    if (shouldScan) {
        // Debounce the scan slightly to let React/Vanilla renders finish batching
        clearTimeout(window._pdfInjectionDebounce);
        window._pdfInjectionDebounce = setTimeout(scanAndInjectButtons, 100);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

async function scanAndInjectButtons() {
    const links = document.querySelectorAll('a');

    links.forEach(async (link) => {
        const href = link.getAttribute('href') || link.href;
        if (!href) return;

        // Detect if link is a raw PDF or Firebase Storage blob
        const isPdf = href.toLowerCase().includes('.pdf') || href.includes('firebasestorage.googleapis.com');
        if (!isPdf) return;

        // Extract PDF name strictly from the HTML text content
        const rawPdfUrl = href;
        let pdfName = link.textContent ? link.textContent.replace(/[\n\r]+/g, ' ').trim() : 'Document';
        if (!pdfName || pdfName.length > 40) pdfName = 'Secured Document';

        // Add a marker to prevent processing the same link multiple times
        if (link.dataset.pdfBtnInjected) return;

        // Skip if a download button already exists in this container
        if (link.querySelector('.secure-download-btn')) return;

        // Mark as injected
        link.dataset.pdfBtnInjected = "true";

        // 3. WIPE old innerHTML entirely and replace with the structured Bar UI
        link.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;">
                <div class="dl-btn-container" style="flex-shrink: 0; display: flex; align-items: center;"></div>
                <span style="font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: inherit;">
                    ${pdfName}
                </span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 12px; flex-shrink: 0;">
                <span class="pdf-size-label" style="font-size: 12px; font-weight: 600; color: #94a3b8; display: none;"></span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.8;">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </div>
        `;

        const btnContainer = link.querySelector('.dl-btn-container');
        const sizeLabel = link.querySelector('.pdf-size-label');

        // Create the Small Download Icon Button
        const btn = document.createElement('button');
        btn.className = 'secure-download-btn';

        // CSS Styling - Icon Only
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.width = '36px';
        btn.style.height = '36px';
        btn.style.color = '#fff';
        btn.style.background = '#e07b2a'; // Solid orange for new downloads
        btn.style.border = 'none';
        btn.style.borderRadius = '10px';
        btn.style.cursor = 'pointer';
        btn.style.flexShrink = '0';
        btn.style.transition = 'all 0.2s ease';

        const styleIconDownload = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
        const styleIconCheck = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        const styleIconRedownload = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`;

        btn.innerHTML = styleIconDownload;

        // Hover effect styling inline
        btn.onmouseover = () => { if (btn.innerHTML.includes('Download') || btn.innerHTML.includes('e07b2a')) btn.style.transform = 'scale(1.05)'; };
        btn.onmouseout = () => { btn.style.transform = 'scale(1)'; };

        // Clean URL for cache key checking (strip token just like the downloader does)
        let finalUrlToFetch = rawPdfUrl;
        if (rawPdfUrl.includes('pdf-viewer.html')) {
            const params = new URLSearchParams(rawPdfUrl.substring(rawPdfUrl.indexOf('?')));
            finalUrlToFetch = decodeURIComponent(params.get('url') || rawPdfUrl);
        }

        const cacheUrlArr = finalUrlToFetch.split('?');
        const cleanCacheUrl = cacheUrlArr[0].includes('firebasestorage')
            ? cacheUrlArr.join('?')
            : cacheUrlArr[0];

        // Check if already downloaded (verify Offline Timebomb presence)
        const downloadsStr = localStorage.getItem('jkssb_downloads');
        if (downloadsStr) {
            const downloads = JSON.parse(downloadsStr);

            if (downloads[cleanCacheUrl]) {
                const expiresAt = downloads[cleanCacheUrl].expiresAt;
                if (Date.now() < expiresAt) {
                    btn.innerHTML = styleIconCheck;
                    btn.style.background = 'rgba(16, 185, 129, 0.15)'; // Faint green
                    btn.style.color = '#10b981';
                    // Button remains clickable so it can trigger the Already Downloaded toast
                } else {
                    btn.innerHTML = styleIconRedownload;
                    btn.style.background = 'rgba(180, 83, 9, 0.15)'; // Faint orange
                    btn.style.color = '#b45309';
                }
            }
        }

        // Click handler (stops propagation so it doesn't open the PDF)
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const currentDownloadsStr = localStorage.getItem('jkssb_downloads');
            if (currentDownloadsStr) {
                const currentDownloads = JSON.parse(currentDownloadsStr);
                if (currentDownloads[cleanCacheUrl] && Date.now() < currentDownloads[cleanCacheUrl].expiresAt) {
                    if (window.showToast) window.showToast('Already downloaded ✓', 'success');
                    return;
                } else if (currentDownloads[cleanCacheUrl] && Date.now() >= currentDownloads[cleanCacheUrl].expiresAt) {
                    if (window.showToast) window.showToast('Download expired. Please re-download.', 'warning');
                }
            }

            if (window.FirebaseCacheManager && window.FirebaseCacheManager.downloadPdfSafely) {
                window.FirebaseCacheManager.downloadPdfSafely(btn, rawPdfUrl, pdfName);
            } else {
                alert("Download engine not loaded yet. Please wait a moment.");
            }
        };

        // Append button to UI
        btnContainer.appendChild(btn);

        // Fetch file size in the background
        const sizeText = await getPdfSize(finalUrlToFetch);
        if (sizeText) {
            sizeLabel.innerHTML = sizeText;
            sizeLabel.style.display = 'block';
        }
    });
}

// Use the secure Firebase metadata bridge instead of arbitrary HTTP HEAD requests
async function getPdfSize(url) {
    if (window.FirebaseCacheManager && window.FirebaseCacheManager.getFileSize) {
        return await window.FirebaseCacheManager.getFileSize(url);
    }
    return null;
}
