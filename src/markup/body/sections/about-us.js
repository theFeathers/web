const { section, div, h2 } = require("mithril-toolset").elements;
const svg = require(getPath("src/markup/svg"));

module.exports = section["#about-us.about-us"](
	div.article(h2("About us")),
	div.article["dashboard-wrapper"](
		svg(getPath("docs/assets/images/aditi-dashboard.svg")),
	),
);
