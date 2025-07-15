function renderType(type) {
	return /*html*/ `
    <abbr title="${type}"><img src="${POKE_TYPES[type].image}" alt="${POKE_TYPES[type].name}"/></abbr>
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

function renderButtons(id) {
	return /*html*/ `
		<button onclick="prevPokemon(${id})" class="big-card-btn prev"></button>
	<button onclick="nextPokemon(${id})" class="big-card-btn next"></button>
	`;
}

function renderBigCard(json) {
	return /*html*/ `
	${renderButtons(json.id)}
	<h4 class="big-pokemon-id">Gen ${json.gen} #${json.id}</h4>
		<h3>${json.german_name}</h3>
		<div class="card-img-container"><img src="${getFrontalImageUrlById(
			json.id,
		)}" alt=""><div class="big-types"></div></div>
		<div class="strengths-weaknesses"></div>
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
			${stats.map((s) => `<span>${s.stat.name}</span>`).join("")}
		</div>
	`;
}

function renderStatsValues(stats) {
	return /*html*/ `
		<div class="stat-values">
			${stats.map((s) => `<span>${s.base_stat}</span>`).join("")}
		</div>
	`;
}

function renderInteractions(weak, strong) {
	return /*html*/ `
		<div class="interaction weak">
			<span>Weak vs.</span>
			<div class="interaction-img-container">${weak}</div>
		</div>
		<div class="interaction strong">
			<span>Strong vs.</span>
			<div class="interaction-img-container">${strong}</div>
		</div>
	`;
}
