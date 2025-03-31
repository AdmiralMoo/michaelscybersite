let albumImages = [];
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
            
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
            }
}

function resetAlbum(album, time)
{
    album.style.animationDuration = (time * 1.5) + "s";
    album.style.top = Math.random() * 1024 + "px";

    newImage = 

    album.src = "./assets/gifs/DiscLoading.gif";
    
}
        
/*
Initialize the list of albums 
*/
function initializeScrollingAlbums()
{
    let scrollingAlbums = new Array(10);

    //Find where we're putting these albums
    const albumDiv = document.querySelector(".scrolling-albums");
    const sizingElement = document.querySelector("main");
    let totalHeight = window.getComputedStyle(sizingElement).height;

/*    albumDiv.setAttribute("style", `
        width: 100vw;
        background-color: #FFFFFF;
        height:${totalHeight};
        min-height:${totalHeight};
    `);*/

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

                let duration = Math.floor(Math.random() * 7.0) + 15.0;
                setTimeout(1000);
                setInterval(resetAlbum(scrollingAlbums[i], duration), duration);
            }
        })
}


document.addEventListener("DOMContentLoaded", initializeScrollingAlbums());