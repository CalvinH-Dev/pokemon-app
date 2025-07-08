function renderType(type) {
	return /*html*/ `
    <img src="${POKE_TYPES[type].image}" alt="${POKE_TYPES[type].name}"/>
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
