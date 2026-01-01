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
                        <img src="/assets/gifs/BookLoading.gif" data-src="${showcaseBook.cover}" class="lazyload">
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
            const tempData = data.reverse();

            const month = new Map();

            const now = new Date();
            const twelveMonthsAgo = new Date(now);
            twelveMonthsAgo.setFullYear(now.getFullYear() - 1);

            const monthIndex = {
                "January": 0, "February": 1, "March": 2, "April": 3,
                "May": 4, "June": 5, "July": 6, "August": 7,
                "September": 8, "October": 9, "November": 10, "December": 11
            };

            let last12MonthsCount = 0;
            let sinceNewYearCount = 0;
            const authorFreq = new Map();

            for (let i = 0; i < tempData.length; i++) {
                const b = tempData[i];

                const readDate = new Date(parseInt(b.yearread), monthIndex[b.monthread], 1);

                if (readDate >= twelveMonthsAgo) {
                    last12MonthsCount++;
                }

                const isThisYear = readDate.getFullYear() === now.getFullYear();
                const isLast12Months = readDate >= twelveMonthsAgo;

                if (isThisYear) {
                    sinceNewYearCount++;
                }

                if (isLast12Months) {
                    authorFreq.set(b.author, (authorFreq.get(b.author) || 0) + 1);
                }

                const key = `${b.monthread} ${b.yearread}`;
                const newBook = `<li><i>${b.name}</i> by ${b.author}</li>`;

                if (!month.has(key)) {
                    month.set(key, [newBook]);
                } else {
                    month.get(key).push(newBook);
                }
            }

            //get the tpo three authors
            const topAuthors = [...authorFreq.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);

            //fill the books list
            for (const [key, values] of month) {
                let newHTML = `
                    <div class="list-package">
                        <h4>${key}:</h4>
                        <ul>
                `;

                for (const value of values) {
                    newHTML += `${value}`;
                }

                newHTML += `
                        </ul>
                    </div>
                `;

                booksReadBox.innerHTML += newHTML;
            }

            //Fill the seven segment displays
            document.getElementById("booksThisYear").innerText = sinceNewYearCount;
            document.getElementById("booksTwelveMonths").innerText = last12MonthsCount;
            
            document.getElementById("topBook1").innerText = `1. ${topAuthors[0][0]} (${topAuthors[0][1]})`;
            document.getElementById("topBook2").innerText = `2. ${topAuthors[1][0]} (${topAuthors[1][1]})`;
            document.getElementById("topBook3").innerText = `3. ${topAuthors[2][0]} (${topAuthors[2][1]})`;
        })
    }

document.getElementById("shiftBookLeft").addEventListener("click", () => skipBook("left"));
document.getElementById("shiftBookRight").addEventListener("click", () => skipBook("right"));
window.addEventListener("resize", resizeBookDisplay);

// Initialize the display
updateBookShowcase();
fillBooksRead();