import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck2,
  AlertTriangle,
  Clock3,
  ArrowRight,
  CheckCircle2,
  Building2,
  TrendingUp,
  CircleDot,
  TimerReset,
  Sparkles,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type Priority = "Critical" | "High" | "Medium";

interface Decision {
  id: number;
  title: string;
  department: string;
  officer: string;
  due: string;
  impact: string;
  estimatedTime: string;
  aiAdvice: string;
  priority: Priority;
}

/* ============================================================
   MOCK DATA
============================================================ */

const decisions: Decision[] = [
  {
    id: 1,
    title: "Approve Ring Road Package-II",
    department: "Engineering Department",
    officer: "Chief Engineer",
    due: "Today",
    impact: "₹18.6 Cr Revenue",
    estimatedTime: "2 min",
    aiAdvice:
      "Tender evaluation completed. Immediate approval recommended.",
    priority: "Critical",
  },
  {
    id: 2,
    title: "Land Acquisition Proposal",
    department: "Estate Department",
    officer: "Estate Officer",
    due: "Tomorrow",
    impact: "126 Acres",
    estimatedTime: "3 min",
    aiAdvice:
      "Compensation verified. File ready for executive clearance.",
    priority: "High",
  },
  {
    id: 3,
    title: "Building Plan Revision",
    department: "Town Planning",
    officer: "Chief Planner",
    due: "2 Days",
    impact: "42 Projects",
    estimatedTime: "2 min",
    aiAdvice:
      "No policy conflicts detected. AI recommends approval.",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Budget Re-appropriation",
    department: "Finance Department",
    officer: "Finance Controller",
    due: "This Week",
    impact: "₹8.4 Cr",
    estimatedTime: "5 min",
    aiAdvice:
      "Funds availability verified with treasury records.",
    priority: "High",
  },
];

/* ============================================================
   COLORS
============================================================ */

const priorityBadge = {
  Critical:
    "border-red-500/30 bg-red-500/10 text-red-400",

  High:
    "border-amber-500/30 bg-amber-500/10 text-amber-400",

  Medium:
    "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
};



/* ============================================================
   COMPONENT
============================================================ */

const DecisionsRequired: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-800/70
        bg-[#09111D]
      "
    >
	      {/* ============================================================
          EXECUTIVE HEADER
      ============================================================ */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-800/70
          px-6
          py-5
        "
      >
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-amber-500/20
              bg-amber-500/10
            "
          >
            <FileCheck2
              size={24}
              className="text-amber-400"
            />
          </div>

          <div>

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-amber-400
              "
            >
              Executive Workflow
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-semibold
                text-white
              "
            >
              Decisions Required
            </h2>

          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-cyan-400
            transition
            hover:text-cyan-300
          "
        >
          View All

          <ArrowRight size={16} />
        </button>

      </div>

      {/* ============================================================
          KPI STRIP
      ============================================================ */}

      <div
        className="
          grid
          grid-cols-3
          gap-px
          border-b
          border-slate-800/70
          bg-slate-800/70
        "
      >

        <div className="bg-[#09111D] px-5 py-4">

          <div className="flex items-center gap-2">

            <AlertTriangle
              size={16}
              className="text-red-400"
            />

            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Pending
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            14
          </h3>

        </div>

        <div className="bg-[#09111D] px-5 py-4">

          <div className="flex items-center gap-2">

            <Clock3
              size={16}
              className="text-amber-400"
            />

            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Review Time
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            12 min
          </h3>

        </div>

        <div className="bg-[#09111D] px-5 py-4">

          <div className="flex items-center gap-2">

            <CheckCircle2
              size={16}
              className="text-emerald-400"
            />

            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              SLA
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold text-white">
            92%
          </h3>

        </div>

      </div>

      {/* ============================================================
          AI SUMMARY
      ============================================================ */}

      <div
        className="
          border-b
          border-slate-800/70
          bg-gradient-to-r
          from-amber-500/10
          to-transparent
          px-5
          py-4
        "
      >

        <div className="flex items-start gap-3">

          <Sparkles
            size={18}
            className="mt-1 text-amber-400"
          />

          <div>

            <p className="text-sm font-semibold text-white">
              AI Executive Summary
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Four executive approvals require attention today.
              Two files exceed SLA limits and one approval may
              directly impact this month's revenue realization.
            </p>

          </div>

        </div>

      </div>

      {/* ============================================================
          DECISION LIST
      ============================================================ */}

      <div
        className="
          flex-1
          space-y-3
          p-5
        "
      >
	          {decisions.map((decision) => (

          <motion.div
            key={decision.id}
            whileHover={{
              y: -2,
            }}
            transition={{
              duration: 0.20,
            }}
            className="
              rounded-2xl
              border
              border-slate-800/70
              bg-slate-900/40
              p-4
              transition-all
              hover:border-cyan-500/40
            "
          >

            <div className="flex items-start gap-4">

              {/* ======================================
                  NUMBER
              ======================================= */}

              <div
                className="
                  flex
                  h-12
                  w-12
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-800
                  text-lg
                  font-bold
                  text-white
                "
              >
                {decision.id}
              </div>

              {/* ======================================
                  CONTENT
              ======================================= */}

              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-[15px] font-semibold text-white">
                      {decision.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">

                      <Building2
                        size={14}
                        className="text-slate-500"
                      />

                      <span className="text-xs text-slate-400">
                        {decision.department}
                      </span>

                    </div>

                    <div className="mt-2 flex items-center gap-2">

                      <CircleDot
                        size={12}
                        className="text-cyan-400"
                      />

                      <span className="text-xs text-cyan-300">
                        {decision.officer}
                      </span>

                    </div>

                  </div>

                  {/* ======================================
                      PRIORITY
                  ======================================= */}

                  <div className="text-right">

                    <span
                      className={`
                        rounded-full
                        border
                        px-3
                        py-1
                        text-[11px]
                        font-semibold
                        ${priorityBadge[decision.priority]}
                      `}
                    >
                      {decision.priority}
                    </span>

                  </div>

                </div>

                {/* ======================================
                    AI RECOMMENDATION
                ======================================= */}

                <div
                  className="
                    mt-4
                    rounded-xl
                    border
                    border-cyan-500/15
                    bg-cyan-500/5
                    p-3
                  "
                >

                  <div className="flex items-start gap-3">

                    <Sparkles
                      size={15}
                      className="mt-0.5 text-cyan-400"
                    />

                    <p className="text-xs leading-6 text-slate-300">
                      {decision.aiAdvice}
                    </p>

                  </div>

                </div>

                {/* ======================================
                    FOOTER
                ======================================= */}

                <div className="mt-4 flex items-center justify-between">

                  <div className="flex items-center gap-6">

                    <div className="flex items-center gap-2">

                      <TrendingUp
                        size={15}
                        className="text-emerald-400"
                      />

                      <span className="text-xs text-slate-300">
                        {decision.impact}
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <TimerReset
                        size={15}
                        className="text-amber-400"
                      />

                      <span className="text-xs text-slate-300">
                        {decision.estimatedTime}
                      </span>

                    </div>

                  </div>

                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-cyan-400
                      transition
                      hover:text-cyan-300
                    "
                  >

                    Review

                    <ArrowRight size={15} />

                  </button>

                </div>

              </div>

            </div>

          </motion.div>

        ))}
		      </div>

      {/* ============================================================
          EXECUTIVE FOOTER
      ============================================================ */}

      <div
        className="
          border-t
          border-slate-800/70
          bg-gradient-to-r
          from-[#09111D]
          via-[#0B1625]
          to-[#09111D]
          px-5
          py-4
        "
      >

        <div className="flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <div
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_12px_rgba(74,222,128,.8)]
              "
            />

            <span className="text-sm text-slate-300">
              <strong className="text-white">
                {decisions.length}
              </strong>{" "}
              Executive Decisions
            </span>

            <span className="text-slate-600">•</span>

            <span className="text-sm text-slate-400">
              Estimated Review
            </span>

            <span className="font-semibold text-cyan-300">
              12 min
            </span>

          </div>

          {/* RIGHT */}

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-4
              py-2
              text-sm
              font-semibold
              text-cyan-300
              transition-all
              duration-200
              hover:border-cyan-400/40
              hover:bg-cyan-500/20
            "
          >

            Open Decision Queue

            <ArrowRight
              size={16}
            />

          </button>

        </div>

      </div>

    </motion.section>
  );
};

export default DecisionsRequired;
