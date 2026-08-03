import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  ShieldAlert,
} from "lucide-react";

import { decisionQueue } from "../data";

const getPriorityClasses = (priority: string) => {
  switch (priority) {
    case "Critical":
      return {
        badge: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: "text-red-400",
      };
    case "High":
      return {
        badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        icon: "text-orange-400",
      };
    default:
      return {
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: "text-emerald-400",
      };
  }
};

export default function DecisionQueue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Critical Decision Queue
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            High-priority decisions requiring executive attention
          </p>
        </div>

        <div className="rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-400">
          {decisionQueue.length} Pending
        </div>
      </div>

      {/* List */}

      <div className="divide-y divide-slate-800">
        {decisionQueue.map((item, index) => {
          const style = getPriorityClasses(item.priority);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              whileHover={{
                backgroundColor: "rgba(15,23,42,.45)",
              }}
              className="px-6 py-5 transition-colors"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h4 className="text-lg font-semibold text-white">
                      {item.title}
                    </h4>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Department:{" "}
                    <span className="font-medium text-slate-300">
                      {item.department}
                    </span>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CircleDollarSign className="h-4 w-4 text-cyan-400" />
                      {item.financialImpact}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarDays className="h-4 w-4 text-amber-400" />
                      {item.deadline}
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <ShieldAlert className={`h-4 w-4 ${style.icon}`} />
                      Risk {item.risk}%
                    </div>
                  </div>
                </div>

                {/* Right */}

                <div className="flex min-w-[170px] flex-col items-end">
                  <span className="text-sm text-slate-500">
                    AI Confidence
                  </span>

                  <span className="mt-1 text-3xl font-bold text-cyan-400">
                    {item.confidence}%
                  </span>

                  <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400">
                    Review
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          Decisions are sorted by AI priority score.
        </div>

        <span className="text-cyan-400">
          Executive Review Required
        </span>
      </div>
    </motion.div>
  );
}