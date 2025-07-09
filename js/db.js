const POKE_GENS = {
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

const POKE_TYPES = {
	normal: { image: "/assets/icons/normal.png", name: "Normal", color: "" },
	fire: { image: "/assets/icons/fire.png", name: "Feuer", color: "" },
	water: { image: "/assets/icons/water.png", name: "Wasser", color: "" },
	electric: { image: "/assets/icons/electric.png", name: "Elektro", color: "" },
	grass: { image: "/assets/icons/grass.png", name: "Pflanze", color: "" },
	ice: { image: "/assets/icons/ice.png", name: "Eis", color: "" },
	fighting: { image: "/assets/icons/fighting.png", name: "Kampf", color: "" },
	poison: { image: "/assets/icons/poison.png", name: "Gift", color: "" },
	ground: { image: "/assets/icons/ground.png", name: "Boden", color: "" },
	flying: { image: "/assets/icons/flying.png", name: "Flug", color: "" },
	psychic: { image: "/assets/icons/psychic.png", name: "Psycho", color: "" },
	bug: { image: "/assets/icons/bug.png", name: "Käfer", color: "" },
	rock: { image: "/assets/icons/rock.png", name: "Gestein", color: "" },
	ghost: { image: "/assets/icons/ghost.png", name: "Geist", color: "" },
	dragon: { image: "/assets/icons/dragon.png", name: "Drache", color: "" },
	dark: { image: "/assets/icons/dark.png", name: "Unlicht", color: "" },
	steel: { image: "/assets/icons/steel.png", name: "Stahl", color: "" },
	fairy: { image: "/assets/icons/fairy.png", name: "Fee", color: "" },
};

let fetchedPokemon = { 1: {}, 2: {}, 3: {} };

const BASE_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_URL_GENERAL = "https://pokeapi.co/api/v2/pokemon/";
const PAGE_SIZE = 21;
