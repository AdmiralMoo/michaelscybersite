document.addEventListener("DOMContentLoaded", function() {
    const headContent = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--<!--<!--<base href="https://michaelscybersite.net/">-->-->-->
        <base href="http://127.0.0.1:5500/">
        <link rel="icon" type="image/x-icon" href="/assets/site/favicon.ico">
        <link rel="stylesheet" type="text/css" href="index.css"/>
        <link rel="preload" href="/assets/ui/button_down.jpg" as="image">
        <link rel="preload" href="/assets/ui/button_hover.jpg" as="image">
    `;

    document.head.innerHTML += headContent;
});