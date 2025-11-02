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
    selectedAccessibilitySnapshot: Accessor<Date>;
    setSelectedAccessibilitySnapshot: Setter<Date>;
    selectedSubwayStationId: Accessor<string | null>;
    setSelectedSubwayStationId: Setter<string | null>;
    focusedStations: Accessor<Array<SubwayStationsAda>>;
  },
) {
  const {
    selectedAccessibilitySnapshot,
    selectedSubwayStationId,
    setSelectedSubwayStationId,
    focusedStations,
  } = props;
  const isSelected = createSelector(selectedSubwayStationId);
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
        </div>
        <For each={focusedStations()}>
          {(station) => {
            const {
              fully_accessible,
              partially_accessible,
            } = station;

            const fullyAccessible = fully_accessible !== null
              ? new Date(fully_accessible)
              : null;
            const partiallyAccessible = partially_accessible !== null
              ? new Date(partially_accessible)
              : null;

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
                    {fullyAccessible !== null &&
                        fullyAccessible <= selectedAccessibilitySnapshot()
                      ? (
                        <>
                          <p>Fully accessible</p>
                          <CircleIcon level="positive" size="md" />
                        </>
                      )
                      : partiallyAccessible !== null &&
                          partiallyAccessible <= selectedAccessibilitySnapshot()
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
