import React from "react";
import {
  Map,
  MapPin,
  Navigation,
  Layers
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import { theme } from "../../../../design-system";

const GISOverview: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<Map size={22} />}
        title="GIS Intelligence"
        subtitle="Spatial monitoring across development authority"
      />

      <div
        style={{
          height: 300,
          borderRadius: theme.radius.lg,
          background:
            "linear-gradient(135deg,#13283E,#0D1E30)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing.lg,
        }}
      >
        Interactive GIS Map
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: theme.spacing.md,
        }}
      >
        <div>
          <MapPin
            color={theme.colors.status.success}
            size={20}
          />

          <div
            style={{
              marginTop: 8,
              color: theme.colors.text.primary,
              fontWeight: 600,
            }}
          >
            148
          </div>

          <div
            style={{
              color: theme.colors.text.secondary,
              fontSize: 13,
            }}
          >
            Active Sites
          </div>
        </div>

        <div>
          <Layers
            color={theme.colors.status.info}
            size={20}
          />

          <div
            style={{
              marginTop: 8,
              color: theme.colors.text.primary,
              fontWeight: 600,
            }}
          >
            24
          </div>

          <div
            style={{
              color: theme.colors.text.secondary,
              fontSize: 13,
            }}
          >
            GIS Layers
          </div>
        </div>

        <div>
          <Navigation
            color={theme.colors.status.warning}
            size={20}
          />

          <div
            style={{
              marginTop: 8,
              color: theme.colors.text.primary,
              fontWeight: 600,
            }}
          >
            Live
          </div>

          <div
            style={{
              color: theme.colors.text.secondary,
              fontSize: 13,
            }}
          >
            Tracking
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default GISOverview;