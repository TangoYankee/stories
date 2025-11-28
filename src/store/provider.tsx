import { createSignal, ParentComponent } from "solid-js";
import { AtlasContext } from "./context.tsx";
import { SubwayStationsAda } from "../layers/subway_stations_ada_layer.ts";
import { Coordinate } from "ol/coordinate";
import { FULL_EXTENT_VIEW } from "../constants.ts";

export function useAtlasProviderValue() {
  const [closestStationsToCenter, setClosestStationsToCenter] = createSignal<
    Array<SubwayStationsAda>
  >([]);

  const [filterToUpgraded, setFilterToUpgraded] = createSignal(false);

  const [focusedStations, setFocusedStations] = createSignal<
    Array<SubwayStationsAda>
  >([]);

  const [selectedAccessibilitySnapshot, setSelectedAccessibilitySnapshot] =
    createSignal("2025-10-15");

  const [selectedSubwayStationId, setSelectedSubwayStationId] = createSignal<
    string | null
  >(null);

  const [stationsInExtent, setStationsInExtent] = createSignal<
    Array<SubwayStationsAda>
  >([]);

  const [viewCenter, setViewCenter] = createSignal<Coordinate>(FULL_EXTENT_VIEW.center);

  return {
    closestStationsToCenter,
    setClosestStationsToCenter,
    filterToUpgraded,
    setFilterToUpgraded,
    focusedStations,
    setFocusedStations,
    selectedAccessibilitySnapshot,
    setSelectedAccessibilitySnapshot,
    selectedSubwayStationId,
    setSelectedSubwayStationId,
    stationsInExtent,
    setStationsInExtent,
    viewCenter,
    setViewCenter
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
