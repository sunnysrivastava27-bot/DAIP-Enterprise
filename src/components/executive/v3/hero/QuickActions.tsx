import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Shield,
  FileText,
  AlertTriangle,
} from "lucide-react";

import Card from "../../../ui/card/Card";
import { theme } from "../../../../design-system";

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const actions: QuickAction[] = [
  {
    id: "brief",
    title: "Generate Executive Brief",
    icon: <FileText size={18} />,
  },
  {
    id: "advisor",
    title: "Open AI Advisor",
    icon: <Brain size={18} />,
  },
  {
    id: "situation",
    title: "Situation Room",
    icon: <Shield size={18} />,
  },
  {
    id: "emergency",
    title: "Emergency Mode",
    icon: <AlertTriangle size={18} />,
  },
];

const QuickActions: React.FC = () => {
  return (
    <Card
      variant="glass"
      size="lg"
      style={{
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: theme.spacing.lg,
            color: theme.colors.text.primary,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Executive Actions
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.md,
            flex: 1,
          }}
        >
          {actions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border.primary}`,
                background: "rgba(255,255,255,.05)",
                color: theme.colors.text.primary,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.md,
                }}
              >
                <div
                  style={{
                    color: theme.colors.brand.primary,
                  }}
                >
                  {action.icon}
                </div>

                <span>{action.title}</span>
              </div>

              <ArrowRight
                size={16}
                color={theme.colors.text.secondary}
              />
            </motion.button>
          ))}
        </div>

        <div
          style={{
            marginTop: theme.spacing.lg,
            padding: theme.spacing.md,
            borderRadius: theme.radius.md,
            background: "rgba(22,163,74,.10)",
            color: theme.colors.status.success,
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          ✓ AI has prepared today's Executive Intelligence Brief.
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;