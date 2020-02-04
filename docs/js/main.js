const q = document.querySelector.bind(document);
const qAll = document.querySelectorAll.bind(document);

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
	const active = q(".active-service");
	const toActive = q(`#${toActiveId}`);
	q(".service-list").classList.remove("hide-active");
	if (active) active.classList.remove("active-service");
	toActive.classList.add("active-service");

	if (window.matchMedia("(max-width: 900px)").matches) {
		const fog = q(".fog");
		q(".desc-wrapper").classList.add("show");
		fog.classList.remove("hide");
		setTimeout(() => fog.classList.remove("fade-out"), 10);
		if (active) hideService(active.id);
		showService(toActive.id);
	} else {
		hideService(active.id, { animate: true });
		setTimeout(showService, 300, toActive.id, { animate: true });
	}
};

const closeServiceDescription = () => {
	const fog = q(".fog");
	q(".desc-wrapper").classList.remove("show");
	q(".service-list").classList.add("hide-active");
	fog.classList.add("fade-out");
	setTimeout(() => fog.classList.add("hide"), 300);
};

const hideService = (id, { animate } = {}) => {
	const el = q(`#desc-${id}`);
	if (animate) {
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
	} else {
		el.classList.add("hide");
	}
};

const showService = (id, { animate } = {}) => {
	const el = q(`#desc-${id}`);
	el.classList.remove("hide");
	if (animate) {
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
	}
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

const range = (start, end, step) => {
	const array = [];
	let current = start;
	while (current <= end) {
		array.push(current);
		current += step;
	}
	return array;
};

const mutationCallback = ([
	menuIcon,
	menuHighlight,
	post,
	icon,
	activity,
	activityIcon,
]) => ([entry]) => {
	menuIcon.style.transform = `translateX(-${5 * entry.intersectionRatio}%)`;
	menuHighlight.style.transform = `translateX(-${5 *
		entry.intersectionRatio}%)`;
	post.style.transform = `translateX(-${20 * entry.intersectionRatio}%)`;
	icon.style.transform = `translateX(-${45 * entry.intersectionRatio}%)`;
	activity.style.transform = `translateX(-${20 * entry.intersectionRatio}%)`;
	activityIcon.style.transform = `translateX(-${35 *
		entry.intersectionRatio}%)`;
};

window.addEventListener("load", () => {
	if (location.hash) {
		setActiveNav(location.hash.split("#")[1]);
	}

	window.addEventListener("hashchange", hashHandler);

	q("#app").addEventListener("scroll", debounce(scrollSpy, 50));

	q("#nav-opener").addEventListener("click", openOffscreenNav);
	qAll("#nav-panel a").forEach(a =>
		a.addEventListener("click", closeOffscreenNav),
	);
	q("#nav-closer").addEventListener("click", closeOffscreenNav);
	window.addEventListener("resize", function() {
		if (window.innerWidth >= 991) {
			closeOffscreenNav();
		}
	});

	qAll("[id^='service']").forEach(item => {
		item.addEventListener("click", e => handleService(e.currentTarget.id));
	}, false);
	if (window.innerWidth > 900) q("#service-1").classList.add("active-service");

	q("#desc-closer").addEventListener("click", closeServiceDescription);
	q(".fog").addEventListener("click", closeServiceDescription);

	const rect = q(".decorator-rect");
	const square = q(".decorator-square");
	const triangle = q(".decorator-triangle");

	const leftGap = window.innerWidth - (q("#home").getBoundingClientRect().width + q("#home").getBoundingClientRect().left);
	const rectToTranslate = (rect.width + leftGap) - ((rect.width * 30) / 100);
	rect.style.top = `0px`;
	rect.style.left = `0px`;
	rect.style.transform = `translateX(-${rectToTranslate}px)`;

	const rightGap = leftGap; // All <section> are aligned centerly. so gap will be same on left and right sides.
	const squareToTranslate = (q("#home").getBoundingClientRect().width + rightGap)  - ((square.width * 25) / 100);
	square.style.top = `0px`;
	square.style.left = `0px`;
	square.style.transform = `translateX(${squareToTranslate}px)`;

	const triangleToTranslate = q("#home").getBoundingClientRect().height  - ((triangle.height * 50) / 100);
	triangle.style.top = `100%`;
	triangle.style.right = `0px`;
	// triangle.style.left = `auto`;
	triangle.style.transform = `translateY(${triangleToTranslate}px)`;
	console.log(triangleToTranslate);

	const menuIcon = q("#bg");
	const menuHighlight = q("#dashboard");
	const post = q("#post");
	const postIcon = q("#post-icon");
	const activity = q("#activity");
	const activityIcon = q("#activity-icon");

	let options = {
		rootMargin: "0px",
		threshold: range(0, 1, 0.01),
	};

	let observer = new IntersectionObserver(
		mutationCallback([
			menuIcon,
			menuHighlight,
			post,
			postIcon,
			activity,
			activityIcon,
		]),
		options,
	);

	observer.observe(q("#about-us"));
	
});
