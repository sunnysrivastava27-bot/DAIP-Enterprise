import React from "react";
import DigitalTwinScene from "./DigitalTwinScene";
import IntelligenceLayer from "./IntelligenceLayer";

/* ============================================================
   DAIP ENTERPRISE V3
   DIGITAL TWIN CITY
   ------------------------------------------------------------
   This component is responsible only for:
   - Digital Twin scene container
   - Intelligence layer
   - UI overlay
   - City operational indicator

   The actual 3D city is handled by DigitalTwinScene
   and its child environment/city components.
   ============================================================ */

const DigitalTwinCity: React.FC = () => {
  return (
    <div
      className="relative h-full w-full min-h-0 overflow-hidden bg-[#030914]"
      style={{ height: "100%", width: "100%", minHeight: 0 }}
    >

      {/* ======================================================
          DIGITAL TWIN SCENE
         ====================================================== */}

      <DigitalTwinScene>
        <IntelligenceLayer />
      </DigitalTwinScene>

      {/* ======================================================
          SUBTLE CITY GRID OVERLAY
         ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,transparent_30%,rgba(2,8,18,0.12)_62%,rgba(2,8,18,0.72)_100%)]" />

      </div>

      {/* ======================================================
          CITY OPERATIONAL INDICATOR
         ====================================================== */}

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2">

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-[#06131d]/80 px-3 py-1 backdrop-blur-sm">

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

          <span className="text-[8px] font-medium uppercase tracking-[0.18em] text-emerald-300">
            City Operational
          </span>

        </div>

      </div>

    </div>
  );
};

export default DigitalTwinCity;