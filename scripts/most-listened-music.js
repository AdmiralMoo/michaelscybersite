document.addEventListener("DOMContentLoaded", () => {
    initDatabase(); 
    updateAlbumChartDisplay();
});

var currentMonthIndex = 0;
var albumData = [];

function initDatabase()
{    
    fetch('./assets/json/mostListenedAlbumsData.json')
    .then(response => response.json())
    .then(data => {
        albumData = data;               
        currentMonthIndex = albumData.length - 1; 
        updateAlbumChartDisplay();              
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function updateAlbumChartDisplay() 
{
    const monthDisplay = document.getElementById("monthDisplay");
    const albumContainer = document.getElementById("albumContainer");

    const monthData = albumData[currentMonthIndex];

    monthDisplay.textContent = "Most Listened-To Albums: " + monthData.month;
    albumContainer.innerHTML = ""; 

    let albumIndex = 0;
    monthData.albums.forEach(album => {
        albumIndex++;
        const albumElement = document.createElement("div");
        albumElement.classList.add("album");

        albumElement.innerHTML = `
            <img src="/assets/gifs/DiscLoading.gif" data-src="${album.cover}" class="lazyload" alt="${album.album}">
            <p id="albumNumber">#${albumIndex}</p>
            <p id="albumLabel">${album.artist}<br><i>${album.album}</i></p>
        `;
        
        albumContainer.appendChild(albumElement);
    });

    updateListenedButtons();

    //This shouldn't be an issue if the head was injected correctly...
    if (typeof lazyLoadImages === "function")
    {
        lazyLoadImages();
    }
}

function updateListenedButtons()
{
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');

    leftButton.classList.toggle('disabled', currentMonthIndex === 0);
    rightButton.classList.toggle('disabled', currentMonthIndex === (albumData.length - 1));
}

function shiftMonth(direction) {
    if (direction === "left" && currentMonthIndex > 0) {
        currentMonthIndex--;
    } else if (direction === "right" && currentMonthIndex < albumData.length - 1) {
        currentMonthIndex++;
    }
    updateAlbumChartDisplay();
}

document.getElementById("leftButton").addEventListener("click", () => shiftMonth("left"));
document.getElementById("rightButton").addEventListener("click", () => shiftMonth("right"));

// Initialize the display
updateAlbumChartDisplay();
