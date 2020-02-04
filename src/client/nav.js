import { q } from "./util";

export const mainNavActive = "main-nav-active-item";

export const setActiveNav = hash => {
	const oldActive = q("." + mainNavActive);
	const newActive = q(`a[href*='#${hash}']`);
	if (newActive) {
		oldActive && oldActive.classList.remove(mainNavActive);
		newActive.classList.add(mainNavActive);
	}
};

export const openOffscreenNav = () => {
	q("#nav-panel").classList.add("nav-open");
	q("html").style.overflowY = "hidden";
};

export const closeOffscreenNav = () => {
	q("#nav-panel").classList.remove("nav-open");
	q("html").style.overflowY = "auto";
};

export const hashHandler = () => {
	const newHash = location.hash ? location.hash.split("#")[1] : "home";
	setActiveNav(newHash);
	closeOffscreenNav();
};
