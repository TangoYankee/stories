import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { FILE_BUCKET } from "../constants.ts";
import { type Accessor } from "solid-js";
import { Circle, Fill, Stroke, Style } from "ol/style";

export interface SubwayStationsAda {
  id: string;
  stop_name: string;
  daytime_routes: string;
  fully_accessible: string | null;
  partially_accessible: string | null;
  not_accessible: string | null;
}

export const subwayStationsAda = (
  selectedId: Accessor<string | null>,
  focusedStations: Accessor<Array<SubwayStationsAda>>,
  selectedAccessibilitySnapshot: Accessor<string>,
  filterToUpgraded: Accessor<boolean>,
) =>
  new VectorTile({
    source: new PMTilesVectorSource({
      url: `${FILE_BUCKET}/ada-subway-stations.pmtiles`,
      attributions: `<a href="https://data.ny.gov/">NYS</a>; `,
    }),
    style: (feature, resolution) => {
      const { fully_accessible, partially_accessible, id } = feature
        .getProperties() as SubwayStationsAda;
      console.log("fully", fully_accessible);
      console.log("snapshot", selectedAccessibilitySnapshot());
      const snapshot = new Date(selectedAccessibilitySnapshot());
      const fullyAccessible = fully_accessible !== null
        ? new Date(fully_accessible)
        : null;
      const partiallyAccessible = partially_accessible !== null
        ? new Date(partially_accessible)
        : null;
      // https://colorbrewer2.org/#type=diverging&scheme=Spectral&n=3
      const fillColor = id === selectedId()
        ? "rgba(0, 0, 255, 1)"
        : fullyAccessible !== null &&
            fullyAccessible <= snapshot
        ? "rgba(153,213,148,0.9)"
        : partiallyAccessible !== null &&
            partiallyAccessible <= snapshot
        ? "rgba(255,255,191,0.9)"
        : "rgba(252,141,89,0.9)";

      const isUpgradedStation = fully_accessible ===
        selectedAccessibilitySnapshot();
      const radius = filterToUpgraded() && !isUpgradedStation
        ? 0
        : 10 / Math.log(resolution);
      const isFocusedStation = focusedStations().some((station) =>
        station.id === id
      );
      const width = isFocusedStation ? 3 : 1;
      const lineDash = isFocusedStation ? [6] : undefined;
      return new Style({
        image: new Circle({
          radius,
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: "gray",
            lineDash,
            width,
          }),
        }),
      });
    },
  });
