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
            const response = await fetch('./assets/json/photoCarouselData.json');
            const data = await response.json();

            //the data has to be this.carouselID or it'll be set to []
            this.photosDatabase = data[this.carouselID] || [];
            this.stickSomeImagesInThere();
        }
        catch (error)
        {
            console.error(`Carousel loading went terribly wrong! four people and a cat died, and ${this.carouselID}:`, error);
        }
    }

    stickSomeImagesInThere()
    {
        const carouselParentContainer = document.getElementById(this.carouselID);
        const carouselActiveImgContainer = carouselParentContainer.querySelector('.image-carousel-activeimg');
        if (!carouselParentContainer)
        {
            console.error(`Carousel container disappeared! Missing carousel container alert! Excuse me! Excuse me! Have you seen the carousel container parent? ${this.carouselID}`);
            return;
        }
        
        carouselActiveImgContainer.querySelector('img').src = url(this.photosDatabase[1]['url']);
    }
}

function initializeCarousels()
{
    document.querySelectorAll('.image-carousel-parent').forEach(carousel => {
        new photoCarousel(carousel.id);
    });
}

window.onload = initializeCarousels;