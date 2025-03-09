function updateScrollingBooksHeight() {
    const scrollingBooks = document.querySelector(".scrolling-books");
    scrollingBooks.style.height = document.documentElement.scrollHeight + "px";
}

// Update height on load and when the page resizes
window.addEventListener("load", updateScrollingBooksHeight);
window.addEventListener("resize", updateScrollingBooksHeight);

document.addEventListener("DOMContentLoaded", function () {
    const albumContainer = document.querySelector(".scrolling-books");
    let albumImages = [];
    let imageTracker = []; // Boolean tracker array

    // Fetch album images from images.json
    fetch("./assets/books/images.json")
        .then(response => response.json())
        .then(data => {
            albumImages = data.map(img => `./assets/books/${encodeURIComponent(img)}`);
            imageTracker = new Array(albumImages.length).fill(false); // Initialize tracker
        })
        .catch(error => console.error("Error loading album images:", error));

    function createBookCover() {
        const img = document.createElement("div");
        img.classList.add("book-cover");

        // Get a unique random image index
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * albumImages.length);
        } while (imageTracker[randomIndex]); // Retry if image was already used

        // Mark the image as used
        imageTracker[randomIndex] = true;

        // If all images have been used, reset tracker
        if (imageTracker.every(Boolean)) {
            console.log("All images used. Resetting tracker.");
            imageTracker.fill(false);
        }

        const randomImage = albumImages[randomIndex];

        // Create an <img> to get dimensions
        const tempImg = new Image();
        tempImg.src = randomImage;
        tempImg.onload = function () {
            const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
            const width = Math.random() * 50 + 100; // Random width between 100px and 180px
            img.style.width = `${width}px`;
            img.style.height = `${width / aspectRatio}px`;
        };

        img.style.backgroundImage = `url(${randomImage})`;
        img.style.backgroundSize = "contain";
        img.style.backgroundRepeat = "no-repeat";
        img.style.backgroundPosition = "center";

        var body = document.body,
        html = document.documentElement;
    
        var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        img.style.top = Math.random() * pageHeight + "px";
        img.style.animationDuration = Math.random() * 10 + 20 + "s";

        albumContainer.appendChild(img);

        // Remove book cover after it moves off-screen
        setTimeout(() => img.remove(), 30000);
    }

    setInterval(createBookCover, 2500);
});
