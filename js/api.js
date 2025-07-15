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

async function fetchPokemon(id, gen) {
	const [pokemon, _] = getPokemonJSONById(id);
	if (pokemon) return pokemon;

	const url = new URL(id, BASE_URL_GENERAL);
	const json = await fetchJSONFromUrl(url);
	json.german_name = await getGermanNameById(json.id);

	fetchedPokemon[gen][json.id] = json;
	return fetchedPokemon[gen][json.id];
}

async function fetchAndRender(id) {
	try {
		const json = await fetchPokemon(id, currentGen);
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

async function fetchGen(gen) {
	deactivateFilterInput();

	const promises = [];
	const end = POKE_GENS[gen].lastId;

	const start = end - POKE_GENS[gen].count + 1;

	for (let id = start; id <= end; id++) {
		promises.push(fetchPokemon(id, gen));
	}

	await Promise.all(promises);
	activateFilterInput();
}

async function getPokemonAudio(id) {
	const url = getPokemonJSONById(id)[0].cries.legacy || getPokemonJSONById(id)[0].cries.latest;
	const audio = await fetchAudioFromUrl(url);

	return audio;
}
