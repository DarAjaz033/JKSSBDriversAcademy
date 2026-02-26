const CACHE_NAME = 'jkssb-preloaded-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/login.html',
    '/my-courses.html',
    '/demo-pdfs.html',
    '/styles.css',
    '/favicon.svg',
    '/favicon.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching critical pages');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('jkssb-preloaded')) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Network-first strategy for navigation / HTML requests
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate' || event.request.destination === 'document') {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(event.request))
        );
    } else {
        // Cache-first for explicitly cached static assets
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});
