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

const types = {
	normal:
		"https://archives.bulbagarden.net/media/upload/thumb/8/8c/Normal_icon_HOME3.png/48px-Normal_icon_HOME3.png",
	fire: "https://archives.bulbagarden.net/media/upload/thumb/f/f9/Fire_icon_HOME3.png/48px-Fire_icon_HOME3.png",
	water:
		"https://archives.bulbagarden.net/media/upload/thumb/e/e7/Water_icon_HOME3.png/48px-Water_icon_HOME3.png",
	electric:
		"https://archives.bulbagarden.net/media/upload/thumb/c/cf/Electric_icon_HOME3.png/48px-Electric_icon_HOME3.png",
	grass:
		"https://archives.bulbagarden.net/media/upload/thumb/8/81/Grass_icon_HOME3.png/48px-Grass_icon_HOME3.png",
	ice: "https://archives.bulbagarden.net/media/upload/thumb/8/86/Ice_icon_HOME3.png/48px-Ice_icon_HOME3.png",
	fighting:
		"https://archives.bulbagarden.net/media/upload/thumb/c/c2/Fighting_icon_HOME3.png/48px-Fighting_icon_HOME3.png",
	poison:
		"https://archives.bulbagarden.net/media/upload/thumb/9/98/Poison_icon_HOME3.png/48px-Poison_icon_HOME3.png",
	ground:
		"https://archives.bulbagarden.net/media/upload/thumb/e/ee/Ground_icon_HOME3.png/48px-Ground_icon_HOME3.png",
	flying:
		"https://archives.bulbagarden.net/media/upload/thumb/c/c5/Flying_icon_HOME3.png/48px-Flying_icon_HOME3.png",
	psychic:
		"https://archives.bulbagarden.net/media/upload/thumb/2/2d/Psychic_icon_HOME3.png/48px-Psychic_icon_HOME3.png",
	bug: "https://archives.bulbagarden.net/media/upload/thumb/5/51/Bug_icon_HOME3.png/48px-Bug_icon_HOME3.png",
	rock: "https://archives.bulbagarden.net/media/upload/thumb/5/51/Rock_icon_HOME3.png/48px-Rock_icon_HOME3.png",
	ghost:
		"https://archives.bulbagarden.net/media/upload/thumb/2/23/Ghost_icon_HOME3.png/48px-Ghost_icon_HOME3.png",
	dragon:
		"https://archives.bulbagarden.net/media/upload/thumb/c/c6/Dragon_icon_HOME3.png/48px-Dragon_icon_HOME3.png",
	dark: "https://archives.bulbagarden.net/media/upload/thumb/7/71/Dark_icon_HOME3.png/48px-Dark_icon_HOME3.png",
	steel:
		"https://archives.bulbagarden.net/media/upload/thumb/7/78/Steel_icon_HOME3.png/48px-Steel_icon_HOME3.png",
	fairy:
		"https://archives.bulbagarden.net/media/upload/thumb/0/0b/Fairy_icon_HOME3.png/48px-Fairy_icon_HOME3.png",
};

let fetchedPokemon = { 1: {}, 2: {}, 3: {} };

const BASE_URL_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const BASE_URL_GENERAL = "https://pokeapi.co/api/v2/pokemon/";
const PAGE_SIZE = 20;
