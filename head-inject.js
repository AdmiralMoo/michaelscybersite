//Are we overriding the header and footer on this page?
if (document.readyState === "loading") {
    var overridedHeadFoot;
    if (typeof overrideHeadFoot === 'undefined')
    {
        overrideHeadFoot = false;
    }
    else
    {
        overridedHeadFoot = true;
    }
    injectHead(!overridedHeadFoot);
}

//Inject Head data
function injectHead(injectHeader) {
    //Detect if the site is local or on GitHub Pages
    let baseHref;
    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
        baseHref = "http://127.0.0.1:5500/";
    } else if (window.location.hostname === "10.0.0.215"){
        baseHref = "http://10.0.0.215:5500/";
    } else if (window.location.hostname == "localhost:5500"){
        baseHref = "http://localhost:5500/";
    } else {
        baseHref = "https://michaelscybersite.net/";
    }

    document.head.insertAdjacentHTML("afterbegin", `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="${baseHref}">
    <link rel="stylesheet" type="text/css" href="/assets/css/base.css"/>
    <link rel="icon" type="image/x-icon" href="/assets/site/favicon.ico">
    `);

    if (injectHeader == true)
    {
        injectStandardHeader();
        injectStandardFooter();
    }
}

//Inject header and footer data
function injectStandardFooter()
{
    fetch("pages/templates/footer.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data);

        const lastModifiedDate = new Date(document.lastModified);
        const formattedDate = lastModifiedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const lastUpdatedElement = document.querySelector("#lastUpdatedSpan");
        lastUpdatedElement.textContent = `Site last updated on ${formattedDate}`;
    });
}

//Injects the default header into the HTML document
function injectStandardHeader()
{
    fetch("pages/templates/header.html")
    .then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
    });
}

//Lazy loading. Dynamically lazy load images when HTML is injected by JS
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll("img.lazyload");

    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    const realSrc = img.getAttribute("data-src");

                    if (realSrc) {
                        img.src = realSrc;
                        img.onerror = () => handleImageError(img);
                    }

                    img.classList.add("loaded");
                    img.classList.remove("lazyload");
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.getAttribute("data-src");
            img.classList.add("loaded");
            img.classList.remove("lazyload");
        });
    }
}

//Activate lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

//Lazyload shit the bed
function handleImageError(image)
{
    console.error(`lazyload img shit the bed! ${realSrc}`, error);
    img.src = "/assets/images/noimage.jpg";
}