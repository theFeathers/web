const { head, title, meta, link } = require("mithril-toolset").elements;

const links = [
	"/style/normalise.css",
	"/style/main.css",
	"https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap",
];

const createLink = rel => href => link({ href, rel });

module.exports = head(
	title("Feathers Studio"),
	meta({ charset: "UTF-8" }),
	meta({ name: "viewport", content: "width=device-width, initial-scale=1" }),
	link({
		rel: "icon",
		href: "/assets/images/logo.svg",
		type: "image/svg",
		sizes: "16x16",
	}),
	...links.map(createLink("stylesheet")),
);
