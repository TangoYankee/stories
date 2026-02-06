import { ark } from "@ark-ui/solid/factory";
import type { ComponentProps } from "solid-js";
// @ts-ignore .ts file not created by styled-system
import { styled } from "#styled-system/jsx/index.d.ts";
// @ts-ignore .ts file not created by styled-system
import { group } from "#styled-system/recipes/index.d.ts";

export type GroupProps = ComponentProps<typeof Group>;
export const Group = styled(ark.div, group);
