const { resolve } = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const Telegraf = require("telegraf");

const config = require("../.config");

const PORT = process.env.PORT || config.PORT || 5000;
const root = resolve(__dirname, "..");
const Allowed = new Set(["home", "about-us", "what-we-do", "contact-us"]);

const app = express();
const bot = new Telegraf(config.telegram.token);

const converttoTelegramMessage = ({
	name = "Unknown",
	email = "Unknown",
	phone = "Unknown",
	service = "Other",
	desc = "",
}) =>
	[
		`🌟 New enquiry`,
		"",
		`➡️ Name: ${name}`,
		"",
		`📧 Email: ${email}`,
		`📞 Phone: ${phone}`,
		`⚙️ Service: ${service}`,
		`🏷 Description: ${desc}`,
	].join("\n");

bot.launch();

app.use(express.static(resolve(root, "docs")));

app.get((req, res, next) => {
	if (req.path === "/" || Allowed.has(`/${req.path}`)) {
		res.sendFile(root, "docs/index.html");
	} else next();
});

app.post("/submit", bodyParser.urlencoded({ extended: false }), (req, res) => {
	bot.telegram.sendMessage(
		config.telegram.notifyUser,
		converttoTelegramMessage(req.body),
	);
	res.sendFile(resolve(root, "docs/submit.html"));
});

app.listen(PORT, () => console.log("Listening on port", PORT));
