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

    const url = new URL(event.request.url);

    // ── Strategy 1: PDF and Firebase Storage (Cache First, then Network)
    if (url.pathname.includes('.pdf') || url.hostname.includes('firebasestorage.googleapis.com')) {
        event.respondWith(
            caches.open(PDF_CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    // Return from cache if we have it (Instant load!)
                    if (response) return response;

                    // Otherwise fetch from network
                    return fetch(event.request).then(networkResponse => {
                        // Ensure we got a valid response before caching
                        if (networkResponse && networkResponse.status === 200) {
                            // Only cache partial if we want, but usually we just cache the 200
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(error => {
                        console.error('Service worker PDF fetch failed:', error);
                        throw error;
                    });
                });
            })
        );
        return;
    }

    // ── Strategy 2: Stale-While-Revalidate for Website Assets (HTML/JS/CSS/Images)
    // This returns the cached response instantly, but fetches the new one in the background
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // If the fetch was successful, update the cache
                if (networkResponse && networkResponse.status === 200) {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If network fails, we just rely on cached response (handled below)
            });

            // Return cached response immediately if available, otherwise wait for network
            return cachedResponse || fetchPromise;
        })
    );
});
