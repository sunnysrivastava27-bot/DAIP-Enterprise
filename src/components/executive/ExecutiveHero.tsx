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
    grid-cols-[1.35fr_2.4fr_1.1fr]
    gap-0
    items-stretch
    h-[430px]
  "
>
        {/* ======================================================
            LEFT PANEL
        ======================================================= */}

        <div
  className="
    relative
    min-w-0
    overflow-hidden
    px-6
    py-6
  "
>
          <HeroGreeting
            data={heroGreetingData}
            onStartBriefing={() => {}}
          />
        </div>

        {/* ======================================================
            DIGITAL TWIN
        ======================================================= */}

        <div
          className="
            relative
            min-w-0
            overflow-hidden

            border-b
            border-slate-800/70

            xl:border-b-0
            xl:border-r

            h-full

            px-6
            py-6
          "
        >
          <DigitalTwin />
        </div>

        {/* ======================================================
            MORNING BRIEF
        ======================================================= */}

       <div
  className="
    relative
    min-w-0
    overflow-hidden
    px-5
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