const CACHE_NAME = "peernex-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon.svg",
    "./request.html",
    "./offer.html",
    "./matches.html",
    "./feedback.html",
    "./payment.html",
    "./history.html",
    "./chat.html"
];

// Install and cache app files
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activate and remove old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );

    self.clients.claim();
});

// Serve cached files when available
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse ||
                fetch(event.request).catch(() => {
                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html");
                    }
                });
        })
    );
});
