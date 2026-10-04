import React from "react";

import Card from "../../../ui/card/Card";

interface GlassPanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  style,
}) => {
  return (
    <Card
      variant="glass"
      size="lg"
      style={{
        height: "100%",
        ...style,
      }}
    >
      {children}
    </Card>
  );
};

export default GlassPanel;