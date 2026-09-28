import { Primitives } from "./tokens";

/**
 * Typography Tokens Configuration
 * 
 * Maps font styling values and exposes scale metrics for text elements.
 */

export const TypographyConfig = {
  fonts: Primitives.typography.fonts,
  
  sizes: {
    xs: { size: Primitives.typography.sizes.xs, lineHeight: "1rem" },
    sm: { size: Primitives.typography.sizes.sm, lineHeight: "1.25rem" },
    base: { size: Primitives.typography.sizes.base, lineHeight: "1.5rem" },
    lg: { size: Primitives.typography.sizes.lg, lineHeight: "1.75rem" },
    xl: { size: Primitives.typography.sizes.xl, lineHeight: "1.875rem" },
    xxl: { size: Primitives.typography.sizes.xxl, lineHeight: "2.25rem" },
    display: { size: Primitives.typography.sizes.display, lineHeight: "2.75rem" },
  },

  weights: Primitives.typography.weights,
  
  // RTL adjustments (Arabic font optimizations)
  arabicLetterSpacing: "0px",
  arabicLineHeightMultiplier: 1.6,
};
