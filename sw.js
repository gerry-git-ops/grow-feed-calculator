// Offline support: keeps a copy of all app files on the device.
// Online: always load the newest files and update the copy.
// Offline: use the copy.
// Raise the version when files are added, renamed or removed.
const CACHE = "grow-feed-calculator-v2";

const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "changelog.json",
  "css/style.css",
  "src/app.js",
  "src/calculator.js",
  "src/changelog.js",
  "src/i18n.js",
  "src/theme.js",
  "data/hesi.json",
  "i18n/en.json",
  "i18n/de.json",
  "assets/logo.webp",
  "assets/icons/favicon-32.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png",
  "fonts/geist/Geist-Variable.woff2",
  "fonts/geist/GeistMono-Variable.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request, { cache: "no-cache" })
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});