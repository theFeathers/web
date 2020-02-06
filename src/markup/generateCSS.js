const { resolve } = require("path");
const { readFileSync } = require("fs");
const { createHash } = require("crypto");

const { cache } = require("emotion");

const composeCSS = cache => {
	let CSS = "";
	for (const key in cache) {
		CSS += "\n" + cache[key];
	}
	return CSS;
};

const convertToFilename = name => `css/${name}.css`;

const getFiles = CSS => [
	convertToFilename(
		createHash("md5")
			.update(CSS)
			.digest("hex")
			.substr(0, 12),
	),
	CSS,
];

exports.stylesheets = [
	["css/normalise.css", readFileSync(require.resolve("normalize.css"))],
	getFiles(readFileSync(resolve(__dirname, "css/fonts.css"))),
	getFiles(readFileSync(resolve(__dirname, "css/main.css"))),
	getFiles(composeCSS(cache.inserted)),
];
