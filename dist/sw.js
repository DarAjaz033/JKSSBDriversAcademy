const CACHE_NAME = 'jkssb-cache-v1';
const PDF_CACHE_NAME = 'jkssb-pdf-cache-v1';

// Minimum assets to pre-cache immediately
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/nav.js',
    '/favicon.svg'
];

// Install event - cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME && cache !== PDF_CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - handle requests
self.addEventListener('fetch', event => {
    // We only want to handle GET requests
    if (event.request.method !== 'GET') return;

    // Ignore Chrome extensions or non-HTTP protocols
    if (!event.request.url.startsWith('http')) return;

    const url = new URL(event.request.url);

    // ── Aggressive Strategy: PDFs and Firebase Storage (Cache First)
    if (url.pathname.includes('.pdf') || url.hostname.includes('firebasestorage.googleapis.com')) {
        event.respondWith(
            caches.open(PDF_CACHE_NAME).then(async cache => {
                const response = await cache.match(event.request);
                if (response) {
                    return response; // Instant load from hard drive
                }

                try {
                    const networkResponse = await fetch(event.request);
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone()); // Save for later instantly
                    }
                    return networkResponse;
                } catch (error) {
                    console.warn('Network offline and PDF not cached:', error);
                    // Could return an offline fallback PDF here if needed
                    throw error;
                }
            })
        );
        return;
    }

    // ── Aggressive Strategy: Website Assets (Stale-While-Revalidate)
    // Means the user visually sees the page load instantly from cache, 
    // while the SW fetches updates secretly in the background.
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Ignore background network errors if offline
            });

            return cachedResponse || fetchPromise;
        })
    );
});
