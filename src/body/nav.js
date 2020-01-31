const { nav, ul, li, a, img } = require("mithril-toolset").elements;

const normalise = text => {
	const spaced = text.split("-").join(" ");
	return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};
const menu = ["contact", "what-we-do", "about-us", "home"].map(item =>
	li(
		a(
			{
				href: `#${item}`,
				...(item === "home" && { class: "main-nav-active-item" }),
			},
			normalise(item),
		),
	),
);

const socialMenu = [
	{ type: "Facebook", href: "https://www.facebook.com/feathersindia" },
	{ type: "Instagram", href: "https://instagram.com/feathersstudio" },
	{ type: "LinkedIn", href: "https://www.linkedin.com/company/feathersstudio" },
].map(({ type, href }) =>
	li(
		a(
			{ href, target: "_blank" },
			img({
				src: `/assets/images/${type.toLowerCase()}.svg`,
				alt: `Follow Feathers Studio on ${type}`,
			}),
		),
	),
);

const primaryNav = ul[".nav.vertical-nav.list-style-none"](menu);

const socialNav = ul[".nav.social-nav.list-style-none"](socialMenu);

module.exports = nav["#nav-panel.nav-panel"](
	img["#nav-closer.nav-closer"]({
		src: "/assets/images/cross.svg",
		alt: "Hide offscreen navigation",
	}),
	primaryNav,
	socialNav,
);
