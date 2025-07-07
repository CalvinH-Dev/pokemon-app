async function fetchJSONFromUrl(url) {
	try {
		const data = await fetch(url);
		const json = await data.json();
		return json;
	} catch (e) {
		console.error(e);
		return null;
	}
}

function getLimitForGeneration(gen) {
	const lastIdGenBefore = pokeGens[gen - 1] ? pokeGens[gen - 1].lastId : 0;
	return `?limit=${pokeGens[gen].lastId}&offset=${lastIdGenBefore}`;
}

function getGenerationURL(gen) {
	const url = new URL(getLimitForGeneration(gen), BASE_URL_GEN);

	return url;
}

async function getGermanNameFromId(id) {
	const url = new URL(id, BASE_URL_SPECIES);
	const json = await fetchJSONFromUrl(url);

	return json.names[5].name;
}

function fetchAndRender(id) {
	const fetchedJSON = fetchedPokemon[id];
	if (fetchedJSON) {
		renderPokemonCard(fetchedJSON);
		return;
	}
	const url = new URL(id, BASE_URL_SPECIES);
	try {
		const prom = fetch(url);
		fetchPokemonThen(prom);
		return prom;
	} catch (e) {
		console.error(e);
		return null;
	}
}

async function getAllPokemonForPage(page, gen = 1) {
	const promises = [];
	const offset = pokeGens[gen].lastId - pokeGens[gen].count;
	const start = (page - 1) * PAGE_SIZE + offset + 1;
	const end = page * PAGE_SIZE + offset;

	if (start > pokeGens[gen].lastId) return;

	for (let id = start; id <= Math.min(end, pokeGens[gen].lastId); id++) {
		const prom = fetchAndRender(id);
		!prom || promises.push(prom);
	}
	// await Promise.all(promises);
}

function fetchPokemonThen(prom) {
	prom.then((data) => {
		data.json().then((json) => {
			fetchedPokemon[json.id] = json;
			getGermanNameFromId(json.id).then((name) => {
				fetchedPokemon[json.id].german_name = name;
				renderPokemonCard(json);
			});
		});
	});
}

async function renderPokemonCard(json) {
	const grid = document.querySelector(".grid");
	grid.innerHTML += /*html*/ `
		<div style="order: ${json.id}">${json.german_name}</div>
	`;
}

function getFrontalImageFromId(id) {
	const url = fetchedPokemon[id].sprites.front_default;

	return fetchJSONFromUrl(url);
}
