import { JSX } from "solid-js/jsx-runtime";
import { Legend } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";
import { Switch } from "../switch/switch.tsx";
import { type Accessor, For, type Setter } from "solid-js";
import { SubwayStationsAda } from "../layers/subway_stations_ada_layer.ts";

export function Panel(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    isSubwayStationVisible: Accessor<boolean>;
    setIsSubwayStationVisible: Setter<boolean>;
    isCityCouncilDistrictVisible: Accessor<boolean>;
    setIsCityCouncilDistrictVisible: Setter<boolean>;
    focusedStations: Accessor<Array<SubwayStationsAda>>;
  },
) {
  const {
    isSubwayStationVisible,
    setIsSubwayStationVisible,
    isCityCouncilDistrictVisible,
    setIsCityCouncilDistrictVisible,
    focusedStations,
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
          <img src="icons/7.svg" class={css({ height: "1.5rem" })} />
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
        <For each={focusedStations()}>
          {(station) => (
            <div
              class={css({
                display: "flex",
                flexDirection: "column",
                margin: "1rem",
              })}
            >
              <h3>{station.stop_name}, {station.daytime_routes}</h3>
              <p>
                {["Not", "Fully", "Partially"][parseInt(station.ada)]}{" "}
                accessible
              </p>
            </div>
          )}
        </For>
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
