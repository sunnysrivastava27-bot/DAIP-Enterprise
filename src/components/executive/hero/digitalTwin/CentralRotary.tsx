import { motion } from "framer-motion";

export default function CentralRotary() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* =======================================================
          OUTER ROAD
      ======================================================= */}

      <circle
        cx="510"
        cy="325"
        r="78"
        fill="none"
        stroke="#4FD8FF"
        strokeWidth="12"
        opacity="0.95"
      />

      {/* Road Glow */}

      <circle
        cx="510"
        cy="325"
        r="88"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="26"
        opacity="0.12"
      />

      {/* Inner Ring */}

      <circle
        cx="510"
        cy="325"
        r="52"
        fill="#0F172A"
        stroke="#7DD3FC"
        strokeWidth="4"
      />

      {/* Central Fountain */}

      <circle
        cx="510"
        cy="325"
        r="18"
        fill="#6EE7FF"
      />

      <circle
        cx="510"
        cy="325"
        r="36"
        fill="#22D3EE"
        opacity="0.18"
      />

      {/* =======================================================
          SIX MAIN ROADS
      ======================================================= */}

      {/* North */}

      <rect
        x="502"
        y="130"
        width="16"
        height="117"
        rx="4"
        fill="#2B4E66"
      />

      {/* South */}

      <rect
        x="502"
        y="403"
        width="16"
        height="118"
        rx="4"
        fill="#2B4E66"
      />

      {/* West */}

      <rect
        x="300"
        y="317"
        width="132"
        height="16"
        rx="4"
        fill="#2B4E66"
      />

      {/* East */}

      <rect
        x="588"
        y="317"
        width="132"
        height="16"
        rx="4"
        fill="#2B4E66"
      />

      {/* North West */}

      <line
        x1="454"
        y1="269"
        x2="340"
        y2="155"
        stroke="#2B4E66"
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* North East */}

      <line
        x1="566"
        y1="269"
        x2="680"
        y2="155"
        stroke="#2B4E66"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </motion.g>
  );
}