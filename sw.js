const cache = "guandan-v1";

const files = [
"index.html",
"manifest.json",
"sw.js"
];


self.addEventListener(
"install",
event => {

event.waitUntil(
caches.open(cache)
.then(
cache => cache.addAll(files)
)
);

});


self.addEventListener(
"fetch",
event => {

event.respondWith(

caches.match(event.request)
.then(
response =>
response || fetch(event.request)
)

);

});
