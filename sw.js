const CACHE_NAME = 'lav-pwa-v9';
const APP_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo-greg.webp',
  './guides/rga/guide.json',
  './guides/vercors/guide.json',
  './guides/cevennes/guide.json'
];
const EXTERNAL_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];
const NET_TIMEOUT_MS = 2500;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of APP_ASSETS) {
        try {
          const res = await fetch(new Request(url, { cache: 'no-cache' }));
          if (res && res.ok) await cache.put(url, res);
        } catch (err) { /* Asset local optionnel */ }
      }
      for (const url of EXTERNAL_ASSETS) {
        try {
          const res = await fetch(new Request(url, { mode: 'no-cors' }));
          if (res) await cache.put(url, res);
        } catch (err) { /* Hors-ligne lors de l'installation */ }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const reqUrl = new URL(e.request.url);

  // Ne jamais mettre en cache les appels API WordPress/WooCommerce
  if (reqUrl.pathname.includes('/wp-json/')) return;

  // Tuiles carte Esri : réseau seul
  if (reqUrl.hostname.includes('arcgisonline.com')) return;

  const isSameOrigin = reqUrl.origin === self.location.origin;

  // Pour les fichiers locaux (index.html, guide.json...), contourner le cache HTTP navigateur (max-age GitHub Pages)
  const netReq = isSameOrigin ? new Request(e.request, { cache: 'no-cache' }) : e.request;

  const netPromise = fetch(netReq)
    .then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    });

  const timeoutPromise = new Promise(resolve => {
    setTimeout(async () => {
      const cached = await caches.match(e.request);
      if (cached) resolve(cached);
    }, NET_TIMEOUT_MS);
  });

  e.respondWith(
    Promise.race([netPromise, timeoutPromise])
      .then(r => r || netPromise)
      .catch(async () => {
        const cached = await caches.match(e.request);
        if (cached) return cached;
        if (isSameOrigin && e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      })
  );
});
