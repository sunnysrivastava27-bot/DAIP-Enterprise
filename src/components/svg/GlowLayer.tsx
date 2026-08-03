import { motion } from "framer-motion";

export default function GlowLayer() {
  return (
    <>
      {/* Executive Ambient Glow */}

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.18, 0.35, 0.18],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="absolute left-[25%] top-[35%] h-56 w-56 rounded-full bg-emerald-400/10 blur-[120px]" />

        <div className="absolute right-[20%] bottom-[18%] h-64 w-64 rounded-full bg-sky-400/10 blur-[140px]" />
      </motion.div>

      {/* Executive Bloom */}

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_70%)]" />
      </motion.div>
    </>
  );
}