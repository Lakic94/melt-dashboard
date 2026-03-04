"use client";

import { createContext, useContext } from "react";

export type Theme = "copper";

export interface ThemeInfo {
  value: Theme;
  label: string;
  preview: string;
}

export const themes: ThemeInfo[] = [
  { value: "copper", label: "Copper", preview: "#C68346" },
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: ThemeInfo[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: "copper", setTheme: () => {}, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
