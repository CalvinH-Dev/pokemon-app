let currentPage = 1;
let currentGen = 1;

async function init() {
	await renderAllPokemonForPage(1, 1);
	console.log("hier");
	console.log(JSON.stringify(fetchedPokemon));
	await fetchRest();
	renderTypes();
}

init();

function updateButtons() {
	const prevBtn = document.getElementById("prevBtn");
	const nextBtn = document.getElementById("nextBtn");
	prevBtn.classList.toggle("hidden", !(currentPage > 1));
	nextBtn.classList.toggle(
		"hidden",
		currentPage == Math.ceil(POKE_GENS[currentGen].count / PAGE_SIZE),
	);
}

async function nextPage() {
	await renderAllPokemonForPage(++currentPage, currentGen);
}

async function prevPage() {
	await renderAllPokemonForPage(--currentPage, currentGen);
}

async function renderAllPokemonForPage(page, gen) {
	currentPage = page;
	currentGen = gen;

	const grid = document.querySelector(".grid");
	grid.innerHTML = "";

	await getAllPokemonByPage(page, gen);
	updateButtons();
}

async function fetchRest() {
	const promises = [];
	const start = POKE_GENS[currentGen].lastId - POKE_GENS[currentGen].count + 1;
	for (let id = start; id <= POKE_GENS[currentGen].lastId; id++) {
		promises.push(fetchPokemon(id));
	}
	await Promise.all(promises);
}

async function changeGen() {
	const select = document.getElementById("genSelect");
	const gen = select.value;
	await renderAllPokemonForPage(1, gen);
	await fetchRest();
}

async function filterPokemon() {
	const input = document.getElementById("filterInput");
	if (input.value.length > 2) {
		const filterValue = input.value.toLowerCase();
		const filteredPokemon = getFilteredPokemon(filterValue);
		renderManyPokemon(filteredPokemon);
	} else {
		renderAllPokemonForPage(currentPage, currentGen);
	}
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

function renderManyPokemon(pokemon) {
	const grid = document.querySelector(".grid");
	grid.innerHTML = "";
	for (let i = 0; i < pokemon.length; i++) {
		const id = pokemon[i].id;

		fetchAndRender(id);
	}
}

function renderTypes() {
	const footer = document.querySelector("footer");
	footer.innerHTML = "";
	const types = Object.keys(POKE_TYPES);
	types.forEach((type) => {
		footer.innerHTML += renderType(type);
	});
}

async function renderPokemonCard(json) {
	console.log(json);
	let typesHTML = "";
	for (let index = 0; index < json.types.length; index++) {
		typesHTML += renderType(json.types[index].type.name);
	}

	const grid = document.querySelector(".grid");
	grid.innerHTML += /*html*/ `
		<div class="pokemon-container" style="order: ${json.id}">
			<div>
				<img style="width: 50px; height: 50px;" src="${getFrontalImageUrlById(json.id)}"/>
				<p>${json.german_name}</p>
			</div>
			<div>${typesHTML}</div>
		</div>
	`;
}
