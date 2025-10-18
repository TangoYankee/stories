import { type Component } from "solid-js";
// @ts-ignore .ts file not created by styled-system
import { css } from "../styled-system/css/index.d.ts";
import { Atlas } from "./atlas.tsx";
import { Legend } from "./legend/index.ts";
import { AttributionControl, ZoomControl } from "./controls/index.tsx";
import { Panel } from "./panel/index.ts";

export type Display = "closed" | "half" | "full";
const App: Component = () => {
  return (
    <div
      class={css({
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "7dvh 1dvh 85dvh 7dvh",
        gridTemplateColumns: "1dvw 15dvw 1dvw 82dvw 1dvw",
      })}
    >
      <div
        class={css({
          gridRow: "1 / 2",
          gridColumn: "1 / 6",
          backgroundColor: "#4D705C",
        })}
      />
      <Panel class={css({
        gridRow: "3 / 4",
        gridColumn: "2 / 3",
        height: "fit-content",
        width: "100%",
        backgroundColor: "slate.50/90",
        borderRadius: "sm",
        padding: "1",
        zIndex: "1",
      })} />
      <ZoomControl
        class={css({
          gridRow: "3 / 4",
          gridColumn: "4 / 5",
          height: "0",
          width: "fit-content",
          zIndex: "1",
        })}
      />
      <Legend
        class={css({
          gridRow: "3 / 4",
          gridColumn: "4 / 5",
          backgroundColor: "slate.50/90",
          borderRadius: "sm",
          padding: "1",
          height: "fit-content",
          width: "fit-content",
          alignSelf: "end",
          justifySelf: "right",
          margin: "2",
          zIndex: "1",
        })}
      />
      <AttributionControl
        class={css({
          gridRow: "4 / 5",
          gridColumn: "4 / 6",
          height: "fit-content",
          width: "fit-content",
          justifySelf: "right",
          alignSelf: "end",
          zIndex: "1",
        })}
      />
      <Atlas
        class={css({
          gridRow: "2 / 5",
          gridColumn: "1 / 6",
          zIndex: "0",
        })}
      />
    </div>
  );
};

export default App;
