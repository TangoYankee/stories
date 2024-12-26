import Attribution from "ol/control/Attribution";

export const attribution = () =>
  new Attribution({
    collapsed: false,
    collapsible: false,
    className: "ol-control-attribution",
    target: "attribution-control",
  });
