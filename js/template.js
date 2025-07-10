function renderType(type) {
	return /*html*/ `
    <img src="${POKE_TYPES[type].image}" alt="${POKE_TYPES[type].name}"/>
  `;
}

function renderPokemonInfo(json) {
	return /*html*/ `
	<div class="name-id-container">
    <p>${json.german_name}</p>
		<span class="pokemon-id">#${json.id}</span>
		</div>
    <img class="pokemon-img" style="width: 50px; height: 50px;" src="${getFrontalImageUrlById(
			json.id,
		)}"/>      
    <div class="types-container"></div>
	`;
}

function renderPokemonContainer(json) {
	return /*html*/ `
    <div onclick="openBigView(${json.id})" class="pokemon-container ${json.types[0].type.name}${
		json.types[1] ? " " + json.types[1].type.name : ""
	}" style="order: ${json.id};" id="pokemon-${json.id}"></div>
  `;
}

function renderEmptyList() {
	return /*html*/ `
		<h3 id="emptyListText">Es wurden keine Pokemon gefunden</h3>
		<button onclick="clearFilter()" id="clearFilterBtn">Filter aufheben</button>
	`;
}

function renderBigCard(id) {
	return /*html*/ `
		Hello ${id}
	`;
}
