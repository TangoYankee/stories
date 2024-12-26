import { PMTilesVectorSource } from "ol-pmtiles";
import { FILE_BUCKET } from "../constants";
import VectorTile from "ol/layer/VectorTile";
import { Fill, Style } from "ol/style";

export const nycBasemapLayer = new VectorTile({
  source: new PMTilesVectorSource({
    url: `${FILE_BUCKET}/nyc_20242003.pmtiles`,
    attributions: ["Openstreetmap contributors"],
  }),
  style: (feature) => {
    const layer: string = feature.get("layer");
    const kind: string = feature.get("kind");

    const getColor = (layer: string, kind: string) => {
      switch (layer) {
        case "background": {
          return "rgb(221, 221, 221)";
        }
        case "earth": {
          return "rgb(233, 234, 220)";
        }
        case "water": {
          return "rgb(190, 218, 215)";
        }
        case "landuse": {
          switch (kind) {
            case "grass":
            case "wood":
            case "wetland":
            case "park":
            case "cemetary":
            case "protected_area":
            case "nature_reserve":
            case "forest":
            case "village_green":
            case "playground":
            case "golf_course": {
              return "rgb(211, 216, 192)";
            }
            case "aerodrome": {
              return "rgb(219, 231, 231)";
            }
          }
          // Same as earth layer
          return "rgb(233, 234, 220)";
        }
        default:
          return null;
      }
    };

    const color = getColor(layer, kind);
    if (color === null) return;
    const shape = feature.getGeometry()?.getType();
    switch (shape) {
      case "Polygon":
      case "MultiPolygon": {
        return new Style({
          fill: new Fill({
            color,
          }),
        });
      }
      default:
        return;
    }
  },
});
