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
	const url = new URL(getLimitForGeneration(gen), BASE_URL_GENERAL);

	return url;
}

async function getGermanNameById(id) {
	const url = new URL(id, BASE_URL_SPECIES);
	const json = await fetchJSONFromUrl(url);

	return json.names[5].name;
}

async function fetchAndRender(id) {
	const fetchedJSON = fetchedPokemon[currentGen][id];
	if (fetchedJSON) {
		renderPokemonCard(fetchedJSON);
		return;
	}
	try {
		const json = await fetchPokemon(id);

		await renderPokemonCard(json);
	} catch (e) {
		console.error(e);
	}
}

async function getAllPokemonByPage(page, gen = 1) {
	const promises = [];
	const offset = pokeGens[gen].lastId - pokeGens[gen].count;
	const start = (page - 1) * PAGE_SIZE + offset + 1;
	const end = page * PAGE_SIZE + offset;

	if (start > pokeGens[gen].lastId) return;

	for (let id = start; id <= Math.min(end, pokeGens[gen].lastId); id++) {
		promises.push(fetchAndRender(id));
	}
	await Promise.all(promises);
}

async function fetchPokemon(id) {
	if (fetchedPokemon[currentGen][id]) return fetchedPokemon[currentGen][id];
	const url = new URL(id, BASE_URL_GENERAL);
	const data = await fetch(url);
	const json = await data.json();

	fetchedPokemon[currentGen][json.id] = json;
	fetchedPokemon[currentGen][json.id].german_name = await getGermanNameById(json.id);
	return fetchedPokemon[currentGen][json.id];
}

async function renderPokemonCard(json) {
	let typesHTML = "";
	for (let index = 0; index < json.types.length; index++) {
		typesHTML += /*html*/ `
				<img src="${types[json.types[index].type.name]}"/>
			`;
	}

	const grid = document.querySelector(".grid");
	grid.innerHTML += /*html*/ `
		<div class="pokemon-container" style="order: ${json.id}">
			<div>
				<img style="width: 50px; height: 50px;" src="${getFrontalImageUrlById(json.id)}"/>
				<p>${json.german_name}</p>
			</div>
			<div>${typesHTML}</div>
		</div>
	`;
}

function getFrontalImageUrlById(id) {
	return fetchedPokemon[currentGen][id].sprites.front_default;
}
