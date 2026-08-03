import type { HTMLAttributes, ReactNode } from "react";

/**
 * --------------------------------------------------------
 * Card Variants
 * --------------------------------------------------------
 */

export type CardVariant =
  | "default"
  | "outlined"
  | "glass"
  | "elevated";

/**
 * --------------------------------------------------------
 * Card Sizes
 * --------------------------------------------------------
 */

export type CardSize =
  | "sm"
  | "md"
  | "lg";

/**
 * --------------------------------------------------------
 * Base Card Props
 * --------------------------------------------------------
 */

export interface BaseCardProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children?: ReactNode;

  /**
   * Visual style
   */
  variant?: CardVariant;

  /**
   * Internal spacing
   */
  size?: CardSize;

  /**
   * Remove default padding
   */
  noPadding?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Stretch to parent width
   */
  fullWidth?: boolean;

  /**
   * Optional className
   */
  className?: string;
}

/**
 * --------------------------------------------------------
 * Generic Card
 * --------------------------------------------------------
 */

export interface CardProps extends BaseCardProps {}

/**
 * --------------------------------------------------------
 * Stat Card
 * --------------------------------------------------------
 */

export interface StatCardProps
  extends Omit<BaseCardProps, "title"> {
  /**
   * Card title
   */
  title: ReactNode;

  /**
   * Main value
   */
  value: ReactNode;

  /**
   * Optional subtitle
   */
  subtitle?: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Trend value
   */
  trend?: ReactNode;

  /**
   * Trend direction
   */
  trendDirection?: "up" | "down" | "neutral";
}

/**
 * --------------------------------------------------------
 * Metric Card
 * --------------------------------------------------------
 */

export interface MetricCardProps
  extends Omit<BaseCardProps, "title"> {
  /**
   * Metric title
   */
  title: ReactNode;

  /**
   * Metric value
   */
  value: ReactNode;

  /**
   * Progress percentage
   */
  progress?: number;

  /**
   * Footer content
   */
  footer?: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactNode;
}