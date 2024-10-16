import { JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { useGeographic } from "ol/proj";
import { applyStyle } from "ol-mapbox-style";

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  onMount(() => {
    useGeographic();
    const nycLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url: import.meta.env.VITE_BASEMAP_SOURCE,
        attributions: ["Openstreetmap contributors"],
      }),
    });
    applyStyle(
      nycLayer,
      import.meta.env.VITE_BASEMAP_STYLE,
    );
    new Map({
      target: "atlas",
      layers: [nycLayer],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
    });
  });
  return <div id="atlas" {...props} />;
}
