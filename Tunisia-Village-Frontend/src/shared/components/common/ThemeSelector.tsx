"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemesList } from "@/src/config/theme";
import { Sun, Moon, Palette, Check } from "lucide-react";

/**
 * ThemeSelector Component
 * 
 * Provides an interactive UI for users to swap between regional themes
 * (Olive Village, Sidi Bou Said Blue, Carthage Gold) and toggle dark mode.
 * Demonstrates the capabilities of the CSS Variable based Design System.
 */
export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-48 bg-muted animate-pulse rounded-2xl border border-border" />
    );
  }

  const currentTheme = theme || "theme-village";

  // Check if active theme is dark
  const isDark = currentTheme.endsWith("-dark");

  // Get base theme name (e.g. "theme-sidi-bou-dark" -> "theme-sidi-bou")
  const baseTheme = isDark ? currentTheme.slice(0, -5) : currentTheme;

  const toggleDarkMode = () => {
    if (isDark) {
      // Switch to light mode variant
      setTheme(baseTheme);
    } else {
      // Switch to dark mode variant
      setTheme(`${baseTheme}-dark`);
    }
  };

  const selectTheme = (themeId: string) => {
    const nextBase = `theme-${themeId}`;
    if (isDark) {
      setTheme(`${nextBase}-dark`);
    } else {
      setTheme(nextBase);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-card border border-border shadow-md transition-all hover:shadow-lg max-w-sm w-full mx-auto animate-scale-up">
      <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground text-sm font-heading">مظهر التطبيق</h3>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
          title={isDark ? "تفعيل الوضع المضيء" : "تفعيل الوضع المظلم"}
        >
          {isDark ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-primary" />}
        </button>
      </div>

      <div className="space-y-2">
        {ThemesList.map((t) => {
          const isSelected = baseTheme === t.className;
          return (
            <button
              key={t.id}
              onClick={() => selectTheme(t.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-right transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/5 text-foreground shadow-sm font-medium"
                  : "border-border hover:border-primary/30 text-muted-foreground bg-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-sm shrink-0"
                  style={{ backgroundColor: t.primaryColor }}
                />
                <div>
                  <span className="text-xs block text-foreground font-semibold">{t.name}</span>
                  <span className="text-[10px] text-muted-foreground block leading-normal mt-0.5">{t.description}</span>
                </div>
              </div>
              {isSelected && <Check className="w-4.5 h-4.5 text-primary shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
