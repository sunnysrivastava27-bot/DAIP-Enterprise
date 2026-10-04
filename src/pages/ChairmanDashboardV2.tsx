import React from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../components/layout/DashboardLayout";

import ExecutiveHero from "../components/executive/ExecutiveHero";

import AIExecutiveAdvisor from "../components/executive/AIExecutiveAdvisor";
import DecisionsRequired from "../components/executive/DecisionsRequired";
import CityHealth from "../components/executive/CityHealth";
import OvernightChanges from "../components/executive/OvernightChanges";
import RevenueOpportunity from "../components/executive/RevenueOpportunity";
import QuickLaunchWorkspace from "../components/executive/QuickLaunchWorkspace";
import RightRail from "../components/executive/RightRail";

import LiveCitySnapshot from "../components/executive/hero/LiveCitySnapshot";

const ChairmanDashboardV2: React.FC = () => {
  return (
    <DashboardLayout>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className="
          h-full
          w-full
          overflow-hidden
        "
      >

        {/* ==========================================================
            EXECUTIVE INTELLIGENCE BRIEF
        ========================================================== */}

        <div
          className="
            grid
            h-full
            gap-6

            xl:grid-cols-[minmax(0,1fr)_380px]
          "
        >

          {/* ======================================================
              LEFT EXECUTIVE WORKSPACE
          ====================================================== */}

          <section
            className="
              flex
              min-h-0
              flex-col
              gap-6
              overflow-y-auto
              pr-1
            "
          >

            {/* ==================================================
                HERO
            ================================================== */}

            <ExecutiveHero />

            {/* ==================================================
                ROW 1
            ================================================== */}

            <div
              className="
                grid
                gap-6

                xl:grid-cols-3
              "
            >
			              <AIExecutiveAdvisor />

              <DecisionsRequired />

              <CityHealth />

            </div>

            {/* ==================================================
                ROW 2
            ================================================== */}

            <div
              className="
                grid
                gap-6

                xl:grid-cols-3
              "
            >

              <OvernightChanges />

              <LiveCitySnapshot />

              <RevenueOpportunity />

            </div>

            {/* ==================================================
                QUICK LAUNCH WORKSPACE
            ================================================== */}

            <QuickLaunchWorkspace />

          </section>

          {/* ======================================================
              RIGHT EXECUTIVE RAIL
          ====================================================== */}

          <aside
            className="
              hidden
              xl:flex

              min-h-0
              flex-col
            "
          >

            <RightRail />

          </aside>

        </div>
		      </motion.div>

    </DashboardLayout>
  );
};

export default ChairmanDashboardV2;
