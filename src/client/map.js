// import mapbox from "mapbox-gl";

// mapbox.accessToken =
// 	"pk.eyJ1IjoibWtyaGVyZSIsImEiOiJjamhoMjNjeHExcDE3M2NwZW94aDNtdTg2In0.YBfeO_b04WHoI4KFiQ8YYw";

// export const map = new mapbox.Map({
// 	container: "contact-map",
// 	style: "mapbox://styles/mkrhere/ck643yd2612t71imrul2gpg3g",
// });

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

(() => {
	const maps = ["ol/Map", "ol/View", "ol/layer/Tile", "ol/source/XYZ"];
	new Map({
		target: "#contact-map",
		layers: [
			new TileLayer({
				source: new XYZ({
					url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				}),
			}),
		],
		view: new View({
			center: [0, 0],
			zoom: 2,
		}),
	});
})();
