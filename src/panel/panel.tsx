import { JSX } from "solid-js/jsx-runtime";
import { Legend } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";
import { Switch } from "../switch/switch.tsx";
import { type Accessor, type Setter } from "solid-js";

export function Panel(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    isSubwayStationVisible: Accessor<boolean>;
    setIsSubwayStationVisible: Setter<boolean>;
    isCityCouncilDistrictVisible: Accessor<boolean>;
    setIsCityCouncilDistrictVisible: Setter<boolean>;
  },
) {
  const {
    isSubwayStationVisible,
    setIsSubwayStationVisible,
    isCityCouncilDistrictVisible,
    setIsCityCouncilDistrictVisible,
  } = props;
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
          <Switch
            isChecked={isSubwayStationVisible}
            onInputChange={() => {
              setIsSubwayStationVisible((isVisible) => !isVisible);
            }}
          />
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
        <Switch
          isChecked={isCityCouncilDistrictVisible}
          onInputChange={() => {
            setIsCityCouncilDistrictVisible((isVisible) => !isVisible);
          }}
        />
      </div>
    </div>
  );
}
