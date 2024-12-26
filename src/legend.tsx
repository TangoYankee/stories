import { JSX, JSXElement } from "solid-js";

export function Legend(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  return (
    <div id="legend" {...props}>
      <p>Legend</p>
      <svg height="0.5rem" width="0.5rem" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="rgba(153,213,148,0.9)" />
      </svg>
      <svg height="0.5rem" width="0.5rem" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="rgba(255,255,191,0.9)" />
      </svg>
      <svg height="0.5rem" width="0.5rem" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="rgba(252,141,89,0.9)" />
      </svg>
    </div>
  );
}
