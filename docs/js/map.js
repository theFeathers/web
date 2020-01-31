import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoibWtyaGVyZSIsImEiOiJjamhoMjNjeHExcDE3M2NwZW94aDNtdTg2In0.YBfeO_b04WHoI4KFiQ8YYw";

const map = new mapboxgl.Map({
	container: "contact-map",
	style: "mapbox://styles/mapbox/streets-v11",
});
