function updateScrollingAlbumsHeight() {
    const scrollingalbums = document.querySelector(".scrolling-albums");
    scrollingalbums.style.height = document.documentElement.scrollHeight + "px";
}

// Update height on load and when the page resizes
window.addEventListener("load", updateScrollingAlbumsHeight);
window.addEventListener("resize", updateScrollingAlbumsHeight);

document.addEventListener("DOMContentLoaded", function () {
    const albumContainer = document.querySelector(".scrolling-albums");
    let albumImages = [];
    let imageTracker = []; // Boolean tracker array

    // Fetch album images from images.json
    fetch("./assets/albumart/images.json")
        .then(response => response.json())
        .then(data => {
            albumImages = data.map(img => `./assets/albumart/${encodeURIComponent(img)}`);
            imageTracker = new Array(albumImages.length).fill(false); // Initialize tracker
        })
        .catch(error => console.error("Error loading album images:", error));

    function createAlbum() {
        if (albumImages.length === 0) return;

        const img = document.createElement("div");
        img.classList.add("album-cover");

        // Get a unique random image index
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * albumImages.length);
        } while (imageTracker[randomIndex]); // Retry if image was already used

        imageTracker[randomIndex] = true;

        const randomImage = albumImages[randomIndex];

        // Select a random image from the loaded list
        img.style.backgroundImage = `url(${randomImage})`;
        const pageHeight = document.body.scrollHeight;
        img.style.top = Math.random() * pageHeight + "px";
        img.style.animationDuration = Math.random() * 10 + 20 + "s"; 
        img.style.width = img.style.height = Math.random() * 100 + 80 + "px";

        albumContainer.appendChild(img);

        setTimeout(() => img.remove(), 15000);
    }

    setInterval(createAlbum, 1000);
});