const { VITE_TILE_CDN } = import.meta.env;

if (typeof VITE_TILE_CDN !== "string" || VITE_TILE_CDN === "") {
  throw new Error("tile cdn missing");
}

export const env = {
  viteTileCdn: VITE_TILE_CDN,
};
