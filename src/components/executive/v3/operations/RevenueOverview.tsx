import React from "react";
import {
  IndianRupee,
  TrendingUp,
  Receipt,
  Wallet,
} from "lucide-react";

import GlassPanel from "../shared/GlassPanel";
import PanelHeader from "../shared/PanelHeader";
import MetricCard from "../shared/MetricCard";
import { theme } from "../../../../design-system";

const RevenueOverview: React.FC = () => {
  return (
    <GlassPanel>
      <PanelHeader
        icon={<IndianRupee size={22} />}
        title="Revenue Intelligence"
        subtitle="Live financial performance of the Authority"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: theme.spacing.md,
          marginBottom: theme.spacing.xl,
        }}
      >
        <MetricCard
          icon={<IndianRupee size={18} />}
          title="Today's Collection"
          value="₹2.84 Cr"
          accentColor={theme.colors.status.success}
        />

        <MetricCard
          icon={<Receipt size={18} />}
          title="Outstanding Dues"
          value="₹48.62 Cr"
          accentColor={theme.colors.status.warning}
        />

        <MetricCard
          icon={<Wallet size={18} />}
          title="Monthly Revenue"
          value="₹92.41 Cr"
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
            head: "Property",
            amount: "₹28.4 Cr",
            growth: "+14%",
          },
          {
            head: "Commercial",
            amount: "₹21.8 Cr",
            growth: "+9%",
          },
          {
            head: "Lease",
            amount: "₹18.2 Cr",
            growth: "+5%",
          },
          {
            head: "Other Sources",
            amount: "₹24.0 Cr",
            growth: "+18%",
          },
        ].map((item) => (
          <div
            key={item.head}
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
                  color: theme.colors.text.primary,
                  fontWeight: 600,
                }}
              >
                {item.head}
              </div>

              <div
                style={{
                  marginTop: 4,
                  color: theme.colors.text.secondary,
                  fontSize: 13,
                }}
              >
                Revenue Head
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <div
                style={{
                  color: theme.colors.text.primary,
                  fontWeight: 700,
                }}
              >
                {item.amount}
              </div>

              <div
                style={{
                  color: theme.colors.status.success,
                  fontSize: 13,
                }}
              >
                {item.growth}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: theme.spacing.xl,
          display: "flex",
          alignItems: "center",
          gap: theme.spacing.sm,
          color: theme.colors.status.success,
          fontWeight: 600,
        }}
      >
        <TrendingUp size={18} />

        Revenue collection is ahead of monthly target.
      </div>
    </GlassPanel>
  );
};

export default RevenueOverview;