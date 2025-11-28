import { createEffect, createSignal, JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
import { attribution, zoom } from "./controls/index.tsx";
import {
  nycBasemap,
  subwayLine,
  SubwayStationsAda,
  subwayStationsAda,
} from "./layers/index.ts";
import { cartesianDistance } from "./utils.tsx";
import { useAtlasContext } from "./store/context.tsx";
import { FULL_EXTENT_VIEW } from "./constants.ts";

export function Atlas(
  props: JSX.HTMLAttributes<HTMLDivElement>,
): JSXElement {
  const {
    filterToUpgraded,
    focusedStations,
    setFocusedStations,
    selectedAccessibilitySnapshot,
    selectedSubwayStationId,
    setSelectedSubwayStationId,
    stationsInExtent,
    setStationsInExtent,
    setViewCenter,
  } = useAtlasContext();
  const [mapAccess, setMapAccess] = createSignal<Map | null>(null);

  createEffect(() => {
    selectedSubwayStationId();
    subwayStationsAdaLayer.changed();
  });

  createEffect(() => {
    selectedAccessibilitySnapshot();
    subwayStationsAdaLayer.changed();
  });

  createEffect(() => {
    const snapshot = selectedAccessibilitySnapshot();
    const stations = filterToUpgraded()
      ? stationsInExtent().filter((station) => {
        const { fully_accessible } = station;
        return fully_accessible === snapshot;
      })
      : stationsInExtent();
    setFocusedStations(stations.slice(0, 7));
    subwayStationsAdaLayer.changed();
  });

  createEffect(() => {
    const map = mapAccess();
    const shouldFilter = filterToUpgraded();
    if (map === null) return;
    if (shouldFilter) {
      const nextView = new View(FULL_EXTENT_VIEW);
      map.setView(nextView);
    }
  });

  const nycBasemapLayer = nycBasemap();
  const subwayStationsAdaLayer = subwayStationsAda(
    selectedSubwayStationId,
    focusedStations,
    selectedAccessibilitySnapshot,
    filterToUpgraded,
  );
  const subwayLinesLayer = subwayLine();
  onMount(() => {
    useGeographic();

    const map = new Map({
      target: "atlas",
      layers: [
        nycBasemapLayer,
        subwayStationsAdaLayer,
        subwayLinesLayer,
      ],
      controls: [attribution(), zoom()],
      view: new View(FULL_EXTENT_VIEW),
    });

    setMapAccess(map);

    map.on("loadend", (e) => {
      const extent = e.frameState?.extent;
      if (extent === undefined || extent === null) {
        throw new Error("moveend: extent undefined");
      }
      const features = subwayStationsAdaLayer.getFeaturesInExtent(extent);
      const stationsRandom = features.map((feature) => {
        const properties = feature.getProperties() as SubwayStationsAda;
        const midpoint = feature.getFlatMidpoint();
        return {
          ...properties,
          midpoint,
        };
      });
      setStationsInExtent(stationsRandom);

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
    });

    map.on("moveend", (e) => {
      const extent = e.frameState?.extent;
      if (extent === undefined || extent === null) {
        throw new Error("moveend: extent undefined");
      }
      const features = subwayStationsAdaLayer.getFeaturesInExtent(extent);
      const stationsRandom = features.map((feature) => {
        const properties = feature.getProperties() as SubwayStationsAda;
        const midpoint = feature.getFlatMidpoint();
        return {
          ...properties,
          midpoint,
        };
      });

      const viewCenter = map.getView().getState().center;
      setViewCenter(viewCenter);
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

      setStationsInExtent(stations);
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
    });
  });

  return <div id="atlas" {...props} />;
}
