var showStories = 5;
var storiesLoaded = 0;
var storyAmount = 0;
var newsStories = null;

window.onload = function() {
    UpdateNewsTitle();
    InitNewsStories();
    UpdateBottomStory();
}

function InitNewsStories() 
{
    fetch('./assets/json/newspaperStories.json')
        .then(response => response.json())
        .then(data => {
            newsStories = data;               
            storyAmount = newsStories.length; 
            UpdateNewsStories();              
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function UpdateNewsStories() {
    if (!newsStories) {
        console.error('No news stories loaded');
        return;
    }

    const newspaperBodyArea = document.getElementById("newsContainer");
    newspaperBodyArea.innerHTML = "";
    let htmlContent = '';

    newsStories.forEach(story => {
        if (storiesLoaded < showStories) {
            htmlContent += `
                <div class="newsbox body-box grooveborder" style="flex-direction: column; gap: 0; margin: 0;">
                    <div class="side-by-side newstitle">
                        <p><i>${story.headline}</i></p>
                        <p>${story.date}</p>
                    </div>
                    <div class="body-box" style="padding: 0;">
                        <div class="img-container">
                            <img style="${story.imagestyle}" src="${story.image}" alt="News Image">
                        </div>
                        <div class="box-container">
                            <p>${story.body}</p>
                        </div>
                    </div>
                </div>
            `;
            storiesLoaded++;
        }
    });

    htmlContent += `
        <div id="moreStoriesButton" class="navbutton outsideborder" style="min-width:100%">
            <p>Load More Stories</p>
        </div>
    `;

    newspaperBodyArea.innerHTML = htmlContent;
    document.getElementById("moreStoriesButton").addEventListener("click", () => showMoreStories());
}


function UpdateBottomStory()
{
    fetch('./assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        // Step 3: Select a random message
        const messages = data.messages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        let randomNumber = 1 + Math.floor(Math.random() * 30);  // Generates a random integer between 0 and 100
        let result = randomMessage + "—Page " + randomNumber;

        // Set the content of the newspaper footer
        document.getElementById('newspaper-footer').textContent = result;
    })
    .catch(error => console.error('Error fetching footer messages:', error));
}

function UpdateNewsTitle() 
{
    //Set the newspaper name:
    const newspaperBanner = document.getElementById("newspaper-banner");
    let newPath = "assets\\site\\sitebanner_gazette_" + Math.floor(Math.random() * 10 + 1) + ".png";
    newspaperBanner.setAttribute("src", newPath);

    const date = new Date();

    // Define greeting based on the time of day
    let greeting = '';
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
        greeting = 'GOOD MORNING';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'GOOD AFTERNOON';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'GOOD EVENING';
    } else {
        greeting = 'GO TO BED';
    }

    const options = { month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options); 
    formattedDate = formattedDate.toUpperCase();

    if (formattedDate.slice(-1) == 1)
    {
        formattedDate += "<sup>st</sup>";
    } else if (formattedDate.slice(-1) == 2)
    {
        formattedDate += "<sup>nd</sup>";
    } else if (formattedDate.slice(-1) == 3)
    {
        formattedDate += "<sup>rd</sup>";
    } else
    {
        formattedDate += "<sup>th</sup>";
    }

    document.getElementById('newspaper-header').innerHTML = `${greeting} – TODAY IS ${formattedDate}`;
};

function showMoreStories()
{
    showStories += 5;
    storiesLoaded = 0;

    if (showStories >= storyAmount)
    {
        showStories = storyAmount;
        var button = document.getElementById('moreStoriesButton');
        button.classList.add('disabled');
    }

    UpdateNewsStories();
    var button = document.getElementById('moreStoriesButton');
    button.classList.add('disabled');
}