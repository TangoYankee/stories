import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import process from "node:process";
import * as path from "node:path";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  resolve: {
    alias: {
      "#styled-system": path.resolve(__dirname, "./styled-system"),
      "#src": path.resolve(__dirname, "./src"),
      "#ui": path.resolve(__dirname, "./src/components/ui"),
    },
  },
  build: {
    target: "esnext",
  },
});
