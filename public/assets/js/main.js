// main.js

document.addEventListener('DOMContentLoaded', function () {
    updateNavbarVisibility();
});

function checkTokenInCookies() {
    var loggedIn = sessionStorage.getItem("loggedIn");
    return loggedIn
}

if (sessionStorage.getItem('loggedIn') === 'true') {
    function informServerOnSignOut() {
        fetch('/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (response.ok) {
                    console.log('User signed out successfully.');
                } else {
                    console.error('Failed to inform the server about sign out.');
                }
            })
            .catch(error => {
                console.error('Error during sign out:', error);
            });
    }

    window.addEventListener('unload', informServerOnSignOut);
}
