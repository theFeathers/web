import { q, sleep, awaitLoad } from "./util";

const gap = q("section").getBoundingClientRect().left;

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

const transform = ({ X = 0, Y = 0, rot = 0, scale = 1 }) =>
	`translateX(${X}px) translateY(${Y}px) rotate(${rot}deg) scale(${scale})`;

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
			({ decor: { offsetWidth, offsetHeight } }) => {
				let { X, Y } = reset("bottomright", offsetWidth, offsetHeight, gap);
				// set correct X, Y
				X += -offsetWidth * 0.65;
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
			({ decor: { offsetWidth, offsetHeight } }) => {
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
	position: "fixed",
	top: 0,
	left: 0,
	opacity: 0,
};

export const createDecorators = () =>
	Object.keys(decorators).map(sectionName => {
		// const section = q(`#${sectionName}`);
		const section = q(`main`);
		[...section.children].forEach(
			child => child.classList.contains("decoration-unit") && child.remove(),
		);
		decorators[sectionName].forEach(([name, transform]) => {
			const decor = document.createElement("img");
			decor.classList.add("decoration-unit");
			decor.setAttribute("src", `/assets/images/${name}.svg`);
			decor.setAttribute("alt", name);
			Object.assign(decor.style, defaultDecorStyle);
			section.appendChild(decor);
			sleep(1000).then(() =>
				awaitLoad(decor).then(() => {
					const styles = transform({
						section,
						decor,
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
