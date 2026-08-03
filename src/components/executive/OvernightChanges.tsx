import React from "react";
import { motion } from "framer-motion";
import {
  Sunrise,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
} from "lucide-react";

interface ChangeItem {
  id: number;
  title: string;
  department: string;
  change: string;
  positive: boolean;
  time: string;
}

const overnightChanges: ChangeItem[] = [
  {
    id: 1,
    title: "Property Tax Collection",
    department: "Finance",
    change: "+8.4%",
    positive: true,
    time: "06:15 AM",
  },
  {
    id: 2,
    title: "Building Plan Approvals",
    department: "Town Planning",
    change: "+23 Files",
    positive: true,
    time: "07:05 AM",
  },
  {
    id: 3,
    title: "Citizen Complaints",
    department: "Public Grievance",
    change: "-12%",
    positive: true,
    time: "05:50 AM",
  },
  {
    id: 4,
    title: "Water Supply Interruptions",
    department: "Engineering",
    change: "+3 Alerts",
    positive: false,
    time: "04:45 AM",
  },
];

const OvernightChanges: React.FC = () => {
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

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">

            <Sunrise
              size={22}
              className="text-indigo-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-indigo-400">
              Daily Intelligence
            </p>

            <h2 className="text-lg font-semibold text-white">
              Overnight Changes
            </h2>

          </div>

        </div>

        <div className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1">

          <span className="text-xs font-semibold text-indigo-300">
            Last 24 Hours
          </span>

        </div>

      </div>

      {/* ================= LIST ================= */}

      <div className="divide-y divide-slate-800">

        {overnightChanges.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between px-6 py-5 transition hover:bg-slate-900/40"
          >
            <div>

              <h3 className="text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {item.department}
              </p>

            </div>

            <div className="text-right">

              <div
                className={`flex items-center justify-end gap-2 ${
                  item.positive
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {item.positive ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}

                <span className="font-semibold">
                  {item.change}
                </span>

              </div>

              <div className="mt-2 flex items-center justify-end gap-1 text-xs text-slate-500">

                <Clock3 size={12} />

                {item.time}

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="border-t border-slate-800/70 px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Executive Insight
            </p>

            <h3 className="mt-1 text-sm font-medium text-slate-300">
              Overall city performance improved compared to yesterday.
            </h3>

          </div>

          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">

            <span className="text-xs font-semibold text-emerald-400">
              Positive Trend
            </span>

          </div>

        </div>

      </div>

    </motion.section>
  );
};

export default OvernightChanges;