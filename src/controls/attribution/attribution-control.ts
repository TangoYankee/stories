import Attribution from "ol/control/Attribution";

export const attribution = () =>
  new Attribution({
    className: "ol-control-attribution",
    collapsed: false,
    collapsible: false,
    target: "attribution-control",
  });
