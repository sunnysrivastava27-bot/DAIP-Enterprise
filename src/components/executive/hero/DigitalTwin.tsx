import { motion } from "framer-motion";
import DigitalTwinCanvas from "./DigitalTwinCanvas";

export default function DigitalTwin() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="relative h-full w-full overflow-hidden"
    >
      {/* ======================================================
          EXECUTIVE STATUS BAR
      ======================================================= */}

      <div className="absolute left-8 right-8 top-6 z-30 flex items-center justify-between">
        {/* Left Status */}

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 rounded-full border border-cyan-500/20 bg-slate-900/70 px-5 py-2 backdrop-blur-xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.35, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2.5 w-2.5 rounded-full bg-emerald-400"
          />

          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
            DIGITAL TWIN ONLINE
          </span>
        </motion.div>

        {/* Right Status */}

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.15,
          }}
          className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-xs font-semibold text-emerald-300">
              LIVE • 26 Departments Connected
            </span>
          </div>
        </motion.div>
      </div>

      {/* ======================================================
          DIGITAL TWIN CANVAS
      ======================================================= */}

      <div className="absolute inset-0">
        <DigitalTwinCanvas />
      </div>
    </motion.div>
  );
}