import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  IndianRupee,
  Building2,
  ShieldAlert,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";

const activities = [
  {
    time: "11:48 AM",
    title: "Ring Road Inspection Completed",
    description: "Engineering Division submitted inspection report.",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    time: "11:42 AM",
    title: "AI Detected Encroachment",
    description: "Sector-12 flagged for unauthorized construction.",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    time: "11:35 AM",
    title: "Revenue Collection Updated",
    description: "₹42.8 Cr collected today across all zones.",
    icon: IndianRupee,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    time: "11:26 AM",
    title: "Tender Package Approved",
    description: "Infrastructure Package-17 approved.",
    icon: Building2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    time: "11:18 AM",
    title: "VIP Security Alert",
    description: "Security route activated for ministerial visit.",
    icon: ShieldAlert,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    time: "11:05 AM",
    title: "Officer Checked In",
    description: "Field Officer Vivek Singh reached Zone-3.",
    icon: UserCheck,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
];

export default function LiveActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="h-full rounded-2xl border border-slate-800 bg-slate-900 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
        <div className="flex items-center gap-3">
          <Activity className="text-cyan-400" size={22} />

          <div>
            <h2 className="text-lg font-semibold text-white">
              Live Activity
            </h2>

            <p className="text-xs text-slate-400">
              Real-Time Operations Feed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
          ● LIVE
        </div>
      </div>

      {/* Timeline */}
      <div className="relative h-[620px] overflow-y-auto px-6 py-5">

        {/* Timeline Line */}
        <div className="absolute left-[35px] top-0 bottom-0 w-px bg-slate-700" />

        <div className="space-y-6">

          {activities.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="relative flex gap-4"
              >
                {/* Timeline Dot */}
                <div
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full ${item.bg}`}
                >
                  <Icon className={item.color} size={20} />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.15 },
                  }}
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-850 p-4 transition hover:border-cyan-500/40"
                >
                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>

                    <span className="text-xs text-slate-500">
                      {item.time}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.description}
                  </p>

                  <button className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300">
                    View Details
                    <ArrowUpRight size={15} />
                  </button>

                </motion.div>

              </motion.div>

            );

          })}

        </div>

      </div>
    </motion.div>
  );
}