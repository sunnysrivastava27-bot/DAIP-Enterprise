import React, { useEffect } from "react";

interface DigitalTwinFullscreenProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DigitalTwinFullscreen: React.FC<DigitalTwinFullscreenProps> = ({
  open,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col overflow-hidden bg-[#020914]"
      role="dialog"
      aria-modal="true"
      aria-label="DAIP Digital Twin"
    >
      {/* =========================================================
          BACKGROUND GRID
      ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 216, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 216, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* =========================================================
          TOP HEADER
      ========================================================= */}
      <div className="absolute left-0 right-0 top-0 z-30 flex h-[72px] items-center justify-between border-b border-cyan-400/20 bg-[#020914]/85 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
            <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-[0.22em] text-cyan-300">
              DAIP DIGITAL TWIN
            </div>

            <div className="mt-1 text-[11px] text-slate-400">
              Kanpur Development Authority · Live City Intelligence Model
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Live City Model
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
          >
            <span className="text-lg leading-none">×</span>
            <span className="text-xs font-medium">Close Twin</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          MAIN DIGITAL TWIN
      ========================================================= */}
      <div
        className="relative flex min-h-0 flex-1 overflow-hidden pt-[72px]"
        style={{ height: "100%", minHeight: 0, flex: 1 }}
      >
        <div
          className="relative flex h-full w-full min-h-0 min-w-0 overflow-hidden"
          style={{ display: "flex", height: "100%", width: "100%", minHeight: 0, minWidth: 0, flex: 1, overflow: "hidden" }}
        >
          {children}
        </div>
      </div>

      {/* =========================================================
          LEFT INTELLIGENCE PANEL
      ========================================================= */}
      <div className="absolute bottom-6 left-6 z-20 w-[250px] rounded-2xl border border-cyan-400/15 bg-[#06111f]/85 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          City Intelligence
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">City Health</span>
            <span className="text-sm font-semibold text-emerald-400">
              98%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-[98%] rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Projects</span>
            <span className="text-sm font-semibold text-cyan-300">82%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-[82%] rounded-full bg-cyan-400" />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Revenue</span>
            <span className="text-sm font-semibold text-emerald-400">
              +12%
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          RIGHT STATUS PANEL
      ========================================================= */}
      <div className="absolute bottom-6 right-6 z-20 w-[250px] rounded-2xl border border-cyan-400/15 bg-[#06111f]/85 p-4 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Live Situation
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
            Operational
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-slate-400">Revenue Alerts</span>
            <span className="font-semibold text-orange-400">03</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-slate-400">Project Alerts</span>
            <span className="font-semibold text-red-400">02</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Critical Zones</span>
            <span className="font-semibold text-yellow-400">01</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM CENTER CONTROL HINT
      ========================================================= */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-5 py-2 backdrop-blur-md">
        <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Drag · Rotate · Zoom · Explore City
        </span>
      </div>
    </div>
  );
};

export default DigitalTwinFullscreen;