const {
	section,
	div,
	h2,
	input,
	textarea,
	button,
	form,
} = require("mithril-toolset").elements;

const contact = [
	["Email", ""],
	["Phone", ""],
];

const formElems = [
	["text", "form-name", "Name"],
	["email", "form-email", "Email"],
	["text", "form-phone", "Phone no."],
];

module.exports = section.contact["#contact"](
	div.article(
		h2("Let's do something amazing!"),
		div.detail(
			contact.map(([name, content]) =>
				div(div.title(name), div.content(content)),
			),
		),
		div["#contact-map"](),
		// img({ src: "/assets/images/map.png" }),
	),
	div.article(
		form["#contact-form.contact-form"](
			{ action: "/submit", method: "POST" },
			...formElems.map(([type, id, placeholder]) =>
				input[`#${id}`]({ name: id.replace(/form-/, ""), type, placeholder }),
			),
			textarea["#form-description"]({ placeholder: "What's on your mind?" }),
			button("Submit"),
		),
	),
);
