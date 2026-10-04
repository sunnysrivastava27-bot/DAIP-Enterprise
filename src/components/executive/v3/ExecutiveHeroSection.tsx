import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Brain,
  CalendarDays,
  CheckCircle2,
  CloudRain,
  Map,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import DigitalTwinCity from "./digital-twin/DigitalTwinCity";
import DigitalTwinFullscreen from "./digital-twin/DigitalTwinFullscreen";

const ExecutiveHeroSection: React.FC = () => {
  const [isDigitalTwinFullscreen, setIsDigitalTwinFullscreen] =
    useState(false);

  return (
    <>
      <section className="relative h-full min-h-0 overflow-hidden rounded-[18px] border border-slate-600/80 bg-[#050B14] text-slate-100">
        {/* =====================================================
            DIGITAL TWIN BACKGROUND
           ===================================================== */}

        <div className="absolute inset-0 overflow-hidden">
          {/* Atmospheric depth */}

          {/* Technical grid */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.10]
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.35) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* =================================================
              ROAD NETWORK
             ================================================= */}

          {/* =================================================
              DIGITAL TWIN CORE
             ================================================= */}

          <TwinNode
            left="68%"
            top="31%"
            label="WARD 18"
            color="bg-orange-400"
          />

          <TwinNode
            left="72%"
            top="61%"
            label="WARD 7"
            color="bg-emerald-400"
          />

          <TwinNode
            left="40%"
            top="68%"
            label="PROJECT 32"
            color="bg-blue-400"
          />

          {/* additional live signals */}
          <div className="absolute left-[48%] top-[39%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          <div className="absolute left-[63%] top-[44%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          <div className="absolute left-[58%] top-[71%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          {/* =================================================
              DIGITAL TWIN DATA LINES
             ================================================= */}

          {/* subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_52%,transparent_0%,rgba(5,11,20,0.08)_48%,rgba(5,11,20,0.48)_100%)]" />
        </div>

        {/* =====================================================
            TOP HERO CONTENT
           ===================================================== */}

        <div className="relative z-10 flex h-full flex-col">
          {/* top strip */}
          <div className="flex items-start justify-between px-4 pt-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
                  <Map size={14} className="text-cyan-300" />
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Digital Twin
                  </div>

                  <div className="text-[9px] text-slate-400">
                    Kanpur Development Authority
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

              <span className="text-[9px] font-medium text-emerald-300">
                LIVE CITY MODEL
              </span>
            </div>
          </div>

          {/* =================================================
              MAIN CONTENT
             ================================================= */}

          <div className="relative flex min-h-0 flex-1">
            {/* LEFT — EXECUTIVE BRIEF */}

            <div className="relative z-20 w-[25%] min-w-[185px] px-3 pb-3 pt-2">
              <div className="h-full rounded-xl border border-slate-700/70 bg-[#07111E]/88 p-3 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      Executive Brief
                    </div>

                    <div className="text-[9px] text-slate-500">
                      Today's situation
                    </div>
                  </div>

                  <Sparkles size={14} className="text-cyan-300" />
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <MiniMetric
                    icon={<Building2 size={11} />}
                    label="Projects"
                    value="186"
                  />

                  <MiniMetric
                    icon={<Users size={11} />}
                    label="Population"
                    value="12.8L"
                  />

                  <MiniMetric
                    icon={<AlertTriangle size={11} />}
                    label="Alerts"
                    value="14"
                    valueClass="text-orange-400"
                  />

                  <MiniMetric
                    icon={<CheckCircle2 size={11} />}
                    label="Health"
                    value="98%"
                    valueClass="text-emerald-400"
                  />
                </div>

                <div className="my-2 border-t border-slate-800/80" />

                <div className="flex items-center gap-2">
                  <CalendarDays size={11} className="text-cyan-300" />

                  <span className="text-[9px] text-slate-400">
                    Next executive review
                  </span>
                </div>

                <div className="mt-1 text-[11px] font-semibold text-white">
                  03:00 PM
                </div>

                <div className="mt-0.5 text-[9px] text-slate-500">
                  Revenue Recovery Review
                </div>

                <div className="mt-2 flex items-center gap-2 rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-2 py-1.5">
                  <CloudRain size={12} className="text-cyan-300" />

                  <div>
                    <div className="text-[9px] font-medium text-slate-200">
                      Monsoon conditions
                    </div>

                    <div className="text-[8px] text-slate-500">
                      Normal operational impact
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CENTER — DIGITAL TWIN
               ================================================= */}

            <div className="relative min-w-0 flex-1 overflow-hidden">
              {!isDigitalTwinFullscreen && <DigitalTwinCity />}
            </div>

            {/* RIGHT — AI MORNING BRIEF */}

            <div className="relative z-20 w-[28%] min-w-[205px] px-4 pb-3 pt-2">
              <div className="h-full rounded-xl border border-cyan-500/20 bg-[#07111E]/85 p-3 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10">
                    <Brain size={14} className="text-cyan-300" />
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      AI Morning Brief
                    </div>

                    <div className="text-[9px] text-slate-500">
                      Executive intelligence
                    </div>
                  </div>
                </div>

                <div className="mb-2 text-[13px] font-semibold leading-tight text-white">
                  City operating normally,
                  <span className="text-cyan-300">
                    {" "}
                    3 areas need attention.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <BriefRow
                    icon={<AlertTriangle size={11} />}
                    label="Zone 4 encroachments"
                    value="12"
                    valueClass="text-red-400"
                  />

                  <BriefRow
                    icon={<TrendingUp size={11} />}
                    label="Revenue collection"
                    value="+12%"
                    valueClass="text-emerald-400"
                  />

                  <BriefRow
                    icon={<Activity size={11} />}
                    label="Projects on schedule"
                    value="82%"
                    valueClass="text-cyan-300"
                  />
                </div>

                <div className="my-2 border-t border-slate-800/80" />

                <div className="text-[8px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Executive recommendation
                </div>

                <div className="mt-1 text-[10px] leading-relaxed text-slate-300">
                  Prioritize Zone 4 enforcement review before the afternoon
                  planning meeting.
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM INTELLIGENCE STRIP
             ================================================= */}

          <div className="relative z-20 flex h-[34px] items-center border-t border-slate-800/80 bg-[#060D18]/90 px-4">
            <div className="flex min-w-0 flex-1 items-center gap-5">
              <BottomSignal
                label="REVENUE"
                value="+12%"
                valueClass="text-emerald-400"
              />

              <BottomSignal
                label="PROJECTS"
                value="82%"
                valueClass="text-cyan-300"
              />

              <BottomSignal
                label="ALERTS"
                value="14"
                valueClass="text-orange-400"
              />

              <BottomSignal
                label="CITY HEALTH"
                value="98%"
                valueClass="text-emerald-400"
              />
            </div>

            {/* =================================================
                EXISTING BUTTON — NOW OPENS FULLSCREEN TWIN
               ================================================= */}

            <button
              type="button"
              onClick={() => setIsDigitalTwinFullscreen(true)}
              className="flex items-center gap-1 text-[9px] font-medium text-cyan-300 transition-colors hover:text-cyan-200"
            >
              Explore Digital Twin
              <ArrowUpRight size={11} />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          DIGITAL TWIN FULLSCREEN
         ============================================================ */}

      <DigitalTwinFullscreen
        open={isDigitalTwinFullscreen}
        onClose={() => setIsDigitalTwinFullscreen(false)}
      >
        {isDigitalTwinFullscreen && <DigitalTwinCity />}
      </DigitalTwinFullscreen>
    </>
  );
};

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

interface BriefRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

const BriefRow: React.FC<BriefRowProps> = ({
  icon,
  label,
  value,
  valueClass = "text-white",
}) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-slate-900/45 px-2 py-1.5">
      <div className="flex min-w-0 items-center gap-1.5 text-[9px] text-slate-400">
        <span className="shrink-0 text-slate-500">{icon}</span>
        <span className="truncate">{label}</span>
      </div>

      <span
        className={`shrink-0 text-[9px] font-semibold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
};

interface MiniMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

const MiniMetric: React.FC<MiniMetricProps> = ({
  icon,
  label,
  value,
  valueClass = "text-white",
}) => {
  return (
    <div className="rounded-lg border border-slate-800/80 bg-slate-900/45 px-2 py-1.5">
      <div className="flex items-center gap-1 text-[8px] text-slate-500">
        {icon}
        {label}
      </div>

      <div
        className={`mt-0.5 text-[11px] font-semibold ${valueClass}`}
      >
        {value}
      </div>
    </div>
  );
};

interface BottomSignalProps {
  label: string;
  value: string;
  valueClass?: string;
}

const BottomSignal: React.FC<BottomSignalProps> = ({
  label,
  value,
  valueClass = "text-white",
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[8px] uppercase tracking-[0.16em] text-slate-600">
        {label}
      </span>

      <span
        className={`text-[9px] font-semibold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
};

interface TwinNodeProps {
  left: string;
  top: string;
  label: string;
  color: string;
}

const TwinNode: React.FC<TwinNodeProps> = ({
  left,
  top,
  label,
  color,
}) => {
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`h-2.5 w-2.5 rounded-full ${color} shadow-[0_0_12px_rgba(34,211,238,0.35)]`}
        />

        <span className="whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.12em] text-slate-500">
          {label}
        </span>
      </div>
    </div>
  );
};

export default ExecutiveHeroSection;