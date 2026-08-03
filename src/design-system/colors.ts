/**
 * ==========================================================
 * DAIP Design System (DDS)
 * Color Tokens
 * Version: 1.0
 * ==========================================================
 */

export const colors = {
  brand: {
    primary: "#0F4C81",
    secondary: "#00A8E8",
    accent: "#16A34A",
  },

  background: {
    app: "#0F172A",
    surface: "#1E293B",
    elevated: "#334155",
    sidebar: "#111827",
    panel: "#1E293B",
  },

  text: {
    primary: "#F8FAFC",
    secondary: "#CBD5E1",
    muted: "#94A3B8",
    disabled: "#64748B",
    inverse: "#0F172A",
  },

  border: {
    primary: "#334155",
    secondary: "#475569",
    focus: "#00A8E8",
  },

  status: {
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
  },

  gis: {
    road: "#38BDF8",
    water: "#2563EB",
    park: "#22C55E",
    residential: "#8B5CF6",
    commercial: "#F59E0B",
    industrial: "#A855F7",
    government: "#E2E8F0",
    project: "#FB923C",
    alert: "#EF4444",
    ai: "#06B6D4",
  },

  chart: {
    blue: "#3B82F6",
    green: "#22C55E",
    yellow: "#FACC15",
    orange: "#FB923C",
    red: "#EF4444",
    purple: "#8B5CF6",
  },
} as const;

export type Colors = typeof colors;