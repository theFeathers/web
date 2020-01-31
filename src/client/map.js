import mapbox from "mapbox-gl";

mapbox.accessToken =
	"pk.eyJ1IjoibWtyaGVyZSIsImEiOiJjamhoMjNjeHExcDE3M2NwZW94aDNtdTg2In0.YBfeO_b04WHoI4KFiQ8YYw";

export const map = new mapbox.Map({
	container: "contact-map",
	style: "mapbox://styles/mapbox/streets-v11",
});
