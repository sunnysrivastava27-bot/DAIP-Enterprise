import React from "react";

import { theme } from "../../../../design-system";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div
      style={{
        marginBottom: theme.spacing.xl,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 700,
          color: theme.colors.text.primary,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            marginTop: theme.spacing.sm,
            color: theme.colors.text.secondary,
            fontSize: 15,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;