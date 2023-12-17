// Base URL for the dictionary API
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// DOM element reference for displaying search results
const result = document.getElementById("result");

// DOM element reference for the search button
const btn = document.getElementById("search-btn");

// Event listener for the search button click
btn.addEventListener("click", () => {
    // Retrieve the word entered by the user
    let userInput = document.getElementById("inp-word").value;

    // Fetch word data from the API using the entered word
    fetch(`${url}${userInput}`)
        .then((response) => response.json()) // Parse response as JSON
        .then((data) => {
            console.log(data); // Log the fetched data (for debugging purposes)

            // Display word details in the result section
            result.innerHTML = `
                <div class="word">
                    <h3>${userInput}</h3>
                    <button onclick="speak('${userInput}')">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
        })
        .catch(() => {
            // Handle errors if the word data couldn't be fetched
            result.innerHTML = `<h3 class="error">Word Not Found</h3>`;
        });
});

// Function to speak the word
function speak(word) {
    // Create a new SpeechSynthesisUtterance object with the word
    const speech = new SpeechSynthesisUtterance(word);

    // Set speech parameters (rate and pitch)
    speech.rate = 1; // Speech rate
    speech.pitch = 1; // Speech pitch

    // Use browser's speech synthesis to speak the word
    window.speechSynthesis.speak(speech);
}
