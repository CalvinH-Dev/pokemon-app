import {
	saveOldInputValue,
	updatePagination,
	handleAfterPageChange,
	saveToSessionStorage,
	isNumeric,
	getFromSessionStorage,
	getNextPokemonFilteredView,
	getNextPokemonNormalView,
	getPrevPokemonFilteredView,
	getPrevPokemonNormalView,
} from "./helper";
import {
	MAX_GEN,
	incrementPage,
	decrementPage,
	currentPage,
	currentGen,
	setCurrentPage,
	setCurrentGen,
	oldFilterValue,
	isAudioOn,
	setIsAudioOn,
} from "./db";
import { fetchGen, renderAllPokemonForPage } from "./api";
import {
	showNormalView,
	showLoadingSpinner,
	hideLoadingSpinner,
	showFilteredView,
	getCurrentView,
	createBigCard,
} from "./views";

import "./listeners";

init();

async function init() {
	loadInitialFromStorage();
	updatePagination();
	await createPage();
	await fetchAllGens();
}

async function fetchAllGens() {
	for (let gen = 1; gen <= MAX_GEN; gen++) {
		await fetchGen(gen);
	}
}

export async function nextPage() {
	incrementPage();
	await handleAfterPageChange();
}

export async function prevPage() {
	decrementPage();
	await handleAfterPageChange();
}

window.clearFilter = async function () {
	const input = document.getElementById("filterInput");
	input.value = "";
	await showNormalView();
	saveOldInputValue();
};

export async function createPage() {
	showLoadingSpinner();
	const grid = document.querySelector(".grid");
	grid.innerHTML = "";

	await renderAllPokemonForPage(currentPage, currentGen);
	setTimeout(() => {
		hideLoadingSpinner();
	}, 250);
}

export async function changeGen() {
	const select = document.getElementById("genSelect");
	const gen = select.value;
	setCurrentPage(1);
	setCurrentGen(gen);
	updatePagination();
	await window.clearFilter();
	await createPage();
	await fetchAllGens();
	saveToSessionStorage("page", currentPage);
	saveToSessionStorage("gen", currentGen);
}

export async function filterPokemon(event) {
	const filterInput = document.getElementById("filterInput");
	const value = filterInput.value;

	const needsRerender =
		(event.inputType === "deleteContentForward" ||
			event.inputType === "deleteContentBackward") &&
		value.length <= 2 &&
		oldFilterValue.length > 2;

	const isNumber = isNumeric(value);

	if (isNumber) {
		showFilteredView(isNumber);
	} else if (value === "") {
		await showNormalView();
	} else {
		if (value.length > 2) {
			showFilteredView(isNumber);
		} else if (needsRerender) {
			await showNormalView();
		}
	}

	saveOldInputValue();
}

export function setAudio(event) {
	const audioInput = event.currentTarget;
	setIsAudioOn(audioInput.checked);
	saveToSessionStorage("audio", isAudioOn);
}

function loadInitialFromStorage() {
	setCurrentPage(getFromSessionStorage("page") || 1);
	setCurrentGen(getFromSessionStorage("gen") || 1);
	setIsAudioOn(!!getFromSessionStorage("audio"));

	const select = document.getElementById("genSelect");
	select.value = currentGen;
	const audioInput = document.getElementById("sound");
	audioInput.checked = isAudioOn;
}

window.nextPokemon = async function (id) {
	let json = {};
	if (getCurrentView() === "filtered") {
		json = getNextPokemonFilteredView(id);
	} else {
		json = getNextPokemonNormalView(id);
	}

	await createBigCard(json);
};

window.prevPokemon = async function (id) {
	let json = {};
	if (getCurrentView() === "filtered") {
		json = getPrevPokemonFilteredView(id);
	} else {
		json = getPrevPokemonNormalView(id);
	}

	await createBigCard(json);
};
