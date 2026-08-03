import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  ArrowRight,
} from "lucide-react";

export default function StartBriefButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-6 shadow-xl"
    >
      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-cyan-500/15 p-3">

          <Sparkles className="h-7 w-7 text-cyan-400" />

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Executive AI
          </p>

          <h3 className="mt-1 text-2xl font-bold text-white">
            Morning Brief
          </h3>

        </div>

      </div>

      <p className="mt-6 leading-7 text-slate-400">
        Generate today's executive briefing using live operational,
        financial, GIS and citizen intelligence collected from all
        connected departments.
      </p>

      <button
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-cyan-500
          px-5
          py-4
          font-semibold
          text-slate-950
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:bg-cyan-400
        "
      >
        <Play className="h-5 w-5 fill-current" />

        Start Executive Brief

        <ArrowRight className="h-5 w-5" />

      </button>

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div>

          <p className="text-xs text-slate-500">
            Data Sources
          </p>

          <p className="mt-2 text-xl font-bold text-white">
            26
          </p>

        </div>

        <div>

          <p className="text-xs text-slate-500">
            AI Models
          </p>

          <p className="mt-2 text-xl font-bold text-cyan-400">
            18
          </p>

        </div>

        <div>

          <p className="text-xs text-slate-500">
            Accuracy
          </p>

          <p className="mt-2 text-xl font-bold text-emerald-400">
            98.4%
          </p>

        </div>

      </div>
    </motion.div>
  );
}