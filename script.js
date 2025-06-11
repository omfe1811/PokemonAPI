document.addEventListener("DOMContentLoaded", () => {
	const API_URL = "https://pokeapi.co/api/";
	let pokemon = undefined;
	let search = "";
	const filters = { shiny: false, direction: "front" };

	// DOM references
	const pokemonImage = document.querySelector("#pokemonImage");
	const rotateBtn = document.querySelector("#rotate-btn");
	const searchBtn = document.querySelector("#search-btn");
	const randomBtn = document.querySelector("#random-btn");
	const searchField = document.querySelector("#search-input");
	let nameHeader = document.querySelector("#pokemon-name");
	const pokemonInfo = document.querySelector("#pokemon-info");
	let weight = document.querySelector("#weight");
	let height = document.querySelector("#height");
	let id = document.querySelector("#id");
	let experience = document.querySelector("#experience");
	const pokemonContainer = document.querySelector("#pokemon-container");
	const imageContainer = document.querySelector("#image-container");

	// Functions
	fetch("public/PICTURES/dice-svgrepo-com.svg")
		.then((response) => response.text())
		.then((svgText) => {
			const container = document.getElementById("dice-icon");
			container.innerHTML = svgText;
			const svg = container.querySelector("svg");
			svg.setAttribute("width", "30");
			svg.setAttribute("height", "30");
			svg.setAttribute("fill", "currentColor"); // Enables CSS fill override
		});
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

	const displayPokemon = () => {
		if (!pokemon) return;
		const sprites = pokemon.sprites;
		pokemonImage.src = filters.shiny
			? filters.direction === "front"
				? sprites.front_shiny
				: sprites.back_shiny
			: filters.direction === "front"
			? sprites.front_default
			: sprites.back_default;

		pokemonImage.width = 200;
		pokemonImage.height = 200;
	};

	const renderPage = () => {
		if (!pokemon) return;
		displayPokemon();
		weight.textContent = "Weight: " + pokemon.weight;
		height.textContent = "Height: " + pokemon.height;
		id.textContent = "ID: " + pokemon.id;
		experience.textContent = "Base experience: " + pokemon.base_experience;
		nameHeader.textContent = pokemon.name.toUpperCase();
		rotateBtn.classList.remove("invisible");
		pokemonInfo.classList.remove("hidden");
		/* pokemonContainer.classList.replace("bg-transparent", "bg-(--pink-light)"); */
		pokemonContainer.classList.replace("bg-transparent", "bg-green");
		pokemonContainer.classList.remove("border-none");
		imageContainer.classList.replace("bg-transparent", "bg-image");
	};

	const rotatePokemon = () => {
		filters.direction = filters.direction === "front" ? "back" : "front";
	};

	// Event Bindings

	searchField.addEventListener("input", () => {
		search = searchField.value;
	});

	searchField.addEventListener("keydown", async (e) => {
		if (e.key === "Enter" && search.length > 0) {
			await fetchPokemon(search);
			renderPage();
		}
	});

	searchBtn.addEventListener("click", async () => {
		if (search.length > 0) {
			await fetchPokemon(search);
			renderPage();
		} else {
			alert("Wrong input");
		}
	});

	randomBtn.addEventListener("click", async () => {
		const randomId = Math.floor(Math.random() * 898) + 1;
		await fetchPokemon(randomId);
		renderPage();
	});

	rotateBtn.addEventListener("click", () => {
		rotatePokemon();
		renderPage();
	});
});
