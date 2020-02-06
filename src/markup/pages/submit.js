const m = require("mithril");
const { html } = require("mithril-toolset").elements;

const head = require("../head");
const body = require("../body");

module.exports = ({ stylesheets }) =>
	m.fragment(
		m.trust("<!DOCTYPE html>"),
		html({ lang: "EN" }, head({ stylesheets }), body),
	);
