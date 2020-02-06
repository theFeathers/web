const {
	section,
	div,
	h2,
	h3,
	p,
	img,
	i,
	br,
} = require("mithril-toolset").elements;
const { css } = require("emotion");

const services = [
	{
		name: "Graphic Design",
		desc: "Design for marketing, product, or packaging",
		longDesc: [
			"We do our best to create immaculate designs, fit for your brand," +
				" but simple, memorable, and market-centric.",
			" We work with the" + " user in mind.",
		],
	},
	{
		name: "Branding",
		desc: "Visual identity for products and services",
		longDesc: [
			"We'll create a consistent visual identity for your service or product.",
			"If you already have branding, we will work on designs following your brand guidelines.",
		],
	},
	{
		name: "Web Design and Development",
		desc: "UX to UI to implementation",
		longDesc: [
			"We go from structuring information and mapping functionalities" +
				" to designing the final layouts and implementing the site.",
		],
	},
	{
		name: "Web Application development",
		desc: "Complex apps, CMS, ERP, e-commerce, or custom services",
		longDesc: [
			"We build apps from scratch, since we have a full-stack team from design to delivery in one place.",
			"We focus on producing secure, clean, scalable code. This also means our code is simple to read, tested, and maintainable.",
			"We'll also host and maintain the application for you after going live.",
		],
	},
	{
		name: "Digital Marketing",
		desc: "SEO, SMM, SEM, and all the buzz",
		longDesc: [
			"If you're launching new, or building your market, we can help you scale your marketing efficiently without blowing your budget.",
		],
	},
	{
		name: "Interior Design",
		desc: "Furniture, apartments, or offices",
		longDesc: [
			"We design beautiful solutions for your interior needs, working with vendors as necessary to give your home or commercial space the perfect finish.",
		],
	},
];

const insertBr = text =>
	Array.isArray(text)
		? text.reduce(
				(acc, curr, i) => (
					acc.push(curr),
					// push a couple <br> if not last item
					(i !== text.length - 1) & acc.push(br(), br()),
					acc
				),
				[],
		  )
		: text;

const gutters = css`
	& > .article {
		margin-right: 1.25rem;
	}
	& > .article:last-child {
		margin-right: 0;
	}
`;

const serviceName = css`
	padding-bottom: 0.75rem;
	border-bottom: dotted var(--primary-colour) 1px;
`;

module.exports = section[gutters]["#what-we-do.what-we-do"](
	div.article(h2("What we do")),
	div.article["service-list"](
		services.map((service, id) =>
			div.service[serviceName][`#service-${id + 1}`](
				h3(service.name, i["arrow-right"]()),
				p(service.desc),
			),
		),
	),
	div.fog.hide["fade-out"](),
	div.article["desc-wrapper"](
		div["desc-closer-wrapper"](
			img["#nav-closer.desc-closer"]({
				id: "desc-closer",
				src: "/assets/images/cross.svg",
				alt: "what-we-do description close button for mobile screen.",
			}),
		),
		...services.map((service, id) =>
			// hide all but first by default
			// div[`#desc-service-${id + 1}.service-desc${id === 0 ? "" : ".hide"}`](
			div[`#desc-service-${id + 1}.service-desc.hide`](
				h3(service.name),
				p(insertBr(service.longDesc)),
			),
		),
	),
);
