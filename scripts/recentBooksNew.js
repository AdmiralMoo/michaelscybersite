class bookCarousel
{    
    constructor(carouselID)
    {
        this.carouselID = carouselID;
        this.booksDatabase = [];
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
            this.booksDatabase = data;
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
        if (!carouselParentContainer)
        {
            console.error(`Carousel container disappeared! Missing carousel container alert! Excuse me! Excuse me! Have you seen the carousel container parent? ${this.carouselID}`);
            return;
        }

        //Populates the filmstrip with other images
        this.booksDatabase.forEach((book, index) => {
            let bookName = "book-" + book.name.replace(/[^a-zA-Z0-9-_]/g, "-");

            //Insert new images
            carouselFilmStrip.insertAdjacentHTML("beforeend", `
                <div class="carousel-book outsideborder">
                    <img src="/assets/gifs/BookLoading.gif" data-src="${book.cover}" class="lazyload" id="${bookName}">
                </div>
            `)

            let img = carouselFilmStrip.querySelector(`#${bookName}`);
            img.addEventListener("mouseenter", function(e) 
            {
                //If there was an old tool tip, EXTERMINATE IT
                let oldTooltip = document.getElementById("global-tooltip");
                if (oldTooltip)
                {
                    oldTooltip.remove();
                }

                //Create the new one
                let tooltip = document.createElement("div");
                tooltip.id = "global-tooltip";
                tooltip.className = "tooltip";
                tooltip.innerHTML = `
                    <span class="tooltiptext" style="visibility: visible;">
                        <div class="toolheading">
                            <img src="\\assets\\icons\\icon_msg_info.png">
                            <h4 style="">Read in ${book.monthread} ${book.yearread}</h4>
                        </div>
                        <i>${book.name} (${book.year})</i><br> by ${book.author}
                    </span>
                `;

                document.body.appendChild(tooltip);

                //Position the tooltip
                const rect = img.getBoundingClientRect();
                tooltip.style.position = "absolute";
                tooltip.style.left = (rect.left + window.scrollX + 24) + 'px';
                tooltip.style.top = (rect.top + window.scrollY - tooltip.offsetHeight + 48) + 'px';
                tooltip.style.zIndex = 9999;
            })

            img.addEventListener("mouseleave", function(e)
            {
                //EXTERMINATE THE TOOLTIP
                let oldTooltip = document.getElementById("global-tooltip");
                if (oldTooltip)
                {
                    oldTooltip.remove();
                }
            })

            //Lazyload
            if (typeof lazyLoadImages === "function")
            {
                lazyLoadImages();
            }
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
    document.querySelectorAll('.image-carousel-parent').forEach(carousel => {
        new bookCarousel(carousel.id);
    });
}

window.onload = initializeCarousels;