function fileExists(url) 
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function LoadJSON(file)
{
    fetch(`./assets/statfiles/${file}`)
    .then(response => response.json())
    .then(data => {
        statData = data; 
        console.log(statData.albums);

        const TestStyle = document.getElementById("testStyle");
        TestStyle.innerHTML = ``;

        let newInnerHTML = ``;

        let currentIndex = 0;

        for (var key in statData.albums) {
            currentIndex ++;

            console.log(statData.albums[key]["albumname"]);

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

            if (currentIndex == 5)
            {
                newInnerHTML += `
                    <div class="spacer">
                    </div>
                `;
            }
            else if (currentIndex == 25)
            {
                newInnerHTML += `
                    <div class="spacer">
                    </div>
                `;
            }
            else if (currentIndex == 50)
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

        TestStyle.innerHTML += newInnerHTML;
    })
    .catch(error => console.error('Error loading JSON:', error));
}