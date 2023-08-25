
// chat gpt have been uset for some coding i was stuck on.
// some exsplanien is also made by chat gpt.
// i also tride to make a local stogas byut i wasen abel to, i tride whit chat gpt and google.
// from what i find out i wasen abel to do it becase of the api.


// Makes the html load in befor javascript does its thing.
document.addEventListener("DOMContentLoaded", function () {

    // Selecting elements from the HTML so i can use them in javascript.
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultContainer = document.getElementById("resultContainer");
  
    // making 1 for 16 to show and the other is at 0
    const initialDisplayCount = 16;
    let displayedPokemonCount = 0;
  
    // making it so nothing is eartshing when i stat the page(refrach).
    getPokemon("");
  
    // This event listener responds to a click on the search button.
    searchButton.addEventListener("click", async () => {

      // Making the search input field and make it to lowercase.
      const searchTerm = searchInput.value.toLowerCase();

    
      // Clear the previous search results. so i dont get many pokemon of difrant name.
      resultContainer.innerHTML = "";
      
      // Reset the count of displayed Pokémon.
      displayedPokemonCount = 1;
      
      // Fetch and displaying Pokémons that fit my search.
      getPokemon(searchTerm);
    });
  
    // This event listener makes the "Enter" key press on the search input.
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // from chat gtp of why  event.preventDefault();  is needed 
        // Prevent the default behavior of the "Enter" key.Do You Need It:
        // In the context of your code and the desired behavior you've implemented (searching for Pokémon without triggering a full page reload), using event.preventDefault(); is essential. Without it, the "Enter" key would trigger form submission by default, and you wouldn't have the opportunity to handle the search in the way you've designed it.
       // So, yes, in this case, you need event.preventDefault(); to achieve the intended functionality of your search input.

        searchButton.click();   // making the "enter" key to activate the button..
      }
    });
  



    






///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// This is what i made but then i dident get the numbers in order if i refrecht the site.
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////


//     // This function fetches and displays Pokémon based on the given search term.
//     function getPokemon(searchTerm) {
//       fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json(); // Convert the response to JSON format, to make it easier to read and work whit.
//         })
//         .then(data => {
//           const pokemonList = data.results; // Extracting the list of Pokémon.
          
//           // Filter the Pokémon list based on name and number matching the search term.
//           const matchingPokemon = pokemonList.filter(pokemon => {
//             return (
//               pokemon.name.startsWith(searchTerm) ||
//               extractPokemonNumber(pokemon.url).startsWith(searchTerm)
//             );
//           });
  
//           // Determine how many Pokémon to display based on the search term, whits is as many as possible that maches my searth.
//           let displayCount = initialDisplayCount;
//           if (searchTerm) {
//             displayCount = matchingPokemon.length;
//           }
  
//           // Create promises for fetching and displaying Pokémon data.
//           const pokemonPromises = matchingPokemon.slice(displayPokemonCard - 1, displayCount).map(pokemon => {
//             return fetch(pokemon.url)
//               .then(response => response.json())
//               .then(pokemonData => {
//                 // displayedPokemonCount++;
//                 // Extracting the information i want for each Pokémon whitch is number, name and what type it is but also the img.
//                 const pokemonInfo = {
//                   number: extractPokemonNumber(pokemon.url),
//                   name: pokemonData.name,
//                   types: pokemonData.types.map(type => type.type.name),
//                   image: getImageUrl(extractPokemonNumber(pokemon.url)),
                  
//                 };
  
//                 // Displaying the Pokémons information on the page.
//                 displayPokemonCard(pokemonInfo);
                
                
//                 // Increment the count of displayed Pokémon.
//                 // why its needed, from chat gpt.
//                 // Why is it Needed:
//                 // The purpose of this counter is to keep track of the number of Pokémon displayed so that you can implement certain features or behaviors based on the count. For example:

//                 // You might want to limit the number of Pokémon displayed initially or load more as the user scrolls down.
//                 // You might want to show a message to the user once a certain number of Pokémon have been displayed, like "You've viewed 10 Pokémon. Keep exploring!"
//                 // It could be used for analytics purposes to understand user engagement with the displayed content.
//                 // In your specific code, the incremented count is not directly used, but it could be valuable if you plan to expand the functionality of your page in the future.

//                 // So, while the line itself might not have an immediate impact on the current code, it's a good practice to maintain a count of displayed items, as it might become useful in more complex scenarios or future updates.
//                 displayedPokemonCount++;
//               });
//           });
  
//           // Execute all promises concurrently.
//           // not needed her but can be good to have on bigger prosjekts
//           // from chat gpt......In summary, the use of Promise.all helps improve the efficiency of fetching data concurrently, and the .catch block ensures that any errors are caught and logged, helping you identify and address potential issues.
//           Promise.all(pokemonPromises)
//             .catch(error => {
//               console.error("Fetch error:", error);
//             });
//         });
//     }
  







// ///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////
// making the searth/button better
// ///////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////


// This function fetches and displays Pokémon based on the given search term.
async function getPokemon(searchTerm) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const pokemonList = data.results;

    const matchingPokemon = pokemonList.filter(pokemon => {
      return (
        pokemon.name.startsWith(searchTerm) ||
        extractPokemonNumber(pokemon.url).startsWith(searchTerm)
      );
    });

    // Sort the matchingPokemon array by number.
    matchingPokemon.sort((a, b) => {
      const numberA = parseInt(extractPokemonNumber(a.url));
      const numberB = parseInt(extractPokemonNumber(b.url));
      return numberA - numberB;
    });

    let displayCount = initialDisplayCount;
    if (searchTerm) {
      displayCount = matchingPokemon.length;
    }
    

    // Clear the previous search results.
    resultContainer.innerHTML = "";

     // displaying the pokemon in order from number 1 and up.
     for (let i = 1; i <= displayCount; i++) {
      const pokemon = matchingPokemon[i - 1];
      const pokemonDataResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonDataResponse.json();
      const pokemonInfo = {
        number: extractPokemonNumber(pokemon.url),
        name: pokemonData.name,
        types: pokemonData.types.map(type => type.type.name),
        image: getImageUrl(extractPokemonNumber(pokemon.url)),
      };

      displayPokemonCard(pokemonInfo);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
















    
    // This function generates the URL for a Pokémon's image using its number.
    function getImageUrl(pokemonNumber) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
    }
  
    // This function extracts the Pokémon's number from its URL.
    // this function i needed alot of help from chat gpt
    function extractPokemonNumber(url) {
      const pattern = /\/(\d+)\//; // Regular expression to match the number in the URL.
      const matches = url.match(pattern);
      return matches ? matches[1] : ""; // Return the matched number or an empty string.
    }
  
    // This function displays a Pokémon card with image and details(name, number and type).
    function displayPokemonCard(pokemonInfo) {
      // Create a new card div, this will be the parent wher i will have the info inside.
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("pokemon-card");
  
      // making an image element for the Pokémon's image.
      const imageElement = document.createElement("img");
      imageElement.src = pokemonInfo.image;
      // not needed
      // imageElement.alt = pokemonInfo.name;
  
      // Create a details div to display more information about the Pokémon.
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("pokemon-details");
      detailsDiv.style.display = "none"; // Hide details by default. before i click on it
  
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
      // nameElement.textContent = pokemonInfo.name.toUpperCase();
    
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




























// i askt chat gpt to make the code more simpel.........



  // document.addEventListener("DOMContentLoaded", () => {
  //   const searchInput = document.getElementById("searchInput");
  //   const searchButton = document.getElementById("searchButton");
  //   const resultContainer = document.getElementById("resultContainer");
  //   const initialDisplayCount = 16;
  
  //   searchButton.addEventListener("click", search);
  //   searchInput.addEventListener("keydown", event => {
  //     if (event.key === "Enter") {
  //       event.preventDefault();
  //       search();
  //     }
  //   });
  
  //   async function search() {
  //     const searchTerm = searchInput.value.toLowerCase();
  //     resultContainer.innerHTML = "";
  //     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  //     const data = await response.json();
  //     const pokemonList = data.results;
  //     const matchingPokemon = pokemonList.filter(pokemon => (
  //       pokemon.name.startsWith(searchTerm) || extractPokemonNumber(pokemon.url).startsWith(searchTerm)
  //     ));
  //     const displayCount = searchTerm ? matchingPokemon.length : initialDisplayCount;
  
  //     for (const pokemon of matchingPokemon.slice(0, displayCount)) {
  //       const response = await fetch(pokemon.url);
  //       const pokemonData = await response.json();
  //       const pokemonInfo = {
  //         number: extractPokemonNumber(pokemon.url),
  //         name: pokemonData.name,
  //         types: pokemonData.types.map(type => type.type.name),
  //         image: getImageUrl(extractPokemonNumber(pokemon.url))
  //       };
  //       displayPokemonCard(pokemonInfo);
  //     }
  //   }
  
  //   function getImageUrl(pokemonNumber) {
  //     return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  //   }
  
  //   function extractPokemonNumber(url) {
  //     return url.match(/\/(\d+)\//)?.[1] || "";
  //   }
  
  //   function displayPokemonCard(pokemonInfo) {
  //     const cardDiv = document.createElement("div");
  //     cardDiv.classList.add("pokemon-card");
  
  //     const imageElement = document.createElement("img");
  //     imageElement.src = pokemonInfo.image;
  
  //     const detailsDiv = document.createElement("div");
  //     detailsDiv.classList.add("pokemon-details");
  //     detailsDiv.style.display = "none";
  
  //     imageElement.addEventListener("click", () => {
  //       toggleDetails(detailsDiv);
  //       displayPokemonInfo(pokemonInfo, detailsDiv);
  //     });
  
  //     cardDiv.appendChild(imageElement);
  //     cardDiv.appendChild(detailsDiv);
  //     resultContainer.appendChild(cardDiv);
  //   }
  
  //   function displayPokemonInfo(pokemonInfo, detailsDiv) {
  //     detailsDiv.innerHTML = "";
  
  //     const nameElement = document.createElement("h2");
  //     nameElement.textContent = pokemonInfo.name;
  
  //     const numberElement = document.createElement("p");
  //     numberElement.classList.add("number");
  //     numberElement.textContent = `#${pokemonInfo.number}`;
  
  //     const typesElement = document.createElement("p");
  //     typesElement.textContent = `Types: ${pokemonInfo.types.join(", ")}`;
  
  //     detailsDiv.appendChild(nameElement);
  //     detailsDiv.appendChild(numberElement);
  //     detailsDiv.appendChild(typesElement);
  //   }
  
  //   function toggleDetails(detailsDiv) {
  //     detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
  //   }
  
  //   // Initial display of 16 Pokémon
  //   search();
  // });
  