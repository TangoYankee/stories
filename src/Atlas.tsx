import { JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { useGeographic } from "ol/proj";
import { Fill, Stroke, Style } from "ol/style";

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  onMount(() => {
    useGeographic();

    const vectorLayer = new VectorTile({
      declutter: true,
      source: new PMTilesVectorSource({
        url: "https://r2-public.protomaps.com/protomaps-sample-datasets/nz-buildings-v3.pmtiles",
        attributions: ["© Land Information New Zealand"],
      }),
      style: new Style({
        stroke: new Stroke({
          color: "gray",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(20,20,20,0.9)",
        }),
      }),
    });

    new Map({
      target: "atlas",
      layers: [vectorLayer],
      view: new View({
        center: [172.606201, -43.55651],
        zoom: 7,
      }),
    });
  });
  return <div id="atlas" {...props} />;
}
