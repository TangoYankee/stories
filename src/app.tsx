import { type Component } from "solid-js";
// @ts-ignore .ts file not created by styled-system
import { css } from "../styled-system/css/index.d.ts";
import { Atlas } from "./atlas.tsx";
import { AttributionControl, ZoomControl } from "./controls/index.tsx";
import { Panel } from "./panel/index.ts";
import { AtlasProvider } from "./store/provider.tsx";

export type Display = "closed" | "half" | "full";
const App: Component = () => {
  return (
    <AtlasProvider>
      <div
        class={css({
          height: "100%",
          width: "100%",
          display: "grid",
          gridTemplateRows: "0dvh 1dvh 96dvh 3dvh",
          gridTemplateColumns: "1dvw 20dvw 1dvw 77dvw 1dvw",
        })}
      >
        <div
          class={css({
            gridRow: "1 / 2",
            gridColumn: "1 / 6",
            backgroundColor: "#4D705C",
          })}
        />
        <Panel
          class={css({
            gridRow: "3 / 5",
            gridColumn: "2 / 3",
            _portrait: {
              gridColumn: "1 / 6",
              alignSelf: "end",
            },
            height: "fit-content",
            width: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "slate.50/90",
            borderRadius: "sm",
            padding: "1",
            zIndex: "1",
          })}
        />
        <ZoomControl
          class={css({
            gridRow: "3 / 4",
            gridColumn: "4 / 5",
            _portrait: {
              gridColumn: "2 / 3",
            },
            height: "0",
            width: "fit-content",
            zIndex: "1",
          })}
        />
        <AttributionControl
          class={css({
            gridRow: "4 / 5",
            _portrait: {
              gridRow: "2 / 3",
              alignSelf: "start",
            },
            gridColumn: "3 / 6",
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
    </AtlasProvider>
  );
};

export default App;
