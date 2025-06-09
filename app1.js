const API_URL = "https://pokeapi.co/api/"; //fetch API
var pokemon = undefined; //pokemon empty
let search = ""; //search empty
const filters = { shiny: false, direction: "front" };
/* const pokemonContainer = document.querySelector("#pokemonContainer1"); */
const pokemonImage = document.querySelector("#pokemonImage");
const rotateBtn = document.querySelector("#rotate-btn");
const searchBtn = document.querySelector("#search-btn");
const randomBtn = document.querySelector("#random-btn");
const searchField = document.querySelector("#search-input");
const rotatePokemon = () =>
	filters.direction === "front"
		? (filters.direction = "back")
		: (filters.direction = "front");

const rotatePokemonButton = () => {
	rotateBtn.addEventListener("click", () => {
		rotatePokemon();
		renderPage();
	});
	return buttonElement;
};

const fetchPokemon = async (input) => {
	try {
		const response = await fetch(
			`${API_URL}/v2/pokemon/${input.toString().toLowerCase()}`
		);
		if (!response.ok) throw new Error("Not found");
		pokemon = await response.json();
	} catch (error) {
		alert("Pokémon not found. Try again.");
		pokemon = undefined;
	}
};
randomBtn.addEventListener("click", async () => {
	const randomId = Math.floor(Math.random() * 898) + 1; // 1 to 898
	await fetchPokemon(randomId);
	renderPage();
});
const searchButton = () => {
	searchBtn.addEventListener("click", async () => {
		if (search.length > 0) {
			await fetchPokemon(search); //on click trigget fetchpokemon with search(input.value)
			renderPage(); //render on search, fetched api
		} else {
			alert("Wrong input");
		}
	});
	return searchBtn;
};
const searchInput = () => {
	searchField.addEventListener("input", () => (search = searchField.value)); //update search value on input
	searchField.addEventListener("keydown", async (e) => {
		if (e.key === "Enter") {
			//trigget search if enter is pressed
			if (search.length > 0) {
				await fetchPokemon(search);
				renderPage();
			} else {
				alert("Wrong input"); //alert when its wrong input
			}
		}
	}); //search on Enter key
	return searchField;
};
const displayPokemon = () => {
	if (filters.shiny) {
		pokemonImage.src =
			filters.direction === "front"
				? pokemon.sprites.front_shiny
				: pokemon.sprites.back_shiny;
	} else {
		pokemonImage.src =
			filters.direction === "front"
				? pokemon.sprites.front_default
				: pokemon.sprites.back_default;
	}

	pokemonImage.width = 300;
	pokemonImage.height = 300;
};

const renderPage = () => {
	pokemonContainer.replaceChildren();
	if (pokemon) {
		//true=exist in API truthy
		displayPokemon(); //if exist displayPokemon
	}
};
renderPage();
