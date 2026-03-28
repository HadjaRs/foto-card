const cacheName = 'agata-v4'; 
const assets = [
  '/rede-card/',
  '/rede-card/index.html',
  '/rede-card/style.css',
  '/rede-card/manifest.json',
  '/rede-card/img/icone.png',
  '/rede-card/img/agata.jpg'
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