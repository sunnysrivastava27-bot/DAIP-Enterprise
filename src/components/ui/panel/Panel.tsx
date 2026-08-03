import { useState, type CSSProperties } from "react";
import type { PanelProps } from "./types";
import { theme } from "../../../design-system";

const variantStyles = {
  default: {
    background: theme.colors.background.panel,
    border: `1px solid ${theme.colors.border.primary}`,
  },

  outlined: {
    background: "transparent",
    border: `1px solid ${theme.colors.border.primary}`,
  },

  glass: {
    background: "rgba(30,41,59,0.70)",
    border: `1px solid ${theme.colors.border.secondary}`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },

  transparent: {
    background: "transparent",
    border: "none",
  },
} as const;

const sizePadding = {
  sm: theme.spacing.md,
  md: theme.spacing.lg,
  lg: theme.spacing.xl,
} as const;

export default function Panel({
  children,
  variant = "default",
  size = "md",
  noPadding = false,
  loading = false,
  className = "",
  style,
  ...props
}: PanelProps) {
  const [hovered, setHovered] = useState(false);

  const panelStyle: CSSProperties = {
    ...variantStyles[variant],

    borderRadius: theme.radius.lg,

    boxShadow: hovered
      ? theme.shadows.md
      : theme.shadows.sm,

    padding: noPadding ? 0 : sizePadding[size],

    color: theme.colors.text.primary,

    overflow: "hidden",

    transform: hovered
      ? "translateY(-2px)"
      : "translateY(0)",

    transition:
      "transform .2s ease, box-shadow .25s ease",

    ...style,
  };

  return (
    <div
      className={className}
      style={panelStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {loading ? (
        <div
          style={{
            padding: theme.spacing.xl,
            textAlign: "center",
            color: theme.colors.text.secondary,
          }}
        >
          Loading...
        </div>
      ) : (
        children
      )}
    </div>
  );
}