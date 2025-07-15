let currentPage = 1;
let currentGen = 1;
let isAudioOn = true;
let oldFilterValue = "";
let filteredPokemon = [];

init();

async function init() {
	loadInitialFromStorage();
	updatePagination();
	await createPage();
	await fetchAllGens();
}

async function fetchAllGens() {
	for (let gen = 1; gen <= MAX_GEN; gen++) {
		await fetchGen(gen);
	}
}

async function nextPage() {
	currentPage++;
	await handleAfterPageChange();
}

async function prevPage() {
	currentPage--;
	await handleAfterPageChange();
}

async function clearFilter() {
	const input = document.getElementById("filterInput");
	input.value = "";
	await showNormalView();
	saveOldInputValue();
}

async function createPage() {
	showLoadingSpinner();
	const grid = document.querySelector(".grid");
	grid.innerHTML = "";

	await renderAllPokemonForPage(currentPage, currentGen);
	setTimeout(() => {
		hideLoadingSpinner();
	}, 250);
}

async function changeGen() {
	const select = document.getElementById("genSelect");
	const gen = select.value;
	currentPage = 1;
	currentGen = gen;
	updatePagination();
	await createPage();
	await fetchAllGens();
	saveToSessionStorage("page", currentPage);
	saveToSessionStorage("gen", currentGen);
}

async function filterPokemon(event) {
	const filterInput = document.getElementById("filterInput");
	const value = filterInput.value;

	const needsRerender =
		(event.inputType === "deleteContentForward" || event.inputType === "deleteContentBackward") &&
		value.length <= 2 &&
		oldFilterValue.length > 2;

	const isNumber = isNumeric(value);

	if (isNumber) {
		showFilteredView(isNumber);
	} else if (value === "") {
		await showNormalView();
	} else {
		if (value.length > 2) {
			showFilteredView(isNumber);
		} else if (needsRerender) {
			await showNormalView();
		}
	}

	saveOldInputValue();
}

function setAudio(event) {
	const audioInput = event.currentTarget;
	isAudioOn = audioInput.checked;
	saveToSessionStorage("audio", isAudioOn);
}

function loadInitialFromStorage() {
	currentPage = getFromSessionStorage("page") || 1;
	currentGen = getFromSessionStorage("gen") || 1;
	isAudioOn = !!getFromSessionStorage("audio");

	const select = document.getElementById("genSelect");
	select.value = currentGen;
	const audioInput = document.getElementById("sound");
	audioInput.checked = isAudioOn;
}

async function nextPokemon(id) {
	let json = {};
	if (getCurrentView() === "filtered") {
		json = getNextPokemonFilteredView(id);
	} else {
		json = getNextPokemonNormalView(id);
	}

	await createBigCard(json);
}

async function prevPokemon(id) {
	let json = {};
	if (getCurrentView() === "filtered") {
		json = getPrevPokemonFilteredView(id);
	} else {
		json = getPrevPokemonNormalView(id);
	}

	await createBigCard(json);
}
