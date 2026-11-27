/* Parlo offline worker. Build id below must change with every release (it also names the cache). */
const BUILD = '2026-11-27-course-263';
const CACHE = 'parlo-' + BUILD;
const ASSETS = ['./','./index.html','./manifest.webmanifest','./it_data/index.json','./it_data/it-data.json','./languages.json','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-logo-128.png','./icons/favicon.png','./fonts/parlo-serif-regular.woff','./fonts/parlo-serif-bold.woff'];
self.addEventListener('install', event => event.waitUntil((async () => {
  const next = await caches.open(CACHE);
  // Installation fails without a complete shell; an existing active worker stays in place.
  await next.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'})));
  // Language files come from languages.json. If it cannot be read, use the built-in three. A missing language file is skipped, never fatal.
  let codes = ['en', 'fr', 'ar'];
  try {
    const m = await (await fetch('./languages.json', {cache: 'reload'})).json();
    const c = (m.languages || []).map(x => x && x.code).filter(x => /^[a-z]{2,3}(-[A-Za-z0-9]+)?$/.test(x || ''));
    if (c.length) codes = c;
  } catch (e) {}
  // Every course marked "ready" in courses.json is cached too (its index, base file and one file per language).
  let courses = ['it'];
  try {
    const m = await (await fetch('./courses.json', {cache: 'reload'})).json();
    const c = (m.courses || []).filter(x => x && x.status === 'ready' && /^[a-z]{2,3}$/.test(x.code || '')).map(x => x.code);
    if (c.length) courses = c;
    await next.put('./courses.json', new Response(JSON.stringify(m), {headers: {'content-type': 'application/json'}}));
  } catch (e) {}
  const courseFiles = courses.flatMap(k => ['./' + k + '_data/index.json', './' + k + '_data/' + k + '-data.json'].concat(codes.map(c => './' + k + '_data/' + k + '-data.' + c + '.json')));
  await Promise.all(courseFiles.map(async u => {
    try { const r = await fetch(u, {cache: 'reload'}); if (r.ok) await next.put(u, r) } catch (e) {}
  }));
  await Promise.all(codes.flatMap(c => ['./i18n/' + c + '.json']).map(async u => {
    try { const r = await fetch(u, {cache: 'reload'}); if (r.ok) await next.put(u, r) } catch (e) {}
  }));
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
    if (/\/([a-z]{2,3}_data\/[\w.-]+\.json|index\.html|manifest\.webmanifest|languages\.json|courses\.json|i18n\/[\w-]+\.json)$/.test(url.pathname)) return networkFirst(request, cache);
    return await cache.match(request) || fetch(request).then(r => { if (r.ok) cache.put(request, r.clone()); return r }).catch(() => new Response('', {status: 504}));
  })());
});
