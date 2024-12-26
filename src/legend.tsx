import { JSX, JSXElement } from "solid-js";

export function Legend(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  return (
    <div id="legend" {...props}>
      <p>Legend</p>
    </div>
  );
}
