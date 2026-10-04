/**
 * ==========================================================
 * DAIP Design System
 * Typography Tokens
 * ==========================================================
 */

export const typography = {
  fontFamily: {
    primary: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  
    compact: {
    xs: "10px",
    sm: "11px",
    md: "12px",
    lg: "14px",
    xl: "16px",
    "2xl": "18px",
    "3xl": "22px",
    "4xl": "28px",
    "5xl": "36px",
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export type Typography = typeof typography;