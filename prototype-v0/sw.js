/* Service worker CILUKA — offline-first. Naikkan VERSION setiap kali fail berubah. */
const VERSION = 'ciluka-v0.1.1';
const ASSETS = [
  './', 'index.html', 'styles.css', 'manifest.webmanifest', 'icons/icon.svg',
  'js/pip.js', 'js/data.js', 'js/audio.js', 'js/store.js', 'js/kompas.js',
  'js/games/ciluk.js', 'js/games/tulis.js', 'js/games/sarang.js', 'js/parent.js', 'js/app.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && (new URL(e.request.url).origin === location.origin || e.request.url.includes('fonts.g'))) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
