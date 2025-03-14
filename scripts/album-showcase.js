document.addEventListener("DOMContentLoaded", () => {
    updateDisplay(); // Initialize display when page loads
});

let currentAlbumIndex = 0;
let albumsDatabase = [];

function updateDisplay() {
    fetch('./assets/json/albumShowcaseData.json')
    .then(response => response.json())
    .then(data => {
        albumsDatabase = data; 
        console.log(albumsDatabase);

        const albumShowcaseParent = document.getElementById("albumShowcaseBody");
        const album = albumsDatabase[currentAlbumIndex];

        albumShowcaseParent.innerHTML = "";

        let tracksList = "";
        let trackIndex = 0;
        album.tracks.forEach(track => {
            trackIndex += 1;
            tracksList += `<li>${track}</li>`;
        });

        albumShowcaseParent.innerHTML += `
            <div class="newstitle side-by-side" style="padding-top:20px;">
                <p id="showcaseAlbumArtistName">${album.artist}/${album.album}</p>
                <p id="showcaseAlbumYear">${album.year}</p>
            </div>
            <div class="side-by-side">
                <p id="showcaseAlbumTrackCount">${album.tracks.length} Tracks</p>
                <p id="showcaseAlbumDuration">Duration: ${album.duration}</p>
            </div>
            
            <div class="albumShowcaseContent outsideborder" style="display: flex; flex-direction: column;">
                <div class="side-by-side albumShowcaseTopDisplay">
                    <img id="showcaseAlbumCover" src="${album.cover}">
                    <div class="box-container">
                        <h4>Tracks</h4>
                        <ol id="showcaseAlbumTracklist">`
                        + tracksList + `
                        </ol>
                    </div>
                </div>
                <div class="box-container" >
                    <p id="showcaseAlbumDescription">${album.description}</p>
                </div>
            </div>
        `;
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function shiftAlbum() {
    let newIndex = -1;
    while (true) {
        newIndex = Math.floor(Math.random() * albumsDatabase.length);
        if (newIndex !== currentAlbumIndex) {
            currentAlbumIndex = newIndex;
            break;
        }
    }
    updateDisplay();
}


document.getElementById("shuffleAlbum").addEventListener("click", () => shiftAlbum());

// Initialize the display
updateDisplay();
