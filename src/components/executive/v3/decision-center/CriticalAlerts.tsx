import React from "react";
import {
  AlertTriangle,
  ArrowRight,
  Clock3,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import StatusBadge from "../shared/StatusBadge";
import { theme } from "../../../../design-system";

interface AlertItem {
  id: number;
  title: string;
  department: string;
  age: string;
  severity: "danger" | "warning" | "info";
}

const alerts: AlertItem[] = [
  {
    id: 1,
    title: "Major road project delayed",
    department: "Engineering",
    age: "2 hrs",
    severity: "danger",
  },
  {
    id: 2,
    title: "Revenue collection below target",
    department: "Finance",
    age: "Today",
    severity: "warning",
  },
  {
    id: 3,
    title: "Illegal construction detected",
    department: "Enforcement",
    age: "45 min",
    severity: "danger",
  },
];

const CriticalAlerts: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<AlertTriangle size={22} />}
        title="Critical Alerts"
        subtitle="Items requiring executive attention"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.md,
        }}
      >
        {alerts.map((alert) => (
          <div
            key={alert.id}
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
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    color: theme.colors.text.primary,
                    fontWeight: 600,
                  }}
                >
                  {alert.title}
                </div>

                <div
                  style={{
                    marginTop: theme.spacing.sm,
                    display: "flex",
                    gap: theme.spacing.md,
                    alignItems: "center",
                    color: theme.colors.text.secondary,
                    fontSize: 13,
                  }}
                >
                  <span>{alert.department}</span>

                  <Clock3 size={14} />

                  <span>{alert.age}</span>
                </div>
              </div>

              <StatusBadge
                label={alert.severity.toUpperCase()}
                status={alert.severity}
              />
            </div>

            <div
              style={{
                marginTop: theme.spacing.md,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ArrowRight
                size={18}
                color={theme.colors.text.secondary}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default CriticalAlerts;