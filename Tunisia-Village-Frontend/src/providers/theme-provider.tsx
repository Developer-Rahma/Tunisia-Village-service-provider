"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Design System Theme Provider
 * 
 * Manages theme switching (including system preference detection), dark mode,
 * and brand selection. Utilizes next-themes for fast script-injected classes
 * to prevent the initial screen flashing.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Delay rendering UI parts that depend on the theme client-side 
  // until mounted to avoid SSR / hydration mismatches.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="theme-village"
      enableSystem={false}
      themes={[
        "theme-village",
        "theme-village-dark",
        "theme-sidi-bou",
        "theme-sidi-bou-dark",
        "theme-carthage",
        "theme-carthage-dark"
      ]}
      {...props}
    >
      {/* 
        If components inside need to check mounting status to avoid 
        hydration mismatches, we can expose it via context if needed.
        But standard next-themes manages class injection in layout head perfectly.
      */}
      {children}
    </NextThemesProvider>
  );
}
