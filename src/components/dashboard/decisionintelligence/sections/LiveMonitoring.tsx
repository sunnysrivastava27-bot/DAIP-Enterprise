import { motion } from "framer-motion";
import {
  Activity,
  Building2,
  CircleDot,
  Clock3,
  Landmark,
  UserRound,
} from "lucide-react";

import { monitoringFeed } from "../data";

const getCategoryConfig = (category: string) => {
  switch (category) {
    case "Revenue":
      return {
        icon: Landmark,
        badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        dot: "bg-emerald-400",
      };

    case "Projects":
      return {
        icon: Building2,
        badge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
        dot: "bg-cyan-400",
      };

    case "Finance":
      return {
        icon: Landmark,
        badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
        dot: "bg-violet-400",
      };

    default:
      return {
        icon: UserRound,
        badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
        dot: "bg-amber-400",
      };
  }
};

export default function LiveMonitoring() {
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
            Live Monitoring
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Real-time operational activities across the authority.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2">
          <CircleDot className="h-3 w-3 animate-pulse text-emerald-400" />
          <span className="text-xs font-semibold tracking-wide text-emerald-400">
            LIVE
          </span>
        </div>
      </div>

      {/* Timeline */}

      <div className="p-6">
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-800" />

          <div className="space-y-6">
            {monitoringFeed.map((item, index) => {
              const config = getCategoryConfig(item.category);
              const Icon = config.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                  className="relative flex gap-5"
                >
                  {/* Timeline Dot */}

                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${config.dot}`}
                  >
                    <Icon className="h-5 w-5 text-slate-950" />
                  </div>

                  {/* Content */}

                  <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition-all duration-300 hover:border-cyan-500/30">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm leading-6 text-slate-200">
                          {item.title}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${config.badge}`}
                          >
                            {item.category}
                          </span>

                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock3 className="h-3.5 w-3.5" />
                            {item.time}
                          </div>
                        </div>
                      </div>

                      <Activity className="h-5 w-5 text-cyan-400" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
        <span className="text-sm text-slate-500">
          Monitoring updates every few seconds
        </span>

        <span className="text-sm font-medium text-cyan-400">
          Real-Time Activity Stream
        </span>
      </div>
    </motion.div>
  );
}