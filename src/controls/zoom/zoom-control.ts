import Zoom from "ol/control/Zoom";

export const zoom = () =>
  new Zoom({
    className: "ol-control-zoom",
    target: "zoom-control",
  });
