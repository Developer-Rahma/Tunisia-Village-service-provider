/**
 * Design Tokens - Single Source of Truth
 * 
 * Primitive design values defined as raw constants. These describe the brand's
 * physical characteristics rather than their semantic application in components.
 */

export const Primitives = {
  colors: {
    // Tunisian Village Palette (Default)
    village: {
      primary: "#1a7d5a",      // Traditional Tunisian green
      primaryLight: "#22a374", // Olive green tint
      primaryDark: "#145e43",  // Forest olive
      accent: "#FF9149",       // Terracotta sun
      accentLight: "#f7b84b",  // Warm yellow sun
      accentDark: "#e09010",   // Sunset orange
      sand: "#f5f0e8",         // Desert sand base
      sandDark: "#ede5d4",     // Shadow sand
      stone: "#8b7355",        // Tunisian clay/stone
    },

    // Sidi Bou Said Theme (Vibrant Blue & Crisp White)
    sidiBou: {
      primary: "#2885AC",      // Sidi Bou Said Blue
      primaryLight: "#489dc2", // Sky blue
      primaryDark: "#1b5e7d",  // Deep Mediterranean blue
      accent: "#E2725B",       // Jasmine terracotta
      accentLight: "#ea9281",  // Soft terracotta
      accentDark: "#c4543e",   // Burnt clay
      sand: "#fcfbfc",         // Pure white limestone
      sandDark: "#eef2f5",     // Cool stone gray
      stone: "#5c6f84",        // Slate blue
    },

    // Carthage Gold (Royal Purple & Gold)
    carthage: {
      primary: "#7C3AED",      // Carthage Tyrian purple
      primaryLight: "#9F67FF", // Lilac
      primaryDark: "#5B21B6",  // Royal violet
      accent: "#D4AF37",       // Carthage gold
      accentLight: "#F3E5AB",  // Soft gold
      accentDark: "#AA7C11",   // Antique brass
      sand: "#FAF7F2",         // Pale parchment
      sandDark: "#EFEBE4",     // Antique marble
      stone: "#786F62",        // Ancient mortar
    },

    // Common Neutrals
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712",
    },
    
    white: "#ffffff",
    black: "#000000",
  },

  typography: {
    fonts: {
      sans: "var(--font-ibmArabic), system-ui, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
      xxxl: "1.875rem",
      display: "2.25rem",
    },
    weights: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
    xl: "32px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.08)",
    md: "0 4px 16px rgba(0,0,0,0.10)",
    lg: "0 8px 32px rgba(0,0,0,0.12)",
    card: "0 2px 12px rgba(26, 125, 90, 0.08)",
  },

  motion: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    timing: {
      easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};
