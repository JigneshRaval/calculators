// serviceWorkerInit.js

// this script will initialize and register service worker file

// START :: Progressive web app ( PWA ) Code
let process = {
    env: {
        NODE_ENV: "production", // production, local
        PUBLIC_URL: "http://localhost:3002"
    }
}

window.addEventListener('online', function (e) {
    // re-sync data with server
    console.log("You are online");
    // hideOfflineWarning();
}, false);

window.addEventListener('offline', function (e) {
    // queue up events for server
    console.log("You are offline");
    // showOfflineWarning();
}, false);

// check if the user is connected
if (navigator.onLine) {
    // loadData();
} else {
    // show offline message
    // showOfflineWarning();
}

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

function register(config) {
    if (process.env.NODE_ENV === 'production') {
        // process.env.PUBLIC_URL = 'https://jigneshraval.github.io/calculators';
        process.env.PUBLIC_URL = 'http://localhost:3002';
    }
    console.log('${process.env.PUBLIC_URL} process.env.NODE_ENV === "production"', `${process.env.PUBLIC_URL}`)
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        // const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        /* if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        } */

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);

                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-first by a service ' +
                        'worker. To learn more, visit https://bit.ly/CRA-PWA'
                    );
                });
            } else {
                // Is not localhost. Just register service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.log(
                                'New content is available and will be used when all ' +
                                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                            );

                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl)
        .then(response => {
            // Ensure service worker exists, and that we really are getting a JS file.
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}

register();

// unregister();

/* if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {

        navigator.serviceWorker.register('../service-worker.js', { scope: '/' }).then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }).catch(function (err) {
            console.log(err)
        });

        navigator.serviceWorker.ready.then(function (registration) {
            console.log('Service Worker Ready')
            return registration.sync.register('sendFormData')
        }).then(function () {
            console.log('sync event registered')
        }).catch(function () {
            // system was unable to register for a sync,
            // this could be an OS-level restriction
            console.log('sync registration failed')
        });

    });
} else {
    console.log('service worker is not supported');
} */
