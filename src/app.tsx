import { type Component } from "solid-js";
import { css } from "../styled-system/css";
import { Atlas } from "./atlas";
import { Legend } from "./legend";
import { AttributionControl, ZoomControl } from "./controls";
import { SubwayDetailsPanel } from "./panels/subway-details";

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
          gridRow: "3 / 4",
          gridColumn: "1 / 2",
          height: "fit-content",
          width: "fit-content",
          justifySelf: "right",
          alignSelf: "end",
          zIndex: "1",
        })}
      />
      <ZoomControl
        class={css({
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
          height: "fit-content",
          width: "fit-content",
          margin: "2",
          zIndex: "1",
        })}
      />
      <Legend
        class={css({
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
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
      <SubwayDetailsPanel class={css({
        gridRow: "2 / 3",
        gridColumn: "1 / 2",
        zIndex: "1",
        height: "fit-content",
        width: "fit-content",
        alignSelf: "start",
        justifySelf: "right",
        margin: "2",
        padding: "1",
        borderRadius: "sm",
        backgroundColor: "slate.50/90"
      })}/>
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
