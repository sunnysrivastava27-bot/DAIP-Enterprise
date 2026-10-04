import React from "react";
import { motion } from "framer-motion";
import {
  type LucideIcon,
  Activity,
  Building2,
  BriefcaseBusiness,
  Users,
  ClipboardCheck,
  Wifi,
} from "lucide-react";

interface SnapshotMetric {
  title: string;
  value: string;
  subtitle: string;
 icon: LucideIcon;
  color: string;
  bg: string;
}

const metrics: SnapshotMetric[] = [
  {
    title: "Active Projects",
    value: "186",
    subtitle: "12 started today",
    icon: Building2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Field Officers",
    value: "247",
    subtitle: "221 currently active",
    icon: Users,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Site Inspections",
    value: "83",
    subtitle: "Today's inspections",
    icon: ClipboardCheck,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Citizen Requests",
    value: "129",
    subtitle: "17 awaiting review",
    icon: BriefcaseBusiness,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const LiveCitySnapshot: React.FC = () => {
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
            <Activity
              size={22}
              className="text-cyan-400"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[1.2px] text-cyan-400">
              Live Operations
            </p>

            <h2 className="text-lg font-semibold text-white">
              Live City Snapshot
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <Wifi
            size={14}
            className="text-emerald-400"
          />

          <span className="text-xs font-semibold text-emerald-400">
            LIVE
          </span>
        </div>
      </div>

      {/* ================= GRID ================= */}

      <div className="grid grid-cols-2 gap-5 p-6">
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5 transition-all duration-200 hover:border-cyan-500/40"
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon
                  size={22}
                  className={item.color}
                />
              </div>

              <h3 className="text-3xl font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-2 text-sm font-medium text-slate-300">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* ================= FOOTER ================= */}

      <div className="border-t border-slate-800/70 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              System Status
            </p>

            <h3 className="mt-1 text-lg font-semibold text-emerald-400">
              All Core Services Online
            </h3>
          </div>

          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">
            <span className="text-sm font-semibold text-cyan-400">
              Updated Just Now
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LiveCitySnapshot;