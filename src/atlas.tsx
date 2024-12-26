import { createSignal, JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
// import { attributionControl, zoomControl } from "./controls";
// import { attribution, zoom } from "./controls";
import { nycBasemapLayer, subwayStationsAdaLayer } from "./layers";
import type { SubwayStationsAda } from "./layers";
import "./controls/attribution/attribution-style.css";
import "./controls/zoom/zoom-style.css";
import Attribution from "ol/control/Attribution";
import Zoom from "ol/control/Zoom";

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  const [selectedSubwayStationId, setSelectedSubwayStationId] = createSignal<
    string | null
  >(null);
  onMount(() => {
    useGeographic();

    const attribution = new Attribution({
      className: "ol-control-attribution",
      collapsed: false,
      collapsible: false,
      target: "attribution-control",
    });

    const zoom = new Zoom({
      className: "ol-control-zoom",
      target: "zoom-control",
    });

    const subwayStationsAda = subwayStationsAdaLayer(selectedSubwayStationId);
    const map = new Map({
      target: "atlas",
      layers: [nycBasemapLayer, subwayStationsAda],
      controls: [attribution, zoom],
      // controls: [attributionControl, zoomControl],
      // controls: [attribution, zoom],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
    });

    map.on("click", async (e) => {
      const stationFeatures = await subwayStationsAda.getFeatures(e.pixel);
      const nextStationId = stationFeatures.length === 0
        ? null
        : (stationFeatures[0].getProperties() as SubwayStationsAda)
          .station_id;
      const prevStationId = selectedSubwayStationId();
      // ne previous and no next:
      // do nothing
      if (prevStationId === null && nextStationId === null) return;

      // previous and next are same id
      // set station id to null
      if (prevStationId === nextStationId) {
        setSelectedSubwayStationId(null);
      }

      // previous and next are not otherwise equarl
      // (no previous and a next, or a previous and no next)
      // set station id to value of next (whether next is string or null)
      if (prevStationId !== nextStationId) {
        setSelectedSubwayStationId(nextStationId);
      }

      subwayStationsAda.changed();
    });
  });

  return <div id="atlas" {...props} />;
}
