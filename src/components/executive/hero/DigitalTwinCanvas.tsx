import { motion } from "framer-motion";

import CityBackground from "./digitalTwin/city/CityBackground";
import RoadSkeleton from "./digitalTwin/city/RoadSkeleton";

const DigitalTwinCanvas = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07111F]">

      <motion.svg
        viewBox="0 0 1000 650"
        className="h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* ======================================================
            CITY BACKGROUND
        ======================================================= */}

        <CityBackground />

        {/* ======================================================
    ROAD NETWORK
======================================================= */}

<RoadSkeleton />

        {/* ======================================================
            GOVERNMENT COMPLEX
            (Part 3)
        ======================================================= */}

        {/* ======================================================
            CENTRAL ROTARY
            (Part 4)
        ======================================================= */}

        {/* ======================================================
            DISTRICTS
            (Part 5)
        ======================================================= */}

        {/* ======================================================
            LABELS
            (Part 6)
        ======================================================= */}

        {/* ======================================================
            LIGHTING
            (Part 7)
        ======================================================= */}

        {/* ======================================================
            LIVE INTELLIGENCE
            (Part 8)
        ======================================================= */}

      </motion.svg>

    </div>
  );
};

export default DigitalTwinCanvas;