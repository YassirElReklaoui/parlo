/* Parlo offline installation: atomic install, no forced update of active sessions. */
const CACHE = 'parlo-v233-shell-1';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./data.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', event => event.waitUntil((async () => {
  const next = await caches.open(CACHE);
  // Installation fails without a complete shell; an existing active worker remains in place.
  await next.addAll(ASSETS);
  // Do not call skipWaiting: finish active learning sessions before changing versions.
})()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  const previous = keys.filter(k => /^parlo-v\d+-shell/.test(k) && k !== CACHE)
    .sort((a,b) => Number(b.match(/v(\d+)/)?.[1]||0)-Number(a.match(/v(\d+)/)?.[1]||0));
  await Promise.all(previous.slice(1).map(k => caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const request=event.request, url=new URL(request.url);
  if(request.method!=='GET' || url.origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    if(request.mode==='navigate')return await cache.match('./index.html')||await cache.match('./')||new Response('Offline shell unavailable',{status:503});
    return await cache.match(request)||fetch(request);
  })());
});
