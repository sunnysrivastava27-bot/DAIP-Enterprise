import { useState, type CSSProperties } from "react";
import type { CardProps } from "./types";
import { theme } from "../../../design-system";

const variantStyles = {
  default: {
    background: theme.colors.background.surface,
    border: `1px solid ${theme.colors.border.primary}`,
    boxShadow: theme.shadows.sm,
  },

  outlined: {
    background: "transparent",
    border: `1px solid ${theme.colors.border.primary}`,
    boxShadow: "none",
  },

  glass: {
    background: "rgba(255,255,255,0.08)",
    border: `1px solid ${theme.colors.border.primary}`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: theme.shadows.md,
  },

  elevated: {
    background: theme.colors.background.surface,
    border: "none",
    boxShadow: theme.shadows.lg,
  },
} as const;

const sizeStyles = {
  sm: {
    padding: theme.spacing.md,
  },

  md: {
    padding: theme.spacing.lg,
  },

  lg: {
    padding: theme.spacing.xl,
  },
} as const;

export default function Card({
  children,
  variant = "default",
  size = "md",
  noPadding = false,
  loading = false,
  fullWidth = true,
  className = "",
  style,

  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,

  ...props
}: CardProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const cardStyle: CSSProperties = {
    ...variantStyles[variant],

    ...(noPadding ? { padding: 0 } : sizeStyles[size]),

    borderRadius: theme.radius.lg,

    display: "flex",
    flexDirection: "column",

    width: fullWidth ? "100%" : "auto",

    overflow: "hidden",

    transform: hovered ? "translateY(-3px)" : "translateY(0)",

    boxShadow: focused
      ? `0 0 0 3px ${theme.colors.brand.primary}25`
      : hovered
      ? theme.shadows.lg
      : variantStyles[variant].boxShadow,

    transition:
      "transform .2s ease, box-shadow .25s ease, border-color .2s ease",

    outline: "none",

    ...style,
  };

  return (
    <div
      className={className}
      style={cardStyle}
      tabIndex={0}
      onMouseEnter={(e) => {
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
        onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      {...props}
    >
      {loading ? (
        <div
          style={{
            padding: theme.spacing.xl,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing.md,
            color: theme.colors.text.secondary,
            minHeight: 120,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              border: "2px solid rgba(255,255,255,.25)",
              borderTop: "2px solid currentColor",
              borderRadius: "50%",
              animation: "spin .8s linear infinite",
            }}
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </div>
  );
}