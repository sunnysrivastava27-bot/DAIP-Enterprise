import React from "react";
import { motion } from "framer-motion";
import {
  HeartPulse,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Activity,
} from "lucide-react";

const metrics = [
  {
    title: "Overall Health",
    value: "96%",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: CheckCircle2,
  },
  {
    title: "Citizen Satisfaction",
    value: "91%",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    icon: TrendingUp,
  },
  {
    title: "Critical Alerts",
    value: "03",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: AlertTriangle,
  },
];

const services = [
  {
    name: "Water Supply",
    value: 98,
  },
  {
    name: "Road Infrastructure",
    value: 92,
  },
  {
    name: "Sanitation",
    value: 95,
  },
  {
    name: "Street Lighting",
    value: 89,
  },
];

const CityHealth: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.30 }}
      className="rounded-3xl border border-slate-800/70 bg-[#09111D]"
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between border-b border-slate-800/70 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">

            <HeartPulse
              size={22}
              className="text-emerald-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-emerald-400">
              Operations Intelligence
            </p>

            <h2 className="text-lg font-semibold text-white">
              City Health
            </h2>

          </div>

        </div>

        <Activity
          size={20}
          className="text-emerald-400"
        />

      </div>

      {/* ================= KPI ================= */}

      <div className="grid grid-cols-3 gap-4 p-6">

        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`rounded-2xl border ${item.border} ${item.bg} p-4 text-center`}
            >
              <Icon
                size={20}
                className={`mx-auto mb-3 ${item.color}`}
              />

              <h3 className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {item.title}
              </p>

            </div>
          );
        })}

      </div>

      {/* ================= SERVICES ================= */}

      <div className="space-y-5 px-6">

        {services.map((service) => (
          <div key={service.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-sm text-slate-300">
                {service.name}
              </span>

              <span className="text-sm font-medium text-white">
                {service.value}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-500"
                style={{
                  width: `${service.value}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="border-t border-slate-800/70 mt-6 p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Overall Status
            </p>

            <h3 className="mt-1 text-lg font-semibold text-emerald-400">
              Healthy & Stable
            </h3>

          </div>

          <div className="rounded-full bg-emerald-500/10 px-4 py-2">

            <span className="text-sm font-semibold text-emerald-400">
              LIVE
            </span>

          </div>

        </div>

      </div>

    </motion.section>
  );
};

export default CityHealth;