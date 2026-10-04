import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, ShieldCheck } from "lucide-react";

import Card from "../../../ui/card/Card";
import { theme } from "../../../../design-system";

interface ExecutiveScoreProps  {
  score?: number;
  confidence?: number;
  lastRefresh?: string;
}

const  ExecutiveScore: React.FC< ExecutiveScoreProps> = ({
  score = 94,
  confidence = 98.4,
  lastRefresh = "Just Now",
}) => {
  return (
    <Card
      variant="glass"
      size="lg"
      style={{
        height: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          minHeight: 240,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.sm,
            color: theme.colors.text.secondary,
          }}
        >
          <Brain size={20} color={theme.colors.brand.primary} />

          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Executive Intelligence Score
          </span>
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
          }}
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: theme.colors.brand.primary,
            lineHeight: 1,
          }}
        >
          {score}
        </motion.div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing.sm,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(22,163,74,.15)",
          }}
        >
          <ShieldCheck
            size={18}
            color={theme.colors.status.success}
          />

          <span
            style={{
              color: theme.colors.status.success,
              fontWeight: 600,
            }}
          >
            AI Confidence {confidence}%
          </span>
        </div>

        <div
          style={{
            width: "100%",
            marginTop: theme.spacing.xl,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: theme.spacing.sm,
            }}
          >
            <span
              style={{
                color: theme.colors.text.secondary,
                fontSize: 13,
              }}
            >
              Readiness
            </span>

            <span
              style={{
                color: theme.colors.text.primary,
                fontWeight: 600,
              }}
            >
              {score}%
            </span>
          </div>

          <div
            style={{
              height: 8,
              background: "rgba(255,255,255,.08)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{
                duration: 1,
              }}
              style={{
                height: "100%",
                borderRadius: 999,
                background:
                  "linear-gradient(90deg,#16A34A,#00A8E8)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: theme.spacing.lg,
            color: theme.colors.text.secondary,
            fontSize: 13,
          }}
        >
          <span>Last Refresh</span>

          <span>{lastRefresh}</span>
        </div>

        <div
          style={{
            width: "100%",
            marginTop: theme.spacing.md,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: theme.spacing.sm,
            color: theme.colors.brand.secondary,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <TrendingUp size={16} />

          Intelligence improving continuously
        </div>
      </motion.div>
    </Card>
  );
};

export default ExecutiveScore;