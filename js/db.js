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
	4: {
		count: 107,
		lastId: 493,
	},
	5: {
		count: 156,
		lastId: 649,
	},
	6: {
		count: 72,
		lastId: 721,
	},
	7: {
		count: 88,
		lastId: 809,
	},
	8: {
		count: 96,
		lastId: 905,
	},
	9: {
		count: 120,
		lastId: 1025,
	},
};

const MAX_GEN = 9;

const POKE_TYPES = {
	normal: { image: "assets/icons/normal.png", name: "Normal", color: "" },
	fire: { image: "assets/icons/fire.png", name: "Feuer", color: "" },
	water: { image: "assets/icons/water.png", name: "Wasser", color: "" },
	electric: { image: "assets/icons/electric.png", name: "Elektro", color: "" },
	grass: { image: "assets/icons/grass.png", name: "Pflanze", color: "" },
	ice: { image: "assets/icons/ice.png", name: "Eis", color: "" },
	fighting: { image: "assets/icons/fighting.png", name: "Kampf", color: "" },
	poison: { image: "assets/icons/poison.png", name: "Gift", color: "" },
	ground: { image: "assets/icons/ground.png", name: "Boden", color: "" },
	flying: { image: "assets/icons/flying.png", name: "Flug", color: "" },
	psychic: { image: "assets/icons/psychic.png", name: "Psycho", color: "" },
	bug: { image: "assets/icons/bug.png", name: "Käfer", color: "" },
	rock: { image: "assets/icons/rock.png", name: "Gestein", color: "" },
	ghost: { image: "assets/icons/ghost.png", name: "Geist", color: "" },
	dragon: { image: "assets/icons/dragon.png", name: "Drache", color: "" },
	dark: { image: "assets/icons/dark.png", name: "Unlicht", color: "" },
	steel: { image: "assets/icons/steel.png", name: "Stahl", color: "" },
	fairy: { image: "assets/icons/fairy.png", name: "Fee", color: "" },
};

const ATTACKING = {
	normal: {
		strong: new Set([]),
		weak: new Set(["rock", "steel"]),
	},
	fighting: {
		strong: new Set(["ice", "rock", "dark", "steel"]),
		weak: new Set(["poison", "flying", "psychic", "bug", "fairy"]),
	},
	flying: {
		strong: new Set(["grass", "fighting", "bug"]),
		weak: new Set(["rock", "steel"]),
	},
	poison: {
		strong: new Set(["grass", "fairy"]),
		weak: new Set(["poison", "ground", "rock", "ghost"]),
	},
	ground: {
		strong: new Set(["fire", "electric", "poison", "rock", "steel"]),
		weak: new Set(["grass", "bug"]),
	},
	rock: {
		strong: new Set(["fire", "ice", "flying", "bug"]),
		weak: new Set(["fighting", "ground", "steel"]),
	},
	bug: {
		strong: new Set(["grass", "psychic"]),
		weak: new Set(["fire", "fighting", "poison", "flying", "ghost"]),
	},
	ghost: {
		strong: new Set(["psychic", "ghost"]),
		weak: new Set(["dark"]),
	},
	steel: {
		strong: new Set(["ice", "rock", "fairy"]),
		weak: new Set(["fire", "water", "electric", "steel"]),
	},
	fire: {
		strong: new Set(["grass", "ice", "bug", "steel"]),
		weak: new Set(["fire", "water", "rock", "dragon"]),
	},
	water: {
		strong: new Set(["fire", "ground", "rock"]),
		weak: new Set(["water", "grass", "dragon"]),
	},
	grass: {
		strong: new Set(["water", "ground", "rock"]),
		weak: new Set(["fire", "grass", "poison", "flying", "bug", "dragon", "steel"]),
	},
	electric: {
		strong: new Set(["water", "flying"]),
		weak: new Set(["electric", "grass", "dragon"]),
	},
	psychic: {
		strong: new Set(["fighting", "poison"]),
		weak: new Set(["psychic"]),
	},
	ice: {
		strong: new Set(["grass", "ground", "flying", "dragon"]),
		weak: new Set(["fire", "water", "steel"]),
	},
	dragon: {
		strong: new Set(["dragon"]),
		weak: new Set(["steel"]),
	},
	dark: {
		strong: new Set(["psychic", "ghost"]),
		weak: new Set(["fighting", "dark", "fairy"]),
	},
	fairy: {
		strong: new Set(["fighting", "dragon", "dark"]),
		weak: new Set(["fire", "poison", "steel"]),
	},
};

const DEFENDING = {
	normal: {
		weak: new Set(["fighting"]),
		strong: new Set([]),
	},
	fire: {
		weak: new Set(["ground", "rock", "water"]),
		strong: new Set(["bug", "steel", "fire", "grass", "ice", "fairy"]),
	},
	water: {
		weak: new Set(["grass", "electric"]),
		strong: new Set(["steel", "fire", "water", "ice"]),
	},
	electric: {
		weak: new Set(["ground"]),
		strong: new Set(["flying", "steel", "electric"]),
	},
	grass: {
		weak: new Set(["flying", "poison", "bug", "fire", "ice"]),
		strong: new Set(["water", "electric", "grass", "ground"]),
	},
	ice: {
		weak: new Set(["fighting", "rock", "steel", "fire"]),
		strong: new Set(["ice"]),
	},
	fighting: {
		weak: new Set(["flying", "psychic", "fairy"]),
		strong: new Set(["rock", "bug", "dark"]),
	},
	poison: {
		weak: new Set(["ground", "psychic"]),
		strong: new Set(["fighting", "poison", "bug", "grass", "fairy"]),
	},
	ground: {
		weak: new Set(["water", "grass", "ice"]),
		strong: new Set(["poison", "rock"]),
	},
	flying: {
		weak: new Set(["electric", "ice", "rock"]),
		strong: new Set(["fighting", "bug", "grass"]),
	},
	psychic: {
		weak: new Set(["bug", "ghost", "dark"]),
		strong: new Set(["fighting", "psychic"]),
	},
	bug: {
		weak: new Set(["flying", "rock", "fire"]),
		strong: new Set(["fighting", "ground", "grass"]),
	},
	rock: {
		weak: new Set(["fighting", "ground", "steel", "water", "grass"]),
		strong: new Set(["normal", "flying", "poison", "fire"]),
	},
	ghost: {
		weak: new Set(["ghost", "dark"]),
		strong: new Set(["poison", "bug"]),
	},
	dragon: {
		weak: new Set(["ice", "dragon", "fairy"]),
		strong: new Set(["fire", "water", "electric", "grass"]),
	},
	dark: {
		weak: new Set(["fighting", "bug", "fairy"]),
		strong: new Set(["ghost", "dark"]),
	},
	steel: {
		weak: new Set(["fighting", "ground", "fire"]),
		strong: new Set([
			"normal",
			"flying",
			"rock",
			"bug",
			"steel",
			"grass",
			"psychic",
			"ice",
			"dragon",
			"fairy",
		]),
	},
	fairy: {
		weak: new Set(["poison", "steel"]),
		strong: new Set(["fighting", "bug", "dark"]),
	},
};

const TYPES = [
	"normal",
	"fire",
	"water",
	"electric",
	"grass",
	"ice",
	"fighting",
	"poison",
	"ground",
	"flying",
	"psychic",
	"bug",
	"rock",
	"ghost",
	"dragon",
	"dark",
	"steel",
	"fairy",
];

const BASE_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_URL_GENERAL = "https://pokeapi.co/api/v2/pokemon/";
const PAGE_SIZE = 28;

let fetchedPokemon = {
	1: {},
	2: {},
	3: {},
	4: {},
	5: {},
	6: {},
	7: {},
	8: {},
	9: {},
};
