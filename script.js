document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resultContainer = document.getElementById("resultContainer");

  const initialDisplayCount = 16;
  let displayedPokemonCount = 0;

  // Initial display of Pokémon
  getPokemon("");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    resultContainer.innerHTML = ""; // Clear previous results
    displayedPokemonCount = 0; // Reset displayed count

    getPokemon(searchTerm);
  });


//   makes it so i can use the key  enter
  searchInput.addEventListener("keydown", (event) =>{
    if (event.key === "Enter"){
        event.preventDefault();
        searchButton.click();
    }
  })



  


  function getPokemon(searchTerm) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const pokemonList = data.results;

        const matchingPokemon = pokemonList.filter(pokemon => {
          return (
            pokemon.name.startsWith(searchTerm) ||
            extractPokemonNumber(pokemon.url).startsWith(searchTerm)
          );
        });

        let displayCount = initialDisplayCount;
        if (searchTerm) {
          displayCount = matchingPokemon.length; // Display all matching Pokémon when searching
        }

        const pokemonPromises = matchingPokemon.slice(0, displayCount).map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonData => {
              const pokemonInfo = {
                number: extractPokemonNumber(pokemon.url),
                name: pokemonData.name,
                types: pokemonData.types.map(type => type.type.name),
                image: getImageUrl(extractPokemonNumber(pokemon.url))
              };

              displayPokemonCard(pokemonInfo);
              displayedPokemonCount++; // Increment displayed count
            });
        });

        Promise.all(pokemonPromises)
          .catch(error => {
            console.error("Fetch error:", error);
          });
      });
  }

  function getImageUrl(pokemonNumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  }

  function extractPokemonNumber(url) {
    const pattern = /\/(\d+)\//;
    const matches = url.match(pattern);
    return matches ? matches[1] : "";
  }

  function displayPokemonCard(pokemonInfo) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("pokemon-card");

    const imageElement = document.createElement("img");
    imageElement.src = pokemonInfo.image;
    imageElement.alt = pokemonInfo.name;

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("pokemon-details");
    detailsDiv.style.display = "none"; // Hide details by default

    imageElement.addEventListener("click", () => {
      toggleDetails(detailsDiv);
      displayPokemonInfo(pokemonInfo, detailsDiv);
    });

    cardDiv.appendChild(imageElement);
    cardDiv.appendChild(detailsDiv);

    resultContainer.appendChild(cardDiv);
  }

  function displayPokemonInfo(pokemonInfo, detailsDiv) {
    detailsDiv.innerHTML = ""; // Clear previous details
  
    const nameElement = document.createElement("h2");
    nameElement.textContent = pokemonInfo.name;
  
    const numberElement = document.createElement("p");
    numberElement.classList.add("number");
    numberElement.textContent = `#${pokemonInfo.number}`;
  
    const typesElement = document.createElement("p");
    typesElement.textContent = `Types: ${pokemonInfo.types.join(", ")}`;
  
    detailsDiv.appendChild(nameElement);
    detailsDiv.appendChild(numberElement);
    detailsDiv.appendChild(typesElement);
  }
  
  

  function toggleDetails(detailsDiv) {
    if (detailsDiv.style.display === "none") {
      detailsDiv.style.display = "block";
    } else {
      detailsDiv.style.display = "none";
    }
  }
});
