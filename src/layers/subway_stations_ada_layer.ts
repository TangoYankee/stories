import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { FILE_BUCKET } from "../constants.ts";
import { type Accessor } from "solid-js";
import { Circle, Fill, Stroke, Style } from "ol/style";

export interface SubwayStationsAda {
  id: string;
  stop_name: string;
  daytime_routes: string;
  ada: string;
}

export const subwayStationsAda = (
  selectedId: Accessor<string | null>,
  isVisible: Accessor<boolean>,
  focusedStations: Accessor<Array<SubwayStationsAda>>,
) =>
  new VectorTile({
    source: new PMTilesVectorSource({
      url: `${FILE_BUCKET}/ada-subway-stations.pmtiles`,
      attributions: `<a href="https://data.ny.gov/">NYS open data</a>; `,
    }),
    visible: isVisible(),
    style: (feature, resolution) => {
      const { ada, id } = feature
        .getProperties() as SubwayStationsAda;
      // https://colorbrewer2.org/#type=diverging&scheme=Spectral&n=3
      const fillColor = id === selectedId()
        ? "rgba(0, 0, 255, 1)"
        : ada === "1"
        ? "rgba(153,213,148,0.9)"
        : ada === "2"
        ? "rgba(255,255,191,0.9)"
        : "rgba(252,141,89,0.9)";

      const radius = 10 / Math.log(resolution);
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
