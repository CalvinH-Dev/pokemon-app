import {
	prevPage,
	nextPage,
	changeGen,
	filterPokemon,
	setAudio,
} from "./index";

import { saveOldInputValue } from "./helper";
import { closeBigView } from "./views";

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const genSelect = document.getElementById("genSelect");
const filterInput = document.getElementById("filterInput");
const soundBtn = document.getElementById("sound");
const bigCardOverlay = document.getElementById("bigCardOverlay");

prevBtn.addEventListener("click", () => {
	prevPage();
});

nextBtn.addEventListener("click", () => {
	nextPage();
});

genSelect.addEventListener("change", () => {
	changeGen();
});

filterInput.addEventListener("focus", () => {
	saveOldInputValue();
});

filterInput.addEventListener("input", (event) => {
	filterPokemon(event);
});

soundBtn.addEventListener("change", (event) => {
	setAudio(event);
});

bigCardOverlay.addEventListener("click", (event) => {
	closeBigView(event);
});
