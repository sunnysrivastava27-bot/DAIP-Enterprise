import { motion } from "framer-motion";

export default function CommandHub() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Building */}

      <rect
        x="470"
        y="210"
        width="60"
        height="90"
        rx="6"
        fill="#0F172A"
        stroke="#38BDF8"
        strokeWidth="2"
      />

      {/* Top Tower */}

      <rect
        x="485"
        y="185"
        width="30"
        height="28"
        rx="4"
        fill="#1E293B"
        stroke="#67E8F9"
      />

      {/* Entrance */}

      <rect
        x="493"
        y="245"
        width="14"
        height="24"
        rx="3"
        fill="#38BDF8"
      />

      {/* Roof Glow */}

      <circle
        cx="500"
        cy="180"
        r="6"
        fill="#67E8F9"
      />

      <circle
        cx="500"
        cy="180"
        r="18"
        fill="#22D3EE"
        opacity="0.18"
      />
    </motion.g>
  );
}