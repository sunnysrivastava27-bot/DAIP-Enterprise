import React from "react";

import ExecutiveHero from "../executive/ExecutiveHero";
import DashboardWorkspace from "../executive/workspace/DashboardWorkspace";

const ExecutiveDashboardLayout: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#050B14]">
      <div
        className="
          mx-auto
          max-w-[1800px]
          px-6
          py-6
        "
      >
        {/* ================= EXECUTIVE HERO ================= */}

        <ExecutiveHero />

        {/* ================= WORKSPACE ================= */}

        <DashboardWorkspace />
      </div>
    </main>
  );
};

export default ExecutiveDashboardLayout;