import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const highlights = [
  {
    title: "Revenue Growth",
    description:
      "Today's projected revenue is trending 11.4% above yesterday.",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    title: "Critical Decisions",
    description:
      "Four executive approvals require attention before 2:00 PM.",
    icon: AlertTriangle,
    color: "text-amber-400",
  },
  {
    title: "Operations Stable",
    description:
      "Core civic services are functioning within expected thresholds.",
    icon: CheckCircle2,
    color: "text-cyan-400",
  },
];

const ExecutiveBrief: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-slate-800/70 bg-[#09111D]"
    >
      {/* ================================================= */}
      {/* Header                                            */}
      {/* ================================================= */}

      <div className="flex items-center justify-between border-b border-slate-800/70 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">

            <Sparkles
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-cyan-400">
              Chairman Intelligence
            </p>

            <h2 className="text-lg font-semibold text-white">
              Executive Brief
            </h2>

          </div>

        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">

          <span className="text-xs font-semibold text-emerald-400">
            AI Ready
          </span>

        </div>

      </div>

      {/* ================================================= */}
      {/* Summary                                           */}
      {/* ================================================= */}

      <div className="p-6">

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <div className="flex gap-4">

            <div className="rounded-xl bg-cyan-500/10 p-3">

              <Brain
                size={24}
                className="text-cyan-400"
              />

            </div>

            <div>

              <h3 className="text-lg font-semibold text-white">
                Good Morning, Chairman
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                The city is operating normally this morning. Revenue
                performance is above target, critical infrastructure
                projects remain on schedule, and only four executive
                approvals require immediate attention. AI predicts a
                productive operational day with minimal risk.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Highlights                                        */}
      {/* ================================================= */}

      <div className="space-y-4 px-6">

        {highlights.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-slate-700 bg-slate-900/40 p-5 transition hover:border-cyan-500/40"
            >

              <div className="mt-1">

                <Icon
                  size={22}
                  className={item.color}
                />

              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>

              </div>

            </div>

          );

        })}

      </div>

      {/* ================================================= */}
      {/* Footer                                            */}
      {/* ================================================= */}

      <div className="border-t border-slate-800/70 p-6">

        <button
          className="flex w-full items-center justify-center rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >

          View Complete Executive Brief

          <ArrowRight
            size={18}
            className="ml-2"
          />

        </button>

      </div>

    </motion.section>
  );
};

export default ExecutiveBrief;