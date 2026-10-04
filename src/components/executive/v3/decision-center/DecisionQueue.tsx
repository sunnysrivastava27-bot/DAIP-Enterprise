import React from "react";
import {
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import { theme } from "../../../../design-system";

interface DecisionItem {
  id: number;
  subject: string;
  owner: string;
}

const queue: DecisionItem[] = [
  {
    id: 1,
    subject: "Approve Smart City Tender",
    owner: "Engineering",
  },
  {
    id: 2,
    subject: "Land Compensation File",
    owner: "Land Department",
  },
  {
    id: 3,
    subject: "Budget Reallocation",
    owner: "Finance",
  },
];

const DecisionQueue: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<FileText size={22} />}
        title="Decision Queue"
        subtitle="Pending executive approvals"
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.md,
        }}
      >
        {queue.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              background: "rgba(255,255,255,.04)",
            }}
          >
            <div>
              <div
                style={{
                  color: theme.colors.text.primary,
                  fontWeight: 600,
                }}
              >
                {item.subject}
              </div>

              <div
                style={{
                  marginTop: 4,
                  color: theme.colors.text.secondary,
                  fontSize: 13,
                }}
              >
                {item.owner}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: theme.spacing.md,
              }}
            >
              <Clock3
                size={18}
                color={theme.colors.status.warning}
              />

              <CheckCircle2
                size={18}
                color={theme.colors.status.success}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default DecisionQueue;