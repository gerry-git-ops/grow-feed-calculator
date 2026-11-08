// Offline support: keeps a copy of all app files on the device.
// The app always runs from this copy. New files are only loaded
// when the app asks for it (see src/update.js).
// Add new files to FILES, otherwise they are not stored.
const CACHE = "grow-feed-calculator";

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
    "src/update.js",
    "data/index.json",
    "data/hesi.json",
    "data/biobizz.json",
    "data/canna.json",
    "data/i18n/de.json",
    "data/i18n/fr.json",
    "i18n/en.json",
    "i18n/de.json",
    "i18n/fr.json",
    "assets/logo.webp",
    "assets/icons/favicon-32.png",
    "assets/icons/apple-touch-icon.png",
    "assets/icons/icon-192.png",
    "assets/icons/icon-512.png",
    "assets/icons/icon-maskable-512.png",
    "fonts/geist/Geist-Variable.woff2",
    "fonts/geist/GeistMono-Variable.woff2",
];

/** Load all files from the server and replace the stored copy. */
async function download() {
    const responses = await Promise.all(
        FILES.map(async (file) => {
            const response = await fetch(file, { cache: "no-cache" });
            if (!response.ok) throw new Error(`${file}: ${response.status}`);
            return [file, response];
        })
    );
    const cache = await caches.open(CACHE);
    await Promise.all(responses.map(([file, response]) => cache.put(file, response)));
}

self.addEventListener("install", (event) => {
    // Only on the first install: there is no copy yet
    event.waitUntil(
        caches.open(CACHE).then(async (cache) => {
            if ((await cache.keys()).length === 0) await download();
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    // Remove copies with other names, e.g. from older versions
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    // Version check (changelog.json?latest) always goes to the server
    if (new URL(event.request.url).searchParams.has("latest")) return;
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((copy) => copy ?? fetch(event.request))
    );
});

self.addEventListener("message", (event) => {
    if (event.data !== "update") return;
    event.waitUntil(
        download().then(
            () => event.source.postMessage("updated"),
            () => event.source.postMessage("update-failed")
        )
    );
});