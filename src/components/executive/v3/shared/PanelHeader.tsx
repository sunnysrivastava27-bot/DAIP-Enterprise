import React from "react";
import { theme } from "../../../../design-system";

interface PanelHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  icon,
  title,
  subtitle,
  action,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: theme.spacing.lg,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.md,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: theme.radius.md,
            background: "rgba(255,255,255,.05)",
            color: theme.colors.brand.primary,
          }}
        >
          {icon}
        </div>

        <div>
          <div
            style={{
              color: theme.colors.text.primary,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div
              style={{
                marginTop: 2,
                color: theme.colors.text.secondary,
                fontSize: 13,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {action}
    </div>
  );
};

export default PanelHeader;