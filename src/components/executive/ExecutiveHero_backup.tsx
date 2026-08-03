import React from "react";
import { motion } from "framer-motion";

import HeroKPIs from "./hero/HeroKPIs";
import StartBriefButton from "./hero/StartBriefButton";
import DigitalTwin from "./hero/DigitalTwin";
import MorningBrief from "./hero/MorningBrief";



const containerAnimation = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      staggerChildren: 0.08,
    },
  },
};

const ExecutiveHero: React.FC = () => {
  return (
    <motion.section
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-slate-800/70
        bg-[#07111D]
        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden">

        {/* Base Gradient */}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,#07111D_0%,#091626_100%)]" />

        {/* Cyan Glow */}

        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

        {/* Left Glow */}

        <div className="absolute -left-32 top-10 h-[340px] w-[340px] rounded-full bg-sky-500/10 blur-[120px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

      </div>

      {/* =====================================================
          EXECUTIVE LAYOUT
      ====================================================== */}

      <div
        className="
          relative
          grid
          h-full
          grid-cols-12
        "
      >

        {/* =====================================================
            LEFT EXECUTIVE PANEL
        ====================================================== */}

        <section
          className="
            col-span-3
            flex
            flex-col
            px-8
            py-8
          "
        >
		          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.35 },
              },
            }}
            className="flex h-full flex-col"
          >
            {/* =====================================================
                HEADER
            ====================================================== */}

           

            {/* Spacer */}

            <div className="h-6" />

            {/* =====================================================
                KPI STRIP
            ====================================================== */}

            <HeroKPIs
  data={{
    decisionsAwaiting: 12,
    estimatedReviewTime: "18 min",
    revenueOpportunity: "₹642 Cr",
  }}
/>
            {/* Spacer */}

            <div className="h-6" />

            {/* =====================================================
                START BRIEF CTA
            ====================================================== */}

            <StartBriefButton />

            {/* Flexible Space */}

            <div className="flex-1" />

            {/* =====================================================
                EXECUTIVE STATUS
            ====================================================== */}

            <div
              className="
                rounded-2xl
                border
                border-cyan-500/20
                bg-cyan-500/5
                p-5
              "
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                    Executive Status
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    City Operating Normally
                  </h3>
                </div>

                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,.8)]" />

              </div>

              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Active Departments
                  </span>

                  <span className="font-semibold text-white">
                    27
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Live Projects
                  </span>

                  <span className="font-semibold text-white">
                    148
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    AI Confidence
                  </span>

                  <span className="font-semibold text-emerald-400">
                    98.4%
                  </span>
                </div>

              </div>
            </div>

          </motion.div>
        </section>

        {/* =====================================================
            CENTER DIGITAL TWIN
        ====================================================== */}

        <section
          className="
            col-span-6
            flex
            items-center
            justify-center
            border-l
            border-r
            border-slate-800/60
            px-6
            py-6
          "
        >
		          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.96,
              },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.45,
                },
              },
            }}
            className="relative flex h-full w-full items-center justify-center"
          >
            {/* ===========================================
                Digital Twin Background Glow
            ============================================ */}

            <div className="absolute inset-0 flex items-center justify-center">

              <div className="h-[520px] w-[520px] rounded-full bg-cyan-500/5 blur-[90px]" />

            </div>

            {/* ===========================================
                Outer Ring
            ============================================ */}

            <div
              className="
                absolute
                h-[520px]
                w-[520px]
                rounded-full
                border
                border-cyan-500/10
              "
            />

            {/* Middle Ring */}

            <div
              className="
                absolute
                h-[420px]
                w-[420px]
                rounded-full
                border
                border-cyan-400/10
              "
            />

            {/* Inner Ring */}

            <div
              className="
                absolute
                h-[320px]
                w-[320px]
                rounded-full
                border
                border-cyan-300/10
              "
            />

            {/* ===========================================
                Digital Twin Component
            ============================================ */}

            <div
              className="
                relative
                z-20
                flex
                h-full
                w-full
                items-center
                justify-center
              "
            >
              <DigitalTwin />
            </div>

            {/* ===========================================
                Floating Intelligence Cards
            ============================================ */}

            <motion.div
              animate={{
                y: [-4, 4, -4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-10
                top-10
                rounded-xl
                border
                border-slate-700/60
                bg-slate-900/70
                px-4
                py-3
                backdrop-blur-xl
              "
            >
              <p className="text-xs uppercase tracking-widest text-cyan-300">
                Live Projects
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                148
              </h3>
            </motion.div>

            <motion.div
              animate={{
                y: [4, -4, 4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                right-10
                top-16
                rounded-xl
                border
                border-slate-700/60
                bg-slate-900/70
                px-4
                py-3
                backdrop-blur-xl
              "
            >
              <p className="text-xs uppercase tracking-widest text-emerald-300">
                Revenue
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                ₹642 Cr
              </h3>
            </motion.div>

            <motion.div
              animate={{
                y: [-3, 3, -3],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-12
                left-1/2
                -translate-x-1/2
                rounded-xl
                border
                border-slate-700/60
                bg-slate-900/70
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <p className="text-xs uppercase tracking-widest text-violet-300">
                AI Confidence
              </p>

              <h3 className="mt-1 text-xl font-semibold text-white">
                98.4%
              </h3>
            </motion.div>

          </motion.div>

        </section>

        {/* =====================================================
            RIGHT PANEL
        ====================================================== */}

        <section
          className="
            col-span-3
            flex
            h-full
            flex-col
            bg-[#09131F]
          "
        >
		          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                x: 16,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.4,
                },
              },
            }}
            className="
              flex
              h-full
              flex-col
              p-6
            "
          >
            {/* ==========================================
                Morning Brief
            ========================================== */}

            <div className="flex-1 overflow-hidden">
              <MorningBrief />
            </div>

            {/* ==========================================
                Footer Status
            ========================================== */}

            <div
              className="
                mt-5
                rounded-2xl
                border
                border-slate-800/70
                bg-slate-900/50
                p-4
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Last AI Refresh
                </span>

                <span className="font-medium text-cyan-300">
                  Just Now
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400" />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Executive Intelligence Engine synchronized successfully.
                All decision models and city intelligence streams are active.
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.section>
  );
};

export default ExecutiveHero;
