const { header, img } = require("mithril-toolset").elements;

module.exports = header(
	img["logo"]({
		src: "/assets/images/logo.svg",
		alt: "Feathers Studio Logo",
	}),
	img["#nav-opener.nav-opener"]({
		src: "/assets/images/hamburger.svg",
		alt: "Enable offscreen navigation",
	}),
);
