// Method 1 : Include another HTML files
// https://stackoverflow.com/questions/8988855/include-another-html-file-in-a-html-file
// Usage : <include src="simple-interest-calculator.html">Loading...</include>
/* (() => {
    const includes = document.getElementsByTagName('include');
    [].forEach.call(includes, i => {
        let filePath = i.getAttribute('src');
        fetch(filePath).then(file => {
            file.text().then(content => {
                $('.container').html(content);
                // i.insertAdjacentHTML('afterend', content);
                // i.remove();
            });
        });
    });
})(); */

let scrollTimer;

// Document Ready check
document.addEventListener("DOMContentLoaded", function () {

    if (!localStorage.getItem('Disclaimer_Visited')) {
        $('#disclaimerModal').modal('show');
    }

    // console.log('Your document is ready!');
    // close menu
    document.body.addEventListener('click', (event) => {
        let chkMenu = document.querySelector('#toggleMenu');

        if (event && event.target.closest('header')) {

        } else {

            if (chkMenu) {
                chkMenu.checked = false;
            }
        }
    });

    window.addEventListener('scroll', () => {
        let scrollElement = document.querySelector('.content__header');
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        if (scrollElement) {
            scrollTimer = setTimeout(() => {
                getScrollPosition(scrollElement);
            }, 250);
        }
    }, false);

    // Method 2 : using import
    /* function supportsImports() {
        return 'import' in document.createElement('link');
    }

    if (supportsImports()) {
        // Good to go!
        var link = document.querySelector('link[rel="import"]');
        var content = link.import;

        // Grab DOM from warning.html's document.
        if (content) {
            var el = content.querySelector('.container');

            document.body.appendChild(el.cloneNode(true));
        }
    } else {
        // Use other libraries/require systems to load files.
    } */

    // Method 3 : Using fetch() API
    /* fetch("./simple-interest-calculator.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            $('.container').html(data);
        }); */

    fetch("./components/header.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        });
});

function savePreferences() {
    localStorage.setItem('Disclaimer_Visited', true);
    $('#disclaimerModal').modal('hide');
}

function hidePanel() {
    $('.nav-icons').show();
    $('.main-content').removeClass('isVisible');
}

/**
 * @function : Scroll to top with smooth animation using javascript only
 * @param event
 */
function getScrollPosition(scrollElement) {
    let scrollTop = window.pageYOffset;

    let appHeader = document.querySelector('.app__header');

    if (scrollTop > 20) {
        scrollElement.style.position = 'sticky';
        appHeader.style.opacity = 0;
        scrollElement.classList.add('isVisible');
    } else {
        scrollElement.style.position = 'static';
        appHeader.style.opacity = 1;
        scrollElement.classList.remove('isVisible');
    }

    // Ref: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
    // Make sure they scroll more than delta ( delta = 5 )
    if (Math.abs(this.lastScrollTop - scrollTop) <= this.delta) {
        return;
    }

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is 'behind' the navbar.
    // header height = 96px
    if (scrollTop > this.lastScrollTop && scrollTop > 96) {
        // Scroll Down
        document.body.classList.add('shrinkHeader');
    } else {
        // Scroll Up
        if (scrollTop + window.innerHeight < document.body.offsetHeight) {
            document.body.classList.remove('shrinkHeader');
        }
    }

    // console.log('scrollTop =', scrollTop, ' this.lastScrollTop =', this.lastScrollTop)
    this.lastScrollTop = scrollTop;
}
