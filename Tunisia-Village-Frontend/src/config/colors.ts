import { Primitives } from "./tokens";

/**
 * Semantic Color Mapping
 * 
 * Defines how primitive color tokens are mapped to functional, semantic names.
 * These reflect the purpose of a color (e.g. background, borders, primary actions)
 * rather than its visual hue.
 */
export const SemanticColors = {
  light: {
    background: Primitives.colors.gray[50], // Warm white (#f8f9fa)
    foreground: Primitives.colors.gray[900], // Dark charcoal (#111827)
    
    primary: Primitives.colors.village.primary, // #1a7d5a
    primaryForeground: Primitives.colors.white,
    
    secondary: Primitives.colors.village.sandDark, // #ede5d4
    secondaryForeground: Primitives.colors.village.stone, // #8b7355
    
    accent: Primitives.colors.village.accent, // #FF9149
    accentForeground: Primitives.colors.white,
    
    muted: Primitives.colors.gray[100],
    mutedForeground: Primitives.colors.gray[500],
    
    border: Primitives.colors.gray[200],
    input: Primitives.colors.gray[200],
    ring: Primitives.colors.village.primary,
    
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  
  dark: {
    background: Primitives.colors.gray[950], // Deep charcoal black
    foreground: Primitives.colors.gray[50], // Off-white
    
    primary: Primitives.colors.village.primaryLight, // Brighter green for contrast
    primaryForeground: Primitives.colors.gray[950],
    
    secondary: Primitives.colors.gray[800],
    secondaryForeground: Primitives.colors.gray[300],
    
    accent: Primitives.colors.village.accent, // Warm sunset accent
    accentForeground: Primitives.colors.gray[950],
    
    muted: Primitives.colors.gray[900],
    mutedForeground: Primitives.colors.gray[400],
    
    border: Primitives.colors.gray[800],
    input: Primitives.colors.gray[800],
    ring: Primitives.colors.village.primaryLight,
    
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
  }
};
export type ThemeColorKeys = keyof typeof SemanticColors.light;
export type SemanticColorMap = typeof SemanticColors.light;
