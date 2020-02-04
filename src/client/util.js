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
