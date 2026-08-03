import type { CSSProperties } from "react";
import type { IconButtonProps } from "./types";
import { theme } from "../../../design-system";

const variantStyles = {
  primary: {
    background: theme.colors.brand.primary,
    color: theme.colors.text.primary,
    border: "none",
  },

  secondary: {
    background: theme.colors.background.elevated,
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.primary}`,
  },

  outline: {
    background: "transparent",
    color: theme.colors.text.primary,
    border: `1px solid ${theme.colors.border.primary}`,
  },

  ghost: {
    background: "transparent",
    color: theme.colors.text.secondary,
    border: "none",
  },

  danger: {
    background: theme.colors.status.danger,
    color: theme.colors.text.primary,
    border: "none",
  },

  success: {
    background: theme.colors.status.success,
    color: theme.colors.text.primary,
    border: "none",
  },
} as const;

const sizeStyles = {
  sm: {
    width: 32,
    height: 32,
    fontSize: 14,
  },

  md: {
    width: 40,
    height: 40,
    fontSize: 16,
  },

  lg: {
    width: 48,
    height: 48,
    fontSize: 18,
  },
} as const;

export default function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  loading = false,
  disabled = false,
  rounded = true,
  className = "",
  style,
  ...props
}: IconButtonProps) {
  const buttonStyle: CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: rounded
      ? theme.radius.full
      : theme.radius.md,

    boxShadow: theme.shadows.sm,

    cursor: disabled || loading ? "not-allowed" : "pointer",

    opacity: disabled ? 0.6 : 1,

    transition: "all .25s ease",

    userSelect: "none",

    padding: 0,

    flexShrink: 0,

    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={className}
      style={buttonStyle}
      {...props}
    >
      {loading ? "..." : icon}
    </button>
  );
}