import type { CSSProperties } from "react";
import type { BadgeProps } from "./types";
import { theme } from "../../../design-system";

const variantStyles = {
  default: {
    background: theme.colors.background.elevated,
    color: theme.colors.text.primary,
  },

  primary: {
    background: theme.colors.brand.primary,
    color: theme.colors.text.primary,
  },

  secondary: {
    background: theme.colors.background.surface,
    color: theme.colors.text.secondary,
  },

  success: {
    background: theme.colors.status.success,
    color: theme.colors.text.primary,
  },

  warning: {
    background: theme.colors.status.warning,
    color: theme.colors.text.primary,
  },

  danger: {
    background: theme.colors.status.danger,
    color: theme.colors.text.primary,
  },

  info: {
    background: theme.colors.status.info,
    color: theme.colors.text.primary,
  },
} as const;

const sizeStyles = {
  sm: {
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    fontSize: 11,
  },

  md: {
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    fontSize: 12,
  },

  lg: {
    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
    fontSize: 14,
  },
} as const;

export default function Badge({
  children,
  variant = "default",
  size = "md",
  pill = false,
  dot = false,
  className = "",
  style,
  ...props
}: BadgeProps) {
  const badgeStyle: CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,

    borderRadius: pill
      ? theme.radius.full
      : theme.radius.md,

    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: "nowrap",
    userSelect: "none",

    ...style,
  };

  const dotStyle: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "currentColor",
    flexShrink: 0,
  };

  return (
    <span
      className={className}
      style={badgeStyle}
      {...props}
    >
      {dot && <span style={dotStyle} />}

      {children}
    </span>
  );
}