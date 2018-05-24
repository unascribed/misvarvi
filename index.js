var chromatism = require('chromatism');
var DeltaE = require('delta-e');
var namedColors = require('color-name-list');

if (!process.argv[2]) {
	console.error("misvarvi: usage: misvarvi <color>");
	process.exit(1);
	return;
}

function toLab(color) {
	var out = chromatism.convert(color).cielab;
	return {L:out.L,A:out.a,B:out.b};
}

var colorIn = toLab(process.argv[2]);

var closestDist = Infinity;
var closest = null;
var status;

namedColors.forEach((e) => {
	var dist = DeltaE.getDeltaE00(colorIn, toLab(e.hex));
	if (dist < closestDist) {
		closestDist = dist;
		closest = e;
	}
	if (closest === null && e.hex === "#000000") {
		closest = e;
	}
});

if (closestDist === Infinity) {
	// No match
	status = -1;
} else {
	if (closestDist === 0) {
		// Exact match
		status = 1;
	} else if (closestDist <= 1) {
		// Not perceptible by human eyes
		status = 2;
	} else if (closestDist < 2) {
		// Perceptible through close observation
		status = 4;
	} else if (closestDist < 10) {
		// Perceptible at a glance
		status = 8;
	} else if (closestDist < 49) {
		// Colors are more similar than opposite
		status = 16;
	} else {
		// Colors are different (but no better match was found)
		status = 32;
	}
}

console.log(JSON.stringify({
	delta: closestDist,
	status: status,
	hex: closest.hex,
	name: closest.name
}));
