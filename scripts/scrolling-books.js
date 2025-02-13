document.addEventListener("DOMContentLoaded", function () {
    const albumContainer = document.querySelector(".scrolling-books");
    let albumImages = [];

    // Fetch album images from images.json
    fetch("./assets/books/images.json")
        .then(response => response.json())
        .then(data => {
            albumImages = data.map(img => `./assets/books/${encodeURIComponent(img)}`);
            
            // Start generating book covers only after images are loaded
            setInterval(createBookCover, 1500);
        })
        .catch(error => console.error("Error loading album images:", error));

    function createBookCover() {
        if (albumImages.length === 0) return; // Prevent errors if images didn't load

        const img = document.createElement("div");
        img.classList.add("book-cover");

        // Select a random image
        const randomImage = albumImages[Math.floor(Math.random() * albumImages.length)];
        img.style.backgroundImage = `url(${randomImage})`;
        
        img.style.top = Math.random() * 100 + "vh";
        img.style.animationDuration = Math.random() * 10 + 20 + "s"; 

        // Set a fixed width and allow height to adjust dynamically
        img.style.width = Math.random() * 80 + 100 + "px"; // Random width between 100px and 180px
        img.style.height = "auto"; // Automatically adjusts based on aspect ratio

        albumContainer.appendChild(img);

        // Remove book cover after it moves off-screen
        setTimeout(() => img.remove(), 25000);
    }
});
