import { motion } from "framer-motion";

export default function ScanLines() {
  return (
    <>
      {/* =====================================================
          HORIZONTAL SCAN LINE
      ====================================================== */}

      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
        animate={{
          top: ["8%", "92%", "8%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* =====================================================
          VERTICAL SCAN LINE
      ====================================================== */}

      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent"
        animate={{
          left: ["10%", "90%", "10%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* =====================================================
          GRID OVERLAY
      ====================================================== */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 11px,
              rgba(34,211,238,0.25) 12px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 11px,
              rgba(34,211,238,0.25) 12px
            )
          `,
        }}
      />

      {/* =====================================================
          EXECUTIVE SCAN PULSE
      ====================================================== */}

      <motion.div
        className="absolute inset-0 rounded-3xl border border-cyan-400/10"
        animate={{
          opacity: [0.1, 0.45, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}