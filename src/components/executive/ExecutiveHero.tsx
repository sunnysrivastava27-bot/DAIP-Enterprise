import React from "react";
import { motion } from "framer-motion";

import HeroGreeting from "./hero/HeroGreeting";
import DigitalTwin from "./hero/DigitalTwin";
import MorningBrief from "./hero/MorningBrief";

const heroGreetingData = {
  greeting: "Good Morning",
  chairmanName: "Mr. Rajesh Kumar",
  description: "Here is your intelligence briefing for today.",

  decisionsAwaiting: 3,
  estimatedReviewTime: "6 min",
  revenueOpportunity: "₹18.6 Cr",
};

const ExecutiveHero: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-800/70
        bg-[#0B1220]
      "
    >
      <div
        className="
          grid
          h-[380px]
          grid-cols-[380px_1fr_320px]
          items-stretch
        "
      >
        {/* ================= LEFT PANEL ================= */}

        <div
          className="
            overflow-hidden
            border-r
            border-slate-800/40
            px-8
            py-8
          "
        >
          <HeroGreeting
            data={heroGreetingData}
            onStartBriefing={() => {}}
          />
        </div>

        {/* ================= CENTER PANEL ================= */}

        <div
          className="
            relative
            overflow-hidden
            px-6
            py-6
          "
        >
          <DigitalTwin />
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div
          className="
            overflow-hidden
            border-l
            border-slate-800/40
            px-6
            py-6
          "
        >
          <MorningBrief />
        </div>
      </div>
    </motion.section>
  );
};

export default ExecutiveHero;