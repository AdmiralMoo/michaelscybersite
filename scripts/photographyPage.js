class photoCarousel
{    
    constructor(carouselID)
    {
        this.carouselID = carouselID;
        this.photosDatabase = [];
        this.activeImage = 0;
        this.init();
    }

    async init() 
    {
        try
        {
            fetch('./assets/json/photoCarouselData.json')
            .then(response => response.json())
            .then(data => {
            //the data has to be this.carouselID or it'll be set to []
            console.log(data);
            this.photosDatabase = data.find(set => set.setname === this.carouselID)?.images || [];
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
        const carouselParentContainer = document.getElementById(this.carouselID);
        const carouselFilmStrip = carouselParentContainer.querySelector(".image-carousel-filmstrip");
        const carouselActiveImgContainer = carouselParentContainer.querySelector('.image-carousel-activeimg');
        if (!carouselParentContainer)
        {
            console.error(`Carousel container disappeared! Missing carousel container alert! Excuse me! Excuse me! Have you seen the carousel container parent? ${this.carouselID}`);
            return;
        }
        
        //Sets the big, active image
        carouselActiveImgContainer.querySelector('img').src = this.photosDatabase[this.activeImage]?.url || '';

        //Populates the filmstrip with other images
        this.photosDatabase.forEach((photo, index) => {
            //Insert new images
            carouselFilmStrip.insertAdjacentHTML("beforeend", `
                <div class="button-generic carousel-button outsideborder">
                    <img src="/assets/gifs/NikonGIF.gif" data-src="${photo.url}240" class="lazyload" id="${photo.name}">
                </div>
            `)

            //Add an event listener to replace the active image with the clicked image
            const newImage = carouselFilmStrip.querySelector(`#${photo.name}`);
            newImage.addEventListener("click", () => {
                this.activeImage = photo.url;
                carouselActiveImgContainer.innerHTML = 
                `
                <div class="insideborder">
                    <img src="/assets/gifs/NikonGIF.gif" data-src="${photo.url}" class="lazyload">
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

        //Lazyload
        if (typeof lazyLoadImages === "function")
        {
            lazyLoadImages();
        }
    }
}

function initializeCarousels()
{
    document.querySelectorAll('.image-carousel-parent').forEach(carousel => {
        new photoCarousel(carousel.id);
    });
}

window.onload = initializeCarousels;