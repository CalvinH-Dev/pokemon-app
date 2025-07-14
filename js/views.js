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

async function createBigCard(json) {
	const bigCardRef = document.getElementById("bigCard");
	bigCardRef.style = getColorsForTypes(json.id);

	bigCardRef.innerHTML = renderBigCard(json);
	const types = bigCardRef.querySelector(".big-types");
	for (const typeObj of json.types) {
		types.innerHTML += renderType(typeObj.type.name);
	}
	const container = bigCardRef.querySelector(".strengths-weaknesses");
	const { weak, strong } = getInteractionsHTML(json);
	container.innerHTML = renderInteractions(weak, strong);

	await playPokemonAudio(json.id);
}

async function openBigView(id) {
	showLoadingSpinner();
	const bigViewRef = document.getElementById("bigCardOverlay");

	const json = fetchedPokemon[currentGen][id];
	bigViewRef.classList.remove("d-none");
	await createBigCard(json);

	hideLoadingSpinner();
}

function closeBigView(event) {
	if (event.currentTarget !== event.target) return;
	const element = event.currentTarget;

	element.classList.add("d-none");
}

function getCurrentView() {
	const section = document.getElementById("mainSection");
	return section.dataset.view;
}

function setView(view) {
	const sectionRef = document.getElementById("mainSection");
	const viewRef = document.querySelector(".view");
	sectionRef.dataset.view = view;

	viewRef.classList.toggle("grid", view === "grid" || view === "filtered");
	viewRef.classList.toggle("empty", view === "empty");

	return sectionRef;
}

async function showNormalView() {
	setView("grid");
	await createPage();
	updatePagination();
}

function showFilteredView() {
	const filterValue = filterInput.value.toLowerCase();
	getFilteredPokemon(filterValue);

	if (filteredPokemon.length) {
		setView("filtered");
		showListOfPokemon(filteredPokemon);
	} else {
		setView("empty");
		showEmptyList();
	}
	window.scrollTo(0, 0);
	updatePagination();
}

function showListOfPokemon(pokemon) {
	const grid = document.querySelector(".grid");
	grid.innerHTML = "";

	for (let i = 0; i < pokemon.length; i++) {
		createPokemonCard(pokemon[i]);
	}
}

function showEmptyList() {
	const view = document.querySelector(".view");
	view.classList.remove("grid");
	view.innerHTML = renderEmptyList();
}

function showLoadingSpinner() {
	const spinner = document.getElementById("loadingSpinner");
	spinner.classList.remove("d-none");
}

function hideLoadingSpinner() {
	const spinner = document.getElementById("loadingSpinner");
	spinner.classList.add("d-none");
}
