function calcWeaknessesForType(type1, type2) {
	const weak1 = DEFENDING[type1].weak;
	const weak2 = DEFENDING[type2].weak;
	const strong1 = DEFENDING[type1].strong;
	const strong2 = DEFENDING[type2].strong;

	const weakList1 = weak1.difference(strong2);
	const weakList2 = weak2.difference(strong1);

	return new Set([...weakList1, ...weakList2]);
}

function calcStrengthsForType(type1, type2) {
	const weak1 = DEFENDING[type1].weak;
	const weak2 = DEFENDING[type2].weak;
	const strong1 = DEFENDING[type1].strong;
	const strong2 = DEFENDING[type2].strong;

	const strongList1 = strong1.difference(weak2);
	const strongList2 = strong2.difference(weak1);

	return new Set([...strongList1, ...strongList2]);
}
