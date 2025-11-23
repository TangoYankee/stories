import { createSignal, ParentComponent } from "solid-js";
import { AtlasContext } from "./context.tsx";
import { SubwayStationsAda } from "../layers/subway_stations_ada_layer.ts";

export function useAtlasProviderValue() {
  const [filterToUpgraded, setFilterToUpgraded] = createSignal(false);

  const [focusedStations, setFocusedStations] = createSignal<
    Array<SubwayStationsAda>
  >([]);

  const [selectedAccessibilitySnapshot, setSelectedAccessibilitySnapshot] =
    createSignal("2025-10-15");

  const [selectedSubwayStationId, setSelectedSubwayStationId] = createSignal<
    string | null
  >(null);

  return {
    filterToUpgraded,
    setFilterToUpgraded,
    focusedStations,
    setFocusedStations,
    selectedAccessibilitySnapshot,
    setSelectedAccessibilitySnapshot,
    selectedSubwayStationId,
    setSelectedSubwayStationId,
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
