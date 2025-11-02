import { PMTilesVectorSource } from "ol-pmtiles";
import { VectorTile } from "ol/layer";
import { FILE_BUCKET } from "../constants.ts";
import { Stroke, Style } from "ol/style";

export interface SubwayLine {
  id: number;
  service: string;
}

const lineColors: Record<string, string> = {
  "1": "rgba(216, 34, 51, 1)",
  "2": "rgba(216, 34, 51, 1)",
  "3": "rgba(216, 34, 51, 1)",
  "4": "rgba(0, 153, 82, 1)",
  "5": "rgba(0, 153, 82, 1)",
  "5 Peak": "rgba(0, 153, 82, 1)",
  "6": "rgba(0, 153, 82, 1)",
  "7": "rgba(154, 56, 161, 1)",
  "A": "rgba(0, 98, 207, 1)",
  "B": "rgba(235, 104, 0, 1)",
  "C": "rgba(0, 98, 207, 1)",
  "D": "rgba(235, 104, 0, 1)",
  "E": "rgba(0, 98, 207, 1)",
  "F": "rgba(235, 104, 0, 1)",
  "G": "rgba(121, 149, 52, 1)",
  "J": "rgba(142, 92, 51, 1)",
  "L": "rgba(124, 133, 140, 1)",
  "M": "rgba(235, 104, 0, 1)",
  "N": "rgba(246, 188, 38, 1)",
  "Q": "rgba(246, 188, 38, 1)",
  "R": "rgba(246, 188, 38, 1)",
  "SF": "rgba(124, 133, 140, 1)",
  "SIR": "rgba(8, 23, 156, 1)",
  "ST": "rgba(124, 133, 140, 1)",
  "W": "rgba(246, 188, 38, 1)",
  "Z": "rgba(142, 92, 51, 1)",
  "SR": "rgba(124, 133, 140, 1)",
};

export const subwayLine = () =>
  new VectorTile({
    source: new PMTilesVectorSource({
      url: `${FILE_BUCKET}/subway-lines.pmtiles`,
    }),
    style: (feature) => {
      const { service } = feature.getProperties() as SubwayLine;
      const color = service in lineColors ? lineColors[service] : "red";
      return new Style({
        stroke: new Stroke({
          color,
          width: 0.25,
        }),
      });
    },
  });
