let albumImages = [];
let scrollingAlbums = new Array(10);
let waterfallAlbumIndex = 0;
/*
Helper function to shuffle the array
*/
function shuffle(array) 
{
    let currentIndex = array.length;
    
    while (currentIndex != 0) 
    {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function resetAlbum(album) {

    let newImage = albumImages[albumImages.length - 1];
    albumImages.pop();

    if (albumImages.length <= 0)
    {
        initializeScrollingAlbums();
    }

    const duration = 7 + Math.random() * 7;
    album.style.animationDuration = (duration * 1.5) + "s";
    album.style.top = Math.random() * 1024 + "px";

    album.style.width = "100px";
    album.style.height = "100px";
    album.style.maxWidth = "100px";
    album.style.maxHeight = "100px";
    album.style.objectFit = "scale-down"

    album.classList.remove("album-cover"); 
    void album.offsetWidth;
    album.classList.add("album-cover");

    album.src = "./assets/gifs/DiscLoading.gif";

    setTimeout(() => {
        album.src = newImage;
        
        lazyLoadImages();
    }, 500);

    const totalTime = duration * 1500;
    setTimeout(() => {
        resetAlbum(album);
    }, totalTime);
}


function spawnAlbums() {
    if (scrollingAlbums.length === 0) return;

    const album = scrollingAlbums[waterfallAlbumIndex];

    resetAlbum(album);

    waterfallAlbumIndex++;
    if (waterfallAlbumIndex >= scrollingAlbums.length) {
        waterfallAlbumIndex = 0;
    }

    const nextDelay = 3000 + Math.random() * 3000;

    setTimeout(spawnAlbums, nextDelay);
}
    
function initializeScrollingAlbums()
{
    //Find where we're putting these albums
    const albumDiv = document.querySelector(".scrolling-albums");
    const sizingElement = document.querySelector("main");
    let totalHeight = window.getComputedStyle(sizingElement).height;

    //Retrieve the list of images from the JSON file\\
    fetch("./assets/albumart/images.json")
        .then(response => response.json())
        .then(data => 
        {
            //Get the data, map it to the file paths and shuffle the list
            albumImages = data.map(img => `./assets/albumart/${encodeURIComponent(img)}`);
            shuffle(albumImages);
            
            //Loop through the array of scrolling albums and create their elements
            for (let i = 0; i < scrollingAlbums.length; i++)
            {
                let newElement = document.createElement('div');

                let newImage = document.createElement("img");
                newImage.classList.add("album-cover");                
                newElement.appendChild(newImage);
                scrollingAlbums[i] = newImage;

                albumDiv.appendChild(scrollingAlbums[i]);
            }

            spawnAlbums();
        })
}


document.addEventListener("DOMContentLoaded", initializeScrollingAlbums());