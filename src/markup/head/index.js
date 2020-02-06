const { head, title, meta, link } = require("mithril-toolset").elements;

const createLink = (rel, href) => link({ rel, href });

module.exports = ({ stylesheets }) =>
	head(
		title("Feathers Studio"),
		meta({ charset: "UTF-8" }),
		meta({ name: "viewport", content: "width=device-width, initial-scale=1" }),
		/* Last measure to prevent caching of HTML */
		meta({ "http-equiv": "expires", "content": "0" }),
		link({
			rel: "icon",
			href: "/assets/images/logo.svg",
			type: "image/svg",
			sizes: "16x16",
		}),
		...stylesheets.map(([path]) => createLink("stylesheet", `/${path}`)),
	);
