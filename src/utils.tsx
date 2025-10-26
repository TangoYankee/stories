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
