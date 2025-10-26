import {
  type Accessor,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onMount,
} from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat, useGeographic } from "ol/proj";
import { attribution, zoom } from "./controls/index.tsx";
import {
  cityCouncilDistrict,
  nycBasemap,
  SubwayStationsAda,
  subwayStationsAda,
} from "./layers/index.ts";

export function Atlas(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    isSubwayStationVisible: Accessor<boolean>;
    isCityCouncilDistrictVisible: Accessor<boolean>;
  },
): JSXElement {
  const { isSubwayStationVisible, isCityCouncilDistrictVisible } = props;
  const [selectedSubwayStationId, setSelectedSubwayStationId] = createSignal<
    string | null
  >(null);
  createEffect(() => {
    const isVisible = isSubwayStationVisible();
    subwayStationsAdaLayer.set("visible", isVisible);
  });

  createEffect(() => {
    const isVisible = isCityCouncilDistrictVisible();
    cityCouncilDistrictLayer.set("visible", isVisible);
  });

  const nycBasemapLayer = nycBasemap();
  const subwayStationsAdaLayer = subwayStationsAda(
    selectedSubwayStationId,
    isSubwayStationVisible,
  );
  const cityCouncilDistrictLayer = cityCouncilDistrict();
  onMount(() => {
    useGeographic();

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

    map.on("moveend", async(e) => {
      const extent = e.frameState?.extent;
      console.log("moveend extent", extent);
      if(extent !== undefined && extent !== null) {
        const features = subwayStationsAdaLayer.getFeaturesInExtent(extent);
        console.log("features", features.map(feature => feature.getFlatMidpoint()))
      }
    })

    map.on("click", async (e) => {
      const stationFeatures = await subwayStationsAdaLayer.getFeatures(e.pixel);
      const nextStationId = stationFeatures.length === 0
        ? null
        : (stationFeatures[0].getProperties() as SubwayStationsAda)
          .id;
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
