import { JSX } from "solid-js/jsx-runtime";
import { CircleIcon } from "../legend/index.ts";
// @ts-ignore .ts file not created by styled-system
import { css } from "../../styled-system/css/index.d.ts";
import {
  type Accessor,
  createSelector,
  For,
  Index,
  type Setter,
} from "solid-js";
import { SubwayStationsAda } from "../layers/subway_stations_ada_layer.ts";
import { Switch } from "../switch/switch.tsx";

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
    filterToUpgraded: Accessor<boolean>;
    setFilterToUpgraded: Setter<boolean>;
    selectedAccessibilitySnapshot: Accessor<string>;
    setSelectedAccessibilitySnapshot: Setter<string>;
    selectedSubwayStationId: Accessor<string | null>;
    setSelectedSubwayStationId: Setter<string | null>;
    focusedStations: Accessor<Array<SubwayStationsAda>>;
  },
) {
  const {
    filterToUpgraded,
    setFilterToUpgraded,
    selectedAccessibilitySnapshot,
    setSelectedAccessibilitySnapshot,
    selectedSubwayStationId,
    setSelectedSubwayStationId,
    focusedStations,
  } = props;
  const isSelected = createSelector(selectedSubwayStationId);
  const isSnapshotSelected = createSelector(selectedAccessibilitySnapshot);
  return (
    <div id="panel" {...props}>
      <div>
        <div
          class={css({
            display: "flex",
            width: "100%",
            flexDirection: "column",
            padding: "1",
          })}
        >
          <h1
            class={css({
              fontWeight: "bold",
              fontSize: "large",
            })}
          >
            Subway Stations
          </h1>
          <div
            class={css({
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            })}
          >
            <label for="snapshot-selector">Snapshot in time</label>
            <select
              id="snapshot-selector"
              onInput={(e) => {
                const { value } = e.currentTarget;
                setSelectedAccessibilitySnapshot(value);
              }}
              class={css({
                borderStyle: "solid",
                borderWidth: "thin",
                borderRadius: "md"
              })}
            >
              <option
                value="2025-10-15"
                selected={isSnapshotSelected("2025-10-15")}
              >
                15 Oct 2025
              </option>
              <option
                value="2025-02-18"
                selected={isSnapshotSelected("2025-02-18")}
              >
                18 Feb 2025
              </option>
              <option
                value="2024-04-17"
                selected={isSnapshotSelected("2024-04-17")}
              >
                17 Apr 2024
              </option>
              <option
                value="2024-01-12"
                selected={isSnapshotSelected("2024-01-12")}
              >
                12 Jan 2024
              </option>
              <option
                value="2023-10-24"
                selected={isSnapshotSelected("2023-10-24")}
              >
                24 Oct 2023
              </option>
            </select>
          </div>
          <div
            class={css({
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            })}
          >
            <p>Show only stations upgraded at snapshot</p>
            <Switch
              isChecked={filterToUpgraded}
              onInputChange={() =>
                setFilterToUpgraded((filterToUpgraded) => !filterToUpgraded)}
            />
          </div>
        </div>
        <For each={focusedStations()}>
          {(station) => {
            const {
              fully_accessible,
              partially_accessible,
            } = station;

            const snapshot = new Date(selectedAccessibilitySnapshot());
            const isFullyAccessible = fully_accessible !== null &&
              new Date(fully_accessible) <= snapshot;
            const isPartiallyAccessible = partially_accessible !== null &&
              new Date(partially_accessible) <= snapshot;

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
                  backgroundColor: isSelected(station.id)
                    ? "sky.300"
                    : "slate.100",
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
                    {isFullyAccessible
                      ? (
                        <>
                          <p>Fully accessible</p>
                          <CircleIcon level="positive" size="md" />
                        </>
                      )
                      : isPartiallyAccessible
                      ? (
                        <>
                          <p>Partially accessible</p>
                          <CircleIcon level="neutral" size="md" />
                        </>
                      )
                      : (
                        <>
                          <p>Not accessible</p>
                          <CircleIcon level="negative" size="md" />
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
    </div>
  );
}
