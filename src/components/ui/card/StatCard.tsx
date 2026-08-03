import type { CSSProperties } from "react";
import type { StatCardProps } from "./types";
import { theme } from "../../../design-system";
import Card from "./Card";

const trendColors = {
  up: theme.colors.status.success,
  down: theme.colors.status.danger,
  neutral: theme.colors.text.secondary,
} as const;

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendDirection = "neutral",
  variant = "default",
  size = "md",
  loading = false,
  className = "",
  style,
  ...props
}: StatCardProps) {
  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: 14,
    fontWeight: 500,
    color: theme.colors.text.secondary,
  };

  const valueStyle: CSSProperties = {
    margin: `${theme.spacing.sm}px 0`,
    fontSize: 32,
    fontWeight: 700,
    color: theme.colors.text.primary,
    lineHeight: 1.2,
  };

  const subtitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 13,
    color: theme.colors.text.secondary,
  };

  const trendStyle: CSSProperties = {
    marginTop: theme.spacing.md,
    fontSize: 13,
    fontWeight: 600,
    color: trendColors[trendDirection],
  };

  const iconStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: 48,
    height: 48,

    borderRadius: theme.radius.md,

    background: theme.colors.background.elevated,

    flexShrink: 0,
  };

  return (
    <Card
      variant={variant}
      size={size}
      loading={loading}
      className={className}
      style={style}
      {...props}
    >
      <div style={headerStyle}>
        <div>
          <h4 style={titleStyle}>{title}</h4>

          <div style={valueStyle}>
            {value}
          </div>

          {subtitle && (
            <p style={subtitleStyle}>
              {subtitle}
            </p>
          )}

          {trend && (
            <div style={trendStyle}>
              {trend}
            </div>
          )}
        </div>

        {icon && (
          <div style={iconStyle}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}