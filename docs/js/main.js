const q = document.querySelector.bind(document);

const debounce = (fn, ms = 0) => {
	let timeoutId;
	return function(...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), ms);
	};
};

const mainNavActive = "main-nav-active-item";

const setActiveNav = hash => {
	const oldActive = q("." + mainNavActive);
	const newActive = q(`a[href*='#${hash}']`);
	if (newActive) {
		oldActive && oldActive.classList.remove(mainNavActive);
		newActive.classList.add(mainNavActive);
	}
};

function hashHandler() {
	const newHash = location.hash ? location.hash.split("#")[1] : "home";
	setActiveNav(newHash);
	closeOffscreenNav();
}

const openOffscreenNav = () => {
	q("#nav-panel").classList.add("nav-open");
	q("html").style.overflowY = "hidden";
};

const closeOffscreenNav = () => {
	q("#nav-panel").classList.remove("nav-open");
	q("html").style.overflowY = "auto";
};

const handleService = toActiveId => {
	if(window.matchMedia('(max-width: 900px)').matches) {
		q(".desc-wrapper").classList.add("show");
		q("body").style.backgroundColor = "#111";
	}
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

const isInViewport = el => {
	const viewport = {
		top: window.scrollY,
		bottom: window.scrollY + window.innerHeight,
		height: window.innerHeight,
	};
	const section = el.getBoundingClientRect();

	// Note: we're only interested in the y-coordinate
	// Greater numbers always indicate lower position in page
	// For example, a is above b if b has a greater "y" than a

	if (viewport.bottom < section.top) {
		// (1) 100% of section is below viewport
		return false;
	}

	if (viewport.top > section.bottom) {
		// (2) 100% of section is above viewport
		return false;
	}

	if (
		// section top is above or at viewport top
		section.top <= viewport.top && // and
		// section bottom is below or at viewport bottom
		section.bottom >= viewport.bottom
	) {
		// (3) 100% of viewport is section
		return true;
	}

	let areaInView;

	if (section.bottom > viewport.bottom) {
		// (4) section is partly in viewport, bottom out
		areaInView = viewport.bottom - section.top;
	}

	if (section.top < viewport.top) {
		// (5) section is partly in viewport, top out
		areaInView = section.bottom - viewport.top;
	}

	// (6.1) if true, section is over 50% in viewport
	if (areaInView / viewport.height > 0.5) return true;
	// (6.2) else, section is not enough in viewport yet
	return false;
};

const scrollSpy = () => {
	const scrolledTo = ["home", "about-us", "what-we-do", "contact"].find(x =>
		isInViewport(q(`#${x}`)),
	);

	setActiveNav(scrolledTo);
};

window.addEventListener("load", () => {
	location.hash && setActiveNav(location.hash.split("#")[1]);

	window.addEventListener("hashchange", hashHandler, false);

	document.querySelectorAll("[id^='service']").forEach(item => {
		item.addEventListener("click", e => handleService(e.currentTarget.id));
	}, false);

	q("#app").addEventListener("scroll", debounce(scrollSpy, 100));

	q("#nav-opener").addEventListener("click", openOffscreenNav);
	q("#nav-closer").addEventListener("click", closeOffscreenNav);
	window.addEventListener("resize", function() {
		if (window.innerWidth >= 991) {
			closeOffscreenNav();
		}
	});

	q("#desc-closer").addEventListener("click", () => {
		q(".desc-wrapper").classList.remove("show");
		q("body").style.backgroundColor = "#000";
	})	
});
