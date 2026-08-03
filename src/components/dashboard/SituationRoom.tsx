import { motion } from "framer-motion";
import {
  ShieldAlert,
  Flame,
  CloudRain,
  TrafficCone,
  Building2,
  Siren,
  MapPinned,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const incidents = [
  {
    title: "Illegal Construction",
    location: "Sector-12",
    severity: "Critical",
    status: "Inspection Team Dispatched",
    icon: Building2,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    title: "Heavy Rain Alert",
    location: "City Wide",
    severity: "High",
    status: "Orange Alert",
    icon: CloudRain,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Traffic Diversion",
    location: "Ring Road",
    severity: "Medium",
    status: "Traffic Police Active",
    icon: TrafficCone,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Fire Emergency",
    location: "Industrial Area",
    severity: "Critical",
    status: "Fire Brigade Responding",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

export default function SituationRoom() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="h-full rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

        <div className="flex items-center gap-3">

          <ShieldAlert
            size={22}
            className="text-red-400"
          />

          <div>

            <h2 className="text-lg font-semibold text-white">
              Situation Room
            </h2>

            <p className="text-xs text-slate-400">
              City Emergency Intelligence
            </p>

          </div>

        </div>

        <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          2 Critical
        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-4 gap-4 p-5">

        <div className="rounded-xl bg-slate-850 p-4 text-center">

          <AlertTriangle
            className="mx-auto text-red-400"
            size={20}
          />

          <h3 className="mt-2 text-2xl font-bold text-white">
            08
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Active Alerts
          </p>

        </div>

        <div className="rounded-xl bg-slate-850 p-4 text-center">

          <Siren
            className="mx-auto text-orange-400"
            size={20}
          />

          <h3 className="mt-2 text-2xl font-bold text-white">
            03
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Emergency
          </p>

        </div>

        <div className="rounded-xl bg-slate-850 p-4 text-center">

          <MapPinned
            className="mx-auto text-cyan-400"
            size={20}
          />

          <h3 className="mt-2 text-2xl font-bold text-white">
            17
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Field Teams
          </p>

        </div>

        <div className="rounded-xl bg-slate-850 p-4 text-center">

          <CheckCircle2
            className="mx-auto text-green-400"
            size={20}
          />

          <h3 className="mt-2 text-2xl font-bold text-white">
            94%
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Response SLA
          </p>

        </div>

      </div>

      {/* Incidents */}

      <div className="space-y-4 px-5 pb-5">

        {incidents.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-slate-800 bg-slate-850 p-4 transition hover:border-red-500/40"
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <div className={`rounded-xl p-3 ${item.bg}`}>

                    <Icon
                      className={item.color}
                      size={20}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {item.location}
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      {item.status}
                    </p>

                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.severity === "Critical"
                      ? "bg-red-500/10 text-red-400"
                      : item.severity === "High"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {item.severity}
                </span>

              </div>

              <div className="mt-4 flex justify-end">

                <button className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20">

                  Open Incident

                  <ArrowUpRight size={15} />

                </button>

              </div>

            </motion.div>

          );

        })}

      </div>

    </motion.div>
  );
}