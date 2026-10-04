import React from "react";
import {
  Building2,
  TrendingUp,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import MetricCard from "../shared/MetricCard";
import StatusBadge from "../shared/StatusBadge";

import { theme } from "../../../../design-system";

const ProjectsOverview: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<Building2 size={22} />}
        title="Projects Intelligence"
        subtitle="Real-time monitoring of authority projects"
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
          icon={<Building2 size={20} />}
          title="Total Projects"
          value={248}
        />

        <MetricCard
          icon={<CheckCircle2 size={20} />}
          title="Completed"
          value={176}
          accentColor={theme.colors.status.success}
        />

        <MetricCard
          icon={<Clock3 size={20} />}
          title="In Progress"
          value={52}
          accentColor={theme.colors.status.info}
        />

        <MetricCard
          icon={<AlertTriangle size={20} />}
          title="Delayed"
          value={20}
          accentColor={theme.colors.status.warning}
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
            project: "Outer Ring Road Phase-II",
            progress: 84,
            status: "success",
          },
          {
            project: "Integrated Township Sector-7",
            progress: 62,
            status: "warning",
          },
          {
            project: "Smart Drainage Network",
            progress: 43,
            status: "danger",
          },
          {
            project: "Riverfront Beautification",
            progress: 91,
            status: "success",
          },
        ].map((item) => (
          <div
            key={item.project}
            style={{
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              border: `1px solid ${theme.colors.border.primary}`,
              background: "rgba(255,255,255,.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: theme.spacing.sm,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  color: theme.colors.text.primary,
                }}
              >
                {item.project}
              </div>

              <StatusBadge
                label={`${item.progress}%`}
                status={item.status as any}
              />
            </div>

            <div
              style={{
                width: "100%",
                height: 8,
                borderRadius: 100,
                overflow: "hidden",
                background: "rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  width: `${item.progress}%`,
                  height: "100%",
                  borderRadius: 100,
                  background:
                    "linear-gradient(90deg,#16A34A,#00A8E8)",
                }}
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
          alignItems: "center",
          color: theme.colors.brand.secondary,
          fontWeight: 600,
        }}
      >
        <TrendingUp size={18} />

        Project performance improving this week
      </div>
    </GlassPanel>
  );
};

export default ProjectsOverview;