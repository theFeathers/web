const { section, div, p, a, h2 } = require("mithril-toolset").elements;
const { css } = require("emotion");
const { getPath } = require("../../util");
const svg = require(getPath("src/markup/svg"));

const paragraph = css`
	max-width: 400px;
	a {
		color: inherit;
		font-weight: inherit;
	}
`;

const para = t => p[paragraph](t);

module.exports = section["#about-us.about-us"](
	div.article(
		h2("Who we are"),
		[
			"We are a young and passionate team, based out of the bustling metropolis of Chennai.",
			[
				"Founded by architect-programmer ",
				a({ href: "https://mkr.pw" }, "Muthu Kumar"),
				", with experience building large applications for multiple startups over the years",
				", joined by a lean pack of designers and developers ready for the next challenge.",
			],
		].map(para),
	),
	div.article["dashboard-wrapper"](
		svg(getPath("docs/assets/images/aditi-dashboard.svg")),
	),
);
