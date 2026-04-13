/**
 * WIB Service Worker
 * Strategy:
 *  - Static assets (CSS, JS, fonts, SVG): Cache-first with network fallback
 *  - HTML pages: Network-first with cache fallback (so content stays fresh)
 *  - Firebase/external APIs: Network-only (never cache auth/DB requests)
 */

const CACHE_NAME = 'wib-v1';
const CACHE_TIMEOUT_MS = 3000; // Network timeout before using cache

// Core assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/styles.css',
  '/config.js',
  '/sanitize.js',
  '/chat-widget.js',
  '/favicon.svg',
  '/404.html',
];

// ── Install: pre-cache core assets ───────────────────────────────────────────
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────────
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// ── Fetch: routing strategy ───────────────────────────────────────────────────
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  // Never intercept Firebase, Google APIs, analytics, or ad requests
  var skipHosts = [
    'firebasestorage.googleapis.com',
    'firestore.googleapis.com',
    'identitytoolkit.googleapis.com',
    'securetoken.googleapis.com',
    'googleapis.com',
    'googletagmanager.com',
    'googlesyndication.com',
    'gstatic.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ];
  if (skipHosts.some(function (h) { return url.hostname.includes(h); })) return;

  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Static assets (CSS/JS/SVG/images/fonts): Cache-first
  if (/\.(css|js|svg|png|jpg|jpeg|webp|woff2?|ico)(\?.*)?$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        if (cached) return cached;
        return fetch(event.request).then(function (response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML pages: Network-first with cache fallback
  if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      Promise.race([
        fetch(event.request).then(function (response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
          }
          return response;
        }),
        new Promise(function (_, reject) { setTimeout(function () { reject(new Error('timeout')); }, CACHE_TIMEOUT_MS); })
      ]).catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match('/404.html');
        });
      })
    );
  }
});
