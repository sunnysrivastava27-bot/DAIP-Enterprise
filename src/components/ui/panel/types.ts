import type { HTMLAttributes, ReactNode } from "react";

/**
 * --------------------------------------------------------
 * Panel Variants
 * --------------------------------------------------------
 */

export type PanelVariant =
  | "default"
  | "outlined"
  | "glass"
  | "transparent";

/**
 * --------------------------------------------------------
 * Panel Sizes
 * --------------------------------------------------------
 */

export type PanelSize = "sm" | "md" | "lg";

/**
 * --------------------------------------------------------
 * Shared Panel Props
 * --------------------------------------------------------
 */

export interface BasePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Panel content
   */
  children: ReactNode;

  /**
   * Visual style
   */
  variant?: PanelVariant;

  /**
   * Internal spacing
   */
  size?: PanelSize;

  /**
   * Remove internal padding
   */
  noPadding?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Optional className
   */
  className?: string;
}

/**
 * --------------------------------------------------------
 * Root Panel
 * --------------------------------------------------------
 */

export interface PanelProps extends BasePanelProps {}

/**
 * --------------------------------------------------------
 * Panel Header
 * --------------------------------------------------------
 */

export interface PanelHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Panel title
   */
  title: ReactNode;

  /**
   * Panel subtitle
   */
  subtitle?: ReactNode;

  /**
   * Optional left icon
   */
  icon?: ReactNode;

  /**
   * Status badge
   */
  badge?: ReactNode;

  /**
   * Right-side action buttons
   */
  actions?: ReactNode;

  /**
   * Optional custom content
   */
  children?: ReactNode;

  /**
   * Optional className
   */
  className?: string;
}

/**
 * --------------------------------------------------------
 * Panel Body
 * --------------------------------------------------------
 */

export interface PanelBodyProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Body content
   */
  children?: ReactNode;

  /**
   * Remove default body padding
   */
  noPadding?: boolean;

  /**
   * Optional className
   */
  className?: string;
}

/**
 * --------------------------------------------------------
 * Panel Footer
 * --------------------------------------------------------
 */

export interface PanelFooterProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children?: ReactNode;

  /**
   * Optional className
   */
  className?: string;
}