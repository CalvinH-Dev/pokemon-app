function renderType(type) {
	return /*html*/ `
    <img src="${POKE_TYPES[type].image}" alt="${type.name}"/>
  `;
}

function renderPokemonInfo(json) {
	return /*html*/ `
    <div>
      <img style="width: 50px; height: 50px;" src="${getFrontalImageUrlById(json.id)}"/>
      <p>${json.german_name}</p>
    </div>
    <div class="types"></div>
	`;
}

function renderPokemonContainer(json) {
	return /*html*/ `
    <div class="pokemon-container" style="order: ${json.id}" id="pokemon-${json.id}"></div>
  `;
}

function createPokemonCard(pokemonJSON) {
	const grid = document.querySelector(".grid");

	grid.innerHTML += renderPokemonContainer(pokemonJSON);
	const container = document.getElementById(`pokemon-${pokemonJSON.id}`);
	container.innerHTML = renderPokemonInfo(pokemonJSON);
	for (const typeObj of pokemonJSON.types) {
		container.innerHTML += renderType(typeObj.type.name);
	}
}
