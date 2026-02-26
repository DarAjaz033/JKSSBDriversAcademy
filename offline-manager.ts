/**
 * offline-manager.ts
 * Booted in app.ts. Checks localStorage for downloaded PDFs that have 
 * exceeded the 30-day Timebomb limit. If expired, purges from cache API.
 */

const DOWNLOADS_KEY = 'jkssb_downloads';
const CACHE_NAME = 'jkssb-pdf-cache-v1';

export const purgeExpiredDownloads = async () => {
    try {
        const downloadsStr = localStorage.getItem(DOWNLOADS_KEY);
        if (!downloadsStr) return;

        const downloads = JSON.parse(downloadsStr);
        let updated = false;
        const now = Date.now();

        // Check if browser supports caches
        if (!('caches' in window)) return;
        const cache = await caches.open(CACHE_NAME);

        for (const [pdfUrl, data] of Object.entries(downloads)) {
            const entry = data as { name: string, expiresAt: number };

            if (now > entry.expiresAt) {
                // Timebomb triggered: file has expired
                console.warn(`[OfflineManager] Deleting expired PDF: ${entry.name}`);

                // 1. Delete from secure memory cache
                await cache.delete(pdfUrl);

                // 2. Remove from LocalStorage tracking
                delete downloads[pdfUrl];
                updated = true;

                // 3. Optional: Trigger a notification if currently on a valid page
                if (document.getElementById('toast-container')) {
                    const msg = `Download expired for "${entry.name}". Please download again.`;
                    // Dispatch a custom event or directly call showToast if window exposes it
                    if ((window as any).showToast) {
                        (window as any).showToast(msg, 'error');
                    }
                }
            }
        }

        if (updated) {
            localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(downloads));
        }

    } catch (e) {
        console.error('[OfflineManager] Failed to purge expired downloads:', e);
    }
};
