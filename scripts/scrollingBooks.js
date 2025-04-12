let bookImages = [];
let scrollingbooks = new Array(12);
let waterfallbookIndex = 0;
/*
Helper function to shuffle the array
*/
function shuffle(array) 
{
    let currentIndex = array.length;
    
    while (currentIndex != 0) 
    {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function resetbook(book) {

    let newImage = bookImages[bookImages.length - 1];
    bookImages.pop();

    if (bookImages.length <= 0)
    {
        initializeScrollingbooks();
    }

    const duration = 12 + Math.random() * 12;
    book.style.animationDuration = (duration * 1.5) + "s";
    book.style.top = Math.random() * 1024 + "px";

    book.style.width = "auto";
    book.style.height = "200px";
    book.style.maxWidth = "auto";
    book.style.maxHeight = "200px";
    book.style.objectFit = "scale-down"

    book.classList.remove("book-cover"); 
    void book.offsetWidth;
    book.classList.add("book-cover");

    book.src = "./assets/gifs/DiscLoading.gif";

    setTimeout(() => {
        book.src = newImage;
        
        lazyLoadImages();
    }, 500);

    const totalTime = duration * 1500;
    setTimeout(() => {
        resetbook(book);
    }, totalTime);
}


function spawnbooks() {
    if (scrollingbooks.length === 0) return;

    const book = scrollingbooks[waterfallbookIndex];

    resetbook(book);

    waterfallbookIndex++;
    if (waterfallbookIndex >= scrollingbooks.length) {
        waterfallbookIndex = 0;
    }

    const nextDelay = 3000 + Math.random() * 3000;

    setTimeout(spawnbooks, nextDelay);
}
    
function initializeScrollingbooks()
{
    //Find where we're putting these books
    const bookDiv = document.querySelector(".scrolling-books");
    const sizingElement = document.querySelector("main");
    let totalHeight = window.getComputedStyle(sizingElement).height;

    //Retrieve the list of images from the JSON file\\
    fetch("./assets/books/images.json")
        .then(response => response.json())
        .then(data => 
        {
            //Get the data, map it to the file paths and shuffle the list
            bookImages = data.map(img => `./assets/books/${encodeURIComponent(img)}`);
            shuffle(bookImages);
            
            //Loop through the array of scrolling books and create their elements
            for (let i = 0; i < scrollingbooks.length; i++)
            {
                let newElement = document.createElement('div');

                let newImage = document.createElement("img");
                newImage.classList.add("book-cover");                
                newElement.appendChild(newImage);
                scrollingbooks[i] = newImage;

                bookDiv.appendChild(scrollingbooks[i]);
            }

            spawnbooks();
        })
}


document.addEventListener("DOMContentLoaded", initializeScrollingbooks());

/*
TODO: Ensure that this loops infinitely
TODO: Add variation to book cover sizes
TODO: Add argument to pass in custom page height for adjustments
TODO: Animate fading in and out of books
*/