import type { CSSProperties } from "react";
import type { PanelFooterProps } from "./types";
import { theme } from "../../../design-system";

export default function PanelFooter({
  children,
  className = "",
  style,
  ...props
}: PanelFooterProps) {
  const footerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: theme.spacing.lg,

    borderTop: `1px solid ${theme.colors.border.primary}`,

    background: "transparent",

    gap: theme.spacing.md,

    ...style,
  };

  return (
    <div
      className={className}
      style={footerStyle}
      {...props}
    >
      {children}
    </div>
  );
}