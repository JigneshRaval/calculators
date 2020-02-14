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
