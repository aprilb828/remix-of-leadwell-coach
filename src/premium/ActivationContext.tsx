import { createContext, useContext } from "react";

export const ActivationContext = createContext<{ plan: string | null }>({ plan: null });

export function useActivation() {
  return useContext(ActivationContext);
}