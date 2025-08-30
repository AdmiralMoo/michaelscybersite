var showStories = 5;
var storiesLoaded = 0;
var storyAmount = 0;
var newsStories = null;

window.onload = function() {
    UpdateNewsTitle();
    InitNewsStories();
    UpdateSiteChangelog();
    UpdateBottomStory();
    UpdateSiteClassifieds();
    UpdateByLines();
}

window.onload

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

  fetch('./assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
      const bylines = data.bylines;        // <-- capital L
      const authors = data.newsauthors;

      newsStories.forEach(story => {
        if (storiesLoaded < showStories) {
          const prefix = bylines[Math.floor(Math.random() * bylines.length)];
          const author = authors[Math.floor(Math.random() * authors.length)];
          const byline = prefix + author;

          htmlContent += `
            <div class="newsbox body-box grooveborder" style="flex-direction: column; gap: 0; margin: 0;">
              <div class="side-by-side newstitle">
                <p><i>${story.headline}</i></p>
                <p>${story.date}</p>
              </div>
              <div style="text-align:right; margin-bottom: 5px;">
                <i><b>${byline}</b></i>
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
      document.getElementById("moreStoriesButton")
        .addEventListener("click", () => showMoreStories());
    });
}


function UpdateByLines()
{
    fetch('./assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        const bylines = data.bylines;
        const authors = data.newsauthors;
        
        document.querySelectorAll('.byline').forEach(thing => {
            const prefix = bylines[Math.floor(Math.random() * bylines.length)];
            const author = authors[Math.floor(Math.random() * authors.length)];
            thing.innerHTML = `<b><i>${prefix + author}</i></b>`; 
        })
    })
}

function GetByLine()
{
    fetch('./assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        const bylines = data.bylines;
        const authors = data.newsauthors;
        
        const prefix = bylines[Math.floor(Math.random() * bylines.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];
        return `<b><i>${prefix + author}</i></b>`; 
    })
}

function UpdateSiteChangelog()
{
    fetch('./assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        //Update the headline
        const changeheadlines = data.sitechange;
        const randomHeadline = changeheadlines[Math.floor(Math.random() * changeheadlines.length)];
        document.getElementById('siteChangeHeader').innerText = randomHeadline;

        //Update the changelog with the most recent entry
        fetch('/pages/main/changelog.html')
        .then(stuff => stuff.text())
        .then(html => {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const h2 = doc.querySelector('h2');
            let node = h2.nextElementSibling;
            let items = "";

            while (node && node.tagName !== "H2") {
                if (node.tagName === "LI") {
                    items += `<li>${node.innerHTML}</li>`;
                }
                node = node.nextElementSibling;
            }

            const dateOnly = h2.textContent.split("–")[0].trim();

            const prefix = data.bylines[Math.floor(Math.random() * data.bylines.length)];
            const author = data.newsauthors[Math.floor(Math.random() * data.newsauthors.length)];
            const byline = `<b><i>${prefix}${author}</i></b>`;

            document.getElementById('changelog-goes-here').innerHTML =
            `
            <div style="display:flex; flex-direction:row; align-content: stretch">
                <div style="text-align: left; width:30%">
                    <span style="padding-left:16px"><b>${dateOnly}</b></span>
                </div>
                <div style="text-align: right; width:70%">
                    <span class="byline" style="padding-right:16px">${byline}</span>
                </div>
            </div>
            <ul>${items}</ul>`;
        });
    })
    .catch(error => console.error('BREAKING: SITE CHANGELOG UPDATE FAILS AFTER', error));
}

function UpdateSiteClassifieds()
{
    fetch('./assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        // Step 3: Select a random message
        const classifieds = data.classifieds;
        const randomMessageOne = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageTwo = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageThree = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageFour = classifieds[Math.floor(Math.random() * classifieds.length)];

        // Set the content of the newspaper footer
        document.getElementById('newsClassifieds').innerHTML = `
        <h2 id="siteClassifiedsHeader" style="text-align: center; padding-top: 8px">CLASSIFIEDS</h2>
        ${formatClassified(randomMessageOne)}<br>
        ${formatClassified(randomMessageTwo)}<br>
        ${formatClassified(randomMessageThree)}<br>
        ${formatClassified(randomMessageFour)}<br>
        `;
    })
    .catch(error => console.error('Error fetching footer messages:', error));
}

function formatClassified(msg) {
  const parts = msg.split(":");
  if (parts.length > 1) {
    return `<b>${parts[0]}:</b>${parts.slice(1).join(":")}`;
  }
  return msg;
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

    if (showStories >= (storyAmount))
    {
        showStories = storyAmount;
        UpdateNewsStories();
        var button = document.getElementById('moreStoriesButton');
        button.classList.add('disabled');
    }
    else
    {
        UpdateNewsStories();
    }

}