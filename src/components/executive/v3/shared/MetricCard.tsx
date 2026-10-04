import React from "react";

import GlassPanel from "./GlassPanel";
import { theme } from "../../../../design-system";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  footer?: React.ReactNode;
  accentColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  footer,
  accentColor = theme.colors.brand.primary,
}) => {
  return (
    <GlassPanel>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.regular.md,
        }}
      >
        <div
          style={{
            color: accentColor,
          }}
        >
          {icon}
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: theme.colors.text.primary,
          }}
        >
          {value}
        </div>

        <div
          style={{
            color: theme.colors.text.secondary,
            fontSize: 14,
          }}
        >
          {title}
        </div>

        {footer}
      </div>
    </GlassPanel>
  );
};

export default MetricCard;