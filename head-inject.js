function injectHead() {
    document.head.innerHTML = 
    `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="https://michaelscybersite.net/">
    <!--<base href="http://127.0.0.1:5500/">-->
    <link rel="stylesheet" type="text/css" href="/assets/css/base.css"/>
    <link rel="icon" type="image/x-icon" href="/assets/site/favicon.ico">
    ` 
    + document.head.innerHTML;
}

window.onloadstart = injectHead();