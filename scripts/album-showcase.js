document.addEventListener("DOMContentLoaded", () => {
    updateAlbumShowcase(); // Initialize display when page loads
});

let currentAlbumIndex = -1;
let albumsDatabase = [];

function updateAlbumShowcase() {
    fetch('./assets/json/albumShowcaseData.json')
    .then(response => response.json())
    .then(data => {
        albumsDatabase = data; 
        console.log(albumsDatabase);
        
        if (currentAlbumIndex === -1)
        {
            shuffleAlbum();
        }

        //currentAlbumIndex = albumsDatabase.length - 1;

        const albumShowcaseParent = document.getElementById("albumShowcaseBody");
        const showcaseAlbum = albumsDatabase[currentAlbumIndex];

        albumShowcaseParent.innerHTML = "";

        let tracksList = "";
        let trackIndex = 0;
        showcaseAlbum.tracks.forEach(track => {
            trackIndex += 1;
            tracksList += `<li>${track}</li>`;
        });

        albumShowcaseParent.innerHTML += `
            <div id="albumShowcaseTopTitle" class="side-by-side" style="">
                <p id="showcaseAlbumArtistName">${showcaseAlbum.artist}/${showcaseAlbum.album}</p>
                <p id="showcaseAlbumYear">${showcaseAlbum.year}</p>
            </div>
            <div id="albumShowcaseBottomTitle" class="side-by-side">
                <p id="showcaseAlbumTrackCount">${showcaseAlbum.tracks.length} Tracks</p>
                <p id="showcaseAlbumDuration">${showcaseAlbum.genre}</p>
                <p id="showcaseAlbumDuration">${showcaseAlbum.rating / 10}/10</p>
                <p id="showcaseAlbumDuration">${showcaseAlbum.duration}</p>
            </div>
            
            <div class="albumShowcaseContent outsideborder" style="display: flex; flex-direction: column;">
                <div class="side-by-side albumShowcaseTopDisplay">
                    <img id="showcaseAlbumCover" src="${showcaseAlbum.cover}">
                    <div class="box-container WrappedListBox">
                        <h4>Tracks</h4>
                        <ol id="showcaseAlbumTracklist">`
                        + tracksList + `
                        </ol>
                    </div>
                </div>
                <div class="box-container" >
                    <p id="showcaseAlbumDescription">${showcaseAlbum.description}</p>
                </div>
            </div>
        `;
    })
    .catch(error => console.error('Error loading JSON:', error));

    updateShowcaseButtons();
}

function shuffleAlbum() {
    let newIndex = -1;
    while (true) {
        newIndex = Math.floor(Math.random() * albumsDatabase.length);
        if (newIndex !== currentAlbumIndex) {
            currentAlbumIndex = newIndex;
            break;
        }
    }
    updateAlbumShowcase();
}

function updateShowcaseButtons()
{
    if ((currentAlbumIndex + 1) === (albumsDatabase.length))
    {
        // Select the link
        var link = document.getElementById('shiftAlbumRight');
        link.classList.add('disabled');
    }
    else
    {
        var link = document.getElementById('shiftAlbumRight');
        link.classList.remove('disabled');
    }

    if ((currentAlbumIndex) === (0))
    {
        // Select the link
        var link = document.getElementById('shiftAlbumLeft');
        link.classList.add('disabled');
    }
    else
    {
        var link = document.getElementById('shiftAlbumLeft');
        link.classList.remove('disabled');
    }
}

function skipAlbum(direction) {
    if (direction === "left" && currentAlbumIndex > 0) {
        currentAlbumIndex--;
    } else if (direction === "right" && currentAlbumIndex < albumsDatabase.length - 1) {
        currentAlbumIndex++;
    }
    updateAlbumShowcase();
}

document.getElementById("shiftAlbumLeft").addEventListener("click", () => skipAlbum("left"));
document.getElementById("shiftAlbumRight").addEventListener("click", () => skipAlbum("right"));
document.getElementById("shuffleAlbum").addEventListener("click", () => shuffleAlbum());

// Initialize the display
updateAlbumShowcase();
