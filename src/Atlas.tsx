import { createSignal, JSX, JSXElement, onMount } from "solid-js";
import "ol/ol.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { useGeographic } from "ol/proj";
import { Circle, Fill, Stroke, Style } from "ol/style";

const FILE_BUCKET = import.meta.env.VITE_FILE_BUCKET;

type SubwayStationProperties = {
  station_id: string;
  stop_name: string;
  daytime_routes: string;
  ada: string;
};

export function Atlas(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  const [selectedSubwayStationId, setSelectedSubwayStationId] = createSignal<
    string | null
  >(null);
  onMount(() => {
    useGeographic();
    const nycLayer = new VectorTile({
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

    const subwayAdaLayer = new VectorTile({
      source: new PMTilesVectorSource({
        url:
          `${FILE_BUCKET}/nyc_subway_stations/2024_aug_22_subway_ada.pmtiles`,
        attributions: ["NYS open data"],
      }),
      style: (feature, resolution) => {
        const { ada, station_id } = feature
          .getProperties() as SubwayStationProperties;
        // https://colorbrewer2.org/#type=diverging&scheme=Spectral&n=3
        const fillColor = station_id === selectedSubwayStationId()
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

    const map = new Map({
      target: "atlas",
      layers: [nycLayer, subwayAdaLayer],
      view: new View({
        center: [-74, 40.7],
        zoom: 11,
        extent: [-75, 40.2, -73, 41.2],
      }),
    });

    map.on("click", async (e) => {
      const stationFeatures = await subwayAdaLayer.getFeatures(e.pixel);
      const nextStationId = stationFeatures.length === 0
        ? null
        : (stationFeatures[0].getProperties() as SubwayStationProperties)
          .station_id;
      const prevStationId = selectedSubwayStationId();
      // ne previous and no next:
      // do nothing
      if (prevStationId === null && nextStationId === null) return;

      // previous and next are same id
      // set station id to null
      if (prevStationId === nextStationId) {
        setSelectedSubwayStationId(null);
      }

      // previous and next are not otherwise equarl
      // (no previous and a next, or a previous and no next)
      // set station id to value of next (whether next is string or null)
      if (prevStationId !== nextStationId) {
        setSelectedSubwayStationId(nextStationId);
      }

      subwayAdaLayer.changed();
    });
  });

  return <div id="atlas" {...props} />;
}
