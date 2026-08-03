import { motion } from "framer-motion";
import {
  Landmark,
  IndianRupee,
  Wallet,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  BrainCircuit,
  CalendarDays,
  Activity,
} from "lucide-react";

const metrics = [
  {
    title: "Revenue Collection",
    value: "₹42.8 Cr",
    growth: "+8.4%",
    icon: IndianRupee,
    color: "text-green-400",
    bg: "bg-green-500/10",
    trend: "up",
  },
  {
    title: "Budget Utilized",
    value: "81%",
    growth: "+3%",
    icon: Landmark,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    trend: "up",
  },
  {
    title: "Pending Recovery",
    value: "₹7.2 Cr",
    growth: "-2%",
    icon: Wallet,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    trend: "down",
  },
  {
    title: "Financial Risk",
    value: "Medium",
    growth: "2 Alerts",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    trend: "alert",
  },
];

const projects = [
  {
    name: "Ring Road Phase-II",
    budget: "₹320 Cr",
    spent: "₹247 Cr",
    progress: 77,
  },
  {
    name: "Riverfront Development",
    budget: "₹185 Cr",
    spent: "₹136 Cr",
    progress: 73,
  },
  {
    name: "Smart Township",
    budget: "₹510 Cr",
    spent: "₹301 Cr",
    progress: 59,
  },
];

const revenueTrend = [22, 28, 26, 34, 38, 44, 49, 54];

function Sparkline() {
  const width = 220;
  const height = 60;

  const max = Math.max(...revenueTrend);
  const min = Math.min(...revenueTrend);

  const points = revenueTrend
    .map((value, index) => {
      const x = (index / (revenueTrend.length - 1)) * width;

      const y =
        height -
        ((value - min) / (max - min)) * (height - 10);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width="100%"
      height="70"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <polyline
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {revenueTrend.map((value, index) => {
        const x =
          (index / (revenueTrend.length - 1)) * width;

        const y =
          height -
          ((value - min) / (max - min)) * (height - 10);

        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="3.5"
            fill="#22d3ee"
          />
        );
      })}
    </svg>
  );
}

export default function FinancialIntelligence() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="h-full rounded-2xl border border-slate-800 bg-slate-900 shadow-xl"
    >
      {/* =======================================================
          HEADER
      ======================================================= */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

        <div className="flex items-center gap-3">

          <Landmark
            size={24}
            className="text-cyan-400"
          />

          <div>

            <h2 className="text-lg font-semibold text-white">
              Financial Intelligence
            </h2>

            <p className="text-xs text-slate-400">
              Executive Finance Command Center
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1">

            <Activity
              size={12}
              className="text-green-400"
            />

            <span className="text-xs font-semibold text-green-400">
              LIVE
            </span>

          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">

            <CalendarDays size={14} />

            Updated Just Now

          </div>

        </div>

      </div>

      {/* =======================================================
          REVENUE TREND
      ======================================================= */}

      <div className="border-b border-slate-800 px-6 py-5">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-400">
              Revenue Trend
            </p>

            <h3 className="mt-1 text-3xl font-bold text-white">
              ₹42.8 Cr
            </h3>

          </div>

          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2 text-green-400">

            <TrendingUp size={18} />

            <span className="font-semibold">
              +8.4%
            </span>

          </div>

        </div>

        <Sparkline />

      </div>
	        {/* =======================================================
          KPI METRICS
      ======================================================= */}

      <div className="grid grid-cols-2 gap-4 p-6">

        {metrics.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
              className="rounded-xl border border-slate-800 bg-slate-850 p-4 hover:border-cyan-500/40"
            >

              <div className="flex items-start justify-between">

                <div
                  className={`rounded-xl p-3 ${item.bg}`}
                >
                  <Icon
                    size={20}
                    className={item.color}
                  />
                </div>

                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    item.trend === "up"
                      ? "text-green-400"
                      : item.trend === "down"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >

                  {item.trend === "up" && (
                    <TrendingUp size={14} />
                  )}

                  {item.trend === "down" && (
                    <TrendingDown size={14} />
                  )}

                  {item.growth}

                </div>

              </div>

              <p className="mt-4 text-sm text-slate-400">
                {item.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-white">
                {item.value}
              </h3>

            </motion.div>

          );

        })}

      </div>

      {/* =======================================================
          AI FINANCIAL INSIGHT
      ======================================================= */}

      <div className="px-6">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5"
        >

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500/10 p-3">

              <BrainCircuit
                size={20}
                className="text-cyan-400"
              />

            </div>

            <div>

              <h3 className="font-semibold text-white">
                AI Financial Insight
              </h3>

              <p className="text-xs text-slate-400">
                Generated from today's financial activity
              </p>

            </div>

          </div>

          <p className="mt-5 leading-7 text-slate-300">

            Revenue collection continues to outperform
            the monthly target by <strong>8.4%</strong>.
            Collection efficiency has improved across
            commercial properties, while pending recovery
            is gradually decreasing. Based on current
            trends, AI predicts overall monthly revenue
            could exceed projections by approximately
            <strong> 6.2%</strong> if the current pace
            continues.

          </p>

        </motion.div>

      </div>

      {/* =======================================================
          FINANCIAL RISK
      ======================================================= */}

      <div className="px-6 pt-6">

        <div className="rounded-xl border border-slate-800 bg-slate-850 p-5">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="font-semibold text-white">
                Financial Risk Indicator
              </h3>

              <p className="text-xs text-slate-400">
                AI assessment based on current liabilities
              </p>

            </div>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
              MEDIUM
            </span>

          </div>

          <div className="flex gap-2">

            <div className="h-3 flex-1 rounded-full bg-green-500"></div>

            <div className="h-3 flex-1 rounded-full bg-green-400"></div>

            <div className="h-3 flex-1 rounded-full bg-yellow-400"></div>

            <div className="h-3 flex-1 rounded-full bg-slate-700"></div>

            <div className="h-3 flex-1 rounded-full bg-slate-700"></div>

          </div>

          <div className="mt-3 flex justify-between text-xs text-slate-500">

            <span>Low</span>

            <span>Medium</span>

            <span>High</span>

          </div>

        </div>

      </div>
	        {/* =======================================================
          PROJECT EXPENDITURE
      ======================================================= */}

      <div className="px-6 pt-6">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Project Expenditure
            </h3>

            <p className="text-xs text-slate-400">
              Budget utilization across major infrastructure projects
            </p>

          </div>

          <button className="flex items-center gap-2 rounded-lg border border-cyan-500/30 px-3 py-2 text-sm text-cyan-400 transition hover:bg-cyan-500/10">

            View Report

            <ArrowUpRight size={15} />

          </button>

        </div>

        <div className="space-y-4">

          {projects.map((project, index) => (

            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.12,
              }}
              whileHover={{
                y: -2,
              }}
              className="rounded-xl border border-slate-800 bg-slate-850 p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h4 className="font-semibold text-white">
                    {project.name}
                  </h4>

                  <p className="text-xs text-slate-400">
                    Budget {project.budget}
                  </p>

                </div>

                <div className="text-right">

                  <div className="text-lg font-bold text-cyan-400">
                    {project.progress}%
                  </div>

                  <div className="text-xs text-slate-400">
                    Utilized
                  </div>

                </div>

              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-700">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${project.progress}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                />

              </div>

              <div className="mt-3 flex justify-between text-sm">

                <span className="text-slate-400">

                  Spent

                  <span className="ml-2 font-medium text-white">
                    {project.spent}
                  </span>

                </span>

                <span className="font-medium text-green-400">

                  On Track

                </span>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

      {/* =======================================================
          EXECUTIVE RECOMMENDATIONS
      ======================================================= */}

      <div className="px-6 pt-6">

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">

          <div className="mb-4 flex items-center gap-3">

            <BrainCircuit
              size={20}
              className="text-indigo-400"
            />

            <h3 className="font-semibold text-white">
              Executive Recommendations
            </h3>

          </div>

          <ul className="space-y-3 text-sm leading-6 text-slate-300">

            <li>
              • Prioritize recovery of ₹7.2 Cr outstanding dues from commercial sectors.
            </li>

            <li>
              • Accelerate funding approval for Ring Road Phase-II to maintain project momentum.
            </li>

            <li>
              • Increase monitoring of medium-risk financial indicators over the next two weeks.
            </li>

          </ul>

        </div>

      </div>

      {/* =======================================================
          FOOTER
      ======================================================= */}

      <div className="mt-6 border-t border-slate-800 px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-slate-500">

              Overall Financial Health

            </p>

            <h3 className="mt-2 flex items-center gap-2 text-2xl font-bold text-green-400">

              <TrendingUp size={22} />

              Stable

            </h3>

          </div>

          <div className="text-right">

            <p className="text-xs uppercase tracking-wider text-slate-500">

              AI Forecast

            </p>

            <div className="mt-2 flex items-center justify-end gap-2 text-cyan-400">

              <TrendingUp size={18} />

              <span className="font-medium">
                Revenue expected to exceed target by 6.2%
              </span>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}
