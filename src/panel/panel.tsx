import { JSX } from "solid-js/jsx-runtime";
import { Legend } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";
import { Switch } from "../switch/switch.tsx";

export function Panel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="panel" {...props}>
      <div>
        <div
          class={css({
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <h2>Subway Stations</h2>
          <Switch />
        </div>
        <Legend
          class={css({
            display: "flex",
            flexDirection: "column",
          })}
        />
      </div>
      <div
        class={css({
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        })}
      >
        <h2>City Council Districts</h2>
        <Switch />
      </div>
    </div>
  );
}
