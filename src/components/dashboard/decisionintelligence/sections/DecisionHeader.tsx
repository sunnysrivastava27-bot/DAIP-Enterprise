import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Sparkles } from "lucide-react";

interface DecisionHeaderProps {
  title?: string;
  subtitle?: string;
  aiStatus?: string;
  lastSync?: string;
}

export default function DecisionHeader({
  title = "Decision Intelligence",
  subtitle = "AI Powered Executive Decision Support Engine",
  aiStatus = "AI ONLINE",
  lastSync = "Last synchronized 30 seconds ago",
}: DecisionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10">

            <BrainCircuit className="h-8 w-8 text-cyan-400" />

          </div>

          <div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {subtitle}
            </p>

            <div className="mt-3 flex items-center gap-2">

              <Cpu className="h-4 w-4 text-cyan-400" />

              <span className="text-xs text-slate-500">
                {lastSync}
              </span>

            </div>

          </div>

        </div>

        {/* Right */}

        <motion.div
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex items-center gap-3 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 lg:self-auto"
        >

          <Sparkles className="h-4 w-4 text-emerald-400" />

          <span className="text-xs font-bold tracking-[0.18em] text-emerald-400">
            {aiStatus}
          </span>

        </motion.div>

      </div>

      {/* Divider */}

      <div className="mt-6 h-px bg-gradient-to-r from-cyan-500/30 via-slate-700 to-transparent" />

    </motion.div>
  );
}