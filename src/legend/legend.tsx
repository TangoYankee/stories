import { JSX, JSXElement } from "solid-js";
import { CircleIcon } from "./icon";
import { css } from "../../styled-system/css";

export function Legend(props: JSX.HTMLAttributes<HTMLDivElement>): JSXElement {
  return (
    <div id="legend" {...props}>
      <h2 class={css({ display: "flex", justifyContent: "center" })}>
        Accessibility level
      </h2>
      <div class={css({ display: "flex" })}>
        <div class={css({ display: "flex", alignItems: "center" })}>
          <CircleIcon level="positive" size="md" />
          <p>Full</p>
        </div>
        <div class={css({ display: "flex", alignItems: "center" })}>
          <CircleIcon level="neutral" size="md" />
          <p>Partial</p>
        </div>
        <div class={css({ display: "flex", alignItems: "center" })}>
          <CircleIcon level="negative" size="md" />
          <p>None</p>
        </div>
      </div>
    </div>
  );
}
