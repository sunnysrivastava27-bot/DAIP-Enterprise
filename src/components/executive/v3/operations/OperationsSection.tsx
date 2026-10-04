import React from "react";

import GISOverview from "./GISOverview";
import ProjectsOverview from "./ProjectsOverview";
import RevenueOverview from "./RevenueOverview";
import LandManagement from "./LandManagement";
import FieldOperations from "./FieldOperations";

import { theme } from "../../../../design-system";

const OperationsSection: React.FC = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.xl,
        marginBottom: theme.spacing["2xl"],
      }}
    >
      {/* Row 1 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: theme.spacing.lg,
        }}
      >
        <GISOverview />
        <RevenueOverview />
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: theme.spacing.lg,
        }}
      >
        <ProjectsOverview />
        <LandManagement />
      </div>

      {/* Row 3 */}
      <FieldOperations />
    </section>
  );
};

export default OperationsSection;