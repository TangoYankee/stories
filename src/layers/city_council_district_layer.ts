import { PMTilesVectorSource } from "ol-pmtiles";
import { VectorTile } from "ol/layer";
import { FILE_BUCKET } from "../constants";
import { Fill, Stroke, Style, Text } from "ol/style";

export type CityCouncilDistrict = {
  id: number;
  district: string;
  layer: "fill" | "label";
};

const fillColors = [
  "rgba(141 ,211, 199, 0.05)",
  "rgba(255, 255, 179, 0.05)",
  "rgba(190, 186, 218, 0.05)",
  "rgba(251, 128, 114, 0.05)",
  "rgba(128, 177, 211, 0.05)",
  "rgba(253, 180, 98, 0.05)",
  "rgba(179, 222, 105, 0.05)",
];
export const cityCouncilDistrict = () =>
  new VectorTile({
    source: new PMTilesVectorSource({
      url: `${FILE_BUCKET}/city-council-districts.pmtiles`,
      attributions:
        `<a href="https://opendata.cityofnewyork.us/">NYC open data</a>`,
    }),
    style: (feature) => {
      const { id, district, layer } = feature
        .getProperties() as CityCouncilDistrict;
      const style = layer === "label"
        ? {
          text: new Text({
            font: "12px Calibri,sans-serif",
            text: district,
            fill: new Fill({
              color:"rgba(25, 31, 52, 0.6)"
            }),
          }),
        }
        : {
          fill: new Fill({
            color: fillColors[id % 7],
          }),
          stroke: new Stroke({
            color: "rgba(25, 31, 52, 0.1)",
            width: 2,
          }),
        };
      return new Style(style);
    },
  });
