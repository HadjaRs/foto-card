const cacheName = 'agata-v3'; 
const assets = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './img/icone.png',
  './img/agata.jpg'
];

self.addEventListener('install', e => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});


self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});