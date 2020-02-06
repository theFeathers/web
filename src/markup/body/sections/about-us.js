const { section, div, p, a, h2 } = require("mithril-toolset").elements;
const { css } = require("emotion");
const { getPath } = require("../../util");
const svg = require(getPath("src/markup/svg"));

const x = css`
	text-decoration: none;
`;

const para = t => p(t);

module.exports = section["#about-us.about-us"](
	div.article(
		h2("About us"),
		[
			"We are a young and passionate team, based out of the bustling metropolis of Chennai.",
			[
				"Founded by architect-programmer ",
				a[x]({ href: "https://mkr.pw" }, "Muthu Kumar"),
				", with experience building large applications for multiple startups",
			],
		].map(para),
	),
	div.article["dashboard-wrapper"](
		svg(getPath("docs/assets/images/aditi-dashboard.svg")),
	),
);
