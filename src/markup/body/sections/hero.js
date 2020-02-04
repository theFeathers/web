const {
	div,
	img,
	h1,
	p,
	figure,
	section,
	a,
	span,
	i,
} = require("mithril-toolset").elements;

const decorators = div.decorators(
	["rect", "square", "triangle"].map(name =>
		img[`.decorator-${name}`]({
			src: `/assets/images/${name}.svg`,
			alt: name,
		}),
	),
);

module.exports = section["#home.hero"](
	decorators,
	div.article(
		h1("Feathers Studio"),
		p("Media and Branding Agency"),
		p(a.link(span("Let's talk"), i["arrow-right"]())),
	),
	figure(
		img({
			src: "/assets/images/hero-logo.png",
			alt: "Feathers Studio animated logo",
		}),
	),
);
