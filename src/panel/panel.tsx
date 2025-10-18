import { JSX } from "solid-js/jsx-runtime";
import { Legend } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";

export function Panel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="panel" {...props}>
      <div>
        <h2>Subway Stations</h2>
        <Legend
          class={css({
            display: "flex",
            flexDirection: "column",
          })}
        />
      </div>
      <div>
        <h2>City Council Districts</h2>
      </div>
    </div>
  );
}
