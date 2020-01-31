const { div, main } = require("mithril-toolset").elements;

const hero = require("./sections/hero");
const aboutUs = require("./sections/about-us");
const whatWeDo = require("./sections/what-we-do");
const contact = require("./sections/contact");

module.exports = div["#app"](main(hero, aboutUs, whatWeDo, contact));
