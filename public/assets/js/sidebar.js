// sidebar.js

function closeSidebar() {
    M.Sidenav.getInstance(document.querySelector('.sidenav')).close();
}

$(document).ready(function () {
    $('.sidenav').sidenav();
});
