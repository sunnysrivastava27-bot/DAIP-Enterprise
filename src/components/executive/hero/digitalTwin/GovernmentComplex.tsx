import { motion } from "framer-motion";

export default function GovernmentComplex() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Wing */}

      <rect
        x="440"
        y="262"
        width="42"
        height="48"
        rx="3"
        fill="#1E293B"
        stroke="#38BDF8"
      />

      {/* Main Building */}

      <rect
        x="482"
        y="236"
        width="56"
        height="74"
        rx="4"
        fill="#0F172A"
        stroke="#67E8F9"
        strokeWidth="2"
      />

      {/* Right Wing */}

      <rect
        x="538"
        y="262"
        width="42"
        height="48"
        rx="3"
        fill="#1E293B"
        stroke="#38BDF8"
      />

      {/* Dome */}

      <circle
        cx="510"
        cy="225"
        r="12"
        fill="#67E8F9"
      />

      {/* Entrance */}

      <rect
        x="503"
        y="276"
        width="14"
        height="24"
        rx="2"
        fill="#38BDF8"
      />
    </motion.g>
  );
}