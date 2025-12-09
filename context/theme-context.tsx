import React, { createContext, useContext, useMemo, useState } from "react";

export type ThemeName = "default" | "eyeCare";
export type ThemeMode = "default" | "eyeCare";

export type Theme = {
  background: string;
  surface: string;
  headerBackground: string;
  headerText: string;
  text: string;
  subText: string;
  border: string;
  primary: string;
  accent: string;
  danger: string;
  mutedSurface: string;
  pill: string;
};

const themes: Record<ThemeName, Theme> = {
  default: {
    background: "#ffffff",
    surface: "#ffffff",
    headerBackground: "#543cdbff",
    headerText: "#ffffff",
    text: "#111827",
    subText: "#6b7280",
    border: "#e5e7eb",
    primary: "#543cda",
    accent: "#ffd900ff",
    danger: "#ef4444",
    mutedSurface: "#f3f4f6",
    pill: "#d8e0ff",
  },
  eyeCare: {
    background: "#e8f5e9",
    surface: "#f0faf3",
    headerBackground: "#43a047",
    headerText: "#f9fafb",
    text: "#1f2933",
    subText: "#4b5563",
    border: "#a7e1b8",
    primary: "#2e7d32",
    accent: "#facc15",
    danger: "#c0392b",
    mutedSurface: "#dcf5e5",
    pill: "#c8e6c9",
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("default");

  const value = useMemo(
    () => ({
      theme: themes[mode],
      mode,
      setMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
