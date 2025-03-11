let words = [];

async function loadWords() {
    try {
        let response = await fetch('./pages/special/panopoly/words.json');
        let words = await response.json();
        displayWords(words);
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

function displayWords(wordArray) {
    let container = document.getElementById("wordContainer");
    container.innerHTML = ""; // Clear previous content

    wordArray.forEach(word => {
        let card = document.createElement("div");
        card.classList.add("word-card");

        card.innerHTML = `
            <h2 class="word-title">${word.term}</h2>
            <div class="word-meta">
                <span class="word-pronunciation">${word.pronounciation}</span>
                <span class="word-partOfSpeech">${word.partOfSpeech}</span>
            </div>
            <p class="word-definition">${word.definition}</p>
            <div class="word-footer">
                <p class="word-etymology"><strong>Etymology:</strong> ${word.etymology}</p>
            <div>
        `;

        container.appendChild(card);
    });
}

function sortWordsAlphabetically() {
    words.sort((a, b) => a.term.localeCompare(b.term));
    displayWords(words);
}

function shuffleWords() {
    words.sort(() => Math.random() - 0.5);
    displayWords(words);
}

// Load words when page loads
loadWords();