import { createSelector, createSignal, For, Index } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { createListCollection } from "@ark-ui/solid";
import { transform } from "ol/proj";
import { CircleIcon } from "#src/legend/index.ts";
import { useAtlasContext } from "#src/store/context.tsx";
import { STATION_ZOOM } from "#src/constants.ts";
import { Button } from "#ui/button.tsx";
import * as Select from "#ui/select.tsx";
import * as Switch from "#ui/switch.tsx";
// @ts-ignore .ts file not created by styled-system
import { css } from "#styled-system/css/index.d.ts";

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
  props: JSX.HTMLAttributes<HTMLDivElement>,
) {
  const {
    focusedStations,
    filterToUpgraded,
    setFilterToUpgraded,
    mapView,
    selectedAccessibilitySnapshot,
    setSelectedAccessibilitySnapshot,
  } = useAtlasContext();
  const isStationSelected = createSelector(() => focusedStations().at(0)?.id);
  const [panelView, setPanelView] = createSignal<"about" | "stations">("about");
  const [seeFewerStations, setSeeFewerStations] = createSignal(false);
  const stationsView = () =>
    seeFewerStations() ? focusedStations().slice(0, 1) : focusedStations();
  const collection = createListCollection({
    items: [
      { label: "21 Apr 2026", value: "2026-04-21" },
      { label: "25 Jan 2026", value: "2026-01-25" },
      {
        label: "15 Oct 2025",
        value: "2025-10-15",
      },
      {
        label: "18 Feb 2025",
        value: "2025-02-18",
      },
      {
        label: "17 Apr 2024",
        value: "2024-04-17",
      },
      {
        label: "12 Jan 2024",
        value: "2024-01-12",
      },
      {
        label: "24 Oct 2023",
        value: "2023-10-24",
      },
    ],
  });

  return (
    <div id="panel" {...props}>
      <div
        class={css({
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <h1
          class={css({
            fontWeight: "bold",
            fontSize: "2xl",
          })}
        >
          Subway Stations
        </h1>
        <Button
          type="submit"
          onClick={() =>
            setPanelView((view) => view === "about" ? "stations" : "about")}
        >
          {`${panelView() === "about" ? "See stations" : "Learn more"}`}
        </Button>
      </div>
      {panelView() === "stations"
        ? (
          <>
            <div
              class={css({
                display: "flex",
                width: "100%",
                flexDirection: "column",
                padding: "1",
              })}
            >
              <div
                class={css({
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                })}
              >
                <Select.Root
                  collection={collection}
                  value={[selectedAccessibilitySnapshot()]}
                  onValueChange={(details) => {
                    setSelectedAccessibilitySnapshot(details.items[0].value);
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Snapshot in time</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText />
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Trigger>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      <For each={collection.items}>
                        {(item) => (
                          <Select.Item item={item}>
                            <Select.ItemText>
                              {item.label}
                            </Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        )}
                      </For>
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </div>
              <div
                class={css({
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "center",
                })}
              >
                <Switch.Root
                  checked={filterToUpgraded()}
                  onCheckedChange={() =>
                    setFilterToUpgraded((filterToUpgraded) =>
                      !filterToUpgraded
                    )}
                >
                  <Switch.Label>
                    Show only stations upgraded at snapshot
                  </Switch.Label>
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.HiddenInput />
                </Switch.Root>
              </div>
            </div>
            <div
              class={css({
                maxHeight: "70dvh",
                overflow: "auto",
                scrollbarWidth: "none",
              })}
            >
              <For each={stationsView()}>
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
                        borderWidth: "medium",
                        borderRadius: "lg",
                        borderStyle: "solid",
                        borderColor: "zinc.400",
                        backgroundColor: isStationSelected(station.id)
                          ? "sky.300"
                          : "slate.100",
                        _hover: {
                          cursor: "pointer",
                          borderColor: "zinc.500",
                        },
                      })}
                      onClick={() => {
                        const view = mapView();
                        if (view === undefined) return;
                        const center = station.midpoint;
                        const wgsCenter = transform(
                          center,
                          "EPSG:3857",
                          "EPSG:4326",
                        );
                        const prevZoom = view.getZoom();
                        const nextZoom = prevZoom === undefined
                          ? STATION_ZOOM
                          : Math.max(prevZoom, STATION_ZOOM);
                        view.animate({
                          zoom: nextZoom,
                          center: wgsCenter,
                          duration: 500,
                        });
                      }}
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
            <Button
              onClick={() => setSeeFewerStations((state) => !state)}
            >
              {`See ${seeFewerStations() ? "more" : "fewer"} stations`}
            </Button>
          </>
        )
        : (
          <div
            class={css({
              display: "flex",
              flexDirection: "column",
              maxHeight: "70dvh",
              overflow: "auto",
              scrollbarWidth: "none",
              padding: "1",
            })}
          >
            <div
              class={css({
                margin: "1",
              })}
            >
              <h2
                class={css({
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: "lg",
                })}
              >
                About station accessibility
              </h2>
              <p
                class={css({
                  padding: "0.5",
                })}
              >
                The New York City subway system is one of the largest in the
                world, providing millions of rides every day. Unfortunately, not
                everyone has equal access to its services.{" "}
                <b>
                  Of its nearly 500 subway stations, only about a quarter are
                  considered ADA compliant
                </b>. A station must meet several criteria to be accessible; one
                of the most cost-prohibitive criteria is elevator access to each
                platform.
              </p>
              <p
                class={css({
                  padding: "0.5",
                })}
              >
                Spurred by lawsuit settled in spring of 2023,{" "}
                <b>
                  the MTA plans to achieve ADA compliance at 95% of its stations
                  by 2055.
                </b>{" "}
                This will benefit every New Yorker, as more of our community
                members with temporary and permanent mobility challenges gain
                greater access to the city.
              </p>
            </div>
            <div
              class={css({
                margin: "1",
              })}
            >
              <h2
                class={css({
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: "lg",
                })}
              >
                About the map data
              </h2>
              <p
                class={css({
                  padding: "0.5",
                })}
              >
                This map tracks the progress of the MTA's upgrade efforts.
                Starting with October 2023, it shows snapshots of the subway
                system. Each snapshot shows the accessibility status of every
                subway station. It is possible to view only the stations that
                were made accessible since the last snapshot.
              </p>
              <p
                class={css({
                  padding: "0.5",
                })}
              >
                A new snapshot is added every 3 to 6 months, with the{" "}
                <i>next planned snapshot in July 2026.</i> Data are sourced from
                {" "}
                <a
                  class={css({
                    color: "sky.700",
                    _hover: {
                      textDecoration: "underline",
                    },
                  })}
                  href="https://data.ny.gov/Transportation/MTA-Subway-Stations/39hk-dx4f/about_data"
                >
                  NYC Open Data MTA Subway Stations Dataset
                </a>
              </p>
              <p
                class={css({
                  padding: "0.5",
                })}
              >
                Click <b>"See stations"</b> above to get started
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
