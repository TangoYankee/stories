// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";

export function Switch() {
  return (
    <div
      class={css({
        height: "1rem",
        width: "2rem",
      })}
    >
      <input
        type="checkbox"
        checked
        classList={{ "peer": true }}
        class={css({
          position: "absolute",
          height: "inherit",
          width: "inherit",
          opacity: 0,
          cursor: "pointer",
          zIndex: 2,
        })}
      />
      <label
        for="stations-toggle"
        aria-label="Subway Stations Switch"
        class={css({
          _peerChecked: {
            backgroundColor: "sky.500",
          },
          height: "inherit",
          width: "inherit",
          position: "absolute",
          backgroundColor: "sky.100",
          borderRadius: "xl",
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: "zinc.500",
          transition: "0.3s",
          zIndex: 0,
        })}
      />
      <div
        class={css({
          height: "1rem",
          width: "1rem",
          _peerChecked: {
            marginLeft: "1rem",
            backgroundColor: "amber.500",
          },
          borderRadius: "xl",
          transition: "0.3s",
          borderStyle: "solid",
          borderWidth: "thin",
          borderColor: "zinc.500",
          content: "off",
          position: "absolute",
          backgroundColor: "amber.100",
          zIndex: 1,
        })}
      />
    </div>
  );
}
