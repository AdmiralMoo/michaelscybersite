window.onload = function() {

    //Set the newspaper name:
    const newspaperBanner = document.getElementById("newspaper-banner");
    let newPath = "assets\\site\\sitebanner_gazette_" + Math.floor(Math.random() * 14 + 1) + ".png";
    newspaperBanner.setAttribute("src", newPath);

    const date = new Date();

    // Define greeting based on the time of day
    let greeting = '';
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
        greeting = 'GOOD MORNING';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'GOOD AFTERNOON';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'GOOD EVENING';
    } else {
        greeting = 'GO TO BED';
    }

    // Format date as "Month Day" (e.g., March 10th)
    const options = { month: 'long', day: 'numeric' };
    let formattedDate = date.toLocaleDateString('en-US', options); // Change 'const' to 'let'

    // Capitalize first letter of each word
    formattedDate = formattedDate.toUpperCase();

    // Set the content of the paragraph
    document.getElementById('newspaper-header').innerHTML = `${greeting} – TODAY IS ${formattedDate}`;

    // Step 2: Fetch the footer messages from the JSON file
    fetch('./assets/json/newspapermessages.json')
        .then(response => response.json())
        .then(data => {
            // Step 3: Select a random message
            const messages = data.messages;
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];

            let randomNumber = 1 + Math.floor(Math.random() * 30);  // Generates a random integer between 0 and 100
            let result = randomMessage + "—Page " + randomNumber;

            // Set the content of the newspaper footer
            document.getElementById('newspaper-footer').textContent = result;
        })
        .catch(error => console.error('Error fetching footer messages:', error));
};
