const { body, script } = require("mithril-toolset").elements;
const header = require("./header");
const nav = require("./nav");
const app = require("./app");

module.exports = body(header, nav, app, script({ src: "/js/main.js" }));
