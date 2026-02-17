function injectTickerAlbums(lastAmountAlbums, destinationElementID)
{
    fetch("./assets/data/albums-of-the-day-2026.txt")
    .then((res) => res.text())
    .then((text) => {
        const putstuffhere = document.getElementById(destinationElementID);
        const lines = text.split('\n');

        let day = lines.length - 1;
        let daysBack = day - lastAmountAlbums;

        let date = Date.parse("January 1, 2026");
        var dateB = new Date(date);
        dateB.setDate(dateB.getDate() + day);
        date = dateB;

        for (day = lines.length - 1; day >= daysBack; day--)
        {
            putstuffhere.innerHTML += `
                <div class="ticker__item lcd-flicker-text"><b>${new Date(date).toLocaleDateString('en-US')} - #${day}:</b> ${lines[day]}</div>
            `;

            //Increment the fancy date
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() - 1);
            date = newDate;
        }
    })
    .catch((e) => console.error(e));
}

function getDateFromThing(olddate)
{
    let newDate = "";
    newDate += olddate.getMonth();
    newDate += "-";
    newDate += olddate.getDay();
    return newDate;
}