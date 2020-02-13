// Set this to true for production
var doCache = false;
const CACHE_NAME = "cache-v4";

const assetToCache = [
    "manifest.json",
    "serviceWorkerInit.js",
    "components/header.html",
    "css/main.css",
    "css/groww.css",
    "css/bootstrap.css",
    "css/tax-calculator.css",
    "css/bootstrap-datepicker.min.css",
    "js/bootstrap.bundle.js",
    "js/bootstrap.bundle.js.map",
    "js/bootstrap-datepicker.min.js",
    "js/income-tax-calculator.js",
    "js/jquery-3.4.1.js",
    "js/rent-receipt-generator.js",
    "js/sip-calculator.js",
    "index.html",
    "EPF-Calculator-personalfn.html",
    "simple-interest-calculator.html",
    "rent-receipt-generator.html",
    "income-tax-calculator.html",
    "sip-calculator.html",
    "FD-Calculator-Groww.html",
    "HRA-Calculator-Groww.html",
    "NPS-Calculator-Groww.html",
    "PPF-Calculator-Groww.html",
    "SIP-Calculator-Groww.html",
    "SWP-Calculator-Groww.html",
    "stock-average-calculator.html"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(assetToCache);
            })
            .catch(console.error)
    );
});

self.addEventListener('activate', function (event) {
    var cacheKeeplist = ['v5'];

    event.waitUntil(
        caches.keys().then(function (assetToCache) {
            return Promise.all(assetToCache.map(function (key) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('cache-v4').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    cache.put(event.request, response.clone());
                    return response;
                }).catch((error) => {
                    console.log('Error in service worker fetch event : ', error);
                });
            });
        })
    );
});

// https://levelup.gitconnected.com/build-a-pwa-using-only-vanilla-javascript-bdf1eee6f37a
/* self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.url) {
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(newtorkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function newtorkFirst(req) {
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
} */
