import { q } from "./util";

export const openServiceDescription = toActiveId => {
	const active = q(".active-service");
	const toActive = q(`#${toActiveId}`);
	q(".service-list").classList.remove("hide-active");
	if (active) active.classList.remove("active-service");
	toActive.classList.add("active-service");

	if (window.innerWidth <= 900) {
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

export const closeServiceDescription = () => {
	const fog = q(".fog");
	q(".desc-wrapper").classList.remove("show");
	q(".service-list").classList.add("hide-active");
	fog.classList.add("fade-out");
	setTimeout(() => fog.classList.add("hide"), 300);
};

export const hideService = (id, { animate } = {}) => {
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

export const showService = (id, { animate } = {}) => {
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
