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
	fetchGen();
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
	await fetchGen();
	saveToSessionStorage("page", currentPage);
	saveToSessionStorage("gen", currentGen);
}

async function filterPokemon(event) {
	const filterInput = document.getElementById("filterInput");

	const needsRerender =
		(event.inputType === "deleteContentForward" || event.inputType === "deleteContentBackward") &&
		filterInput.value.length <= 2 &&
		oldFilterValue.length > 2;

	if (filterInput.value.length > 2) {
		showFilteredView();
	} else if (needsRerender) {
		await showNormalView();
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
