const { section, div, h2, h3, p, img, i } = require("mithril-toolset").elements;

const services = [
	{
		name: "Web Development and Design",
		desc: "Lorem ipsum dolor sit amet",
		longDesc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		name: "Graphic Design",
		desc: "Lorem ipsum dolor sit amet",
		longDesc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		name: "Branding",
		desc: "Lorem ipsum dolor sit amet",
		longDesc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		name: "Web Application development",
		desc: "Lorem ipsum dolor sit amet",
		longDesc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		name: "Digital Marketing",
		desc: "Lorem ipsum dolor sit amet",
		longDesc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		name: "Interior Design",
		desc: "Lorem ipsum dolor sit amet",
		longDesc:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
];

module.exports = section["#what-we-do.what-we-do"](
	div.article(h2("What we do")),
	div.article["service-list"](
		services.map((service, id) =>
			// first service is active by default
			div.service[`#service-${id + 1}${id === 0 ? ".active-service" : ""}`](
				h3(service.name, i["arrow-right"]()),
				p["font-sm"](service.desc),
			),
		),
	),
	div.fog.hide["fade-out"](),
	div.article["desc-wrapper"](
		img["#nav-closer.desc-closer"]({
			id: "desc-closer",
			src: "/assets/images/cross.svg",
			alt: "what-we-do description close button for mobile screen.",
		}),
		...services.map((service, id) =>
			// hide all but first by default
			div[`#desc-service-${id + 1}.service-desc${id === 0 ? "" : ".hide"}`](
				h3(service.name),
				p["font-sm"](service.longDesc),
			),
		),
	),
);
