document.addEventListener("DOMContentLoaded", function() {
    let baseTag = document.createElement("base");

    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
        baseTag.href = "http://127.0.0.1:5500/";  // Local development base URL
    } else {
        baseTag.href = "https://admiralmoo.github.io/michaelscybersite/";  // Live GitHub Pages base URL
    }

    document.head.prepend(baseTag);
});