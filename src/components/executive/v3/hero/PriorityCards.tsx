import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import Card from "../../../ui/card/Card";
import { theme } from "../../../../design-system";

interface PriorityItem {
  id: string;
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const priorities: PriorityItem[] = [
  {
    id: "critical",
    title: "Critical",
    value: 3,
    color: theme.colors.status.danger,
    icon: <AlertTriangle size={18} />,
  },
  {
    id: "high",
    title: "High",
    value: 8,
    color: theme.colors.status.warning,
    icon: <TrendingUp size={18} />,
  },
  {
    id: "medium",
    title: "Medium",
    value: 14,
    color: theme.colors.status.info,
    icon: <Sparkles size={18} />,
  },
  {
    id: "completed",
    title: "Completed",
    value: 41,
    color: theme.colors.status.success,
    icon: <CheckCircle2 size={18} />,
  },
];

const PriorityCards: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: theme.spacing.md,
      }}
    >
      {priorities.map((priority) => (
        <motion.div
          key={priority.id}
          whileHover={{
            y: -5,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Card
            variant="glass"
            style={{
              borderLeft: `4px solid ${priority.color}`,
              minHeight: 165,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: theme.spacing.md,
              }}
            >
              <div
                style={{
                  color: priority.color,
                }}
              >
                {priority.icon}
              </div>

              <ArrowRight
                size={16}
                color={theme.colors.text.secondary}
              />
            </div>

            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: theme.colors.text.primary,
              }}
            >
              {priority.value}
            </div>

            <div
              style={{
                marginTop: theme.spacing.sm,
                color: theme.colors.text.secondary,
                fontSize: 14,
              }}
            >
              {priority.title}
            </div>

            <div
              style={{
                marginTop: theme.spacing.lg,
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.xs,
                color: priority.color,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <TrendingUp size={12} />

              Live Monitoring
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PriorityCards;