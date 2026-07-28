import { useEffect, useState } from "react";

export type ThemePreference = "system" | "light" | "dark";
export type EffectiveTheme = "light" | "dark";

const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export function useEffectiveTheme(themePreference: ThemePreference): EffectiveTheme {
  const [systemTheme, setSystemTheme] = useState<EffectiveTheme>(() => getSystemTheme());

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_SCHEME_QUERY);
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  return themePreference === "system" ? systemTheme : themePreference;
}

function getSystemTheme(): EffectiveTheme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }

  return window.matchMedia(DARK_SCHEME_QUERY).matches ? "dark" : "light";
}
