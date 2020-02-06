const render = require("mithril-node-render");

const pages = ["index", "submit", "404"].map(page => [
	`${page}.html`,
	require(`./pages/${page}`),
]);

const { stylesheets } = require("./generateCSS");

module.exports = {
	pages: pages.map(([name, toRender]) => [
		name,
		render.sync(toRender({ stylesheets })),
	]),
	stylesheets,
};
