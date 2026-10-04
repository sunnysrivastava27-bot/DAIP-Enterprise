import React from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import ExecutiveHero from "../components/executive/ExecutiveHero";
import AIExecutiveAdvisor from "../components/executive/AIExecutiveAdvisor";
import RightRail from "../components/executive/RightRail";

// Coming next
// import DecisionsRequired from "../components/executive/DecisionsRequired";
// import CityHealth from "../components/executive/CityHealth";
// import RevenueOpportunity from "../components/executive/RevenueOpportunity";
// import OvernightChanges from "../components/executive/OvernightChanges";
// import LiveCitySnapshot from "../components/executive/LiveCitySnapshot";
// import QuickLaunchWorkspace from "../components/executive/QuickLaunchWorkspace";

const ChairmanDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">

        {/* =====================================================
            EXECUTIVE HERO
        ===================================================== */}

        <ExecutiveHero />

        {/* =====================================================
            DASHBOARD CONTENT
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[minmax(0,1fr)_290px]
            gap-6
            items-start
          "
        >

          {/* =====================================================
              MAIN CONTENT
          ===================================================== */}

          <main className="flex flex-col gap-6">

            {/* =====================================================
                ROW 1
            ===================================================== */}

            <section className="grid grid-cols-12 gap-6">

              {/* AI Executive */}

              <div className="col-span-4">
                <AIExecutiveAdvisor />
              </div>

              {/* Decisions Required */}

              <div className="col-span-4">
                {/* <DecisionsRequired /> */}
              </div>

              {/* City Health */}

              <div className="col-span-4">
                {/* <CityHealth /> */}
              </div>

            </section>

            {/* =====================================================
                ROW 2
            ===================================================== */}

            <section className="grid grid-cols-12 gap-6">

              <div className="col-span-4">
                {/* <OvernightChanges /> */}
              </div>

              <div className="col-span-4">
                {/* <LiveCitySnapshot /> */}
              </div>

              <div className="col-span-4">
                {/* <RevenueOpportunity /> */}
              </div>

            </section>

            {/* =====================================================
                ROW 3
            ===================================================== */}

            <section>

              {/* <QuickLaunchWorkspace /> */}

            </section>

          </main>

          {/* =====================================================
              RIGHT RAIL
          ===================================================== */}

          <RightRail />

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ChairmanDashboard;