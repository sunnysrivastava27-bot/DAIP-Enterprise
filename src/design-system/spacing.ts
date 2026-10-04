/**
 * DAIP Design System
 * Spacing Scale
 *
 * The design system supports:
 * - regular spacing scale
 * - compact spacing scale
 * - top-level spacing aliases for existing components
 */

const regular = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
} as const;

const compact = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  "4xl": 32,
  "5xl": 40,
} as const;

export const spacing = {
  /**
   * Default / regular spacing.
   *
   * These top-level aliases preserve compatibility with
   * existing DAIP components using theme.spacing.md, etc.
   */
  ...regular,

  /**
   * Explicit spacing modes.
   */
  regular,
  compact,
} as const;

export type Spacing = typeof spacing;