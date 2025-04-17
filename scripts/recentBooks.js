document.addEventListener("DOMContentLoaded", () => {
    resizeBookDisplay(); // Initialize display when page loads
});

let currentBookIndex = 0;
let booksDatabase = [];
let booksToDisplay = 5;

function updateBookShowcase() {
    fetch('./assets/json/recentBooks.json')
    .then(response => response.json())
    .then(data => {
        booksDatabase = data; 
        booksDatabase = booksDatabase.reverse();
        console.log(booksDatabase);

        //currentBookIndex = booksDatabase.length - 1;

        const bookShowcaseParent = document.getElementById("bookContainer");
        const showcaseBook = booksDatabase[currentBookIndex];

        bookShowcaseParent.innerHTML = "";

        for (var i = 0; i < booksToDisplay; i++)
        {
            if ((currentBookIndex + 1) < booksDatabase.length)
            {
                const showcaseBook = booksDatabase[currentBookIndex + i];
                bookShowcaseParent.innerHTML += `
                    <div class='readBook outsideborder'>
                        <p class="bookMonth">${showcaseBook.monthread} ${showcaseBook.yearread}</p>
                        <img src="/assets/gifs/DiscLoading.gif" data-src="${showcaseBook.cover}" class="lazyload">
                        <p class="bookName">${showcaseBook.author}<br><i><b>${showcaseBook.name}</b></i></p>
                    </div>
                `;
            }
        }

        if (typeof lazyLoadImages === "function")
        {
            lazyLoadImages();
        }
    })
    .catch(error => console.error('Error loading JSON:', error));
}

function updateShowcaseButtons()
{
    if ((currentBookIndex + 1) === (booksDatabase.length))
    {
        // Select the link
        var link = document.getElementById('shiftBookRight');
        link.classList.add('disabled');
    }
    else
    {
        var link = document.getElementById('shiftBookRight');
        link.classList.remove('disabled');
    }

    if ((currentBookIndex) === (0))
    {
        // Select the link
        var link = document.getElementById('shiftBookLeft');
        link.classList.add('disabled');
    }
    else
    {
        var link = document.getElementById('shiftBookLeft');
        link.classList.remove('disabled');
    }
}

function resizeBookDisplay()
{
    const page = document.querySelector("body");
    const pageWidth = page.clientWidth;
    if (pageWidth < 500)
    {
        booksToDisplay = 2;
    }
    else if (pageWidth > 500 && pageWidth < 900)
    {
        booksToDisplay = 3;
    }
    else if (pageWidth > 900)
    {
        booksToDisplay = 5;
    }

    updateBookShowcase();
}

function skipBook(direction) {
    if (direction === "left" && currentBookIndex > 0) {
        currentBookIndex--;
    } else if (direction === "right" && currentBookIndex < ((booksDatabase.length )-booksToDisplay)) {
        currentBookIndex++;
    }
    updateBookShowcase();
}

function fillBooksRead()
{
    const booksReadBox = document.getElementById("booksreadbox");
    booksReadBox.innerHTML = "";

    fetch('./assets/json/recentBooks.json')
    .then(response => response.json())
    .then(data => {
        tempData = data.reverse();

        const month = new Map();

        for (var i = 0; i < tempData.length; i++)
        {
            var newBook = `<li><i>${tempData[i].name}</i> by ${tempData[i].author}</li>`
            if (month.get(`${tempData[i].monthread} ${tempData[i].yearread}`) == null)
            {
                newMonth = [];
                newMonth.push(newBook);
                month.set(`${tempData[i].monthread} ${tempData[i].yearread}`, newMonth);
            }
            else
            {
                month.get(`${tempData[i].monthread} ${tempData[i].yearread}`).push(newBook);
            }
        }

        console.log(month);

        for (const [key, values] of month)
        {
            var newHTML = ""
            newHTML += `
            <div class="list-package">
                <h4>${key}:</h4>
                    <ul>
                    
            `
            for (const value of values)
            {
                newHTML += `${value}
                `
            }

            newHTML += `
                </ul>
            </div>
            `

            booksReadBox.innerHTML += newHTML;
        }
    })
    .catch(error => console.error('JSON loading shit the bed! ', error));

}

document.getElementById("shiftBookLeft").addEventListener("click", () => skipBook("left"));
document.getElementById("shiftBookRight").addEventListener("click", () => skipBook("right"));
window.addEventListener("resize", resizeBookDisplay);

// Initialize the display
updateBookShowcase();
fillBooksRead();