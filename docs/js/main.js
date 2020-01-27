const setActiveNav = (oldHash, newHash) =>
	[
		[oldHash, "remove"],
		[newHash, "add"],
	].forEach(([hash, act]) =>
		document.querySelector(`a[href*='#${hash}']`).classList[act]("active"),
	);

function hashHandler(e) {
	const oldHash = e.oldURL.includes("#") ? e.oldURL.split("#")[1] : "home";
	const newHash = location.hash ? location.hash.split("#")[1] : "home";
	setActiveNav(oldHash, newHash);
}

window.addEventListener("load", () => {
	location.hash && setActiveNav("home", location.hash.split("#")[1], true);

	window.addEventListener("hashchange", hashHandler, false);

	console.log(document.querySelectorAll("[id^='service']"));

	document.querySelectorAll("[id^='service']").forEach(item => {
		item.addEventListener("click", e => handleService(e.currentTarget.id));
	}, false);
});

const handleService = toActiveId => {
	[
		[activeServiceId, "remove"],
		[toActiveId, "add"],
	].forEach(([id, act]) => {
		document.getElementById(id).classList[act]("activeService");
		document
			.getElementById(`service-desc-${id.split("-")[1]}`)
			.classList[act === "remove" ? "add" : act === "add" && "remove"]("hide");
	});
	activeServiceId = toActiveId;
};

let activeServiceId = "service-1";
