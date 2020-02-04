const { readFileSync } = require("fs");

const m = require("mithril");

const svg = path => m.trust(readFileSync(path, "utf8"));

module.exports = svg;
