document.addEventListener("DOMContentLoaded", () => {
    updateBookShowcase(); // Initialize display when page loads
});

let currentBookIndex = 0;
let booksDatabase = [];

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

        for (var i = 0; i < 5; i++)
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

    updateShowcaseButtons();
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

function skipBook(direction) {
    if (direction === "left" && currentBookIndex > 0) {
        currentBookIndex--;
    } else if (direction === "right" && currentBookIndex < ((booksDatabase.length )-5)) {
        currentBookIndex++;
    }
    updateBookShowcase();
}

document.getElementById("shiftBookLeft").addEventListener("click", () => skipBook("left"));
document.getElementById("shiftBookRight").addEventListener("click", () => skipBook("right"));

// Initialize the display
updateBookShowcase();
