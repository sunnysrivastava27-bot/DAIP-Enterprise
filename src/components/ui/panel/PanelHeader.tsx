import type { CSSProperties, ReactNode } from "react";
import { theme } from "../../../design-system";

export interface PanelHeaderProps {
  title: string;
  subtitle?: string;

  icon?: ReactNode;

  badge?: ReactNode;

  status?: ReactNode;

  breadcrumb?: ReactNode;

  updatedAt?: ReactNode;

  actions?: ReactNode;

  className?: string;

  style?: CSSProperties;
}

export default function PanelHeader({
  title,
  subtitle,
  icon,
  badge,
  status,
  breadcrumb,
  updatedAt,
  actions,
  className = "",
  style,
}: PanelHeaderProps) {
  const containerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",

    padding: theme.spacing.lg,

    borderBottom: `1px solid ${theme.colors.border.primary}`,

    gap: theme.spacing.lg,

    ...style,
  };

  const leftStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: theme.spacing.md,
    flex: 1,
    minWidth: 0,
  };

  const iconStyle: CSSProperties = {
    width: 44,
    height: 44,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: theme.radius.md,

    background: theme.colors.background.elevated,

    border: `1px solid ${theme.colors.border.primary}`,

    flexShrink: 0,
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
    gap: 6,
  };

  const breadcrumbStyle: CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: theme.colors.text.secondary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const titleRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.2,
    color: theme.colors.text.primary,
  };

  const subtitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    color: theme.colors.text.secondary,
  };

  const footerRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: theme.spacing.md,
    marginTop: 4,
  };

  const updatedStyle: CSSProperties = {
    fontSize: 12,
    color: theme.colors.text.secondary,
  };

  const actionsStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    flexWrap: "wrap",
    flexShrink: 0,
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={leftStyle}>
        {icon && <div style={iconStyle}>{icon}</div>}

        <div style={contentStyle}>
          {breadcrumb && (
            <div style={breadcrumbStyle}>{breadcrumb}</div>
          )}

          <div style={titleRowStyle}>
            <h3 style={titleStyle}>{title}</h3>

            {badge}

            {status}
          </div>

          {subtitle && (
            <p style={subtitleStyle}>{subtitle}</p>
          )}

          {(updatedAt || actions) && (
            <div style={footerRowStyle}>
              <div style={updatedStyle}>
                {updatedAt}
              </div>

              {actions && (
                <div style={actionsStyle}>
                  {actions}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}