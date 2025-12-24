import { Coordinate } from "ol/coordinate";

export const cartesianDistance = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => {
  const xDistance = Math.pow(x2 - x1, 2);
  const yDistance = Math.pow(y2 - y1, 2);
  return Math.sqrt(xDistance + yDistance);
};

export const compareStationDistance = (viewCenter: Coordinate) =>
(
  stationA: { midpoint: Coordinate },
  stationB: { midpoint: Coordinate },
) => {
  const midpointStationA = stationA.midpoint;
  const midpointStationB = stationB.midpoint;
  const distanceStationA = cartesianDistance({
    x1: midpointStationA[0],
    y1: midpointStationA[1],
    x2: viewCenter[0],
    y2: viewCenter[1],
  });

  const distanceStationB = cartesianDistance({
    x1: midpointStationB[0],
    y1: midpointStationB[1],
    x2: viewCenter[0],
    y2: viewCenter[1],
  });
  return distanceStationA - distanceStationB;
};

export function findTopN<T>(
  n: number,
  items: Array<T>,
  compare: (a: T, b: T) => number,
) {
  const m = Math.min(n, items.length);
  /*
    Check whether JS sort or custom selection sort is
    likely faster based on the number of items and how many will be selected.
  */
  if (Math.pow(Math.log(items.length), m) < m) {
    return items.toSorted(compare).slice(0, m);
  }

  const topN: Array<T | null> = Array(m).fill(null);
  items.forEach((incomingItem) => {
    let position = 0;
    let unplacedItem = incomingItem;
    const positions = topN.length;
    while (position < positions) {
      const placedItem = topN[position];
      if (placedItem === null) {
        topN[position] = unplacedItem;
        return;
      }
      const result = compare(unplacedItem, placedItem);
      if (result < 0) {
        topN[position] = unplacedItem;
        unplacedItem = placedItem;
      }
      position++;
    }
  });
  return topN as Array<T>;
}
