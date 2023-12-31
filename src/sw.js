

// Inside your service worker file (service-worker.js)

const cacheName = 'image-cache-v1';

// List of image URLs generated by Webpack
const imageUrls = [
    'assets/fajr-d4df8d85.png',
    'assets/asr-a45e9a40.png',
    'assets/isha-2425a520.png',
    'assets/maghrib-2b8e3952.png',
    'assets/dhuhr-0a259379.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(imageUrls);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    // ...
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    // ...
});