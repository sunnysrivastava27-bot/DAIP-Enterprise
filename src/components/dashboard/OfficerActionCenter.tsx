import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  Phone,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Wifi,
} from "lucide-react";

const officers = [
  {
    name: "Rajesh Kumar",
    designation: "Executive Engineer",
    department: "Engineering",
    location: "Ring Road Phase-II",
    status: "On Site",
    task: "Inspection in Progress",
    eta: "45 min",
    phone: "+91 98765 43210",
    online: true,
    priority: "Critical",
  },
  {
    name: "Anita Sharma",
    designation: "Land Officer",
    department: "Land Acquisition",
    location: "Sector-12",
    status: "Meeting",
    task: "File Verification",
    eta: "20 min",
    phone: "+91 98765 43211",
    online: true,
    priority: "High",
  },
  {
    name: "Vivek Singh",
    designation: "Field Inspector",
    department: "Field Operations",
    location: "Zone-3",
    status: "Available",
    task: "Routine Inspection",
    eta: "Completed",
    phone: "+91 98765 43212",
    online: false,
    priority: "Normal",
  },
];

const priorityStyle = {
  Critical: "bg-red-500/10 text-red-400 border border-red-500/30",
  High: "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  Normal: "bg-green-500/10 text-green-400 border border-green-500/30",
};

export default function OfficerActionCenter() {
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

          <Users className="text-cyan-400" size={22} />

          <div>
            <h2 className="text-lg font-semibold text-white">
              Officer Action Center
            </h2>

            <p className="text-xs text-slate-400">
              Field Operations Monitoring
            </p>
          </div>

        </div>

        <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
          {officers.filter(o => o.online).length} ONLINE
        </div>

      </div>

      {/* Officer Cards */}

      <div className="space-y-4 p-5">

        {officers.map((officer, index) => (

          <motion.div
            key={index}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-slate-800 bg-slate-850 p-5 transition hover:border-cyan-500/40"
          >

            {/* Top */}

            <div className="flex items-start justify-between">

              <div className="flex gap-4">

                {/* Avatar */}

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15 text-lg font-bold text-cyan-400">
                  {officer.name.split(" ").map(n => n[0]).join("")}
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold text-white">
                      {officer.name}
                    </h3>

                    {officer.online ? (
                      <Wifi className="text-green-400" size={15} />
                    ) : (
                      <Wifi className="text-slate-500" size={15} />
                    )}

                  </div>

                  <p className="text-sm text-slate-400">
                    {officer.designation}
                  </p>

                  <p className="text-xs text-slate-500">
                    {officer.department}
                  </p>

                </div>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  priorityStyle[
                    officer.priority as keyof typeof priorityStyle
                  ]
                }`}
              >
                {officer.priority}
              </span>

            </div>

            {/* Details */}

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={15} />
                {officer.location}
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Clock3 size={15} />
                ETA : {officer.eta}
              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Current Task
                </p>

                <p className="mt-1 text-white">
                  {officer.task}
                </p>

              </div>

              <div>

                <p className="text-xs text-slate-500">
                  Status
                </p>

                <div className="mt-1 flex items-center gap-2">

                  {officer.status === "On Site" ? (
                    <CheckCircle2
                      size={15}
                      className="text-green-400"
                    />
                  ) : (
                    <AlertTriangle
                      size={15}
                      className="text-orange-400"
                    />
                  )}

                  <span className="text-white">
                    {officer.status}
                  </span>

                </div>

              </div>

            </div>

            {/* Footer */}

            <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">

              <button className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700">
                <Phone size={15} />
                Contact
              </button>

              <button className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20">
                View Profile
                <ArrowUpRight size={15} />
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}