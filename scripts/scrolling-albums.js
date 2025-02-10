document.addEventListener("DOMContentLoaded", function () {
    const albumContainer = document.querySelector(".scrolling-albums");
    let albumImages = [];

    // Fetch album images from images.json
    fetch("./assets/albumart/images.json")
        .then(response => response.json())
        .then(data => {
            albumImages = data.map(img => `./assets/albumart/${encodeURIComponent(img)}`);
        })
        .catch(error => console.error("Error loading album images:", error));

    function createAlbum() {
        if (albumImages.length === 0) return;

        const img = document.createElement("div");
        img.classList.add("album-cover");

        // Select a random image from the loaded list
        img.style.backgroundImage = `url(${albumImages[Math.floor(Math.random() * albumImages.length)]})`;
        img.style.top = Math.random() * 100 + "vh";
        img.style.animationDuration = Math.random() * 10 + 20 + "s"; 
        img.style.width = img.style.height = Math.random() * 100 + 80 + "px";

        albumContainer.appendChild(img);

        setTimeout(() => img.remove(), 15000);
    }

    setInterval(createAlbum, 1500);
});