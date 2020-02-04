export const q = document.querySelector.bind(document);
export const qAll = document.querySelectorAll.bind(document);

export const debounce = (fn, ms = 0) => {
	let timeoutId;
	return function(...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), ms);
	};
};

export const range = (start, end, step) => {
	const array = [];
	let current = start;
	while (current <= end) {
		array.push(current);
		current += step;
	}
	return array;
};

export const sleep = t => new Promise(r => setTimeout(r, t));

export const awaitLoad = el =>
	new Promise(r => {
		let cont = true;
		(function loop() {
			requestAnimationFrame(() => {
				if (!cont) return;
				if (el.offsetWidth) {
					r(el);
					cont = false;
				} else loop();
			});
		})();
	});
