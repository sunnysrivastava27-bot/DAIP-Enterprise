import React from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import ExecutiveHero from "../components/executive/ExecutiveHero";
import AIExecutiveAdvisor from "../components/executive/AIExecutiveAdvisor";

const ChairmanDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex h-full flex-col gap-5 overflow-hidden">

        <div className="h-[380px] flex-shrink-0">
          <ExecutiveHero />
        </div>

        <section className="grid flex-1 grid-cols-12 gap-5 overflow-hidden">

          <div className="col-span-4 h-full min-h-0">
            <AIExecutiveAdvisor />
          </div>

        </section>

      </div>
    </DashboardLayout>
  );
};

export default ChairmanDashboard;