import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

import { executiveHeroData } from "../../../data/executivebrief";

export default function HeroMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {executiveHeroData.metrics.map((metric, index) => {
        const TrendIcon =
          metric.trend === "up"
            ? TrendingUp
            : metric.trend === "down"
            ? TrendingDown
            : Minus;

        return (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-slate-500">
              {metric.title}
            </div>

            <div className="mt-2 text-3xl font-bold">
              {metric.value}
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <TrendIcon className="h-4 w-4 text-emerald-600" />

              <span className="font-medium">
                {metric.change}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}