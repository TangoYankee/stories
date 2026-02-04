import { ark } from "@ark-ui/solid/factory";
import type { ComponentProps } from "solid-js";
// @ts-ignore .ts file not created by styled-system
import { styled } from "../../../styled-system/jsx/index.d.ts";
// @ts-ignore .ts file not created by styled-system
import { absoluteCenter } from "../../../styled-system/recipes/index.d.ts";

export type AbsoluteCenterProps = ComponentProps<typeof AbsoluteCenter>;
export const AbsoluteCenter = styled(ark.div, absoluteCenter);
