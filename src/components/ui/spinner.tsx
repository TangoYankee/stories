import { ark } from "@ark-ui/solid/factory";
import type { ComponentProps } from "solid-js";
// @ts-ignore .ts file not created by styled-system
import { styled } from "../../../styled-system/jsx/index.d.ts";
// @ts-ignore .ts file not created by styled-system
import { spinner } from "../../../styled-system/recipes/index.d.ts";

export type SpinnerProps = ComponentProps<typeof Spinner>;
export const Spinner = styled(ark.span, spinner);
