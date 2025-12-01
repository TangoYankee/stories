import { createEffect, createSignal, JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map } from "ol";
import { transform, useGeographic } from "ol/proj";
import { attribution, view, zoom } from "./controls/index.tsx";
import {
  nycBasemap,
  subwayLine,
  SubwayStationsAda,
  subwayStationsAda,
} from "./layers/index.ts";
import { cartesianDistance } from "./utils.tsx";
import { useAtlasContext } from "./store/context.tsx";
import { FULL_EXTENT_VIEW, STATION_ZOOM } from "./constants.ts";
import { Coordinate } from "ol/coordinate";
import RenderFeature from "ol/render/Feature";

const findStationsInExtent = (
  features: Array<RenderFeature>,
) =>
  features.map((feature) => {
    const properties = feature.getProperties() as SubwayStationsAda;
    const midpoint = feature.getFlatMidpoint();
    return {
      ...properties,
      midpoint,
    };
  });

const findSortedStations = (
  stations: Array<SubwayStationsAda & { midpoint: Coordinate }>,
  viewCenter: Coordinate,
) => {
  return stations.toSorted((stationA, stationB) => {
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
};

export function Atlas(
  props: JSX.HTMLAttributes<HTMLDivElement>,
): JSXElement {
  const {
    filterToUpgraded,
    focusedStations,
    setFocusedStations,
    mapView,
    setMapView,
    selectedAccessibilitySnapshot,
  } = useAtlasContext();
  const [stationsInExtent, setStationsInExtent] = createSignal<
    Array<SubwayStationsAda & { midpoint: Coordinate }>
  >([]);

  // reset focused stations when there are changes to:
  // - active snapshot
  // - whether filter to stations upgraded in the snapshot
  // - stations in the extent of the map
  createEffect(() => {
    const view = mapView();
    if (view === undefined) return;
    const wgsViewCenter = view.getCenter();
    if (wgsViewCenter === undefined) return;
    const epsgViewCenter = transform(wgsViewCenter, "EPSG:4326", "EPSG:3857");
    const snapshot = selectedAccessibilitySnapshot();
    const stations = filterToUpgraded()
      ? stationsInExtent().filter((station) => {
        const { fully_accessible } = station;
        return fully_accessible === snapshot;
      })
      : stationsInExtent();
    const sortedStations = findSortedStations(stations, epsgViewCenter);
    setFocusedStations(sortedStations.slice(0, 7));
    subwayStationsAdaLayer.changed();
  });

  // Reset zoom when changing snapshot
  createEffect(() => {
    const view = mapView();
    if (view === undefined) return;
    selectedAccessibilitySnapshot();
    view.animate({
      zoom: FULL_EXTENT_VIEW.zoom,
      center: FULL_EXTENT_VIEW.center,
      duration: 500,
    });
    subwayStationsAdaLayer.changed();
  });

  const nycBasemapLayer = nycBasemap();
  const subwayStationsAdaLayer = subwayStationsAda(
    focusedStations,
    selectedAccessibilitySnapshot,
    filterToUpgraded,
  );
  const subwayLinesLayer = subwayLine();

  onMount(() => {
    useGeographic();

    const _mapView = view();
    setMapView(_mapView);

    const map = new Map({
      target: "atlas",
      layers: [
        nycBasemapLayer,
        subwayStationsAdaLayer,
        subwayLinesLayer,
      ],
      controls: [attribution(), zoom()],
      view: _mapView,
    });

    // set stations in extent
    map.on("loadend", (e) => {
      const extent = e.frameState?.extent;
      if (extent === undefined || extent === null) {
        throw new Error("loadend: extent not found");
      }
      const features = subwayStationsAdaLayer.getFeaturesInExtent(extent);
      setStationsInExtent(findStationsInExtent(features));
    });

    // set stations in extent
    map.on("moveend", (e) => {
      const extent = e.frameState?.extent;
      if (extent === undefined || extent === null) {
        throw new Error("moveend: extent not found");
      }
      const features = subwayStationsAdaLayer.getFeaturesInExtent(extent);
      setStationsInExtent(findStationsInExtent(features));
    });

    // move map to center a selected station
    map.on("click", async (e) => {
      const stationFeatures = await subwayStationsAdaLayer.getFeatures(e.pixel);
      const selectedStation = stationFeatures[0];
      if (selectedStation === undefined) return;
      const selectedExtent = selectedStation.getGeometry()?.getExtent();
      if (selectedExtent === undefined) return;
      const wgsCenter = transform(
        [selectedExtent[0], selectedExtent[1]],
        "EPSG:3857",
        "EPSG:4326",
      );
      const view = mapView();
      if (view !== undefined) {
        const prevZoom = view.getZoom();
        const nextZoom = prevZoom === undefined
          ? STATION_ZOOM
          : Math.max(prevZoom, STATION_ZOOM);
        view.animate({ zoom: nextZoom, center: wgsCenter, duration: 500 });
      }
    });
  });

  return <div id="atlas" {...props} />;
}
