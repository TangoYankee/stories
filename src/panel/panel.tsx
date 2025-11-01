import { JSX } from "solid-js/jsx-runtime";
import { CircleIcon, Legend } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";
import { Switch } from "../switch/switch.tsx";
import {
  type Accessor,
  createEffect,
  createMemo,
  For,
  Index,
  type Setter,
} from "solid-js";
import { SubwayStationsAda } from "../layers/subway_stations_ada_layer.ts";
import clonedeep from "lodash.clonedeep";

const routeIconFileName: Record<string, string> = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "A": "a",
  "B": "b",
  "C": "c",
  "D": "d",
  "E": "e",
  "F": "f",
  "G": "g",
  "J": "j",
  "L": "l",
  "M": "m",
  "N": "n",
  "Q": "q",
  "R": "r",
  "S": "s",
  "SIR": "sir",
  "W": "w",
  "Z": "z",
};

export function Panel(
  props: JSX.HTMLAttributes<HTMLDivElement> & {
    selectedSubwayStationId: Accessor<string | null>;
    setSelectedSubwayStationId: Setter<string | null>;
    isSubwayStationVisible: Accessor<boolean>;
    setIsSubwayStationVisible: Setter<boolean>;
    isCityCouncilDistrictVisible: Accessor<boolean>;
    setIsCityCouncilDistrictVisible: Setter<boolean>;
    focusedStations: Accessor<Array<SubwayStationsAda>>;
  },
) {
  const {
    selectedSubwayStationId,
    setSelectedSubwayStationId,
    isSubwayStationVisible,
    setIsSubwayStationVisible,
    isCityCouncilDistrictVisible,
    setIsCityCouncilDistrictVisible,
    focusedStations,
  } = props;
  const stations = () =>
    focusedStations().map((station) => {
      return {
        ...station,
        isSelected: selectedSubwayStationId() === station.id,
      };
    });
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
        <For each={stations()}>
          {(station) => {
            const backgroundColor = station.isSelected
              ? "sky.300"
              : "slate.100";
            return (
              <div
                class={css({
                  display: "flex",
                  margin: 1,
                  padding: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "solid",
                  borderWidth: "medium",
                  borderRadius: "lg",
                  borderColor: "slate.400",
                  backgroundColor,
                  _hover: {
                    cursor: "pointer",
                    borderStyle: "dashed",
                  },
                })}
                onClick={() => setSelectedSubwayStationId(station.id)}
              >
                <div>
                  <h3
                    class={css({
                      fontWeight: "bold",
                    })}
                  >
                    {station.stop_name}
                  </h3>
                  <div
                    class={css({
                      display: "flex",
                      alignItems: "center",
                    })}
                  >
                    {station.ada === "0"
                      ? (
                        <>
                          <p>Not accessible</p>
                          <CircleIcon level="negative" size="md" />
                        </>
                      )
                      : station.ada === "1"
                      ? (
                        <>
                          <p>Fully accessible</p>
                          <CircleIcon level="positive" size="md" />
                        </>
                      )
                      : (
                        <>
                          <p>Partially accessible</p>
                          <CircleIcon level="neutral" size="md" />
                        </>
                      )}
                  </div>
                </div>
                <div
                  class={css({
                    display: "flex",
                  })}
                >
                  <Index each={station.daytime_routes.split(" ")}>
                    {(routeId) => {
                      const fileName = routeId() in routeIconFileName
                        ? routeIconFileName[routeId()]
                        : "t";
                      return (
                        <img
                          src={`icons/${fileName}.svg`}
                          class={css({ height: "1.4rem" })}
                        />
                      );
                    }}
                  </Index>
                </div>
              </div>
            );
          }}
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
