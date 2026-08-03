import type {
  HTMLAttributes,
  ReactNode,
} from "react";

/**
 * --------------------------------------------------------
 * Badge Variants
 * --------------------------------------------------------
 */

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

/**
 * --------------------------------------------------------
 * Badge Sizes
 * --------------------------------------------------------
 */

export type BadgeSize =
  | "sm"
  | "md"
  | "lg";

/**
 * --------------------------------------------------------
 * Badge Props
 * --------------------------------------------------------
 */

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge Content
   */
  children?: ReactNode;

  /**
   * Visual Variant
   */
  variant?: BadgeVariant;

  /**
   * Badge Size
   */
  size?: BadgeSize;

  /**
   * Display as Pill
   */
  pill?: boolean;

  /**
   * Show Status Dot
   */
  dot?: boolean;
}

/**
 * --------------------------------------------------------
 * Status Badge
 * --------------------------------------------------------
 */

export type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "completed"
  | "failed"
  | "online"
  | "offline";

export interface StatusBadgeProps
  extends Omit<BadgeProps, "variant"> {
  status: StatusType;
}