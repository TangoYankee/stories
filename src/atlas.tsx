import { createSignal, JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
import { attribution, zoom } from "./controls";
import { cityCouncilDistrict, nycBasemap, subwayStationsAda } from "./layers";
import type { SubwayStationsAda } from "./layers";

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  const [selectedSubwayStationId, setSelectedSubwayStationId] = createSignal<
    string | null
  >(null);
  onMount(() => {
    useGeographic();

    const nycBasemapLayer = nycBasemap();
    const subwayStationsAdaLayer = subwayStationsAda(selectedSubwayStationId);
    const cityCouncilDistrictLayer = cityCouncilDistrict();
    const map = new Map({
      target: "atlas",
      layers: [
        nycBasemapLayer,
        cityCouncilDistrictLayer,
        subwayStationsAdaLayer,
      ],
      controls: [attribution(), zoom()],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
    });

    map.on("click", async (e) => {
      const stationFeatures = await subwayStationsAdaLayer.getFeatures(e.pixel);
      const nextStationId = stationFeatures.length === 0
        ? null
        : (stationFeatures[0].getProperties() as SubwayStationsAda)
          .ogc_fid;
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

      subwayStationsAdaLayer.changed();
    });
  });

  return <div id="atlas" {...props} />;
}
