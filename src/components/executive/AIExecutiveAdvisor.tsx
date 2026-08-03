import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const recommendations = [
  {
    title: "Approve Ring Road Package-II",
    description:
      "Tender evaluation has been completed. Executive approval is pending.",
    priority: "High",
    icon: AlertTriangle,
    color: "text-red-400",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  {
    title: "Revenue Collection Opportunity",
    description:
      "Today's trend indicates an opportunity to exceed the daily collection target.",
    priority: "Medium",
    icon: TrendingUp,
    color: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  {
    title: "City Operations Stable",
    description:
      "Traffic, sanitation and utility services are operating within expected thresholds.",
    priority: "Normal",
    icon: ShieldCheck,
    color: "text-cyan-400",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  },
];

const AIExecutiveAdvisor: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
  h-full
  flex
  flex-col
  overflow-hidden
  rounded-3xl
  border
  border-slate-800/70
  bg-[#09111D]
"
    >
      {/* =======================================================
          HEADER
      ======================================================== */}

      <div className="
  flex
  flex-shrink-0
  items-center
  justify-between
  border-b
  border-slate-800/70
  px-6
  py-5
">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

            <Brain
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-cyan-400">
              Artificial Intelligence
            </p>

            <h2 className="text-lg font-semibold text-white">
              AI Executive Advisor
            </h2>

          </div>

        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">

          <span className="text-xs font-semibold text-emerald-400">
            97.8%
          </span>

        </div>

      </div>

      {/* =======================================================
          RECOMMENDATIONS
      ======================================================== */}

      <div className="
  flex-1
  overflow-y-auto
  space-y-4
  p-5
">

        {recommendations.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
  rounded-xl
  border
  border-slate-700
  bg-slate-900/50
  p-4
  transition-all
  duration-200
  hover:border-cyan-500/40
"
            >
              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div className="mt-1">

                    <Icon
                      size={22}
                      className={item.color}
                    />

                  </div>

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>

                  </div>

                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${item.badge}`}
                >
                  {item.priority}
                </span>

              </div>

            </div>
          );
        })}

      </div>

      {/* =======================================================
          FOOTER
      ======================================================== */}

      <div className="
  flex-shrink-0
  border-t
  border-slate-800/70
  p-5
">

        <button className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">

          View Complete AI Recommendations

          <ArrowRight
            size={18}
            className="ml-2"
          />

        </button>

      </div>

    </motion.section>
  );
};

export default AIExecutiveAdvisor;