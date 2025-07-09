let currentPage = 1;
let currentGen = 1;
let oldFilterValue = "";

const filterInput = document.getElementById("filterInput");

async function init() {
	currentPage = 1;
	currentGen = 1;
	updatePaginationButtons();
	await createPage();
	fetchGen();
}

init();

async function nextPage() {
	currentPage++;
	updatePaginationButtons();
	await createPage();
}

async function prevPage() {
	currentPage--;
	updatePaginationButtons();
	await createPage();
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
	await createPage();
	await fetchGen();
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
