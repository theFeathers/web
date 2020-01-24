const setActiveNav = (oldHash, newHash) =>
	[
		[oldHash, "remove"],
		[newHash, "add"],
	].forEach(([hash, act]) =>
		document.querySelector(`a[href*='#${hash}']`).classList[act]("active")
	);

function hashHandler(e) {
	const oldHash = e.oldURL.includes("#") ? e.oldURL.split("#")[1] : "home";
	const newHash = location.hash ? location.hash.split("#")[1] : "home";
	setActiveNav(oldHash, newHash);
}

window.addEventListener("load", () => {
	location.hash && setActiveNav("home", location.hash.split("#")[1], true);

	window.addEventListener("hashchange", hashHandler, false);
});
