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
import { cartesianDistance } from "./utils.tsx";

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

    map.on("moveend", async (e) => {
      const extent = e.frameState?.extent;
      console.log("moveend extent", extent);
      if (extent === undefined || extent === null) {
        throw new Error("moveend: extent undefined");
      }
      const features = subwayStationsAdaLayer.getFeaturesInExtent(extent);
      const stationsRandom = features.map((feature) => {
        const properties = feature.getProperties();
        const midpoint = feature.getFlatMidpoint();
        return {
          ...properties,
          midpoint,
        };
      });

      console.log("random stations", stationsRandom);
      const viewCenter = map.getView().getState().center;
      const stations = stationsRandom.toSorted((stationA, stationB) => {
        const midpointStationA = stationA.midpoint;
        const midpointStationB = stationB.midpoint;
        const distanceStationA = cartesianDistance({
          x1: midpointStationA[0],
          y1: midpointStationA[1],
          x2: viewCenter[0],
          y2: viewCenter[1],
        });

        const distanceStationB = cartesianDistance({
          x1: midpointStationB[0],
          y1: midpointStationB[1],
          x2: viewCenter[0],
          y2: viewCenter[1],
        });
        return distanceStationA - distanceStationB;
      });

      console.log("sorted stations", stations);

      const distance = cartesianDistance({
        x1: 0,
        y1: 0,
        x2: 3,
        y2: 4,
      });
      console.log("distance", distance);
      console.log("view", viewCenter);
    });

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
