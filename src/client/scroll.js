import { q } from "./util";
import { setActiveNav } from "./nav";

export const isInViewport = el => {
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

export const scrollSpy = () => {
	const scrolledTo = ["home", "about-us", "what-we-do", "contact"].find(x =>
		isInViewport(q(`#${x}`)),
	);

	setActiveNav(scrolledTo);
};

export const mutationCallback = ([
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
