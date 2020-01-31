const { resolve } = require("path");

global.getPath = path => resolve(__dirname, "..", path);

const m = require("mithril");
const { html } = require("mithril-toolset").elements;

const head = require("./head");
const body = require("./body");

const page = m.fragment(
	m.trust("<!DOCTYPE html>"),
	html({ lang: "EN" }, head, body),
);

module.exports = page;
