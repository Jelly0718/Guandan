const cacheName = "guandan-v2";

const files = [
    "./index.html",
    "./manifest.json",
    "./sw.js"
];


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(files))
    );
});


self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});
