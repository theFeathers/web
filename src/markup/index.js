const { resolve } = require("path");
const { readFileSync } = require("fs");
const { createHash } = require("crypto");

const { cache } = require("emotion");
const m = require("mithril");
const render = require("mithril-node-render");
const { html } = require("mithril-toolset").elements;

const head = require("./head");
const body = require("./body");

const composeCSS = cache => {
	let CSS = "";
	for (const key in cache) {
		CSS += cache[key];
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

const stylesheets = [
	["css/normalise.css", readFileSync(require.resolve("normalize.css"))],
	getFiles(readFileSync(resolve(__dirname, "css/fonts.css"))),
	getFiles(readFileSync(resolve(__dirname, "css/main.css"))),
	getFiles(composeCSS(cache.inserted)),
];

const page = m.fragment(
	m.trust("<!DOCTYPE html>"),
	html({ lang: "EN" }, head({ stylesheets }), body),
);

module.exports = {
	html: render.sync(page),
	stylesheets,
};
