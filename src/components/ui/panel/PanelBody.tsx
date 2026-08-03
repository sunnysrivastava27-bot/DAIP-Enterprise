import type { CSSProperties } from "react";
import type { PanelBodyProps } from "./types";
import { theme } from "../../../design-system";

export default function PanelBody({
  children,
  className = "",
  style,
  noPadding = false,
  ...props
}: PanelBodyProps) {
  const bodyStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",

    flex: 1,

    padding: noPadding
      ? 0
      : theme.spacing.lg,

    gap: theme.spacing.lg,

    background: "transparent",

    overflow: "auto",

    ...style,
  };

  return (
    <div
      className={className}
      style={bodyStyle}
      {...props}
    >
      {children}
    </div>
  );
}