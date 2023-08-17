# API-dreven-nettside

<!-- going to be working on it soon -->


<!--  -->
<!--  -->
<!-- chat gbt -->

This JavaScript code appears to be implementing a simple web page that allows users to search for and display information about Pokémon using the PokeAPI. Let's break down the code step by step:

The code starts by attaching an event listener to the "DOMContentLoaded" event, which fires when the initial HTML content has been completely loaded and parsed.

Inside this event listener, various elements are selected using their IDs: searchInput, searchButton, and resultContainer. These elements are used for user input, search initiation, and displaying search results, respectively.

The code initializes variables initialDisplayCount and displayedPokemonCount for managing the number of displayed Pokémon. The initialDisplayCount is set to 16, and displayedPokemonCount is initially set to 0.

The getPokemon function is called without any search term, which will initially display Pokémon with empty search criteria.

An event listener is attached to the "click" event of the searchButton element. When the button is clicked, this listener captures the value of the search input, clears previous search results in the resultContainer, resets the displayedPokemonCount, and then calls the getPokemon function with the provided search term.

Another event listener is added to the searchInput element, listening for the "keydown" event. When the "Enter" key is pressed, it simulates a click on the searchButton. This allows users to initiate a search by pressing the "Enter" key as well.

The getPokemon function makes a fetch request to the PokeAPI, specifically querying for a list of Pokémon. It then processes the response data, filtering out Pokémon that match the search term (based on name or number). The filtered Pokémon data is used to create a list of promises that fetch additional information about each matching Pokémon.

A Promise is created using Promise.all() to handle all the Pokémon fetch requests concurrently. Once the promises are resolved, each Pokémon's information is displayed on the page using the displayPokemonCard function.

The getImageUrl function generates the URL for the Pokémon's image using its number.

The extractPokemonNumber function extracts the Pokémon's number from its URL using a regular expression.

The displayPokemonCard function creates a new HTML structure for displaying Pokémon information. It attaches an image and a hidden details section to a card div, and then appends this card div to the resultContainer.

The displayPokemonInfo function populates the details section with the name, number, and types of the Pokémon.

The toggleDetails function toggles the display of the details section. If the section is hidden, it becomes visible, and vice versa. This function is used when clicking on the Pokémon image.

The code overall provides a simple interface for users to search and display Pokémon information fetched from the PokeAPI. The details section of each Pokémon card can be toggled to show or hide additional information.







Event Listener Setup:

javascript
Copy code
document.addEventListener("DOMContentLoaded", function () {
  // Code goes here
});
This code block wraps everything in an event listener that triggers when the DOM content is fully loaded and ready.

Element Selection:

javascript
Copy code
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultContainer = document.getElementById("resultContainer");
These lines of code fetch references to specific elements from the HTML using their respective IDs. This allows JavaScript to interact with these elements on the page.

Variables for Display Count:

javascript
Copy code
const initialDisplayCount = 16;
let displayedPokemonCount = 0;
These variables are used to manage how many Pokémon are displayed. initialDisplayCount sets the number of Pokémon initially displayed, and displayedPokemonCount keeps track of how many Pokémon have been displayed.

Initial Display and Search Button Event:

javascript
Copy code
getPokemon("");
searchButton.addEventListener("click", () => {
  // Code for handling search button click
});
The getPokemon("") call fetches and displays Pokémon initially without any search criteria. The second part adds an event listener to the search button, which will execute a function when the button is clicked.

Search Input Keydown Event:

javascript
Copy code
searchInput.addEventListener("keydown", (event) => {
  // Code for handling Enter key press
});
This event listener listens for a keydown event on the search input. If the "Enter" key is pressed, it simulates a click on the search button. This allows users to initiate a search by pressing "Enter."

Fetching and Displaying Pokémon:

javascript
Copy code
function getPokemon(searchTerm) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then(response => {
      // Code for handling response
    })
    .then(data => {
      // Code for processing data and displaying Pokémon
    });
}
This function fetches Pokémon data from the PokeAPI. It then processes the data, filters out matching Pokémon based on the search term, and displays the Pokémon using the displayPokemonCard function.

Displaying Pokémon Cards:

javascript
Copy code
function displayPokemonCard(pokemonInfo) {
  // Code for creating and appending a card with Pokémon info
}
This function creates a card containing Pokémon information (image, name, number, types) and attaches it to the result container on the page.

Displaying Pokémon Details:

javascript
Copy code
function displayPokemonInfo(pokemonInfo, detailsDiv) {
  // Code for displaying detailed Pokémon info in the detailsDiv
}
This function populates the details section of a Pokémon card with more specific information (name, number, types).

Toggling Details Visibility:

javascript
Copy code
function toggleDetails(detailsDiv) {
  // Code for toggling visibility of the detailsDiv
}
This function toggles the visibility of the details section of a Pokémon card when the user clicks on the Pokémon image.

By breaking down the code into these steps and understanding the purpose of each section, you can grasp how the JavaScript code interacts with the HTML and the PokeAPI to create a simple Pokémon search and display web application.














// This event listener waits for the entire HTML document to load before executing the enclosed code.
document.addEventListener("DOMContentLoaded", function () {

  // Selecting important elements from the HTML using their IDs.
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultContainer = document.getElementById("resultContainer");

  // Setting up variables to manage the display of Pokémon.
  const initialDisplayCount = 16;
  let displayedPokemonCount = 0;

  // Initial display of Pokémon without any search term.
  getPokemon("");

  // This event listener responds to a click on the search button.
  searchButton.addEventListener("click", () => {
    // Get the search term from the input field and convert it to lowercase.
    const searchTerm = searchInput.value.toLowerCase();
    
    // Clear the previous search results.
    resultContainer.innerHTML = "";
    
    // Reset the count of displayed Pokémon.
    displayedPokemonCount = 0;
    
    // Fetch and display Pokémon based on the search term.
    getPokemon(searchTerm);
  });

  // This event listener captures the "Enter" key press on the search input.
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of the "Enter" key.
      searchButton.click();   // Simulate a click on the search button.
    }
  });

  // This function fetches and displays Pokémon based on the given search term.
  function getPokemon(searchTerm) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Convert the response to JSON format.
      })
      .then(data => {
        const pokemonList = data.results; // Extract the list of Pokémon.
        
        // Filter the Pokémon list based on name or number matching the search term.
        const matchingPokemon = pokemonList.filter(pokemon => {
          return (
            pokemon.name.startsWith(searchTerm) ||
            extractPokemonNumber(pokemon.url).startsWith(searchTerm)
          );
        });

        // Determine how many Pokémon to display based on the search term.
        let displayCount = initialDisplayCount;
        if (searchTerm) {
          displayCount = matchingPokemon.length;
        }

        // Create promises for fetching and displaying Pokémon data.
        const pokemonPromises = matchingPokemon.slice(0, displayCount).map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              // Extract relevant information for each Pokémon.
              const pokemonInfo = {
                number: extractPokemonNumber(pokemon.url),
                name: pokemonData.name,
                types: pokemonData.types.map(type => type.type.name),
                image: getImageUrl(extractPokemonNumber(pokemon.url))
              };

              // Display the Pokémon's information on the page.
              displayPokemonCard(pokemonInfo);
              
              // Increment the count of displayed Pokémon.
              displayedPokemonCount++;
            });
        });

        // Execute all promises concurrently.
        Promise.all(pokemonPromises)
          .catch(error => {
            console.error("Fetch error:", error);
          });
      });
  }

  // This function generates the URL for a Pokémon's image using its number.
  function getImageUrl(pokemonNumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  }

  // This function extracts the Pokémon's number from its URL.
  function extractPokemonNumber(url) {
    const pattern = /\/(\d+)\//; // Regular expression to match the number in the URL.
    const matches = url.match(pattern);
    return matches ? matches[1] : ""; // Return the matched number or an empty string.
  }

  // This function displays a Pokémon card with image and details.
  function displayPokemonCard(pokemonInfo) {
    // Create a new card div.
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("pokemon-card");

    // Create an image element for the Pokémon's image.
    const imageElement = document.createElement("img");
    imageElement.src = pokemonInfo.image;
    imageElement.alt = pokemonInfo.name;

    // Create a details div to display more information about the Pokémon.
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("pokemon-details");
    detailsDiv.style.display = "none"; // Hide details by default.

    // Add a click event listener to the image to toggle details.
    imageElement.addEventListener("click", () => {
      toggleDetails(detailsDiv);
      displayPokemonInfo(pokemonInfo, detailsDiv);
    });

    // Append the image and details div to the card div.
    cardDiv.appendChild(imageElement);
    cardDiv.appendChild(detailsDiv);

    // Append the card div to the result container.
    resultContainer.appendChild(cardDiv);
  }

  // This function displays detailed information about the Pokémon.
  function displayPokemonInfo(pokemonInfo, detailsDiv) {
    // Clear previous details from the details div.
    detailsDiv.innerHTML = "";
  
    // Create elements for name, number, and types.
    const nameElement = document.createElement("h2");
    nameElement.textContent = pokemonInfo.name;
  
    const numberElement = document.createElement("p");
    numberElement.classList.add("number");
    numberElement.textContent = `#${pokemonInfo.number}`;
  
    const typesElement = document.createElement("p");
    typesElement.textContent = `Types: ${pokemonInfo.types.join(", ")}`;
  
    // Append elements to the details div.
    detailsDiv.appendChild(nameElement);
    detailsDiv.appendChild(numberElement);
    detailsDiv.appendChild(typesElement);
  }
  
  // This function toggles the visibility of the details div.
  function toggleDetails(detailsDiv) {
    if (detailsDiv.style.display === "none") {
      detailsDiv.style.display = "block";
    } else {
      detailsDiv.style.display = "none";
    }
  }
});