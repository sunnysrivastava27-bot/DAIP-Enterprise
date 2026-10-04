import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Clock3,
  Activity,
} from "lucide-react";

interface ExecutiveRecommendation {
  title: string;
  description: string;
  impact: string;
  confidence: number;
  reviewTime: string;
  reasoning: string[];
}

const recommendation: ExecutiveRecommendation = {
  title: "Focus on Zone-4 Revenue Recovery",

  description:
    "AI intelligence indicates increasing revenue leakage caused by encroachment growth, delayed recovery notices and pending infrastructure approvals.",

  impact: "₹8.2 Cr",

  confidence: 97,

  reviewTime: "2 min",

  reasoning: [
    "Revenue trend decreased by 8.6%",
    "Citizen complaints increased by 14%",
    "Pending commercial recoveries exceeded threshold",
    "Infrastructure dependency delaying collections",
  ],
};

const AIExecutiveAdvisor: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-800/70
        bg-[#09111D]
      "
    >
	      {/* ==========================================================
          EXECUTIVE HEADER
      =========================================================== */}

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
              bg-cyan-500/10
              border
              border-cyan-500/20
            "
          >
            <Brain
              size={24}
              className="text-cyan-400"
            />
          </div>

          <div>

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-cyan-400
              "
            >
              Executive Intelligence
            </p>

            <h2
              className="
                mt-1
                text-xl
                font-semibold
                text-white
              "
            >
              AI Executive Advisor
            </h2>

          </div>

        </div>

        <div
          className="
            rounded-2xl
            border
            border-emerald-500/25
            bg-emerald-500/10
            px-4
            py-2
          "
        >
          <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">
            AI Confidence
          </div>

          <div className="mt-1 text-lg font-bold text-emerald-400">
            {recommendation.confidence}%
          </div>
        </div>
      </div>
	        {/* ==========================================================
          AI INTELLIGENCE CORE
      =========================================================== */}

      <div className="relative overflow-hidden">

        {/* Background Glow */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_70%)]" />

        <div
          className="
            relative
            grid
            grid-cols-[150px_1fr]
            gap-6
            items-center
            px-6
            py-7
          "
        >

          {/* ==========================================
              AI CORE
          ========================================== */}

          <div className="flex justify-center">

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                relative
                flex
                h-28
                w-28
                items-center
                justify-center
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/5
              "
            >

              {/* OUTER RING */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  h-24
                  w-24
                  rounded-full
                  border
                  border-dashed
                  border-cyan-400/40
                "
              />

              {/* MIDDLE RING */}

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  h-16
                  w-16
                  rounded-full
                  border
                  border-cyan-300/50
                "
              />

              {/* CORE */}

              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-400
                  to-sky-600
                  shadow-[0_0_40px_rgba(34,211,238,.45)]
                "
              >

                <Sparkles
                  size={22}
                  className="text-white"
                />

              </motion.div>

            </motion.div>

          </div>

          {/* ==========================================
              EXECUTIVE RECOMMENDATION
          ========================================== */}

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                px-3
                py-1
              "
            >

              <Activity
                size={14}
                className="text-cyan-300"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-cyan-300
                "
              >
                Today's Recommendation
              </span>

            </div>

            <h3
              className="
                mt-5
                text-2xl
                font-bold
                leading-tight
                text-white
              "
            >
              {recommendation.title}
            </h3>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-slate-400
              "
            >
              {recommendation.description}
            </p>

          </div>

        </div>

      </div>
	        {/* ==========================================================
          EXECUTIVE KPI STRIP
      =========================================================== */}

      <div className="grid grid-cols-3 gap-px border-y border-slate-800/70 bg-slate-800/70">

        {/* ==========================================
            EXPECTED IMPACT
        ========================================== */}

        <div className="bg-[#09111D] px-6 py-5">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={18}
              className="text-emerald-400"
            />

            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Expected Impact
            </span>

          </div>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {recommendation.impact}
          </h3>

          <p className="mt-1 text-xs text-emerald-400">
            Estimated monthly recovery
          </p>

        </div>

        {/* ==========================================
            CONFIDENCE
        ========================================== */}

        <div className="bg-[#09111D] px-6 py-5">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={18}
              className="text-cyan-400"
            />

            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Confidence
            </span>

          </div>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {recommendation.confidence}%
          </h3>

          <p className="mt-1 text-xs text-cyan-400">
            AI prediction accuracy
          </p>

        </div>

        {/* ==========================================
            REVIEW TIME
        ========================================== */}

        <div className="bg-[#09111D] px-6 py-5">

          <div className="flex items-center gap-2">

            <Clock3
              size={18}
              className="text-amber-400"
            />

            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
              Review Time
            </span>

          </div>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {recommendation.reviewTime}
          </h3>

          <p className="mt-1 text-xs text-amber-400">
            Executive decision window
          </p>

        </div>

      </div>

      {/* ==========================================================
          AI REASONING
      =========================================================== */}

      <div className="px-6 py-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-400">
              Intelligence Reasoning
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Why this recommendation?
            </h3>

          </div>

          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1">

            <span className="text-xs font-semibold text-cyan-300">
              AI Verified
            </span>

          </div>

        </div>

        <div className="mt-6 space-y-4">

          {recommendation.reasoning.map((reason) => (

            <div
              key={reason}
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-slate-800/60
                bg-slate-900/40
                px-4
                py-3
              "
            >

              <div
                className="
                  mt-1
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_10px_rgba(34,211,238,.8)]
                "
              />

              <p className="text-sm leading-6 text-slate-300">
                {reason}
              </p>

            </div>

          ))}

        </div>

      </div>
	        {/* ==========================================================
          EXECUTIVE ACTION
      =========================================================== */}

      <div
        className="
          border-t
          border-slate-800/70
          bg-gradient-to-b
          from-transparent
          to-cyan-500/5
          px-6
          py-6
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Executive Action
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Investigation Recommended
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              AI recommends initiating a focused investigation into
              Zone-4 revenue recovery. The projected financial impact
              exceeds the executive review threshold and requires
              immediate attention.
            </p>

          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-sky-600
              px-6
              py-4
              text-sm
              font-semibold
              text-white
              shadow-[0_0_30px_rgba(34,211,238,.25)]
              transition-all
            "
          >

            Start Investigation

            <ArrowRight size={18} />

          </motion.button>

        </div>

      </div>

    </motion.section>
  );
};

export default AIExecutiveAdvisor;
