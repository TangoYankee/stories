import { type Component } from "solid-js";
import { css } from "../styled-system/css";
import { Atlas } from "./atlas";
import { Legend } from "./legend";
import { AttributionControl, ZoomControl } from "./controls";

export type Display = "closed" | "half" | "full";
const App: Component = () => {
  return (
    <div
      class={css({
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "7dvh 86dvh 7dvh",
        gridTemplateColumns: "100dvw",
      })}
    >
      <div
        class={css({
          gridRow: "1 / 2",
          gridColumn: "1 / 2",
          backgroundColor: "#4D705C",
        })}
      />
      <AttributionControl
        class={css({
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
          backgroundColor: "#e8e8e8",
          height: "8rem",
          alignSelf: "end",
          width: "12rem",
          justifySelf: "left",
          margin: "0.5rem",
          zIndex: "1",
        })}
      />
      <ZoomControl
        class={css({
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
          backgroundColor: "#e8e8e8",
          height: "8rem",
          alignSelf: "end",
          width: "12rem",
          justifySelf: "center",
          margin: "0.5rem",
          zIndex: "1",
        })}
      />
      <Legend
        class={css({
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
          backgroundColor: "#e8e8e8",
          height: "8rem",
          alignSelf: "end",
          width: "12rem",
          justifySelf: "right",
          margin: "0.5rem",
          zIndex: "1",
        })}
      />
      <Atlas
        class={css({
          gridRow: "2 / 4",
          gridColumn: "1 / 2",
          zIndex: "0",
        })}
      />
    </div>
  );
};

export default App;
