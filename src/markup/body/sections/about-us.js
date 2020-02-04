const { section, div, h2 } = require("mithril-toolset").elements;
const svg = require(getPath("src/svg"));
const decorators = require("./decorators");

module.exports = section["#about-us.about-us"](
	decorators,
	div.article(h2("About us")),
	div.article["dashboard-wrapper"](
		svg(getPath("docs/assets/images/aditi-dashboard.svg")),
	),
);
