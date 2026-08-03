import type { CSSProperties } from "react";
import type { MetricCardProps } from "./types";
import { theme } from "../../../design-system";
import Card from "./Card";

export default function MetricCard({
  title,
  value,
  progress,
  footer,
  icon,
  variant = "default",
  size = "md",
  loading = false,
  className = "",
  style,
  ...props
}: MetricCardProps) {
  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 28,
    fontWeight: 700,
    color: theme.colors.text.primary,
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

  const progressContainerStyle: CSSProperties = {
    marginTop: theme.spacing.lg,
  };

  const progressTrackStyle: CSSProperties = {
    width: "100%",
    height: 8,
    background: theme.colors.background.elevated,
    borderRadius: theme.radius.full,
    overflow: "hidden",
  };

  const progressFillStyle: CSSProperties = {
    width: `${Math.min(Math.max(progress ?? 0, 0), 100)}%`,
    height: "100%",
    background: theme.colors.brand.primary,
    borderRadius: theme.radius.full,
    transition: "width 0.3s ease",
  };

  const footerStyle: CSSProperties = {
    marginTop: theme.spacing.lg,
    fontSize: 13,
    color: theme.colors.text.secondary,
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
        </div>

        {icon && (
          <div style={iconStyle}>
            {icon}
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div style={progressContainerStyle}>
          <div style={progressTrackStyle}>
            <div style={progressFillStyle} />
          </div>

          <div
            style={{
              marginTop: theme.spacing.sm,
              fontSize: 12,
              color: theme.colors.text.secondary,
            }}
          >
            {progress}%
          </div>
        </div>
      )}

      {footer && (
        <div style={footerStyle}>
          {footer}
        </div>
      )}
    </Card>
  );
}