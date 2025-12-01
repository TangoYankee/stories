import { createSignal, ParentComponent } from "solid-js";
import { AtlasContext } from "./context.tsx";
import { SubwayStationsAda } from "../layers/subway_stations_ada_layer.ts";
import { View } from "ol";
import { Coordinate } from "ol/coordinate";

export function useAtlasProviderValue() {
  const [filterToUpgraded, setFilterToUpgraded] = createSignal(false);

  const [focusedStations, setFocusedStations] = createSignal<
    Array<SubwayStationsAda & { midpoint: Coordinate }>
  >([]);

  const [selectedAccessibilitySnapshot, setSelectedAccessibilitySnapshot] =
    createSignal("2025-10-15");

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
