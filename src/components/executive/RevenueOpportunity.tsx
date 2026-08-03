import React from "react";
import { motion } from "framer-motion";
import {
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Target,
  Sparkles,
} from "lucide-react";

interface RevenueOpportunity {
  title: string;
  amount: string;
  growth: string;
}

const opportunities: RevenueOpportunity[] = [
  {
    title: "Property Tax Collection",
    amount: "₹4.82 Cr",
    growth: "+12.8%",
  },
  {
    title: "Development Charges",
    amount: "₹1.96 Cr",
    growth: "+8.4%",
  },
  {
    title: "Building Plan Fees",
    amount: "₹74 L",
    growth: "+16.1%",
  },
];

const RevenueOpportunity: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-3xl border border-slate-800/70 bg-[#09111D]"
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between border-b border-slate-800/70 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">

            <IndianRupee
              size={22}
              className="text-emerald-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-emerald-400">
              Financial Intelligence
            </p>

            <h2 className="text-lg font-semibold text-white">
              Revenue Opportunity
            </h2>

          </div>

        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">

          <span className="text-xs font-semibold text-emerald-400">
            +11.4%
          </span>

        </div>

      </div>

      {/* ================= SUMMARY ================= */}

      <div className="px-6 pt-6">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Today's Expected Revenue
              </p>

              <h3 className="mt-2 text-4xl font-bold text-white">
                ₹7.52 Cr
              </h3>

            </div>

            <div className="rounded-2xl bg-emerald-500/10 p-4">

              <TrendingUp
                size={34}
                className="text-emerald-400"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ================= OPPORTUNITIES ================= */}

      <div className="space-y-4 p-6">

        {opportunities.map((item) => (

          <div
            key={item.title}
            className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/40 p-4 transition hover:border-emerald-500/40"
          >

            <div>

              <h3 className="text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Estimated Collection
              </p>

            </div>

            <div className="text-right">

              <div className="text-lg font-bold text-white">
                {item.amount}
              </div>

              <div className="mt-1 flex items-center justify-end gap-1 text-sm text-emerald-400">

                <ArrowUpRight size={15} />

                {item.growth}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= AI INSIGHT ================= */}

      <div className="mx-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

        <div className="flex items-start gap-4">

          <div className="rounded-xl bg-cyan-500/10 p-3">

            <Sparkles
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div>

            <h3 className="font-semibold text-white">
              AI Recommendation
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Focus on pending property tax notices and premium building
              approvals. AI estimates an additional revenue opportunity of
              ₹82 Lakhs before the end of the day.
            </p>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="border-t border-slate-800/70 p-6">

        <button className="flex w-full items-center justify-center rounded-2xl bg-emerald-500 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">

          <Target
            size={18}
            className="mr-2"
          />

          View Revenue Dashboard

        </button>

      </div>

    </motion.section>
  );
};

export default RevenueOpportunity;