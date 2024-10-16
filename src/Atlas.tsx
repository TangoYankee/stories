import { JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { useGeographic } from "ol/proj";
import { applyStyle } from "ol-mapbox-style";

const FILE_BUCKET = import.meta.env.VITE_FILE_BUCKET;

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  onMount(() => {
    useGeographic();
    const nycLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url: `${FILE_BUCKET}/nyc_20242003.pmtiles`,
        attributions: ["Openstreetmap contributors"],
      }),
    });

    applyStyle(
      nycLayer,
      `${FILE_BUCKET}/basemap_select.json`
    );

    const subwayAdaLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url: `${FILE_BUCKET}/nyc_subway_stations/2024_aug_22_subway_ada.pmtiles`,
        attributions: ["NYS open data"]
      })
    })

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
