function getLimitForGeneration(gen) {
	const lastIdGenBefore = POKE_GENS[gen - 1] ? POKE_GENS[gen - 1].lastId : 0;
	return `?limit=${POKE_GENS[gen].lastId}&offset=${lastIdGenBefore}`;
}

function getFrontalImageUrlById(id) {
	// return fetchedPokemon[currentGen][id].sprites.other["official-artwork"].front_default;
	// return fetchedPokemon[currentGen][id].sprites.versions["generation-v"]["black-white"].animated
	// 	.front_default;
	return fetchedPokemon[currentGen][id].sprites.front_default;
}

function getGenerationURL(gen) {
	const url = new URL(getLimitForGeneration(gen), BASE_URL_GENERAL);

	return url;
}

function updatePaginationButtons() {
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");
	const maxPage = currentPage == getMaxPages();

	const prevShouldBeHidden = !(currentPage > 1) || getCurrentView() !== "grid";
	const nextShouldBeHidden = maxPage || getCurrentView() !== "grid";

	prevBtn.classList.toggle("hidden", prevShouldBeHidden);
	nextBtn.classList.toggle("hidden", nextShouldBeHidden);
}

function getMaxPages() {
	return Math.ceil(POKE_GENS[currentGen].count / PAGE_SIZE);
}

function getPageText(page) {
	return `Seite ${page} von ${getMaxPages()}`;
}

function updatePagination() {
	const shouldBeHidden = getCurrentView() !== "grid";
	const pagination = document.querySelector(".pagination");
	const pageText = document.getElementById("pageCount");
	pageText.innerHTML = getPageText(currentPage);
	pageText;
	pagination.classList.toggle("d-none", shouldBeHidden);

	updatePaginationButtons();
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

function saveOldInputValue() {
	oldFilterValue = filterInput.value;
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
	const filteredPokemon = getFilteredPokemon(filterValue);

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

function saveToSessionStorage(key, value) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

function getFromSessionStorage(key) {
	return JSON.parse(sessionStorage.getItem(key));
}

function closeBigView(event) {
	if (event.currentTarget !== event.target) return;
	const element = event.currentTarget;

	element.classList.add("d-none");
}

async function openBigView(id) {
	const bigViewRef = document.getElementById("bigCardContainer");
	const bigCardRef = document.getElementById("bigCard");
	const json = fetchedPokemon[currentGen][id];
	bigViewRef.classList.remove("d-none");
	bigCardRef.style = getColorsForTypes(id);

	bigCardRef.innerHTML = renderBigCard(json);
	const types = bigCardRef.querySelector(".big-types");
	for (const typeObj of json.types) {
		types.innerHTML += renderType(typeObj.type.name);
	}
	showLoadingSpinner();
	await playPokemonAudio(id);
	hideLoadingSpinner();
}

function activateFilterInput() {
	const input = document.getElementById("filterInput");
	input.disabled = false;
	input.placeholder = "Suche ein Pokemon";
	input.classList.add("highlight");
	setTimeout(() => {
		input.classList.remove("highlight");
	}, 1500);
}

function deactivateFilterInput() {
	const input = document.getElementById("filterInput");
	input.disabled = true;
	input.placeholder = "Pokemon werden geladen";
}

function handleBeforePageChange() {}

async function handleAfterPageChange() {
	updatePagination();
	await createPage();
	saveToSessionStorage("page", currentPage);
	window.scrollTo(0, 0);
}

function getColorsForTypes(id) {
	const json = fetchedPokemon[currentGen][id];
	const type1 = json.types[0].type.name;
	const type2 = json.types[1] ? json.types[1].type.name : null;
	const color1 = type1;
	const color2 = type2 ? type2 : color1;

	return `--color-type-one: var(--color-${color1});--color-type-two: var(--color-${color2});`;
}

async function playPokemonAudio(id) {
	const audio = await getPokemonAudio(id);
	audio.play();
	setTimeout(() => {
		audio.pause();
	}, 2000);
}
