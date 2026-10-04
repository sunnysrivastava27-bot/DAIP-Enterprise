import React from "react";
import {
  Activity,
  Shield,
  Building2,
  AlertTriangle,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import StatusBadge from "../shared/StatusBadge";
import { theme } from "../../../../design-system";

interface SituationItem {
  title: string;
  value: string;
  status: "success" | "warning" | "danger" | "info";
}

const data: SituationItem[] = [
  {
    title: "City Health",
    value: "Stable",
    status: "success",
  },
  {
    title: "Infrastructure",
    value: "2 Delays",
    status: "warning",
  },
  {
    title: "Encroachments",
    value: "12 Active",
    status: "danger",
  },
  {
    title: "Emergency",
    value: "Normal",
    status: "info",
  },
];

const SituationRoom: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<Activity size={22} />}
        title="Situation Room"
        subtitle="Live operational intelligence"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: theme.spacing.md,
        }}
      >
        {data.map((item) => (
          <div
            key={item.title}
            style={{
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              background: "rgba(255,255,255,.04)",
              border: `1px solid ${theme.colors.border.primary}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: theme.colors.text.secondary,
                  fontSize: 13,
                }}
              >
                {item.title}
              </span>

              <StatusBadge
                label={item.value}
                status={item.status}
              />
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: theme.spacing.xl,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Building2
          size={22}
          color={theme.colors.brand.primary}
        />

        <Shield
          size={22}
          color={theme.colors.status.success}
        />

        <AlertTriangle
          size={22}
          color={theme.colors.status.warning}
        />
      </div>
    </GlassPanel>
  );
};

export default SituationRoom;