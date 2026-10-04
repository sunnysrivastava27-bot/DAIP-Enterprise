import React from "react";
import {
  MapPinned,
  Home,
  FileCheck,
  AlertOctagon,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import MetricCard from "../shared/MetricCard";
import StatusBadge from "../shared/StatusBadge";

import { theme } from "../../../../design-system";

const LandManagement: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<MapPinned size={22} />}
        title="Land Intelligence"
        subtitle="Land bank, acquisition and encroachment monitoring"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        <MetricCard
          icon={<Home size={18} />}
          title="Land Bank"
          value="4,286 Acres"
        />

        <MetricCard
          icon={<FileCheck size={18} />}
          title="Acquisition"
          value="182 Cases"
          accentColor={theme.colors.status.info}
        />

        <MetricCard
          icon={<AlertOctagon size={18} />}
          title="Encroachments"
          value="47"
          accentColor={theme.colors.status.danger}
        />

        <MetricCard
          icon={<MapPinned size={18} />}
          title="GIS Verified"
          value="96%"
          accentColor={theme.colors.status.success}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.md,
        }}
      >
        {[
          {
            sector: "Sector-4",
            issue: "Boundary Verification",
            status: "warning",
          },
          {
            sector: "Sector-7",
            issue: "Acquisition Completed",
            status: "success",
          },
          {
            sector: "Industrial Zone",
            issue: "Encroachment Detected",
            status: "danger",
          },
          {
            sector: "Township Extension",
            issue: "Survey in Progress",
            status: "info",
          },
        ].map((item) => (
          <div
            key={item.sector}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border.primary}`,
              background: "rgba(255,255,255,.04)",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                }}
              >
                {item.sector}
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: theme.colors.text.secondary,
                }}
              >
                {item.issue}
              </div>
            </div>

            <StatusBadge
              label={item.issue}
              status={item.status as any}
            />
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default LandManagement;