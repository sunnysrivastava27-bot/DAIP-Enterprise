import { motion } from "framer-motion";
import {
  ClipboardCheck,
  AlertTriangle,
  Clock3,
  User,
  ArrowRight,
  CheckCircle2,
  TimerReset,
} from "lucide-react";

const missions = [
  {
    id: "PRJ-021",
    title: "Ring Road Package-II",
    department: "Engineering Division",
    officer: "Rajesh Kumar",
    priority: "Critical",
    eta: "Immediate",
    sla: "Overdue by 14 Days",
    status: "Delayed",
  },
  {
    id: "LAND-1024",
    title: "Land Acquisition File",
    department: "Land Department",
    officer: "Anita Sharma",
    priority: "High",
    eta: "Today",
    sla: "Pending for 3 Days",
    status: "Pending",
  },
  {
    id: "ZONE-03",
    title: "Zone-3 Site Inspection",
    department: "Field Operations",
    officer: "Vivek Singh",
    priority: "Medium",
    eta: "2:00 PM",
    sla: "Scheduled",
    status: "On Track",
  },
];

const priorityStyle = {
  Critical:
    "bg-red-500/15 text-red-400 border border-red-500/30",
  High:
    "bg-orange-500/15 text-orange-400 border border-orange-500/30",
  Medium:
    "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
};

export default function MissionQueue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="h-full rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-cyan-400" size={22} />

          <div>
            <h2 className="text-lg font-semibold text-white">
              Mission Queue
            </h2>

            <p className="text-xs text-slate-400">
              Executive Operations Center
            </p>
          </div>
        </div>

        <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
          LIVE • 18 Tasks
        </div>
      </div>

      {/* Mission List */}
      <div className="space-y-4 p-5">

        {missions.map((mission) => (

          <motion.div
            key={mission.id}
            whileHover={{
              y: -2,
              transition: { duration: 0.15 },
            }}
            className="rounded-xl border border-slate-800 bg-slate-850 p-5 transition hover:border-cyan-500/40"
          >
            {/* Top */}
            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  {mission.status === "Delayed" ? (
                    <AlertTriangle
                      className="text-red-400"
                      size={18}
                    />
                  ) : mission.status === "Pending" ? (
                    <TimerReset
                      className="text-orange-400"
                      size={18}
                    />
                  ) : (
                    <CheckCircle2
                      className="text-green-400"
                      size={18}
                    />
                  )}

                  <h3 className="font-semibold text-white">
                    {mission.title}
                  </h3>

                </div>

                <p className="mt-1 text-sm text-slate-400">
                  {mission.id}
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  priorityStyle[
                    mission.priority as keyof typeof priorityStyle
                  ]
                }`}
              >
                {mission.priority}
              </span>

            </div>

            {/* Details */}
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

              <div className="flex items-center gap-2 text-slate-300">
                <User size={15} />
                {mission.officer}
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock3 size={15} />
                ETA : {mission.eta}
              </div>

              <div className="text-slate-400">
                Department
                <div className="mt-1 text-white">
                  {mission.department}
                </div>
              </div>

              <div className="text-slate-400">
                SLA
                <div className="mt-1 font-medium text-red-400">
                  {mission.sla}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">

              <span className="text-xs uppercase tracking-wide text-slate-500">
                {mission.status}
              </span>

              <button className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20">
                Open Mission
                <ArrowRight size={16} />
              </button>

            </div>

          </motion.div>

        ))}

      </div>
    </motion.div>
  );
}