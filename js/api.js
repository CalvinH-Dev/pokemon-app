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
	const lastIdGenBefore = POKE_GENS[gen - 1] ? POKE_GENS[gen - 1].lastId : 0;
	return `?limit=${POKE_GENS[gen].lastId}&offset=${lastIdGenBefore}`;
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
	console.log(fetchedPokemon);
	const fetchedJSON = fetchedPokemon[currentGen][id];
	if (fetchedJSON) {
		createPokemonCard(fetchedJSON);
		// renderPokemonCard(fetchedJSON);
		return;
	}
	try {
		const json = await fetchPokemon(id);

		createPokemonCard(json);
		// renderPokemonCard(json);
	} catch (e) {
		console.error(e);
	}
}

async function getAllPokemonByPage(page, gen = 1) {
	const promises = [];
	const offset = POKE_GENS[gen].lastId - POKE_GENS[gen].count;
	const start = (page - 1) * PAGE_SIZE + offset + 1;
	const end = page * PAGE_SIZE + offset;

	if (start > POKE_GENS[gen].lastId) return;
	for (let id = start; id <= Math.min(end, POKE_GENS[gen].lastId); id++) {
		promises.push(fetchAndRender(id));
	}
	await Promise.all(promises);
	console.log(end);
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

function getFrontalImageUrlById(id) {
	return fetchedPokemon[currentGen][id].sprites.front_default;
}
