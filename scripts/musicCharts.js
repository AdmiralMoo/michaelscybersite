function fileExists(url) 
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

//Function to build the chart table and load the top albums
function buildChartTable(statData)
{
    const TestStyle = document.getElementById("testStyle");
    TestStyle.innerHTML = ``;

    let newInnerHTML = ``;
    let currentIndex = 0;
    let artistCounts = {};

    for (var key in statData.albums) {
        //Update the index. This album is #currentIndex on the charts. 
        currentIndex ++;

        //Get the albumname, artist and how much we've listened to it. 
        const album = statData.albums[key];
        const artist = album.albumartist;
        const name = album.albumname;
        const listens = album.listencount;

        //If the artist does not exist in the artistCounts list, add it and set it to zero. 
        if (!artistCounts[artist]) { artistCounts[artist] = 0; }

        //Add the listens from this album to the total.
        artistCounts[artist] += listens;

        let fullName = String(statData.albums[key]["albumartist"] + ' - ' + statData.albums[key]["albumname"]).toLowerCase();
        let finalName = "";

        if (fileExists("./assets/albumart/" + fullName + ".webp"))
        {
            finalName = String(fullName + ".webp");
        }
        else
        {
            finalName = String(fullName + ".jpg");
        }

        if (currentIndex == 6)
        {
            newInnerHTML += `
                <div class="spacer">
                </div>
            `;
        }
        else if (currentIndex == 26)
        {
            newInnerHTML += `
                <div class="spacer">
                </div>
            `;
        }
        else if (currentIndex == 51)
        {
            newInnerHTML += `
                <div class="spacer">
                </div>
            `;
        }

        newInnerHTML += `
            <div class="playlist-songitem grooveborder">
                <div class="outsideborder number-card nc${currentIndex}">
                    <h3>#${currentIndex}</h2>
                </div>

                <img src="/assets/albumart/${finalName}">
                    
                <div class="songitem-artistalbumbox">
                    <span>${statData.albums[key]["albumname"]}</span>
                    <span class="songitem-album">${statData.albums[key]["albumartist"]}</span>
                </div>
                <div class="songitem-duration">
                    <span>${statData.albums[key]["listencount"]}</span>
                </div>
            </div>
        `;
    }

    return {
        "artistCounts" : artistCounts,
        "newInnerHTML" : newInnerHTML,
        "label" : statData["label"],
        "description" : statData["description"],
        "TestStyle" : TestStyle
    };
}

function getMostListenedAlbum()
{
    let artistCounts = {};

    for (let key in statData.albums) {
        const album = statData.albums[key];
        const artist = album.albumartist;
        const listens = album.listencount;

        if (!artistCounts[artist]) artistCounts[artist] = 0;
            artistCounts[artist] += listens;
    }

    let sortedArtists = Object.entries(artistCounts).sort((a, b) => b[1] - a[1]);

    let topN = 10;
    let topArtists = sortedArtists.slice(0, topN);

    return topArtists;
}

function LoadJSON(file)
{
    fetch(`./assets/statfiles/${file}`)
    .then(response => response.json())
    .then(data => {
        statData = data; 
        console.log(statData.albums);
        chartTableData = buildChartTable(statData);
        
        let artistCounts = chartTableData["artistCounts"];
        let TestStyle = chartTableData["TestStyle"];
        let newInnerHTML = chartTableData["newInnerHTML"];
        let statLabel = chartTableData["label"];
        let statDescription = chartTableData["description"];

        let mostListenedData = getMostListenedAlbum(statData);

        let mostListenedHTML = `<b>Top Artists This Month:</b><br>`;
        mostListenedHTML += ``;
        for (let i = 0; i < 10; i++) {
            mostListenedHTML += `
            <span><b>#${i + 1} : </b>${mostListenedData[i][0]} <i>(${mostListenedData[i][1]} Listens</i>)</span><br>
            `;
        }
        
        TestStyle.innerHTML += newInnerHTML;

        //Get the html-thing that these stats go in
        const chartDataBox = document.getElementById("chartDataBox");
        chartDataBox.classList.add("body-box");
        chartDataBox.classList.add("stacked");
        chartDataBox.classList.add("outsideborder");

        chartDataBox.innerHTML = `
            <div class="box-container insideborder" style="width: 100%; padding:8px;">
                <h2>${statLabel}</h2>
                <p>${statDescription}</p>
                ${mostListenedHTML}
            </div>
        `;

    })
    .catch(error => console.error('Error loading JSON:', error));
}