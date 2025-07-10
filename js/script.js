let currentPage = 1;
let currentGen = 1;
let oldFilterValue = "";

const filterInput = document.getElementById("filterInput");

async function init() {
	loadPageAndGenFromStorage();
	updatePagination();
	await createPage();
	fetchGen();
}

init();

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

function loadPageAndGenFromStorage() {
	currentPage = getFromSessionStorage("page") || 1;
	currentGen = getFromSessionStorage("gen") || 1;

	const select = document.getElementById("genSelect");
	select.value = currentGen;
}
