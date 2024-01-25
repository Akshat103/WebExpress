// navbar.js

function updateNavbarVisibility() {
    var tokenExists = checkTokenInCookies();
    var navbarElements = {
        'home': 'block',
        'profile': tokenExists ? 'block' : 'none',
        'signin': tokenExists ? 'none' : 'block'
    };

    Object.keys(navbarElements).forEach(function (element) {
        setElementDisplay(element, navbarElements[element]);
    });
}

function setElementDisplay(element, display) {
    var desktopLink = document.getElementById(element + '-link');
    var mobileLink = document.getElementById(element + '-link-mobile');

    desktopLink.style.display = display;
    mobileLink.style.display = display;
}
