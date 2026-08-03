/**
 * ============================================================
 * DAIP Enterprise Design System
 * Version: 1.0
 * ============================================================
 * Single source of truth for colors, spacing, typography,
 * borders, shadows and transitions.
 */

export const colors = {
  // Backgrounds
  app: "#07111F",
  surface: "#0B1727",
  panel: "#111C2E",
  panelHover: "#162338",

  // Borders
  border: "#22324A",
  borderLight: "#2F4462",

  // Brand
  primary: "#00B8FF",
  primaryDark: "#0094D4",

  secondary: "#16A34A",

  accent: "#8B5CF6",

  // Status
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#38BDF8",

  // Text
  text: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",

  // Misc
  white: "#FFFFFF",
  transparent: "transparent",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "40px",
  "3xl": "48px",
  "4xl": "64px",
} as const;

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "18px",
  xl: "24px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 2px 8px rgba(0,0,0,0.15)",

  md: "0 8px 24px rgba(0,0,0,0.25)",

  lg: "0 16px 40px rgba(0,0,0,0.35)",

  glow: "0 0 25px rgba(0,184,255,.25)",
} as const;

export const typography = {
  hero: {
    fontSize: "34px",
    fontWeight: 700,
    lineHeight: "42px",
  },

  h1: {
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: "36px",
  },

  h2: {
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: "30px",
  },

  h3: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "26px",
  },

  body: {
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: "24px",
  },

  small: {
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "20px",
  },

  caption: {
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: "16px",
  },
} as const;

export const transition = {
  fast: "150ms ease",
  normal: "250ms ease",
  slow: "400ms ease",
} as const;

export const zIndex = {
  sidebar: 20,
  header: 30,
  drawer: 40,
  modal: 100,
} as const;

export const layout = {
  sidebarWidth: "290px",
  rightRailWidth: "360px",
  headerHeight: "76px",
  contentPadding: "24px",
} as const;

export const dashboard = {
  cardGap: "24px",
  sectionGap: "28px",
  panelPadding: "20px",
} as const;

const designSystem = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  transition,
  zIndex,
  layout,
  dashboard,
};

export default designSystem;