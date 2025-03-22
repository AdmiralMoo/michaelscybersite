document.addEventListener("DOMContentLoaded", () => {
    updateDisplay(); // Initialize display when page loads
});

// Flat array of articles (books)
const articlesDatabase = [
    {
        name: "The Essays of Samuel Johnson",
        description: "A collection of my favourite essays by Samuel Johnson from his books \"The Rambler\", \"The Adventurer\
         and \"The Idler\"",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Samuel_Johnson_Statue.jpg/1920px-Samuel_Johnson_Statue.jpg",
        link: "/pages/books/sjohnson"
    },
    {
        name: "Shakespeare's Sonnets",
        description: "A collection of my favourite sonnets by William Shakespeare",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/William_Shakespeare_by_John_Taylor%2C_edited.jpg/800px-William_Shakespeare_by_John_Taylor%2C_edited.jpg",
        link: "/pages/books/sonnets"
    }
];

let currentPage = 0;
const articlesPerPage = 5;

function updateDisplay() {
    const articleContainer = document.getElementById("articleContainer");
    articleContainer.innerHTML = ''; // Clear previous content

    const articleData = articlesDatabase[currentPage];
    let articleLimit = currentPage + articlesPerPage;
    if (currentPage == 0)
    {
        articleLimit = articlesPerPage;
    }

    for (var i = 0; i < articleLimit; i++)
    {  

            articleContainer.innerHTML +=  `
            <div class="navbutton outsideborder">
                <a href="${articlesDatabase[i].link}" class="noformat"><div class="articleCard">
                    <div class="articleTitle">
                        <h3 class="articleTitle">${articlesDatabase[i].name}</h3>
                    </div>
                    <div class="articleCardContent">
                        <div class="articleImage">
                            <img src="${articlesDatabase[i].image}" alt="${articlesDatabase[i].name}">
                        </div>
                        <div class="articleDescription box-container">
                            <p>${articlesDatabase[i].description}</p>
                        </div>
                    </div>
                </div></a>
            </div>
        `;
    }

    updateNavigationButtons();
}

function updateNavigationButtons() {
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');

    leftButton.classList.toggle('disabled', currentPage === 0);
    rightButton.classList.toggle('disabled', currentPage === (articlesDatabase.length - 1));
}

function shiftPage(direction) {
    if (direction === "left" && currentPage > 0) {
        currentPage--;
    } else if (direction === "right" && currentPage < articlesDatabase.length - 1) {
        currentPage++;
    }
    updateDisplay();
}

document.getElementById("leftButton").addEventListener("click", () => shiftPage("left"));
document.getElementById("rightButton").addEventListener("click", () => shiftPage("right"));
