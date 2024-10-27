import { JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { useGeographic } from "ol/proj";
import { applyStyle } from "ol-mapbox-style";
import { Circle, Style, Fill, Stroke } from "ol/style";

const FILE_BUCKET = import.meta.env.VITE_FILE_BUCKET;

type SubwayStationProperties = {
  station_id: string;
  stop_name: string;
  daytime_routes: string;
  ada: string;
};

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  onMount(() => {
    useGeographic();
    const nycLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url: `${FILE_BUCKET}/nyc_20242003.pmtiles`,
        attributions: ["Openstreetmap contributors"],
      }),
    });
    applyStyle(nycLayer, `${FILE_BUCKET}/basemap_select.json`);

    const subwayAdaLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url: `${FILE_BUCKET}/nyc_subway_stations/2024_aug_22_subway_ada.pmtiles`,
        attributions: ["NYS open data"],
      }),
      style: (feature) => {
        const { ada } = feature.getProperties() as SubwayStationProperties;
        // https://colorbrewer2.org/#type=diverging&scheme=Spectral&n=3
        const fillColor =
          ada === "1"
            ? "rgba(153,213,148,0.9)"
            : ada === "2"
              ? "rgba(255,255,191,0.9)"
              : "rgba(252,141,89,0.9)";
        return new Style({
          image: new Circle({
            radius: 3,
            fill: new Fill({
              color: fillColor,
            }),
            stroke: new Stroke({
              color: "gray",
              width: 1,
            }),
          }),
        });
      },
    });

    new Map({
      target: "atlas",
      layers: [nycLayer, subwayAdaLayer],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
    });
  });
  return <div id="atlas" {...props} />;
}
