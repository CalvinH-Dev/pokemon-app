let currentPage = 1;
let currentGen = 1;
let oldFilterValue = "";

const filterInput = document.getElementById("filterInput");

async function init() {
	await renderAllPokemonForPage(1, 1);
	fetchGen();
	// createTypes();
}

init();

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

async function changeGen() {
	const select = document.getElementById("genSelect");
	const gen = select.value;
	await renderAllPokemonForPage(1, gen);
	await fetchGen();
}

function saveOldInputValue() {
	oldFilterValue = filterInput.value;
}

async function filterPokemon(event) {
	const needsRerender =
		(event.inputType === "deleteContentForward" || event.inputType === "deleteContentBackward") &&
		filterInput.value.length <= 2 &&
		oldFilterValue.length > 2;

	if (filterInput.value.length > 2) {
		const filterValue = filterInput.value.toLowerCase();
		const filteredPokemon = getFilteredPokemon(filterValue);
		renderListOfPokemon(filteredPokemon);
	} else if (needsRerender) {
		renderAllPokemonForPage(currentPage, currentGen);
	}
	oldFilterValue = filterInput.value;
}

function renderListOfPokemon(pokemon) {
	const grid = document.querySelector(".grid");
	grid.innerHTML = "";
	for (let i = 0; i < pokemon.length; i++) {
		createPokemonCard(pokemon[i]);
	}
}
