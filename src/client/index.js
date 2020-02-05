import { q, qAll, range, debounce, sleep, awaitLoad } from "./util";

import {
	hashHandler,
	openOffscreenNav,
	closeOffscreenNav,
	setActiveNav,
} from "./nav";
import { openServiceDescription, closeServiceDescription } from "./services";
import { mutationCallback, scrollSpy } from "./scroll";
// import { createDecorators } from "./decorators";

// import "./map";

window.addEventListener("load", () => {
	/* SCROLL & MENU */

	if (location.hash) {
		setActiveNav(location.hash.split("#")[1]);
	}

	window.addEventListener("hashchange", hashHandler);

	q("#app").addEventListener("scroll", debounce(scrollSpy, 50));

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

	/* NAV */

	q("#nav-opener").addEventListener("click", openOffscreenNav);
	qAll("#nav-panel a").forEach(a =>
		a.addEventListener("click", closeOffscreenNav),
	);
	q("#nav-closer").addEventListener("click", closeOffscreenNav);
	window.addEventListener("resize", function() {
		if (window.innerWidth >= 991) {
			closeOffscreenNav();
		}
		// recreate decorators if resized
		// createDecorators();
	});

	/* DECORATORS */
	// createDecorators();

	/* SERVICES */

	qAll("[id^='service']").forEach(item => {
		item.addEventListener("click", e =>
			openServiceDescription(e.currentTarget.id),
		);
	}, false);
	if (window.innerWidth > 900) q("#service-1").classList.add("active-service");

	q("#desc-closer").addEventListener("click", closeServiceDescription);
	q(".fog").addEventListener("click", closeServiceDescription);
});
