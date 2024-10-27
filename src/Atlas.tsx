import { JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { useGeographic } from "ol/proj";
import { Circle, Fill, Stroke, Style } from "ol/style";

const FILE_BUCKET = import.meta.env.VITE_FILE_BUCKET;

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  onMount(() => {
    useGeographic();
    const subwayAdaLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url: `${FILE_BUCKET}/nyc_subway_stations/2024_aug_22_subway_ada.pmtiles`,
        attributions: ["NYS open data"],
      }),
      style: new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({
            color: "red",
          }),
          stroke: new Stroke({
            color: "white",
            width: 3,
          }),
        }),
      }),
    });

    new Map({
      target: "atlas",
      layers: [subwayAdaLayer],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
    });
  });
  return <div id="atlas" {...props} />;
}
