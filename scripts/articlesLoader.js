document.addEventListener("DOMContentLoaded", () => {
    if (typeof currentPageCategory === 'undefined')
    {
        currentPageCategory = "all";
    }

    const pageCategory = currentPageCategory;
    initArticlesDatabase(pageCategory);
});

// Flat array of articles (books)
let articlesDatabase = [];

function initArticlesDatabase(category) {    
    fetch('./assets/json/articlesDatabase.json')
    .then(response => response.json())
    .then(data => {
        let filteredArticles;

        if (category == "all") {
            filteredArticles = data;
        }
        else if (category == "home") {
            const featuredList = featuredTitles.split(";").map(title => title.trim());
            filteredArticles = data.filter(article => featuredList.includes(article.name));
        }
        else {
            filteredArticles = data.filter(article => article.category === category);
        }
        
        articlesDatabase = filteredArticles;
        updateDisplay(category);
    })
    .catch(error => console.error('Error loading JSON:', error));
}

/*
function enumeratePages()
{
    const articleListContainer = document.getElementById("articleListContainer");
    articleListContainer.innerHTML = '';

    for (let i = 0; i < articlesDatabase.length; i++)
    {
        articleContainer.innerHTML += `
            <li><a href="${articlesDatabase[i].link}">${articlesDatabase[i].name}</a></li>
        `;
    }
}
*/

let currentPage = 0;
const articlesPerPage = 6;

function updateDisplay() {
    const articleContainer = document.getElementById("articleContainer");
    articleContainer.innerHTML = '';

    let articleLimit = Math.min((currentPage + 1) * articlesPerPage, articlesDatabase.length);

    for (let i = currentPage * articlesPerPage; i < articleLimit; i++) {

        articleContainer.innerHTML += `
        <div class="navbutton outsideborder">
            <a href="${articlesDatabase[i].link}" class="noformat">
                <div class="articleCard">
                    <div class="articleTitle">
                        <h3 class="articleTitle">${articlesDatabase[i].name}</h3>
                    </div>
                    <div class="articleCardContent">
                        <div class="articleImage">
                            <img class="lazyload" src="/assets/gifs/LoadingClouds.gif" data-src="${articlesDatabase[i].image}">
                        </div>
                        <div class="articleDescription box-container">
                            <p>${articlesDatabase[i].description}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;
    }

    //This shouldn't be an issue if the head was injected correctly...
    if (typeof lazyLoadImages === "function")
    {
        lazyLoadImages();
    }
}
