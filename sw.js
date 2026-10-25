const CACHE = "bilgi-arenasi";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then(r => {
        const kopya = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopya));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});