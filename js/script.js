async function init() {
	renderAllPokemonForPage(1, 3);
}

init();

function nextPage() {
	return currentPage + 1;
}

async function testAgain() {
	await renderAllPokemonForPage(nextPage(), currentGen);
}

async function renderAllPokemonForPage(page, gen) {
	currentPage = page;
	currentGen = gen;

	const grid = document.querySelector(".grid");
	grid.innerHTML = "";

	getAllPokemonForPage(page, gen);
}
