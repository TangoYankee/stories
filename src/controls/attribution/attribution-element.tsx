import { JSX, JSXElement } from "solid-js";
import "./attribution-style.css";

export function AttributionControl(
  props: JSX.HTMLAttributes<HTMLDivElement>,
): JSXElement {
  return <div id="attribution-control" {...props} />;
}
