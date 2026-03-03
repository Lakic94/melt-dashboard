"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "arctic" | "glacial" | "copper" | "ocean" | "dark";

export interface ThemeInfo {
  value: Theme;
  label: string;
  preview: string; // color swatch for the switcher UI
}

export const themes: ThemeInfo[] = [
  { value: "arctic", label: "Arctic", preview: "#ffffff" },
  { value: "glacial", label: "Glacial", preview: "#081A49" },
  { value: "copper", label: "Copper", preview: "#C68346" },
  { value: "ocean", label: "Ocean", preview: "#117896" },
  { value: "dark", label: "Dark", preview: "#020623" },
];

const STORAGE_KEY = "melt-theme";

/** CSS class applied to <html> for each theme (arctic uses no class / just :root) */
function themeClass(theme: Theme): string | null {
  if (theme === "arctic") return null;
  return `theme-${theme}`;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: ThemeInfo[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("arctic");

  // Read persisted theme on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored && themes.some((t) => t.value === stored)) {
        setThemeState(stored);
      }
    } catch {
      // localStorage unavailable — stay on default
    }
  }, []);

  // Apply theme class to <html> whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    for (const t of themes) {
      const cls = themeClass(t.value);
      if (cls) root.classList.remove(cls);
    }
    // Add active theme class
    const cls = themeClass(theme);
    if (cls) root.classList.add(cls);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
