import { JSXElement } from "solid-js";
// @ts-ignore .ts file not created by styled-system
import { cva, type RecipeVariant } from "../../../styled-system/css/index.d.ts";

const circleIconStyle = cva({
  base: {
    margin: "1",
    stroke: "stone.900",
    strokeWidth: "5",
  },
  variants: {
    level: {
      positive: {
        fill: "hsla(115, 44%, 71%, 0.9)",
      },
      neutral: {
        fill: "hsla(60, 100%, 87%, 0.9)",
      },
      negative: {
        fill: "hsla(19, 96%, 67%, 0.9)",
      },
    },
    size: {
      sm: {
        height: "0.5rem",
        width: "0.5rem",
      },
      md: {
        height: "0.75rem",
        width: "0.75rem",
      },
      lg: {
        height: "1.0rem",
        width: "1.0rem",
      },
    },
  },
});

type CircleIconVariants = RecipeVariant<typeof circleIconStyle>;

export function CircleIcon(props: CircleIconVariants): JSXElement {
  return (
    <svg
      viewBox="0 0 100 100"
      class={circleIconStyle(props)}
    >
      <circle cx="50" cy="50" r="50" />
    </svg>
  );
}
