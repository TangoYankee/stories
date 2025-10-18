import { JSX } from "solid-js/jsx-runtime";
import { Legend } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";

export function Panel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id="panel" {...props}>
      <div>
        <div
          class={css({
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          })}
        >
          <h2>Subway Stations</h2>
          <div
            class={css({
              height: "1rem",
              width: "3rem",
            })}
          >
            <input
              type="checkbox"
              checked
              classList={{"peer": true}}
              class={css({
                position: "absolute",
                height: "inherit",
                width: "inherit",
                opacity: 0,
                cursor: "pointer",
                zIndex: 2
              })}
            />
            <label
              for="stations-toggle"
              aria-label="Subway Stations Switch"
              class={css({
                _peerChecked: {
                  backgroundColor: "amber.500"
                },
                height: "inherit",
                width: "inherit",
                position: "absolute",
                backgroundColor: "stone.200",
                borderRadius: "sm",
                borderStyle: "solid",
                borderWidth: "thin",
                borderColor: "zinc.800",
                transition: "0.3s",
                zIndex: 0
              })}
            />
            <div class={css({
              height: "1rem",
              width: "1.2rem",
              _peerChecked: {
                marginLeft: "1.75rem",
                borderLeftRadius: "unset",
                borderRightRadius: "sm",
                backgroundColor: "green.900"
              },
              borderLeftRadius: "sm",
              transition: "0.3s",
              borderStyle: "solid",
              borderWidth: "thin",
              borderColor: "zinc.800",
              content: "off",
              position: "absolute",
              backgroundColor: "zinc.400",
              zIndex: 1,
            })}/>
          </div>
        </div>
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
