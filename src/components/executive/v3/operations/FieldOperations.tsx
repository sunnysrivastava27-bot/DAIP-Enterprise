import React from "react";
import {
  Users,
  MapPin,
  Truck,
  Camera,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import StatusBadge from "../shared/StatusBadge";
import { theme } from "../../../../design-system";

interface FieldActivity {
  id: number;
  officer: string;
  location: string;
  activity: string;
  status: "success" | "warning" | "danger" | "info";
}

const activities: FieldActivity[] = [
  {
    id: 1,
    officer: "Zone Officer - East",
    location: "Sector-12",
    activity: "Road Inspection Completed",
    status: "success",
  },
  {
    id: 2,
    officer: "Enforcement Team",
    location: "Industrial Area",
    activity: "Encroachment Removal",
    status: "warning",
  },
  {
    id: 3,
    officer: "Engineering Wing",
    location: "Ring Road",
    activity: "Bridge Progress Review",
    status: "info",
  },
  {
    id: 4,
    officer: "Planning Cell",
    location: "Sector-5",
    activity: "Layout Verification",
    status: "success",
  },
];

const FieldOperations: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<Users size={22} />}
        title="Field Operations"
        subtitle="Live monitoring of field teams"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        <div>
          <Users color={theme.colors.brand.primary} />
          <h2 style={{ color: theme.colors.text.primary }}>
            124
          </h2>
          <small
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            Active Teams
          </small>
        </div>

        <div>
          <Truck color={theme.colors.status.info} />
          <h2 style={{ color: theme.colors.text.primary }}>
            38
          </h2>
          <small
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            Vehicles
          </small>
        </div>

        <div>
          <Camera color={theme.colors.status.success} />
          <h2 style={{ color: theme.colors.text.primary }}>
            216
          </h2>
          <small
            style={{
              color: theme.colors.text.secondary,
            }}
          >
            Geo-tagged Reports
          </small>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.md,
        }}
      >
        {activities.map((item) => (
          <div
            key={item.id}
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
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: theme.colors.text.primary,
                  }}
                >
                  {item.officer}
                </div>

                <div
                  style={{
                    marginTop: 6,
                    display: "flex",
                    gap: theme.spacing.sm,
                    alignItems: "center",
                    color: theme.colors.text.secondary,
                    fontSize: 13,
                  }}
                >
                  <MapPin size={14} />

                  {item.location}
                </div>

                <div
                  style={{
                    marginTop: 4,
                    color: theme.colors.text.secondary,
                    fontSize: 13,
                  }}
                >
                  {item.activity}
                </div>
              </div>

              <StatusBadge
                label={item.status.toUpperCase()}
                status={item.status}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default FieldOperations;