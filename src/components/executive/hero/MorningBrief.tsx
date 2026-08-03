import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldCheck,
  Volume2,
  ChevronRight,
} from "lucide-react";

export default function MorningBrief() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="
h-full
rounded-3xl
border
border-cyan-500/20
bg-[#081320]/90
backdrop-blur-xl
p-6
flex
flex-col
shadow-2xl
shadow-cyan-500/10
"
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
            <BrainCircuit className="h-5 w-5 text-cyan-400" />
          </div>

          <div>

            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300">
              AI Morning Brief
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">

          <ShieldCheck className="h-4 w-4 text-emerald-400" />

          <span className="text-xs font-semibold text-emerald-300">
            98%
          </span>

        </div>

      </div>

      {/* AI Brief */}

      <div className="mt-5 flex-1 overflow-hidden space-y-3">

        <p className="text-[15px] text-slate-200">
          Good morning, Sir.
        </p>

        <p className="text-[13px] leading-5 text-slate-400">
          Three zones require your attention today.
        </p>

        <p className="text-sm leading-6 text-slate-400">
          Focus on <span className="text-cyan-300 font-medium">Zone 4</span> for revenue recovery.
        </p>

        <p className="text-sm leading-6 text-slate-400">
          Review tender for Ring Road Project.
        </p>

        <p className="text-sm leading-6 text-slate-400">
          Monsoon conditions are normal.
        </p>

      </div>

      {/* Footer */}

      <button
  type="button"
  className="
    mt-auto
    flex
    w-full
    items-center
    justify-between
    border-t
    border-slate-800
    pt-4
    text-cyan-300
    hover:text-cyan-200
    shrink-0
  "
>
        <div className="flex items-center gap-2">

          <Volume2 className="h-4 w-4" />

          <span className="text-sm font-medium">
            Listen Full Brief
          </span>

        </div>

        <ChevronRight className="h-4 w-4" />

      </button>

    </motion.div>
  );
}