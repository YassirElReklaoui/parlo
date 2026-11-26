/* Parlo offline worker. Build id below must change with every release (it also names the cache). */
const BUILD = '2026-11-26-i18n-248';
const CACHE = 'parlo-' + BUILD;
const ASSETS = ['./','./index.html','./manifest.webmanifest','./it_data/index.json','./it_data/it-data.json','./it_data/it-data.en.json','./it_data/it-data.fr.json','./it_data/it-data.ar.json','./i18n/en.json','./i18n/fr.json','./i18n/ar.json','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-logo-128.png','./icons/favicon.png','./fonts/parlo-serif-regular.woff','./fonts/parlo-serif-bold.woff'];
self.addEventListener('install', event => event.waitUntil((async () => {
  const next = await caches.open(CACHE);
  // Installation fails without a complete shell; an existing active worker stays in place.
  await next.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'})));
  // No automatic skipWaiting: the page shows "Update ready" and the user taps Reload.
})()));
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('parlo-') && k !== CACHE).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
async function networkFirst(request, cache, fallbackKey) {
  try {
    const fresh = await fetch(request, {cache: 'no-cache'});
    if (fresh && fresh.ok) cache.put(fallbackKey || request, fresh.clone());
    return fresh;
  } catch (e) {
    return await cache.match(fallbackKey || request, {ignoreSearch: true}) || await cache.match('./index.html') || new Response('Offline and not cached yet', {status: 503});
  }
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') return networkFirst(request, cache, './index.html');
    if (/\/([a-z]{2,3}_data\/[\w.-]+\.json|index\.html|manifest\.webmanifest|i18n\/(en|fr|ar)\.json)$/.test(url.pathname)) return networkFirst(request, cache);
    return await cache.match(request) || fetch(request).then(r => { if (r.ok) cache.put(request, r.clone()); return r }).catch(() => new Response('', {status: 504}));
  })());
});
