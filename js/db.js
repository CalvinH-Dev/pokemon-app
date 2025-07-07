const pokeGens = {
	1: {
		count: 151,
		lastId: 151,
	},
	2: {
		count: 100,
		lastId: 251,
	},
	3: {
		count: 135,
		lastId: 386,
	},
};

let fetchedPokemon = {};
let currentPage = 1;
let currentGen = 1;

const BASE_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_URL_GEN = "https://pokeapi.co/api/v2/pokemon";
const PAGE_SIZE = 20;
