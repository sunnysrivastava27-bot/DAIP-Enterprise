import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, ShieldX } from "lucide-react";

import { riskAssessment } from "../data";

const getRiskConfig = (status: string) => {
  switch (status) {
    case "High":
      return {
        color: "bg-red-500",
        text: "text-red-400",
        badge: "bg-red-500/10 border-red-500/20 text-red-400",
        icon: ShieldX,
      };

    case "Medium":
      return {
        color: "bg-amber-500",
        text: "text-amber-400",
        badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
        icon: AlertTriangle,
      };

    default:
      return {
        color: "bg-emerald-500",
        text: "text-emerald-400",
        badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        icon: ShieldCheck,
      };
  }
};

export default function RiskAssessment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm"
    >
      {/* Header */}

      <div className="border-b border-slate-800 px-6 py-5">
        <h3 className="text-lg font-semibold text-white">
          Department Risk Assessment
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          AI-generated operational risk analysis across departments.
        </p>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        {riskAssessment.map((item, index) => {
          const config = getRiskConfig(item.status);
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
              className="rounded-xl border border-slate-800 bg-slate-950/40 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {item.department}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    Operational Risk Score
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${config.badge}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.status}
                </div>
              </div>

              {/* Progress */}

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Risk Score
                  </span>

                  <span className={config.text}>
                    {item.score}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${item.score}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                    }}
                    className={`h-full rounded-full ${config.color}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">
            AI updates every 15 minutes
          </span>

          <span className="font-medium text-cyan-400">
            Live Risk Monitoring
          </span>
        </div>
      </div>
    </motion.div>
  );
}