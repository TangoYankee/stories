import { createContext, useContext } from "solid-js";
import { AtlasContextType } from "./types.ts";

export const AtlasContext = createContext<AtlasContextType>(undefined);

export function useAtlasContext() {
  const context = useContext(AtlasContext);
  if (context === undefined) {
    throw new Error("useAtlasContext must be used within AtlasProvider");
  }
  return context;
}
