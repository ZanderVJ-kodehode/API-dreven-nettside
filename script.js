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