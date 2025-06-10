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
let nameHeader = document.querySelector("#pokemonName");
const pokemonInfo = document.querySelector("#pokemon-info");

const fetchPokemon = async (input) => {
	try {
		const query = typeof input === "string" ? input.toLowerCase() : input;
		const response = await fetch(`${API_URL}/v2/pokemon/${query}`);
		if (!response.ok) throw new Error("Not found");
		pokemon = await response.json();
	} catch (err) {
		alert("Pokémon not found. Try again.");
		pokemon = undefined;
	}
};
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
randomBtn.addEventListener("click", async () => {
	//random pokemon
	const randomId = Math.floor(Math.random() * 898) + 1; // 1 to 898
	await fetchPokemon(randomId); //randomID as input
	renderPage();
});
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
	pokemonImage.width = 200;
	pokemonImage.height = 200;
};
const rotatePokemon = () =>
	filters.direction === "front"
		? (filters.direction = "back")
		: (filters.direction = "front");

const rotatePokemonButton = () => {
	rotateBtn.addEventListener("click", () => {
		rotatePokemon();
		renderPage();
	});
};

const renderPage = () => {
	if (pokemon) {
		displayPokemon();
		if (!nameHeader) {
			nameHeader = document.querySelector("#pokemon-name");
			pokemonInfo.appendChild(nameHeader);
		}
		nameHeader.textContent = pokemon.name.toUpperCase();
		rotateBtn.classList.remove("invisible");
		pokemonInfo.classList.remove("hidden");
	}
};

/* const hideCatch = () => {
	const bottomCatch = document.querySelector("#img-catch");
	bottomCatch.classList.replace("visible", "hidden");
}; */
renderPage();
searchInput();
searchButton();
rotatePokemonButton();
/* hideCatch(); */
