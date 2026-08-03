import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Server,
} from "lucide-react";

import { engineHealth } from "../data";

const healthMetrics = [
  {
    title: "AI Models",
    value: engineHealth.models,
    icon: BrainCircuit,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Predictions Today",
    value: engineHealth.predictions,
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Accuracy",
    value: `${engineHealth.accuracy}%`,
    icon: CheckCircle2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const infrastructure = [
  {
    title: "AI Processing Engine",
    icon: Cpu,
    status: "Operational",
  },
  {
    title: "Analytics Database",
    icon: Database,
    status: "Healthy",
  },
  {
    title: "Inference Server",
    icon: Server,
    status: "Running",
  },
];

export default function AIEngineHealth() {
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
            AI Engine Health
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Live status of the Decision Intelligence infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-emerald-400">
            {engineHealth.status}
          </span>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-5 p-6 md:grid-cols-3">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-slate-800 bg-slate-950/40 p-5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${metric.bg}`}
              >
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>

              <div className="mt-5">
                <h4 className="text-sm text-slate-400">
                  {metric.title}
                </h4>

                <p className={`mt-2 text-3xl font-bold ${metric.color}`}>
                  {metric.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Infrastructure */}

      <div className="border-t border-slate-800 px-6 py-6">
        <h4 className="mb-5 text-base font-semibold text-white">
          Infrastructure Status
        </h4>

        <div className="space-y-4">
          {infrastructure.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-slate-800 p-3">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div>
                    <h5 className="font-medium text-white">
                      {item.title}
                    </h5>

                    <p className="text-sm text-slate-500">
                      System Component
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-xs font-semibold text-emerald-400">
                    {item.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
        <span className="text-sm text-slate-500">
          Last Health Check: 30 seconds ago
        </span>

        <span className="text-sm font-medium text-cyan-400">
          DAIP AI Engine v2.0
        </span>
      </div>
    </motion.div>
  );
}