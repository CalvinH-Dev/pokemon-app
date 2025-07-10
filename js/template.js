function renderType(type) {
	return /*html*/ `
    <img src="${POKE_TYPES[type].image}" alt="${POKE_TYPES[type].name}"/>
  `;
}

function renderPokemonInfo(json) {
	return /*html*/ `
	<div class="name-id-container">
    <p class="pokemon-name">${json.german_name}</p>
		<p class="pokemon-id">#${json.id}</p>
		</div>
    <img class="pokemon-img" style="width: 50px; height: 50px;" src="${getFrontalImageUrlById(
			json.id,
		)}"/>      
    <div class="types-container"></div>
	`;
}

function renderPokemonContainer(json) {
	return /*html*/ `
    <div onclick="openBigView(${json.id})" class="pokemon-container" style="order: ${
		json.id
	};${getColorsForTypes(json.id)}" id="pokemon-${json.id}"></div>
  `;
}

function renderEmptyList() {
	return /*html*/ `
		<h3 id="emptyListText">Es wurden keine Pokemon gefunden</h3>
		<button onclick="clearFilter()" id="clearFilterBtn">Filter aufheben</button>
	`;
}

function renderBigCard(json) {
	return /*html*/ `
		<h3>${json.german_name}</h3>
		<div class="card-img-container"><img src="${getFrontalImageUrlById(
			json.id,
		)}" alt=""><div class="big-types"></div></div>
		<div>Stärken</div>
		<div class="stats">${renderStats(json.stats)}</div>
	`;
}

function renderStats(stats) {
	return /*html*/ `
			${renderStatsNames(stats)}
			${renderStatsValues(stats)}			
	`;
}

function renderStatsNames(stats) {
	return /*html*/ `
		<div class="stat-names">
			<span>${stats[0].stat.name}</span>
			<span>${stats[1].stat.name}</span>
			<span>${stats[2].stat.name}</span>
			<span>${stats[3].stat.name}</span>
			<span>${stats[4].stat.name}</span>
			<span>${stats[5].stat.name}</span>
		</div>
	`;
}

function renderStatsValues(stats) {
	return /*html*/ `
		<div class="stat-values">
			<span>${stats[0].base_stat}</span>
			<span>${stats[1].base_stat}</span>
			<span>${stats[2].base_stat}</span>
			<span>${stats[3].base_stat}</span>
			<span>${stats[4].base_stat}</span>
			<span>${stats[5].base_stat}</span>

		</div>
	`;
}
