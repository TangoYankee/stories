import { red } from "~/theme/colors/red.ts";
import { neutral } from "~/theme/colors/neutral.ts";
import { green } from "~/theme/colors/green.ts";
import { animationStyles } from "~/theme/animation-styles.ts";
import { zIndex } from "~/theme/tokens/z-index.ts";
import { shadows } from "~/theme/tokens/shadows.ts";
import { durations } from "~/theme/tokens/durations.ts";
import { colors } from "~/theme/tokens/colors.ts";
import { textStyles } from "~/theme/text-styles.ts";
import { layerStyles } from "~/theme/layer-styles.ts";
import { keyframes } from "~/theme/keyframes.ts";
import { globalCss } from "~/theme/global-css.ts";
import { conditions } from "~/theme/conditions.ts";
import { recipes, slotRecipes } from "~/theme/recipes/index.ts";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  plugins: [
    {
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, [
              "theme.tokens.colors",
              "theme.semanticTokens.colors",
            ])
            : preset,
      },
    },
  ],

  // Useful for theme customization
  theme: {
    extend: {
      animationStyles: animationStyles,
      recipes: recipes,
      slotRecipes: slotRecipes,
      keyframes: keyframes,
      layerStyles: layerStyles,
      textStyles: textStyles,

      tokens: {
        colors: colors,
        durations: durations,
        zIndex: zIndex,
      },

      semanticTokens: {
        colors: {
          fg: {
            default: {
              value: {
                _light: "{colors.gray.12}",
                _dark: "{colors.gray.12}",
              },
            },

            muted: {
              value: {
                _light: "{colors.gray.11}",
                _dark: "{colors.gray.11}",
              },
            },

            subtle: {
              value: {
                _light: "{colors.gray.10}",
                _dark: "{colors.gray.10}",
              },
            },
          },

          border: {
            value: {
              _light: "{colors.gray.4}",
              _dark: "{colors.gray.4}",
            },
          },

          error: {
            value: {
              _light: "{colors.red.9}",
              _dark: "{colors.red.9}",
            },
          },

          green: green,
          gray: neutral,
          red: red,
        },

        shadows: shadows,

        radii: {
          l1: {
            value: "{radii.xs}",
          },

          l2: {
            value: "{radii.sm}",
          },

          l3: {
            value: "{radii.md}",
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  jsxFramework: "solid",
  globalCss: globalCss,
  conditions: conditions,
});
