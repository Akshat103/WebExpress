// sidebar
function closeSidebar() {
    M.Sidenav.getInstance(document.querySelector('.sidenav')).close();
}

$(document).ready(function () {
    $('.sidenav').sidenav();
});

// navbar
function updateNavbarVisibility() {
    var tokenExists = checkLoggedIn();
    var navbarElements = {
        'home': 'block',
        'profile': tokenExists ? 'block' : 'none',
        'signin': tokenExists ? 'none' : 'block'
    };

    Object.keys(navbarElements).forEach(function (element) {
        setElementDisplay(element, navbarElements[element]);
    });
}

function checkLoggedIn() {
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if(cookie.startsWith("loggedIn=")) {
            return cookie.substring("loggedIn=".length) === "true";
        }
    }
    return false;
}

function setElementDisplay(element, display) {
    var desktopLink = document.getElementById(element + '-link');
    var mobileLink = document.getElementById(element + '-link-mobile');

    desktopLink.style.display = display;
    mobileLink.style.display = display;
}

function rearrangeLayout() {
    const layout = document.querySelector('.layout');
    const text = document.querySelector('.text');
    const illustration = document.querySelector('.illustration');

    if (window.innerWidth < 786) {
        layout.insertBefore(illustration, text);
    } else {
        layout.insertBefore(text, illustration);
    }
}

window.addEventListener('load', rearrangeLayout);
window.addEventListener('resize', rearrangeLayout);


