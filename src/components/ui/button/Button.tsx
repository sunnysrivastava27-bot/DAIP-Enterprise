import { useState, type CSSProperties } from "react";
import type { ButtonProps } from "./types";
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
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    fontSize: 12,
  },

  md: {
    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
    fontSize: 14,
  },

  lg: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    fontSize: 16,
  },
} as const;

export default function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  rounded = false,
  className = "",
  style,

  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onFocus,
  onBlur,

  ...props
}: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const buttonStyle: CSSProperties = {
    ...variantStyles[variant],
    ...sizeStyles[size],

    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,

    width: fullWidth ? "100%" : "auto",

    borderRadius: rounded
      ? theme.radius.full
      : theme.radius.md,

    boxShadow: focused
      ? `0 0 0 3px ${theme.colors.brand.primary}40`
      : hovered
      ? theme.shadows.md
      : theme.shadows.sm,

    cursor: disabled || loading ? "not-allowed" : "pointer",

    opacity: disabled ? 0.6 : 1,

    fontWeight: 600,

    transform: pressed
      ? "scale(0.97)"
      : hovered
      ? "translateY(-2px)"
      : "translateY(0)",

    filter:
      hovered && !disabled
        ? "brightness(1.05)"
        : "none",

    transition:
      "background-color .2s ease, color .2s ease, transform .15s ease, box-shadow .2s ease, filter .2s ease",

    userSelect: "none",
    WebkitUserSelect: "none",

    flexShrink: 0,

    outline: "none",

    ...style,
  };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={className}
      style={buttonStyle}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        setPressed(false);
        onMouseLeave?.(e);
      }}
      onMouseDown={(e) => {
        setPressed(true);
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        setPressed(false);
        onMouseUp?.(e);
      }}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        setPressed(false);
        onBlur?.(e);
      }}
      {...props}
    >
      {loading ? (
        <>
          <span
            style={{
              width: 14,
              height: 14,
              border: "2px solid rgba(255,255,255,.35)",
              borderTop: "2px solid currentColor",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin .8s linear infinite",
            }}
          />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon}

          {children && <span>{children}</span>}

          {rightIcon}
        </>
      )}
    </button>
  );
}