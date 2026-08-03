import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck2,
  Clock3,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

interface Decision {
  id: number;
  title: string;
  department: string;
  due: string;
  priority: "Critical" | "High" | "Medium";
}

const decisions: Decision[] = [
  {
    id: 1,
    title: "Ring Road Package-II Approval",
    department: "Engineering Department",
    due: "Due Today",
    priority: "Critical",
  },
  {
    id: 2,
    title: "Land Acquisition Proposal",
    department: "Estate Department",
    due: "Tomorrow",
    priority: "High",
  },
  {
    id: 3,
    title: "Building Plan Revision",
    department: "Town Planning",
    due: "2 Days",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Budget Re-appropriation",
    department: "Finance Department",
    due: "This Week",
    priority: "High",
  },
];

const priorityStyle = {
  Critical:
    "border-red-500/30 bg-red-500/10 text-red-400",
  High:
    "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Medium:
    "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
};

const DecisionsRequired: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.30 }}
      className="
h-full
flex
flex-col
overflow-hidden
rounded-3xl
border
border-slate-800/70
bg-[#09111D]
"
    >
      {/* =======================================================
          HEADER
      ======================================================== */}

      <div className="
flex
flex-shrink-0
items-center
justify-between
border-b
border-slate-800/70
px-6
py-5
">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">

            <FileCheck2
              size={22}
              className="text-amber-400"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-[1.2px] text-amber-400">
              Executive Workflow
            </p>

            <h2 className="text-lg font-semibold text-white">
              Decisions Required
            </h2>

          </div>

        </div>

        <div className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1">

          <span className="text-xs font-semibold text-red-400">
            14 Pending
          </span>

        </div>

      </div>

      {/* =======================================================
          DECISION LIST
      ======================================================== */}

      <div className="
flex-1
overflow-y-auto
space-y-4
p-5
">

        {decisions.map((decision) => (
          <div
            key={decision.id}
            className="
rounded-xl
border
border-slate-700
bg-slate-900/50
p-4
transition
hover:border-cyan-500/40
"
          >
            <div className="flex items-start justify-between">

              <div>

                <h3 className="text-[15px] font-semibold text-white">
                  {decision.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {decision.department}
                </p>

                <div className="mt-4 flex items-center gap-4">

                  <div className="flex items-center gap-2">

                    <Clock3
                      size={14}
                      className="text-slate-500"
                    />

                    <span className="text-xs text-slate-400">
                      {decision.due}
                    </span>

                  </div>

                </div>

              </div>

              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                  priorityStyle[decision.priority]
                }`}
              >
                {decision.priority}
              </span>

            </div>
          </div>
        ))}

      </div>

      {/* =======================================================
          ALERT
      ======================================================== */}

      <div className="
mx-5
mb-5
flex-shrink-0
rounded-xl
border
border-red-500/20
bg-red-500/5
p-4
">

        <div className="flex items-center gap-3">

          <AlertCircle
            size={18}
            className="text-red-400"
          />

          <p className="text-sm text-red-300">
            Two executive approvals are pending beyond SLA.
          </p>

        </div>

      </div>

      {/* =======================================================
          FOOTER
      ======================================================== */}

      <div className="
flex-shrink-0
border-t
border-slate-800/70
p-5
">

        <button className="flex w-full items-center justify-center rounded-2xl bg-amber-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">

          Open Decision Queue

          <ArrowRight
            size={18}
            className="ml-2"
          />

        </button>

      </div>

    </motion.section>
  );
};

export default DecisionsRequired;