import { PMTilesVectorSource } from "ol-pmtiles";
import { VectorTile } from "ol/layer";
import { FILE_BUCKET } from "../constants";
import { Stroke, Style, Text } from "ol/style";

export type CityCouncilDistrict = {
  id: string;
  layer: "fill" | "label";
};
export const cityCouncilDistrict = () =>
  new VectorTile({
    source: new PMTilesVectorSource({
      url: `${FILE_BUCKET}/city-council-district.pmtiles`,
      attributions:
        `<a href="https://opendata.cityofnewyork.us/">NYC open data</a>`,
    }),
    style: (feature) => {
      const { id, layer } = feature.getProperties() as CityCouncilDistrict;
      console.log("getGeometry", feature.getProperties());
      const style = layer === "label"
        ? {
          text: new Text({
            font: "12px Calibri,sans-serif",
            text: id,
          }),
        }
        : {
          stroke: new Stroke({
            color: "gray",
            width: 1,
          }),
        };
      return new Style(style);
    },
  });
