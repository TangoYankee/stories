import { type Component } from "solid-js";
import { css } from "../styled-system/css";
import { Atlas } from "./Atlas";

export type Display = "closed" | "half" | "full";
const App: Component = () => {
  return (
    <div
      class={css({
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "7dvh 93dvh",
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
      <Atlas
        class={css({
          gridRow: "2 / 3",
          gridColumn: "1 / 2",
          zIndex: "0",
        })}
      />
    </div>
  );
};

export default App;
