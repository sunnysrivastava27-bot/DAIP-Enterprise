import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Minus,
  TrendingUp,
} from "lucide-react";

import { predictions } from "../data";

const getTrendConfig = (trend: string) => {
  switch (trend) {
    case "up":
      return {
        icon: ArrowUpRight,
        iconColor: "text-emerald-400",
        badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        label: "Positive Trend",
      };

    case "down":
      return {
        icon: ArrowDownRight,
        iconColor: "text-red-400",
        badge: "bg-red-500/10 border-red-500/20 text-red-400",
        label: "Declining Trend",
      };

    default:
      return {
        icon: Minus,
        iconColor: "text-amber-400",
        badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",
        label: "Stable Trend",
      };
  }
};

export default function PredictiveAnalytics() {
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
            Predictive Analytics
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            AI forecasts based on historical and live operational data.
          </p>
        </div>

        <div className="rounded-full bg-cyan-500/10 p-3">
          <TrendingUp className="h-5 w-5 text-cyan-400" />
        </div>
      </div>

      {/* Prediction Cards */}

      <div className="grid gap-5 p-6 md:grid-cols-2">
        {predictions.map((prediction, index) => {
          const trend = getTrendConfig(prediction.trend);
          const TrendIcon = trend.icon;

          return (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -4,
              }}
              className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition-all hover:border-cyan-500/30"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-base font-semibold text-white">
                  {prediction.title}
                </h4>

                <div
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${trend.badge}`}
                >
                  <TrendIcon className={`h-4 w-4 ${trend.iconColor}`} />
                  {trend.label}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-4xl font-bold text-cyan-400">
                  {prediction.value}
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {prediction.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                <span className="text-xs text-slate-500">
                  AI Forecast
                </span>

                <button className="flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4 text-sm">
        <span className="text-slate-500">
          Forecast engine updates continuously.
        </span>

        <span className="font-medium text-emerald-400">
          AI Prediction Accuracy 98.4%
        </span>
      </div>
    </motion.div>
  );
}