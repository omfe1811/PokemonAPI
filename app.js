const API_URL = "https://pokeapi.co/api/"; //fetch API
var pokemon = undefined; //pokemon empty
let search = ""; //search empty
const filters = { shiny: false, direction: "front" };
const pokemonContainer = document.querySelector("#pokemonContainer");
const pokemonImage = document.querySelector("#pokemonImage");
const rotatePokemon = () =>
	filters.direction === "front"
		? (filters.direction = "back")
		: (filters.direction = "front");

const rotatePokemonButton = () => {
	const buttonElement = document.createElement("button");
	buttonElement.textContent = "Rotate Pokemon";
	buttonElement.addEventListener("click", () => {
		rotatePokemon();
		renderPage();
	});
	return buttonElement;
};

const fetchPokemon = async (input) => {
	const response = await fetch(`${API_URL}/v2/pokemon/${input}`);
	pokemon = await response.json(); //wait for json response
};

const searchButton = () => {
	const buttonElement = document.createElement("button"); //create search button
	buttonElement.textContent = "Search"; //Label for Button
	buttonElement.addEventListener("click", async () => {
		if (search.length > 0) {
			await fetchPokemon(search); //on click trigget fetchpokemon with search(input.value)
			renderPage(); //render on search, fetched api
		} else {
			alert("Wrong input");
		}
	});
	return buttonElement;
};

const searchInput = () => {
	const inputElement = document.createElement("input"); //create search input
	inputElement.value = search;
	inputElement.placeholder = "ID or pokemon name to search for.."; //placeholder for search
	inputElement.addEventListener("input", () => (search = inputElement.value)); //update search value on input
	inputElement.addEventListener("keydown", async (e) => {
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
	return inputElement;
};
const displayPokemon = () => {
	const imgElement = document.createElement("img");

	if (filters.shiny) {
		imgElement.src =
			filters.direction === "front"
				? pokemon.sprites.front_shiny
				: pokemon.sprites.back_shiny;
	} else {
		imgElement.src =
			filters.direction === "front"
				? pokemon.sprites.front_default
				: pokemon.sprites.back_default;
	}

	imgElement.width = 300;
	imgElement.height = 300;
	pokemonImage.replaceWith(imgElement);
};

const renderPage = () => {
	pokemonContainer.replaceChildren();
	if (pokemon) {
		//true=exist in API truthy
		displayPokemon(); //if exist displayPokemon
	}

	pokemonContainer.append(searchInput(), searchButton(), rotatePokemonButton()); //add input and button on render page
};
renderPage();
