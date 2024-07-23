export function getCookie(cookieName) {
    // Split cookies by semicolon
    var cookies = document.cookie.split(';');

    // Iterate through cookies
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        // Check if cookie starts with the provided cookieName
        if (cookie.indexOf(cookieName + '=') === 0) {
            // Extract and return the cookie value
            return cookie.substring(cookieName.length + 1);
        }
    }

    // Return null if cookie with the provided name is not found
    return null;
}

export function setCookie(cookieName, cookieValue) {
    // Set expiry date to 30 days from now
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    // Convert expiry date to UTC string
    var expires = expiryDate.toUTCString();

    // Check if the current environment is localhost:3000
    var isLocalhost = window.location.hostname === 'localhost' && window.location.port === '3000';

    // Set cookie only for localhost:3000
    var cookieOptions = isLocalhost ? 'SameSite=Strict; Secure;' : '';

    document.cookie = cookieName + '=' + cookieValue + '; expires=' + expires + '; ' + cookieOptions;
}

export function removeCookie(cookieName) {
    // Set expiry date to a past date
    var pastDate = new Date(0).toUTCString();

    // Check if the current environment is localhost:3000
    var isLocalhost = window.location.hostname === 'localhost' && window.location.port === '3000';

    // Set cookie only for localhost:3000
    var cookieOptions = isLocalhost ? 'SameSite=Strict; Secure;' : '';

    document.cookie = cookieName + '=; expires=' + pastDate + '; ' + cookieOptions;
}

