const q = document.querySelector.bind(document);

const setActiveNav = (oldHash, newHash) =>
	[
		[oldHash, "remove"],
		[newHash, "add"],
	].forEach(([hash, act]) => q(`a[href*='#${hash}']`).classList[act]("active"));

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

	window.addEventListener("scroll", scrollSpy);
});

const handleService = toActiveId => {
	const active = q(".active-service");
	const toActive = q(`#${toActiveId}`);
	active.classList.remove("active-service");
	toActive.classList.add("active-service");

	hideService(active.id);
	setTimeout(showService, 300, toActive.id);
};

const hideService = id => {
	const el = q(`#desc-${id}`);
	el.animate(
		[
			// keyframes
			{ height: `${el.offsetHeight}px` },
			{ height: "0px" },
		],
		{
			// timing options
			duration: 300,
			iterations: 1,
			easing: "ease-in-out",
		},
	);
	setTimeout(() => el.classList.add("hide"), 300);
};

const showService = id => {
	const el = q(`#desc-${id}`);
	el.classList.remove("hide");
	el.animate(
		[
			// keyframes
			{ height: "0px" },
			{ height: `${el.offsetHeight}px` },
		],
		{
			// timing options
			duration: 300,
			iterations: 1,
			easing: "ease-in-out",
		},
	);
};

const scrollSpy = () => {
	// isInViewport(q("#aboutUs")) && alert();
};

const isInViewport = section => {
	const pageTopToViewportBottom = window.scrollY + window.innerHeight;
	const rect = section.getBoundingClientRect();

	let bottomExcess = rect.bottom - pageTopToViewportBottom;
	if (bottomExcess < 0) bottomExcess = 0;
	let bottomExcessPercent = (bottomExcess / rect.height) * 100;

	let topExcess = window.scrollY - rect.top;
	if (topExcess < 0) topExcess = 0;
	let topExcessPercent = (topExcess / rect.height) * 100;

	if (topExcessPercent + bottomExcessPercent > 20) return false;
	return true;
};
