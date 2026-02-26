/**
 * inject-download-buttons.js
 * Scans the DOM for any PDF links (`<a>` tags going to pdf-viewer.html).
 * Automatically fetches their size (in MB) and injects an App-Locked Download button.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Wait a brief moment for dynamic frameworks (if any) to render links
    setTimeout(scanAndInjectButtons, 500);
});

async function scanAndInjectButtons() {
    const links = document.querySelectorAll('a');

    links.forEach(async (link) => {
        const href = link.getAttribute('href') || link.href;
        if (!href || !href.includes('pdf-viewer.html')) return;

        // Extract the raw PDF URL from the viewer routing params
        const urlParams = new URLSearchParams(href.split('?')[1]);
        const rawPdfUrl = urlParams.get('url');
        const pdfName = urlParams.get('name') || 'Document';

        if (!rawPdfUrl) return;

        // Skip if a download button already exists in this container
        if (link.parentElement?.querySelector('.secure-download-btn')) return;

        // Create the button
        const btn = document.createElement('button');
        btn.className = 'secure-download-btn';
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download`;

        // CSS Styling
        btn.style.display = 'inline-flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '6px';
        btn.style.padding = '6px 12px';
        btn.style.marginTop = '8px';
        btn.style.fontSize = '12px';
        btn.style.fontWeight = '600';
        btn.style.color = '#fff';
        btn.style.background = 'rgba(255, 255, 255, 0.15)';
        btn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.style.fontFamily = "'Poppins', sans-serif";
        btn.style.backdropFilter = 'blur(4px)';

        // Hover effect setup via JS to keep it pure and injected
        btn.onmouseover = () => btn.style.background = 'rgba(255, 255, 255, 0.25)';
        btn.onmouseout = () => btn.style.background = 'rgba(255, 255, 255, 0.15)';

        // Click handler (stops propagation so it doesn't open the PDF)
        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (window.downloadPdfSafely) {
                window.downloadPdfSafely(btn, rawPdfUrl, pdfName);
            } else {
                alert("Download engine not loaded yet.");
            }
        };

        // Attempt to fetch file size in the background
        const sizeText = await getPdfSize(rawPdfUrl);
        if (sizeText) {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download (${sizeText})`;
        }

        // Check if already downloaded (verify Offline Timebomb presence)
        const downloadsStr = localStorage.getItem('jkssb_downloads');
        if (downloadsStr) {
            const downloads = JSON.parse(downloadsStr);
            if (downloads[rawPdfUrl]) {
                const expiresAt = downloads[rawPdfUrl].expiresAt;
                if (Date.now() < expiresAt) {
                    btn.innerHTML = '✅ Downloaded';
                    btn.style.background = '#059669'; // Green success
                    btn.disabled = true;
                }
            }
        }

        // Re-flow the UI: place below the link or insert smartly depending on parent structure
        // If parent is a flex/row wrapper, we might need to wrap them. For now, append to the parent item.
        const parentItem = link.closest('.menu-item, .lesson-item, .grid-item');
        if (parentItem) {
            // Append it to the parent container nicely
            parentItem.style.display = 'flex';
            parentItem.style.flexDirection = 'column';
            parentItem.appendChild(btn);
        } else {
            link.parentElement.appendChild(btn);
        }
    });
}

// Fire an HTTP HEAD request to quickly grab the size without downloading
async function getPdfSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) return null;

        const bytes = response.headers.get('content-length');
        if (!bytes) return null;

        const mb = (parseInt(bytes, 10) / (1024 * 1024)).toFixed(1);
        return `${mb}MB`;
    } catch {
        return null;
    }
}
