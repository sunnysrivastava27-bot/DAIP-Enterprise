import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

/**
 * --------------------------------------------------------
 * Button Variants
 * --------------------------------------------------------
 */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "success";

/**
 * --------------------------------------------------------
 * Button Sizes
 * --------------------------------------------------------
 */

export type ButtonSize =
  | "sm"
  | "md"
  | "lg";

/**
 * --------------------------------------------------------
 * Button Props
 * --------------------------------------------------------
 */

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button Content
   */
  children?: ReactNode;

  /**
   * Visual Style
   */
  variant?: ButtonVariant;

  /**
   * Size
   */
  size?: ButtonSize;

  /**
   * Left Icon
   */
  leftIcon?: ReactNode;

  /**
   * Right Icon
   */
  rightIcon?: ReactNode;

  /**
   * Loading State
   */
  loading?: boolean;

  /**
   * Full Width
   */
  fullWidth?: boolean;

  /**
   * Rounded
   */
  rounded?: boolean;
}

/**
 * --------------------------------------------------------
 * Icon Button
 * --------------------------------------------------------
 */

export interface IconButtonProps
  extends Omit<ButtonProps, "children"> {
  icon: ReactNode;

  "aria-label": string;
}