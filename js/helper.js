function getLimitForGeneration(gen) {
	const lastIdGenBefore = POKE_GENS[gen - 1]?.lastId || 0;
	return `?limit=${POKE_GENS[gen].lastId}&offset=${lastIdGenBefore}`;
}

function getFrontalImageUrlById(id) {
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
	const shouldHide = getCurrentView() !== "grid";
	const pagination = document.querySelector(".pagination");
	const pageText = document.getElementById("pageCount");
	pageText.innerHTML = getPageText(currentPage);
	pagination.classList.toggle("d-none", shouldHide);

	updatePaginationButtons();
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

function saveToSessionStorage(key, value) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

function getFromSessionStorage(key) {
	return JSON.parse(sessionStorage.getItem(key));
}

function activateFilterInput() {
	const filterInput = document.getElementById("filterInput");
	filterInput.disabled = false;
	filterInput.placeholder = "Suche ein Pokemon";
	filterInput.classList.add("highlight");
	setTimeout(() => {
		filterInput.classList.remove("highlight");
	}, 1500);
}

function deactivateFilterInput() {
	const filterInput = document.getElementById("filterInput");
	filterInput.disabled = true;
	filterInput.placeholder = "Pokemon werden geladen";
}

async function handleAfterPageChange() {
	updatePagination();
	await createPage();
	saveToSessionStorage("page", currentPage);
	window.scrollTo(0, 0);
}

function getColorsForTypes(id) {
	const json = fetchedPokemon[currentGen][id];
	const [type1, type2] = getTypesFromJSON(json);

	return `--color-type-one: var(--color-${type1});--color-type-two: var(--color-${type2});`;
}

async function playPokemonAudio(id) {
	if (!getSoundEnabled()) return;

	const audio = await getPokemonAudio(id);
	audio.volume = 0.05;
	audio.play();

	setTimeout(() => {
		audio.pause();
	}, 2000);
}

function getTypesFromJSON(json) {
	const type1 = json.types[0].type.name;
	const type2 = json.types[1] ? json.types[1].type.name : type1;

	return [type1, type2];
}

function getInteractionsHTML(json) {
	const [type1, type2] = getTypesFromJSON(json);

	const weaknesses = getWeaknesses(type1, type2);
	const strengths = getStrengths(type1, type2);

	return { weak: weaknesses, strong: strengths };
}

function getWeaknesses(type1, type2) {
	const weakList = calcWeaknessesForType(type1, type2);
	let weaknesses = "";
	for (const el of weakList) {
		weaknesses += renderType(el);
	}

	return weaknesses;
}

function getStrengths(type1, type2) {
	const strongList = calcStrengthsForType(type1, type2);
	let strengths = "";
	for (const el of strongList) {
		strengths += renderType(el);
	}

	return strengths;
}

function getSoundEnabled() {
	const soundRef = document.getElementById("sound");
	return soundRef.checked;
}
