import { motion } from "framer-motion";

import CityBackground from "./digitalTwin/city/CityBackground";
import RoadSkeleton from "./digitalTwin/city/RoadSkeleton";

const DigitalTwinCanvas = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#07111F]">

      <motion.svg
        viewBox="0 0 1000 650"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CityBackground />

        <g transform="translate(500 325)">
          <g transform="translate(-500 -325)">
            <RoadSkeleton />
          </g>
        </g>

      </motion.svg>

    </div>
  );
};

export default DigitalTwinCanvas;