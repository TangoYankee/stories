import { createSignal, ParentComponent } from "solid-js";
import { View } from "ol";
import { Coordinate } from "ol/coordinate";
import { SubwayStationsAda } from "#src/layers/subway_stations_ada_layer.ts";
import { AtlasContext } from "./context.tsx";

export function useAtlasProviderValue() {
  const [filterToUpgraded, setFilterToUpgraded] = createSignal(false);

  const [focusedStations, setFocusedStations] = createSignal<
    Array<SubwayStationsAda & { midpoint: Coordinate }>
  >([]);

  const [selectedAccessibilitySnapshot, setSelectedAccessibilitySnapshot] =
    createSignal("2026-04-21");

  const [mapView, setMapView] = createSignal<View>();

  return {
    filterToUpgraded,
    setFilterToUpgraded,
    focusedStations,
    setFocusedStations,
    mapView,
    setMapView,
    selectedAccessibilitySnapshot,
    setSelectedAccessibilitySnapshot,
  };
}

export const AtlasProvider: ParentComponent = (props) => {
  const value = useAtlasProviderValue();
  return (
    <AtlasContext.Provider value={value}>
      {props.children}
    </AtlasContext.Provider>
  );
};
