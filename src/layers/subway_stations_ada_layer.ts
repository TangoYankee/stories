import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { FILE_BUCKET } from "../constants";
import { Accessor } from "solid-js";
import { Circle, Fill, Stroke, Style } from "ol/style";

export type SubwayStationsAda = {
  ogc_fid: string;
  stop_name: string;
  daytime_routes: string;
  ada: string;
};

export const subwayStationsAda = (selectedId: Accessor<string | null>) =>
  new VectorTile({
    source: new PMTilesVectorSource({
      url: `${FILE_BUCKET}/ada-subway-stations.pmtiles`,
      attributions: `<a href="https://data.ny.gov/">NYS open data</a>`,
    }),
    style: (feature, resolution) => {
      const { ada, ogc_fid } = feature
        .getProperties() as SubwayStationsAda;
      // https://colorbrewer2.org/#type=diverging&scheme=Spectral&n=3
      const fillColor = ogc_fid === selectedId()
        ? "rgba(0, 0, 255, 1)"
        : ada === "1"
        ? "rgba(153,213,148,0.9)"
        : ada === "2"
        ? "rgba(255,255,191,0.9)"
        : "rgba(252,141,89,0.9)";

      const radius = 10 / Math.log(resolution);
      return new Style({
        image: new Circle({
          radius,
          fill: new Fill({
            color: fillColor,
          }),
          stroke: new Stroke({
            color: "gray",
            width: 1,
          }),
        }),
      });
    },
  });
