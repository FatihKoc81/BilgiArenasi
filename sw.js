// Önce ağdan dene (güncel kalsın), internet yoksa önbellekten aç
const ONBELLEK = "bilgi-arenasi-v4";
const DOSYALAR = [
  "./", "index.html", "style.css", "manifest.json",
  "sorular.js", "ortak.js", "passaparola.js", "kelime.js", "kelimelerim.js", "islem.js", "cember.js",
  "icon-192.png", "icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(ONBELLEK)
      .then(c => Promise.allSettled(DOSYALAR.map(d => c.add(new Request(d, { cache: "reload" })))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== ONBELLEK).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then(r => {
        const kopya = r.clone();
        caches.open(ONBELLEK).then(c => c.put(e.request, kopya)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});
