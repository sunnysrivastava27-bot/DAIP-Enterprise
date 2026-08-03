/**
 * ==========================================================
 * DAIP Design System
 * Shadow Tokens
 * ==========================================================
 */

export const shadows = {
  sm: "0 1px 3px rgba(0,0,0,0.15)",

  md: "0 6px 12px rgba(0,0,0,0.20)",

  lg: "0 10px 25px rgba(0,0,0,0.30)",

  xl: "0 20px 40px rgba(0,0,0,0.35)",

  glow: "0 0 25px rgba(0,168,232,0.25)",
} as const;

export type Shadows = typeof shadows;