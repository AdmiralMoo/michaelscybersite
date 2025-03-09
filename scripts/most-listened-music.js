document.addEventListener("DOMContentLoaded", () => {
    updateDisplay(); // Initialize display when page loads
});

const albumsByMonth = [
    {
        month: "August 2023",
        albums: [
            { artist: "Counting Crows", album: "August And Everything After", cover: "./assets/albumart/counting crows - august and everything after.jpg" },
            { artist: "Green Day", album: "Dookie", cover: "./assets/albumart/green day - dookie.jpg" },
            { artist: "Marcy Playground", album: "Marcy Playground", cover: "./assets/albumart/marcy playground - marcy playground.jpg" },
            { artist: "The Smashing Pumpkins", album: "Siamese Dream", cover: "./assets/albumart/the smashing pumpkins - siamese dream.jpg" },
            { artist: "Nine Inch Nails", album: "With Teeth", cover: "./assets/albumart/nine inch nails - with teeth [colour corrected].jpg" }
        ]
    },
    {
        month: "September 2023",
        albums: [
            { artist: "Monster Magnet", album: "Dopes To Infinity", cover: "./assets/albumart/monster magnet - dopes to infinity.jpg" },
            { artist: "Green Day", album: "1039/Smoothed Out Slappy Hours", cover: "./assets/albumart/green day - 1039 smoothed out slappy hours.jpg" },
            { artist: "Hedley", album: "Famous Last Words", cover: "./assets/albumart/hedley - famous last words.jpg" },
            { artist: "Marcy Playground", album: "Marcy Playground", cover: "./assets/albumart/marcy playground - marcy playground.jpg" },
            { artist: "Skin Yard", album: "1000 Smiling Knuckles", cover: "./assets/albumart/skin yard - 1000 smiling knuckles.jpg" }
        ]
    },
    {
        month: "October 2023",
        albums: [
            { artist: "Nine Inch Nails", album: "With Teeth", cover: "./assets/albumart/nine inch nails - with teeth [colour corrected].jpg" },
            { artist: "Pink Floyd", album: "The Dark Side of The Moon", cover: "./assets/albumart/pink floyd - dark side of the moon.jpg" },
            { artist: "King Crimson", album: "In The Court of The Crimson King", cover: "./assets/albumart/king crimson - in the court of the crimson king [colour corrected].jpg" },
            { artist: "Pink Floyd", album: "Animals", cover: "./assets/albumart/pink floyd - animals.jpg" },
            { artist: "King Crimson", album: "Islands", cover: "./assets/albumart/king crimson - islands.jpg" }
        ]
    },
    {
        month: "November 2023",
        albums: [
            { artist: "Led Zeppelin", album: "Houses of The Holy", cover: "./assets/albumart/led zeppelin - houses of the holy.jpg" },
            { artist: "Jimi Hendrix", album: "Are You Experienced?", cover: "./assets/albumart/the jimi hendrix experience - are you experienced.jpg" },
            { artist: "Pink Floyd", album: "The Wall", cover: "./assets/albumart/pink floyd - the wall.jpg" },
            { artist: "Metallica", album: "Metallica", cover: "./assets/albumart/metallica - metallica.jpg" },
            { artist: "Supertramp", album: "Breakfast In America", cover: "./assets/albumart/supertramp - breakfast in america.jpg" }
        ]
    },
    {
        month: "December 2023",
        albums: [
            { artist: "Led Zeppelin", album: "Led Zeppelin IV", cover: "./assets/albumart/led zeppelin - led zeppelin iv.jpg" },
            { artist: "Dire Straits", album: "Love Over Gold", cover: "./assets/albumart/dire straits - love over gold.jpg" },
            { artist: "Led Zeppelin", album: "Houses of The Holy", cover: "./assets/albumart/led zeppelin - houses of the holy.jpg" },
            { artist: "Pink Floyd", album: "The Wall", cover: "./assets/albumart/pink floyd - the wall.jpg" },
            { artist: "King Crimson", album: "Islands", cover: "./assets/albumart/king crimson - islands.jpg" }
        ]
    },
    {
        month: "February 2024",
        albums: [
            { artist: "Green Day", album: "Saviors", cover: "./assets/albumart/green day - saviors.jpg" },
            { artist: "Pink Floyd", album: "The Dark Side of The Moon", cover: "./assets/albumart/pink floyd - dark side of the moon.jpg" },
            { artist: "King Crimson", album: "Islands", cover: "./assets/albumart/king crimson - islands.jpg" },
            { artist: "Filter", album: "Title of Record", cover: "./assets/albumart/filter - title of record.jpg" },
            { artist: "Alexisonfire", album: "Crisis", cover: "./assets/albumart/alexisonfire - crisis.jpg" }
        ]
    },
    {
        month: "March 2024",
        albums: [
            { artist: "Green Day", album: "Saviors", cover: "./assets/albumart/green day - saviors.jpg" },
            { artist: "Taylor Swift", album: "Midnights", cover: "./assets/albumart/taylor swift - midnights.jpg" },
            { artist: "Wolfmother", album: "Wolfmother", cover: "./assets/albumart/wolfmother - wolfmother.jpg" },
            { artist: "Pink Floyd", album: "Atom Heart Mother", cover: "./assets/albumart/pink floyd - atom heart mother.jpg" },
            { artist: "Pink Floyd", album: "Wish You Were Here", cover: "./assets/albumart/pink floyd - wish you were here.jpg" }
        ]
    },
    {
        month: "April 2024",
        albums: [
            { artist: "Dire Straits", album: "Love Over Gold", cover: "./assets/albumart/dire straits - love over gold.jpg" },
            { artist: "Alanis Morissette", album: "Jagged Little Pill", cover: "./assets/albumart/alanis morissette - jagged little pill.jpg" },
            { artist: "Metallica", album: "Kill Em' All", cover: "./assets/albumart/metallica - kill 'em all.jpg" },
            { artist: "Nine Inch Nails", album: "With Teeth", cover: "./assets/albumart/nine inch nails - with teeth [colour corrected].jpg" },
            { artist: "The Bangles", album: "Greatest Hits", cover: "./assets/albumart/bangles - greatest hits.jpg" }
        ]
    },
    {
        month: "May 2024",
        albums: [
            { artist: "Alanis Morissette", album: "Jagged Little Pill", cover: "./assets/albumart/alanis morissette - jagged little pill.jpg" },
            { artist: "Nine Inch Nails", album: "Pretty Hate Machine", cover: "./assets/albumart/nine inch nails - pretty hate machine.jpg" },
            { artist: "Pink Floyd", album: "Atom Heart Mother", cover: "./assets/albumart/pink floyd - atom heart mother.jpg" },
            { artist: "Metallica", album: "Kill Em' All", cover: "./assets/albumart/metallica - kill 'em all.jpg" },
            { artist: "Dire Straits", album: "Love Over Gold", cover: "./assets/albumart/dire straits - love over gold.jpg" }
        ]
    },
    {
        month: "June 2024",
        albums: [
            { artist: "Nine Inch Nails", album: "Pretty Hate Machine", cover: "./assets/albumart/nine inch nails - pretty hate machine.jpg" },
            { artist: "Pink Floyd", album: "The Dark Side of The Moon", cover: "./assets/albumart/pink floyd - dark side of the moon.jpg" },
            { artist: "Metallica", album: "...And Justice For All", cover: "./assets/albumart/metallica - and justice for all.jpg" },
            { artist: "Alanis Morissette", album: "Jagged Little Pill", cover: "./assets/albumart/alanis morissette - jagged little pill.jpg" },
            { artist: "Dire Straits", album: "Brothers in Arms", cover: "./assets/albumart/dire straits - brothers in arms.jpg" }
        ]
    },
    {
        month: "July 2024",
        albums: [
            { artist: "R.E.M.", album: "Life's Rich Pageant", cover: "./assets/albumart/rem - lifes rich pageant.jpg" },
            { artist: "Nine Inch Nails", album: "Pretty Hate Machine", cover: "./assets/albumart/nine inch nails - pretty hate machine.jpg" },
            { artist: "The Breeders", album: "Last Splash", cover: "./assets/albumart/the breeders - last spash.jpg" },
            { artist: "Deep Blue Something", album: "Home", cover: "./assets/albumart/deep blue something - home.jpg" },
            { artist: "Marcy Playground", album: "Marcy Playground", cover: "./assets/albumart/marcy playground - marcy playground.jpg" }
        ]
    },
    {
        month: "August 2024",
        albums: [
            { artist: "Nine Inch Nails", album: "Broken", cover: "./assets/albumart/nine inch nails - broken.jpg" },
            { artist: "R.E.M.", album: "Life's Rich Pageant", cover: "./assets/albumart/rem - lifes rich pageant.jpg" },
            { artist: "Rob Zombie", album: "Hellbilly Deluxe", cover: "./assets/albumart/rob zombie - hellbilly deluxe.jpg" },
            { artist: "Nine Inch Nails", album: "With Teeth", cover: "./assets/albumart/nine inch nails - with teeth [colour corrected].jpg" },
            { artist: "AC/DC", album: "Back In Black", cover: "./assets/albumart/acdc - back in black.jpg" }
        ]
    },
    {
        month: "September 2024",
        albums: [
            { artist: "Nine Inch Nails", album: "Broken", cover: "./assets/albumart/nine inch nails - broken.jpg" },
            { artist: "Nine Inch Nails", album: "Hesitation Marks", cover: "./assets/albumart/nine inch nails - hesitation marks [square].jpg" },
            { artist: "Fiona Apple", album: "Tidal", cover: "./assets/albumart/fiona apple - tidal.jpg" },
            { artist: "Nine Inch Nails", album: "With Teeth", cover: "./assets/albumart/nine inch nails - with teeth [colour corrected].jpg" },
            { artist: "Yes", album: "90125", cover: "./assets/albumart/yes - 90125.jpg" }
        ]
    },
    {
        month: "October 2024",
        albums: [
            { artist: "Nine Inch Nails", album: "Broken", cover: "./assets/albumart/nine inch nails - broken.jpg" },
            { artist: "Billy Joel", album: "52nd Street", cover: "./assets/albumart/billy joel - 52nd street.jpg" },
            { artist: "Nine Inch Nails", album: "With Teeth", cover: "./assets/albumart/nine inch nails - with teeth [colour corrected].jpg" },
            { artist: "Yes", album: "90125", cover: "./assets/albumart/yes - 90125.jpg" },
            { artist: "The Grateful Dead", album: "Workingman's Dead", cover: "./assets/albumart/the grateful dead - workingman's dead.jpg" }
        ]
    },
    {
        month: "November 2024",
        albums: [
            { artist: "Creedence Clearwater Revival", album: "Willy And The Poor Boys", cover: "./assets/albumart/creedence clearwater revival - willy and the poor boys.jpg" },
            { artist: "Franz Ferdinand", album: "Franz Ferdinand", cover: "./assets/albumart/franz ferdinand - franz ferdinand.jpg" },
            { artist: "Prince & The Revolution", album: "Purple Rain", cover: "./assets/albumart/prince and the revolution - purple rain.jpg" },
            { artist: "The Grateful Dead", album: "Workingman's Dead", cover: "./assets/albumart/the grateful dead - workingman's dead.jpg" },
            { artist: "The Killers", album: "Pressure Machine", cover: "./assets/albumart/the killers - pressure machine.jpg" }
        ]
    },
    {
        month: "December 2024",
        albums: [
            { artist: "Sabrina Carpenter", album: "Short N' Sweeet", cover: "./assets/albumart/sabrina carpenter - short n' sweet.jpg" },
            { artist: "The Killers", album: "Pressure Machine", cover: "./assets/albumart/the killers - pressure machine.jpg" },
            { artist: "Pink Floyd", album: "The Dark Side of The Moon", cover: "./assets/albumart/pink floyd - dark side of the moon.jpg" },
            { artist: "Prince & The Revolution", album: "Purple Rain", cover: "./assets/albumart/prince and the revolution - purple rain.jpg" },
            { artist: "Nine Inch Nails", album: "Broken", cover: "./assets/albumart/nine inch nails - broken.jpg" }
        ]
    },
    {
        month: "January 2025",
        albums: [
            { artist: "Sabrina Carpenter", album: "Short N' Sweeet", cover: "./assets/albumart/sabrina carpenter - short n' sweet.jpg" },
            { artist: "The Clash", album: "The Clash", cover: "./assets/albumart/the clash - the clash.jpg" },
            { artist: "Pink Floyd", album: "The Dark Side of The Moon", cover: "./assets/albumart/pink floyd - dark side of the moon.jpg" },
            { artist: "Rush", album: "Moving Pictures", cover: "./assets/albumart/rush - moving pictures.jpg" },
            { artist: "Johann Strauss II", album: "An Der Schönen, Blauen Donau", cover: "./assets/albumart/johann strauss ii - an der schonen, blauen donau [ii].jpg" }
        ]
    },
    {
        month: "February 2025",
        albums: [
            { artist: "The Sex Pistols", album: "Never Mind The Bollocks", cover: "./assets/albumart/sex pistols - never mind the bollocks.jpg" },
            { artist: "Babe Ruth", album: "First Base", cover: "./assets/albumart/babe ruth - first base.jpg" },
            { artist: "Johann Strauss II", album: "An Der Schönen, Blauen Donau", cover: "./assets/albumart/johann strauss ii - an der schonen, blauen donau [ii].jpg" },
            { artist: "The Clash", album: "The Clash", cover: "./assets/albumart/the clash - the clash.jpg" },
            { artist: "Rush", album: "Moving Pictures", cover: "./assets/albumart/rush - moving pictures.jpg" }
        ]
    }
];

let currentMonthIndex = 17;

function updateDisplay() {
    const monthDisplay = document.getElementById("monthDisplay");
    const albumContainer = document.getElementById("albumContainer");

    const monthData = albumsByMonth[currentMonthIndex];

    monthDisplay.textContent = "Most Listened-To Albums: " + monthData.month;
    albumContainer.innerHTML = ""; // Clear existing albums

    monthData.albums.forEach(album => {
        const albumElement = document.createElement("div");
        albumElement.classList.add("album");

        albumElement.innerHTML = `
            <img src="${album.cover}" alt="${album.album}">
            <p>${album.artist}<br><i>${album.album}</i></p>
        `;
        
        albumContainer.appendChild(albumElement);
    });
}

function shiftMonth(direction) {
    if (direction === "left" && currentMonthIndex > 0) {
        currentMonthIndex--;
    } else if (direction === "right" && currentMonthIndex < albumsByMonth.length - 1) {
        currentMonthIndex++;
    }
    updateDisplay();
}

document.getElementById("leftButton").addEventListener("click", () => shiftMonth("left"));
document.getElementById("rightButton").addEventListener("click", () => shiftMonth("right"));

// Initialize the display
updateDisplay();
