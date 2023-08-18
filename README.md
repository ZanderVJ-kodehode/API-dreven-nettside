# API-dreven-nettside

<!-- Done -->


<!--  -->
<!--  -->
<!-- i made it so that ther will show the first 16 at the star. i have made a input and a button in the html, i uset grid whit css. and java is wher the magic happens. when i searth everything that start on the lettr i wright in will show up. the more i wright the less pokemon will show up. i have a hover effect and if i press the div wher the images is, it will then show the name, number and types.-->




<!-- /////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////// -->
<!-- /////////////////////////////////////////////////////////// -->
<!-- chat gpt -->

document.addEventListener("DOMContentLoaded", function () { ... });: This code wraps everything in an event listener that triggers when the HTML document is fully loaded and ready. It ensures that the JavaScript code is executed only after the HTML structure is available.

const searchInput = document.getElementById("searchInput");: This line fetches the input element with the ID "searchInput". It will be used to get the user's search query.

const searchButton = document.getElementById("searchButton");: This line fetches the button element with the ID "searchButton". It's used to trigger the search when clicked.

const resultContainer = document.getElementById("resultContainer");: This line fetches the container element with the ID "resultContainer". It's where the search results (Pokémon cards) will be displayed.

const initialDisplayCount = 16;: This sets the initial number of Pokémon to be displayed when the page loads.

let displayedPokemonCount = 0;: This initializes a variable to keep track of how many Pokémon are currently displayed.

getPokemon("");: This function call fetches and displays Pokémon initially without any search criteria. The empty string means it will show all available Pokémon.

The searchButton.addEventListener("click", () => { ... }); section listens for a click on the search button. When clicked, it gets the search term from the input field, clears previous search results, resets the displayed count, and fetches/display the Pokémon based on the search term.

The searchInput.addEventListener("keydown", (event) => { ... }); section captures the "Enter" key press on the search input. If the "Enter" key is pressed, it prevents the default behavior (submitting a form) and simulates a click on the search button.

The getPokemon(searchTerm) function is responsible for fetching and displaying Pokémon based on the given search term. It uses the PokeAPI to get Pokémon data.

fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"): This line fetches a large set of Pokémon data from the PokeAPI. The limit and offset parameters allow the script to request a specific range of Pokémon.

The code then processes the fetched data and filters out Pokémon based on the search term, both by name and number.

The matchingPokemon list is created based on the filtering.

The number of Pokémon to display (displayCount) is determined based on whether there's a search term.

A set of promises (pokemonPromises) is created to fetch detailed information about each matching Pokémon.

Promise.all(pokemonPromises): This line waits for all the promises to resolve before moving forward. It catches any errors that might occur during the fetch process.

The rest of the code defines functions like getImageUrl, extractPokemonNumber, displayPokemonCard, displayPokemonInfo, and toggleDetails. These functions handle various aspects of fetching data and displaying it on the page.

This code creates an interactive web page where users can search for and view information about Pokémon using the PokeAPI. It demonstrates how to use event listeners, fetch data from an API, manipulate the DOM to display content, and handle user interactions.




