function getLimitForGeneration(gen) {
	const lastIdGenBefore = POKE_GENS[gen - 1] ? POKE_GENS[gen - 1].lastId : 0;
	return `?limit=${POKE_GENS[gen].lastId}&offset=${lastIdGenBefore}`;
}

function getFrontalImageUrlById(id) {
	return fetchedPokemon[currentGen][id].sprites.front_default;
}

function getGenerationURL(gen) {
	const url = new URL(getLimitForGeneration(gen), BASE_URL_GENERAL);

	return url;
}

function updateButtons() {
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");

	prevBtn.classList.toggle("hidden", !(currentPage > 1));
	nextBtn.classList.toggle(
		"hidden",
		currentPage == Math.ceil(POKE_GENS[currentGen].count / PAGE_SIZE),
	);
}

function createPokemonCard(pokemonJSON) {
	const grid = document.querySelector(".grid");
	grid.innerHTML += renderPokemonContainer(pokemonJSON);
	const container = document.getElementById(`pokemon-${pokemonJSON.id}`);
	container.innerHTML = renderPokemonInfo(pokemonJSON);
	const types = container.querySelector(".types-container");
	for (const typeObj of pokemonJSON.types) {
		types.innerHTML += renderType(typeObj.type.name);
	}
}

async function createTypes() {
	const footer = document.querySelector("footer");
	footer.innerHTML = "";
	const types = Object.keys(POKE_TYPES);
	types.forEach((type) => {
		footer.innerHTML += renderType(type);
	});
}

function getFilteredPokemon(value) {
	const keys = Object.keys(fetchedPokemon[currentGen]);
	let filteredPokemon = [];
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		const pokemon = fetchedPokemon[currentGen][key];
		if (pokemon.german_name.toLowerCase().includes(value)) {
			filteredPokemon.push(fetchedPokemon[currentGen][key]);
		}
	}

	return filteredPokemon;
}
