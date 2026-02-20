export function initNewspaper(root = document) 
{
    UpdateNewsTitle(root);
    UpdateSiteClassifieds(root);

    InsertNewsStory(root, "main", 0, true, true, 200, "read the full story...");
    InsertNewsStory(root, "story-one", 1, true, true, 45, "read the full story...");
    InsertNewsStory(root, "story-two", 2, true, true, 45, "read the full story...");
    InsertNewsStory(root, "story-three-a", 3, false, false, 0, "read...");
    InsertNewsStory(root, "story-three-b", 4, false, false, 0, "read...");
    InsertNewsStory(root, "story-three-c", 5, false, false, 0, "read...");
    InsertNewsStory(root, "story-three-d", 6, false, false, 0, "read...");
    InsertFakeStory(root, "sidebar", 6);

    UpdateSiteChangelog(root);
    initBlogposts(root);
}

async function initBlogposts(root) 
{
    const storya = await retrieveArticle("Never Forget What They Took From Us");
    const storyb = await retrieveArticle("The Soundtrack of Summer 2025");
    InsertNewsStory(root, "story-four-a", 666, true, false, 45, "read blogpost...", storya);
    InsertNewsStory(root, "story-four-b", 666, true, false, 45, "read blogpost...", storyb);
}

/*News Titles*/
function UpdateNewsTitle(root) 
{
    //Set the newspaper name:
    const newspaperBanner = root.querySelector("#newspaper-name");
    newspaperBanner.src = "/assets/site/sitebanner_gazette_" + Math.floor(Math.random() * 10 + 1) + ".png";
    
    //Define greeting based on the time of day
    const date = new Date();
    let greeting = '';
    let datemsg = '';
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

    root.querySelector('#newspaper-greeting').innerHTML = `${greeting}`;

    //Get the date and format it
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

    root.querySelector('#newspaper-date').innerHTML = `${formattedDate}, ${date.getFullYear()}`;

    //Set a price
    let price = Math.floor(Math.random() * 683 + 25) / 100;
    root.querySelector('#newspaper-price').innerHTML = `$${price}`;
};

/*Classifieds*/
function UpdateSiteClassifieds(root)
{
    fetch('/assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        const classifieds = data.classifieds;
        const randomMessageOne = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageTwo = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageThree = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageFour = classifieds[Math.floor(Math.random() * classifieds.length)];
        const randomMessageFive = classifieds[Math.floor(Math.random() * classifieds.length)];

        root.querySelector('#cs1').innerHTML = `${formatClassified(randomMessageOne)}`;
        root.querySelector('#cs2').innerHTML = `${formatClassified(randomMessageTwo)}`;
        root.querySelector('#cs3').innerHTML = `${formatClassified(randomMessageThree)}`;
        root.querySelector('#cs4').innerHTML = `${formatClassified(randomMessageFour)}`;
        root.querySelector('#cs5').innerHTML = `${formatClassified(randomMessageFive)}`;
    })
    .catch(error => console.error('Error fetching footer messages:', error));
}

function formatClassified(msg) 
{
    const parts = msg.split(":");
    if (parts.length > 1) {
        return `<b>${parts[0]}:</b>${parts.slice(1).join(":")}`;
    }
    return msg;
}

/* Fake Stories*/
function InsertFakeStory(root, slotID, quantity)
{
    fetch('/assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        const messages = data.messages;
        let content = '';

        for (let i = 0; i < quantity; i++)
        {   
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            let randomNumber = 1 + Math.floor(Math.random() * 30);
            let result = `<p><i><b>${randomMessage}</b></i>—Page ${randomNumber}</p>`;

            content += result;
        }
        root.querySelector(`.${CSS.escape(slotID)}`).innerHTML += content;
    })
    .catch(error => console.error('Error fetching footer messages:', error));
}

/*News Stories*/
function InsertNewsStory(root, slotID, storyIndex, showImage, showByline, truncateWords, truncatePrompt, storyData)
{
    const newspaperBodyArea = root.querySelector(`.${CSS.escape(slotID)}`);
    newspaperBodyArea.innerHTML = "";
    let htmlContent = '';
    let byline = ''
    let indexString = '';
    let truncate = true;
    let blogpost = false;
    let story = null;
    let bodyText = null;
    if (storyIndex == 0) { indexString = "one"; }
    if (storyIndex == 1) { indexString = "two"; }
    if (storyIndex == 2) { indexString = "three"; }
    if (storyIndex == 3) { indexString = "four"; }
    if (storyIndex == 4) { indexString = "five"; }
    if (storyIndex == 5) { indexString = "six"; }
    if (storyIndex == 6) { indexString = "seven"; }

    /* Get the byline */
    fetch('/assets/json/newspapermessages.json')
        .then(response => response.json())
        .then(data => 
        {
            const bylines = data.bylines;
            const authors = data.newsauthors;

            const prefix = bylines[Math.floor(Math.random() * bylines.length)];
            const author = authors[Math.floor(Math.random() * authors.length)];
            byline = prefix + author;
        }
    );

    /* Get the story */
    fetch('/assets/json/newspaperStories.json')
        .then(response => response.json())
        .then(data => 
        {
            if (storyIndex == 666 && storyData != null)
            {
                story = storyData;
                bodyText = story.body;
                blogpost = true;
                if (story.date == undefined)
                {
                    story.date = "";
                }
            }
            else
            {
                story = data[storyIndex];
                bodyText = story.body;
            }
            let modalID = `modal-${indexString}`;

            /* "Cut the crap" as The Clash say 
                * -Check to see if we even need to truncate in the first place
            */
            if (truncate)
            {
                if (story.body.split(" ").length < truncateWords)
                {
                    truncate = false;
                }
                else
                {
                    bodyText = bodyText.split(" ").splice(0,truncateWords).join(" ");
                    bodyText += "...";
                }
            }

            /* Build content */
            htmlContent += `
                <div class="story-header">
                    <span class="story-headline">${story.headline}</span>
                    <div class="space-between">
            `;

            if (showByline)
            {
                htmlContent += `
                        <span style="font-style: italic;">${byline}</span>
                `;
            }

            let linkInserted = false;
            if (truncate && !showByline && storyData == null)
            {
                htmlContent += `
                    <span>${story.date}</span>
                    <br><a class="hyperlink" style="text-align: end; width: 35%; float: right;" href="\#${modalID}">${truncatePrompt}</a>
                `;

                linkInserted = true;
            }
            else
            {
                htmlContent += `
                    <span>${story.date}</span>
                `;
            }

            htmlContent += `
                    </div>
                </div>
                <div class="story-body">
            `;

            /* If we want an image thumbnail */
            if (showImage)
            {
                htmlContent += `
                    <div class="story-image">
                        <img src="${story.image}">
                    </div>
                    <p>${bodyText}
                `;
            }

            //
            if ((truncate || !linkInserted) && !linkInserted)
            {
                if (truncate || blogpost)
                {
                    let oldModalID = modalID;
                    if (blogpost)
                    {
                        modalID = storyData.link;
                    }
                    else 
                    {
                        modalID = "\#" + modalID;
                    }
                    htmlContent += `
                        <br><a class="hyperlink" style="text-align: end; width: 35%; float: right;" href="${modalID}">${truncatePrompt}</a>
                    `;

                    modalID = oldModalID;
                }
            }

            htmlContent += `
                    </p>
                </div>
            `;

            if (truncate)
            {
                htmlContent += `
                    <div id="${modalID}">
                        <div class="modal__window">
                            <a class="modal__close" href="#">X</a>
                            <h2>${story.headline}</h2>
                            <div class="space-between">
                                <span style="font-style: italic;">${byline}</span>
                                <span>${story.date}</span>
                            </div>
                            <hr style="width: 97%;">
                            <div style="width:100%; height: auto;">
                                <img class="bw" style="object-fit: fill; width: 100%;" src="${story.image}">
                            </div>
                            <p>${story.body}</p> 
                        </div>
                    </div>
                `;
            }

            newspaperBodyArea.innerHTML = htmlContent;
        }
    );
}

function retrieveArticle(articleName)
{ 
    return fetch('/assets/json/articlesDatabase.json')
    .then(response => response.json())
    .then(data => 
        {
            let filteredArticle;
            filteredArticle = data.find(article => articleName.includes(article.name));

            const { category, name, description, image, link } = filteredArticle;

            console.log(name);
            console.log(description);

            return {
                headline: name,
                body: description,
                image: image,
                link: link
            };
        }
    )
    .catch(error => console.error('The JSON loader shit itself:', error));
}

function UpdateSiteChangelog(root)
{
    fetch('/assets/json/newspapermessages.json')
    .then(response => response.json())
    .then(data => {
        //Update the headline
        const changeheadlines = data.sitechange;
        const randomHeadline = changeheadlines[Math.floor(Math.random() * changeheadlines.length)];
        root.querySelector('#siteChangeHeader').innerText = randomHeadline;

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
                    let testData = items + `<li>${node.innerHTML}</li>`;
                    if (testData.split(" ").length > 17)
                    {
                        items += `
                        <br><a class="hyperlink" style="text-align: end; width: 100%; float: right;" href="/pages/main/changelog.html">...read full changelog</a>
                        `;
                        break;
                    }
                    else 
                    {
                        items = testData;
                    }
                }
                node = node.nextElementSibling;
            }

            const dateOnly = h2.textContent.split("–")[0].trim();

            const prefix = data.bylines[Math.floor(Math.random() * data.bylines.length)];
            const author = data.newsauthors[Math.floor(Math.random() * data.newsauthors.length)];
            const byline = `<b><i>${prefix}${author}</i></b>`;

            root.querySelector('#siteChangeContainer').innerHTML =
            `
            <div style="display:flex; flex-direction:row; align-content: stretch">
                <div style="text-align: left; width:30%">
                    <span><b>${dateOnly}</b></span>
                </div>
            </div>
            <ul style="padding-left: 16px; margin-top: 0px;">${items}</ul>`;
        });
    })
    .catch(error => console.error('BREAKING: SITE CHANGELOG UPDATE FAILS AFTER', error));
}