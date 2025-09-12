class bookCarousel
{    
    constructor(carouselID)
    {
        this.carouselID = carouselID;
        this.booksDatabase = [];
        this.activeImage = 0;
        this.init();
    }

    async init() 
    {
        try
        {
            fetch('./assets/json/recentBooks.json')
            .then(response => response.json())
            .then(data => {

            console.log(data);
            this.booksDatabase = data.find(set => set.setname === this.carouselID)?.images || [];
            this.booksDatabase = this.booksDatabase.reverse();
            this.stickSomeImagesInThere();
            });
        }
        catch (error)
        {
            console.error(`Carousel loading went terribly wrong! four people and a cat died, and ${this.carouselID}:`, error);
        }
    }

    stickSomeImagesInThere()
    {
        const carouselParentContainer = document.getElementById("bookContainer");
        const carouselFilmStrip = carouselParentContainer.querySelector(".image-carousel-filmstrip");
        const carouselActiveImgContainer = carouselParentContainer.querySelector('.image-carousel-activeimg');
        if (!carouselParentContainer)
        {
            console.error(`Carousel container disappeared! Missing carousel container alert! Excuse me! Excuse me! Have you seen the carousel container parent? ${this.carouselID}`);
            return;
        }
        
        //Sets the big, active image
        carouselActiveImgContainer.querySelector('img').src = this.booksDatabase[this.activeImage]?.url || '';

        //Populates the filmstrip with other images
        this.booksDatabase.forEach((book, index) => {
            //Insert new images
            carouselFilmStrip.insertAdjacentHTML("beforeend", `
                <div class="button-generic carousel-button outsideborder">
                    <img src="/assets/gifs/NikonGIF.gif" data-src="${book.url}240" class="lazyload" id="${book.name}">
                </div>
            `)

            //Add an event listener to replace the active image with the clicked image
            const newImage = carouselFilmStrip.querySelector(`#${book.name}`);
            newImage.addEventListener("click", () => {
                this.activeImage = book.url;
                carouselActiveImgContainer.innerHTML = 
                `
                <div class="insideborder">
                    <img src="/assets/gifs/NikonGIF.gif" data-src="${book.url}" class="lazyload">
                </div>
                `;

                //Lazyload
                if (typeof lazyLoadImages === "function")
                {
                    lazyLoadImages();
                }
            });
        });

        //Adds Event Listeners to the left and right buttons
        const leftButton = carouselParentContainer.querySelector("#image-carousel-left");
        const rightButton = carouselParentContainer.querySelector("#image-carousel-right");

        leftButton.addEventListener("click", () => {
            carouselFilmStrip.scrollBy({left:-256,behavior:"smooth"});
        });

        rightButton.addEventListener("click", () => {
            carouselFilmStrip.scrollBy({left:256,behavior:"smooth"});
        });

        //Lazyload the filmstrip
        if (typeof lazyLoadImages === "function")
        {
            lazyLoadImages();
        }
    }
}

function initializeCarousels()
{
    
}

window.onload = initializeCarousels;