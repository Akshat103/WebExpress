// main.js

document.addEventListener('DOMContentLoaded', function () {
    updateNavbarVisibility();
});

function checkTokenInCookies() {
    var loggedIn = sessionStorage.getItem("loggedIn");
    return loggedIn
}
