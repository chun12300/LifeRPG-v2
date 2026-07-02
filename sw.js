// ===================================
// Service Worker
// LifeRPG-v2 PWA
// ===================================

var CACHE_NAME = "liferpg-v1";
var urlsToCache = [
    "/LifeRPG-v2/",
    "/LifeRPG-v2/index.html",
    "/LifeRPG-v2/dashboard.html",
    "/LifeRPG-v2/style.css",
    "/LifeRPG-v2/app.js",
    "/LifeRPG-v2/health.html",
    "/LifeRPG-v2/wealth.html",
    "/LifeRPG-v2/food.html",
    "/LifeRPG-v2/meme.html",
    "/LifeRPG-v2/explore.html",
    "/LifeRPG-v2/icon.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
