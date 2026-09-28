# 🎨 Design System Architecture for Next.js + Tailwind CSS

A scalable, production-ready Design System architecture for **Tunisia Village Frontend** built with **Next.js App Router**, **Tailwind CSS**, **CSS Variables**, and **Regional Design Tokens**.

This design system is specifically engineered to represent Tunisian cultural identity through color palettes, typography, and interactive motion while adhering to strict development standards:

- ✅ **Strong Brand Identity** (Tunisian Village Olive, Sidi Bou Said Blue, Carthage Gold)
- ✅ **Lightweight Theming** via flat CSS class variables
- ✅ **Zero Hardcoded Colors** in React components
- ✅ **RTL Optimized Typography** (IBM Plex Sans Arabic support)
- ✅ **Dark Mode Support** for all regional themes
- ✅ **Zero Hydration Mismatch issues** with SSR-safe wrappers

---

## Table of Contents

- [Overview](#overview)
- [Design Architecture Flow](#design-architecture-flow)
- [Folder Structure](#folder-structure)
- [Design Tokens (Primitives)](#design-tokens-primitives)
- [CSS Variables & Themes](#css-variables-themes)
- [Tailwind Configuration Integration](#tailwind-configuration-integration)
- [Semantic Component Guidelines](#semantic-component-guidelines)
- [Typography & RTL Optimization](#typography--rtl-optimization)
- [Motion & Micro-interactions](#motion--micro-interactions)
- [Theme Switching & Provider Setup](#theme-switching--provider-setup)
- [Hydration Best Practices](#hydration-best-practices)
- [Adding a New Theme](#adding-a-new-theme)

---

## Overview

Instead of hardcoding color hexes directly inside components:

```tsx
/* ❌ Bad Practice (Prevents theming, hard to maintain) */
<button className="bg-[#1a7d5a] hover:bg-[#145e43] text-white rounded-full">
```

We leverage semantic tokens mapped to CSS Variables, so components remain abstract and theme-agnostic:

```tsx
/* ✅ Good Practice (Adapts instantly to Sidi Bou Said, Carthage, or Dark Mode) */
<button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all">
```

Changing the active theme dynamically replaces the underlying CSS variables without rebuilding Tailwind CSS or causing layout flashes.

---

## Design Architecture Flow

```
           [ Regional Brand Identity ]
                       │
                       ▼
         [ Primitives & Design Tokens ]
           (config/tokens.ts constants)
                       │
                       ▼
        [ Semantic Variable Mapping ]
       (styles/themes.css HSL values)
                       │
                       ▼
          [ Tailwind Utility Layer ]
      (tailwind.config.js mappings)
                       │
                       ▼
         [ Reusable Client Components ]
       (bg-primary, text-foreground, etc.)
```

---

## Folder Structure

The Design System code is organized modularly under `src/`:

```
src/
│
├── config/
│   ├── tokens.ts          # Raw design primitives (colors, fonts, sizes)
│   ├── colors.ts          # Semantic JS layout color mapping
│   ├── theme.ts           # Active brands and regional theme metadata
│   └── typography.ts      # Typography scales & Arabic font settings
│
├── providers/
│   └── theme-provider.tsx # SSR-safe ThemeProvider using next-themes
│
├── styles/
│   ├── globals.css        # Core stylesheet entry-point
│   ├── themes.css         # Theme specific CSS Variables (HSL)
│   ├── typography.css     # Font setups and RTL spacing modifications
│   └── animations.css     # Micro-animations, delays, and transitions
│
└── shared/
    └── components/
        └── common/
            └── ThemeSelector.tsx # Interactive theme swapper component
```

---

## Design Tokens (Primitives)

All raw, immutable brand decisions are stored in `src/config/tokens.ts`. Here are the core color primitives:

*   **Village (Default):** Warm olive groves (`#1a7d5a`) paired with soft Tunisian sand (`#f5f0e8`).
*   **Sidi Bou Said:** Mediterranean Sky Blue (`#2885AC`) and white limestone (`#fcfbfc`).
*   **Carthage:** Historic Tyrian Purple (`#7C3AED`) and antique gold (`#D4AF37`).

---

## CSS Variables & Themes

Theme styles are declared inside `src/styles/themes.css` as HSL color channels. This format allows Tailwind's opacity utilities to work (e.g. `bg-primary/20` applies $20\%$ opacity).

Example token setup:
```css
.theme-sidi-bou {
  --primary: 198 62% 42%;              /* Sidi Bou Said Blue (#2885AC) */
  --primary-foreground: 0 0% 100%;     /* White text */
  --background: 210 20% 98%;           /* Cool limestone white background */
  --foreground: 215 25% 12%;           /* Navy text */
  --accent: 10 74% 62%;                /* Terracotta Red (#E2725B) */
  --border: 210 20% 90%;
  --radius: 12px;
}
```

---

## Tailwind Configuration Integration

Our colors are bound inside `tailwind.config.js` to read from the active CSS variables dynamically:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      }
    }
  }
}
```

---

## Semantic Component Guidelines

Ensure you use semantic utilities inside your components:

| Category | ❌ Avoid Hardcoded Values | ✅ Use Semantic Variable Class |
| :--- | :--- | :--- |
| **Backgrounds** | `bg-white`, `bg-[#1a7d5a]` | `bg-background`, `bg-card`, `bg-primary` |
| **Texts** | `text-[#1a1a1a]`, `text-gray-500` | `text-foreground`, `text-muted-foreground` |
| **Borders** | `border-gray-200`, `border-dashed` | `border-border` |
| **Interactive** | `hover:bg-blue-600` | `hover:bg-primary/90` |
| **Radius** | `rounded-[20px]`, `rounded-[8px]` | `rounded-lg`, `rounded-sm` |
| **Transitions** | `transition duration-300` | `transition-all duration-normal ease-out` |

---

## Typography & RTL Optimization

Arabic characters look compressed under Latin defaults. Our typography setup in `src/styles/typography.css` modifies font behaviors specifically for `IBM Plex Sans Arabic`:

1.  **Letter Spacing:** Forces `letter-spacing: 0px` to prevent letter breaks in Arabic words.
2.  **Line Heights:** Increases line height ratios dynamically (`line-height: 1.6`) to prevent ascender/descender overlap.
3.  **Variable scale:**
    *   `font-display`: Mapped to headers/large page titles.
    *   `font-body`: Mapped to descriptions, buttons, and tables.

---

## Motion & Micro-interactions

Standardized animations are located in `src/styles/animations.css`:

*   `animate-fade-in-up`: Ideal for lists, tables, and card entries.
*   `hover-card-trigger`: Apply to cards for a smooth upward float and shadow transition.
*   `animate-pulse-brand`: Pulse glow utilizing the active brand's custom RGB token.
*   `delay-1` to `delay-7`: Built-in stagger classes for entrance flows.

---

## Theme Switching & Provider Setup

The `ThemeProvider` wraps the root layout. Next-themes automatically checks local storage or class lists, applying the theme immediately before hydration.

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "@/src/providers/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="theme-village" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

*Note: The `suppressHydrationWarning` on the HTML element is required to prevent Next.js from throwing warnings during server/client class injection.*

---

## Hydration Best Practices

Reading theme values directly in your components can trigger a hydration error because the server cannot see the client's `localStorage` or active screen preferences. 

Always guard theme-dependent components using a `mounted` check or next-theme triggers:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ActiveThemeBadge() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Wait for client mounting before accessing active theme values
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="w-12 h-6 bg-muted animate-pulse rounded-md" />;
  }

  return <span>المظهر النشط: {theme}</span>;
}
```

---

## Adding a New Theme

To add a new regional Tunisian style (e.g. **"Douz"** - Sahara Desert theme):

1.  **Add Primitives** in `src/config/tokens.ts`:
    ```ts
    douz: {
      primary: "#D97706",      // Sahara Orange
      accent: "#10B981",       // Oasis Green
      sand: "#FFFBEB",         // Dune sand
      stone: "#78350F",        // Clay date wood
    }
    ```
2.  **Declare variables** in `src/styles/themes.css`:
    ```css
    .theme-douz {
      --primary: 37 90% 50%;
      --primary-foreground: 0 0% 100%;
      --background: 48 100% 98%;
      --foreground: 20 80% 10%;
      --border: 48 80% 90%;
      --radius: 16px;
    }
    .theme-douz-dark {
      ...
    }
    ```
3.  **Register Theme** inside `src/config/theme.ts`:
    ```ts
    {
      id: "douz",
      name: "دوز الصحراوية",
      className: "theme-douz",
      description: "رمال الكثبان الذهبية مع واحات النخيل الخضراء بدوز",
      primaryColor: "#D97706"
    }
    ```
4.  **Register in ThemeProvider** inside `src/providers/theme-provider.tsx`:
    ```ts
    themes={["theme-village", "theme-village-dark", ..., "theme-douz", "theme-douz-dark"]}
    ```
