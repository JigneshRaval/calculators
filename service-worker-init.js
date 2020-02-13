// Initialize service worker
let newWorker;

// Show notification bar if any change in service worker
// https://deanhume.com/displaying-a-new-version-available-progressive-web-app/
function showUpdateBar() {
    let snackbar = document.getElementById('snackbar');
    snackbar.className = 'show';
}

// The click event on the pop up notification
document.getElementById('reload').addEventListener('click', function () {
    newWorker.postMessage({ action: 'skipWaiting' });
});

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        try {
            // Register the service worker
            // navigator.serviceWorker.register('serviceWorker.js');
            registerSW('serviceWorker.js');
            console.log("Service Worker Registered");
            navigator.serviceWorker.ready.then(() => {
                console.log(
                    'This web app is being served cache-first by a service ' +
                    'worker. To learn more, visit https://bit.ly/CRA-PWA'
                );
            });

            let refreshing;
            navigator.serviceWorker.addEventListener('controllerchange', function () {
                if (refreshing) return;
                console.log('Reloading page...')
                window.location.reload();
                refreshing = true;
            });

        } catch (error) {
            console.log("Service Worker Registration Failed");
        }
    }
});

function registerSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {

            // Method 1 : Another way to check events
            // registration.addEventListener('updatefound', () => { });
            // newWorker.addEventListener('statechange', () => {});

            // Method 2 : Another way to check events
            registration.onupdatefound = () => {
                // An updated service worker has appeared in reg.installing!
                newWorker = registration.installing;

                if (newWorker == null) {
                    return;
                }

                newWorker.onstatechange = () => {
                    // Has network.state changed?
                    if (newWorker.state === 'installed') {

                        // There is a new service worker available, show the notification
                        if (navigator.serviceWorker.controller) {

                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.log(
                                'New content is available and will be used when all ' +
                                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                            );

                            // new update available
                            showUpdateBar();

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

function unregisterSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
