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

async function fetchAudioFromUrl(url) {
	try {
		const audioObj = await fetch(url);
		const blob = await audioObj.blob();
		const urlObject = URL.createObjectURL(blob);
		return new Audio(urlObject);
	} catch (e) {
		console.error(e);
		return null;
	}
}

async function getGermanNameById(id) {
	const url = new URL(id, BASE_URL_SPECIES);
	const json = await fetchJSONFromUrl(url);

	return json.names[5].name;
}

async function fetchPokemon(id) {
	if (fetchedPokemon[currentGen][id]) return fetchedPokemon[currentGen][id];

	const url = new URL(id, BASE_URL_GENERAL);
	const json = await fetchJSONFromUrl(url);
	json.german_name = await getGermanNameById(json.id);

	fetchedPokemon[currentGen][json.id] = json;
	return fetchedPokemon[currentGen][json.id];
}

async function fetchAndRender(id) {
	try {
		const json = await fetchPokemon(id);
		createPokemonCard(json);
	} catch (e) {
		console.error(e);
	}
}

async function renderAllPokemonForPage(page, gen) {
	const promises = [];
	const offset = POKE_GENS[gen].lastId - POKE_GENS[gen].count;
	const start = (page - 1) * PAGE_SIZE + offset + 1;
	const end = Math.min(page * PAGE_SIZE + offset, POKE_GENS[gen].lastId);

	if (start > POKE_GENS[gen].lastId) return;
	for (let id = start; id <= end; id++) {
		promises.push(fetchAndRender(id));
	}
	await Promise.all(promises);
}

async function fetchGen() {
	deactivateFilterInput();

	const promises = [];
	const end = POKE_GENS[currentGen].lastId;
	const start = end - POKE_GENS[currentGen].count + 1;

	for (let id = start; id <= end; id++) {
		promises.push(fetchPokemon(id));
	}

	await Promise.all(promises);
	activateFilterInput();
}

async function getPokemonAudio(id) {
	const url = fetchedPokemon[currentGen][id].cries.legacy;

	return await fetchAudioFromUrl(url);
}
