import { q, qAll, range, debounce, sleep, awaitLoad } from "./util";

import {
	hashHandler,
	openOffscreenNav,
	closeOffscreenNav,
	setActiveNav,
} from "./nav";
import { openServiceDescription, closeServiceDescription } from "./services";
import { mutationCallback, scrollSpy } from "./scroll";

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
	});

	/* SERVICES */

	qAll("[id^='service']").forEach(item => {
		item.addEventListener("click", e =>
			openServiceDescription(e.currentTarget.id),
		);
	}, false);
	if (window.innerWidth > 900) q("#service-1").classList.add("active-service");

	q("#desc-closer").addEventListener("click", closeServiceDescription);
	q(".fog").addEventListener("click", closeServiceDescription);

	/* DECORATORS */
	const gap = q("section").getBoundingClientRect().left;

	const transform = ({ X = 0, Y = 0, rot = 0, scale = 1 }) =>
		`translateX(${X}px) translateY(${Y}px) rotate(${rot}deg) scale(${scale})`;

	const reset = (pos, width, height, offset) => {
		switch (pos) {
			case "topleft":
				return { X: -(width + offset), Y: -height };
			case "topright":
				return { X: window.innerWidth - gap, Y: -height };
			case "bottomleft":
				return { X: -(width + offset), Y: window.innerHeight };
			case "bottomright":
				return { X: window.innerWidth - gap, Y: window.innerHeight };
		}
	};
	const decorators = {
		"home": [
			[
				"rect",
				({ el: { offsetWidth, offsetHeight }, gap }) => {
					let { X, Y } = reset("topleft", offsetWidth, offsetHeight, gap);
					// set correct X, Y
					X += offsetWidth * 0.175;
					Y += offsetHeight * 0.9;
					const rot = 60;
					return {
						transform: transform({ X, Y, rot }),
					};
				},
			],
			[
				"triangle",
				({ el: { offsetWidth, offsetHeight }, gap }) => {
					let { X, Y } = reset("bottomright", offsetWidth, offsetHeight, gap);
					// set correct X, Y
					X += -offsetWidth * 0.8;
					Y += -offsetHeight * 0.5;
					const rot = -25;
					return {
						transform: transform({ X, Y, rot, scale: 0.8 }),
					};
				},
			],
		],
		"what-we-do": [
			[
				"square",
				({ el: { offsetWidth, offsetHeight }, gap }) => {
					let { X, Y } = reset("bottomright", offsetWidth, offsetHeight, gap);
					// set correct X, Y
					X += -offsetWidth * 0.6;
					Y += -offsetHeight * 0.65;
					const rot = -45,
						scale = 0.8;
					return {
						transform: transform({ X, Y, rot, scale }),
					};
				},
			],
		],
	};

	const defaultDecorStyle = {
		position: "absolute",
		top: 0,
		left: 0,
		opacity: 0,
	};

	Object.keys(decorators).map(sectionName => {
		const section = q(`#${sectionName}`);
		decorators[sectionName].forEach(([name, transform]) => {
			const decor = document.createElement("img");
			decor.setAttribute("src", `/assets/images/${name}.svg`);
			decor.setAttribute("alt", name);
			Object.assign(decor.style, defaultDecorStyle);
			section.appendChild(decor);
			sleep(1000).then(() =>
				awaitLoad(decor).then(() => {
					const styles = transform({
						section,
						el: decor,
						gap: gap,
					});
					Object.assign(
						decor.style,
						{
							opacity: 1,
							transition: "opacity 800ms ease-in",
						},
						styles,
					);
				}),
			);
		});
	});
});
