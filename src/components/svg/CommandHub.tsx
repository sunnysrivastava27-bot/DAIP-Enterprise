import { motion } from "framer-motion";

export default function CommandHub() {
  return (
    <div className="absolute inset-0 pointer-events-none">

      {/* =====================================================
          COMMAND HUB
      ====================================================== */}

      <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2">

        {/* OUTER GLOW */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.18, 0.35, 0.18],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-44
            w-44
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400
            blur-[70px]
          "
        />

        {/* RING 1 */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-cyan-400/30
          "
        />

        {/* RING 2 */}

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-28
            w-28
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-cyan-300/40
          "
        />

        {/* COMMAND BUILDING */}

        <motion.div
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >

          {/* Roof */}

          <div className="mx-auto h-3 w-12 rounded bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.6)]" />

          {/* Upper */}

          <div className="mx-auto mt-1 h-7 w-16 rounded-md border border-cyan-400/40 bg-slate-800/90" />

          {/* Middle */}

          <div className="mx-auto mt-1 h-10 w-24 rounded-md border border-cyan-400/30 bg-slate-900" />

          {/* Base */}

          <div className="mx-auto mt-1 h-6 w-32 rounded-md border border-cyan-400/30 bg-slate-800" />

        </motion.div>

        {/* CORE */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-4
            w-4
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-300
            shadow-[0_0_20px_rgba(34,211,238,.8)]
          "
        />

      </div>

    </div>
  );
}