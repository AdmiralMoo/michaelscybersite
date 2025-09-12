let articleEnumDatabase = [];

function initEnumeratorDatabase(category) {    
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
        
        articleEnumDatabase = filteredArticles;
        enumeratePages();
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function enumeratePages()
{
    const articleListContainer = document.getElementById("articleListContainer");
    articleListContainer.innerHTML = "";

    for (let i = 0; i < articleEnumDatabase.length; i++)
    {
        articleListContainer.innerHTML += `
            <li><a href="${articleEnumDatabase[i].link}">${articleEnumDatabase[i].name}</a></li>
        `;
    }
}