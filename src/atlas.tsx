import {
  type Accessor,
  createEffect,
  JSX,
  JSXElement,
  onMount,
  type Setter,
} from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import { useGeographic } from "ol/proj";
import { attribution, zoom } from "./controls/index.tsx";
import {
  nycBasemap,
  SubwayStationsAda,
  subwayStationsAda,
} from "./layers/index.ts";
import { cartesianDistance } from "./utils.tsx";

export function Atlas(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    selectedAccessibilitySnapshot: Accessor<Date>;
    selectedSubwayStationId: Accessor<string | null>;
    setSelectedSubwayStationId: Setter<string | null>;
    setFocusedStations: Setter<Array<SubwayStationsAda>>;
    focusedStations: Accessor<Array<SubwayStationsAda>>;
  },
): JSXElement {
  const {
    selectedAccessibilitySnapshot,
    selectedSubwayStationId,
    setSelectedSubwayStationId,
    setFocusedStations,
    focusedStations,
  } = props;

  createEffect(() => {
    selectedSubwayStationId();
    subwayStationsAdaLayer.changed();
  });

  createEffect(() => {
    selectedAccessibilitySnapshot();
    subwayStationsAdaLayer.changed();
  })

  const nycBasemapLayer = nycBasemap();
  const subwayStationsAdaLayer = subwayStationsAda(
    selectedSubwayStationId,
    focusedStations,
    selectedAccessibilitySnapshot,
  );
  onMount(() => {
    useGeographic();

    const map = new Map({
      target: "atlas",
      layers: [
        nycBasemapLayer,
        subwayStationsAdaLayer,
      ],
      controls: [attribution(), zoom()],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
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

      subwayStationsAdaLayer.changed();
      setFocusedStations(stations.slice(0, 7));
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
