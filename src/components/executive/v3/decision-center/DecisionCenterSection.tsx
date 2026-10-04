import React from "react";

import AIExecutiveAdvisor from "./AIExecutiveAdvisor";
import SituationRoom from "./SituationRoom";
import CriticalAlerts from "./CriticalAlerts";
import DecisionQueue from "./DecisionQueue";

import { theme } from "../../../../design-system";

const DecisionCenterSection: React.FC = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.xl,
        width: "100%",
      }}
    >
      {/* ======================================
          TOP ROW
      ====================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(340px, 1fr)",
          gap: theme.spacing.lg,
          alignItems: "stretch",
        }}
      >
        <AIExecutiveAdvisor />

        <SituationRoom />
      </div>

      {/* ======================================
          BOTTOM ROW
      ====================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: theme.spacing.lg,
          alignItems: "stretch",
        }}
      >
        <CriticalAlerts />

        <DecisionQueue />
      </div>
    </section>
  );
};

export default DecisionCenterSection;