import { JSX, JSXElement } from "solid-js";

export function ZoomControl(
  props: JSX.HTMLAttributes<HTMLDivElement>,
): JSXElement {
  return (
    <div id="zoom-control" {...props}>
      <p>zoom</p>
    </div>
  );
}
