'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,

    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },

    init: function () {
        var r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },

    hasChanged: function (scope, r) {
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    },

    goToRoute: function (htmlName) {
        (function (scope) {
            // generateImportLinks(htmlName);
            loadCalculator(htmlName);
            window.scrollTo(0, 0);
        })(this);
    }
};

function loadCalculator(fileName) {
    let filePath = `views/${fileName}`;
    let chkMenu = document.querySelector('#toggleMenu');
    if (chkMenu) {
        chkMenu.checked = false;
    }

    fetch(filePath)
        .then(response => {
            return response.text();
        })
        .then(data => {
            renderTemplate(data);
            // $('.container').html(data);

            // $('.nav-icons').hide();
            // $('.main-content').addClass('isVisible');
        });
}

function renderTemplate(data) {
    // Method 1
    // ====================
    let container = document.createElement('div');
    container.innerHTML = data;
    const template = container.querySelector('template'); // Template or Fragment
    // Create an instance of the template content
    const instance = document.importNode(template.content, true); // instance of template
    $('.container').html(instance);
    // animateContent();

    // document.body.appendChild(document.importNode(template.content, true));

    /* var fragment = document.createDocumentFragment();
    let container = document.createElement('DIV');
    container.innerHTML = data;
    fragment.appendChild(container);
    document.body.appendChild(document.importNode(template.content, true)); */

    // Method 2
    // ====================
    /* let template = document.querySelector('#x-foo-from-template');
    // If your code is inside of an HTML Import you'll need to change the above line to:
    // let template = document.currentScript.ownerDocument.querySelector('#x-foo-from-template');

    customElements.define('x-foo-from-template', class extends HTMLElement {
        constructor() {
            super(); // always call super() first in the constructor.
            let shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }); */
}

function generateImportLinks(fileName) {
    if (fileName) {
        var link = document.createElement('link');
        link.rel = 'import';
        link.href = `views/${fileName}`;
        //link.setAttribute('async', ''); // make it async!
        link.onload = function (e) {
            console.log('Loaded import: ' + e.target.href);
        };
        link.onerror = function (e) {
            console.log('Error loading import: ' + e.target.href);
        };
        document.head.appendChild(link);

        var link = document.querySelector('link[rel="import"]');

        // Clone the <template> in the import.
        var template = link.import.querySelector('template');
        var clone = document.importNode(template.content, true);

        document.querySelector('#container2').appendChild(clone);
    }
}

function animateContent() {
    // first state
    const contentBox = document.querySelector(".container");

    // Fade-out effect
    // contentBox.classList.add('box', 'fade-out');

    // Fade-in effect
    contentBox.classList.remove('fade-in');

    contentBox.addEventListener('transitionend', timeoutDisplay);

    /* requestAnimationFrame(() => {
        // second state
        contentBox.classList.remove("fade-out");
    }); */
}

function timeoutDisplay() {
    console.log('timeoutDisplay');
    const contentBox = document.querySelector(".container");
    // Fade-out effect
    // contentBox.classList.remove("fade-out");

    // Fade-in effect
    contentBox.classList.add('box', 'fade-in');
}
