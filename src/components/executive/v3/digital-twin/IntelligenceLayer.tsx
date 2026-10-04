import React, { useState } from "react";
import { Html } from "@react-three/drei";
import {
  AlertTriangle,
  BriefcaseBusiness,
  Building2,
  MapPin,
  TrendingUp,
} from "lucide-react";

/* ============================================================
   DAIP ENTERPRISE V3
   DIGITAL TWIN — INTELLIGENCE LAYER

   Phase 2:
   - Real 3D intelligence markers
   - Marker hover state
   - Marker selection
   - Executive intelligence context
   - Foundation for drill-down actions

   IMPORTANT:
   This layer does NOT alter the city geometry.
   ============================================================ */

type IntelligenceType =
  | "zone"
  | "ward"
  | "project"
  | "operational";

interface IntelligenceMarkerData {
  id: string;
  type: IntelligenceType;
  label: string;
  subtitle: string;
  position: [number, number, number];
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  headline: string;
  metric: string;
  metricLabel: string;
}

/* ============================================================
   INTELLIGENCE DATA
   ============================================================ */

const INTELLIGENCE_MARKERS: IntelligenceMarkerData[] = [
  {
    id: "zone-4",
    type: "zone",
    label: "ZONE 4",
    subtitle: "Enforcement",
    position: [-4.4, 0.85, -4.4],
    color: "#f87171",
    bgColor: "rgba(248,113,113,0.10)",
    borderColor: "rgba(248,113,113,0.28)",
    icon: <AlertTriangle size={12} />,
    headline: "Encroachment attention",
    metric: "12",
    metricLabel: "critical encroachments",
  },

  {
    id: "ward-18",
    type: "ward",
    label: "WARD 18",
    subtitle: "Residential",
    position: [4.4, 0.85, -4.4],
    color: "#fb923c",
    bgColor: "rgba(251,146,60,0.10)",
    borderColor: "rgba(251,146,60,0.28)",
    icon: <Building2 size={12} />,
    headline: "Residential planning",
    metric: "82%",
    metricLabel: "projects on schedule",
  },

  {
    id: "project-32",
    type: "project",
    label: "PROJECT 32",
    subtitle: "Active Works",
    position: [4.4, 0.85, 4.4],
    color: "#60a5fa",
    bgColor: "rgba(96,165,250,0.10)",
    borderColor: "rgba(96,165,250,0.28)",
    icon: <BriefcaseBusiness size={12} />,
    headline: "Active development project",
    metric: "82%",
    metricLabel: "project progress",
  },

  {
    id: "ward-7",
    type: "operational",
    label: "WARD 7",
    subtitle: "Operational",
    position: [-4.4, 0.85, 4.4],
    color: "#34d399",
    bgColor: "rgba(52,211,153,0.10)",
    borderColor: "rgba(52,211,153,0.28)",
    icon: <TrendingUp size={12} />,
    headline: "City operations normal",
    metric: "98%",
    metricLabel: "city health",
  },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

const IntelligenceLayer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      {INTELLIGENCE_MARKERS.map((marker) => (
        <IntelligenceMarker
          key={marker.id}
          marker={marker}
          selected={selectedId === marker.id}
          onSelect={() =>
            setSelectedId((current) =>
              current === marker.id ? null : marker.id
            )
          }
        />
      ))}
    </>
  );
};

export default IntelligenceLayer;

/* ============================================================
   MARKER
   ============================================================ */

interface IntelligenceMarkerProps {
  marker: IntelligenceMarkerData;
  selected: boolean;
  onSelect: () => void;
}

const IntelligenceMarker: React.FC<IntelligenceMarkerProps> = ({
  marker,
  selected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={marker.position}>
      {/* ======================================================
          3D SIGNAL PULSE
         ====================================================== */}

      <mesh
        position={[0, -0.72, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry
          args={[
            selected ? 0.48 : hovered ? 0.38 : 0.28,
            selected ? 0.54 : hovered ? 0.43 : 0.32,
            32,
          ]}
        />

        <meshBasicMaterial
          color={marker.color}
          transparent
          opacity={selected ? 0.55 : hovered ? 0.38 : 0.22}
        />
      </mesh>

      {/* ======================================================
          3D MARKER CORE
         ====================================================== */}

      <mesh position={[0, -0.55, 0]}>
        <sphereGeometry
          args={[
            selected ? 0.13 : hovered ? 0.115 : 0.09,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color={marker.color}
          emissive={marker.color}
          emissiveIntensity={selected ? 1.8 : hovered ? 1.35 : 0.9}
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>

      {/* ======================================================
          EXECUTIVE MARKER LABEL
         ====================================================== */}

      <Html
        position={[0, 0.35, 0]}
        center
        distanceFactor={10}
        zIndexRange={[40, 0]}
        style={{
          pointerEvents: "auto",
        }}
      >
        <button
          type="button"
          onClick={onSelect}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group relative select-none outline-none"
          aria-label={`Open intelligence for ${marker.label}`}
        >
          {/* ==================================================
              LABEL
             ================================================== */}

          <div
            className="flex items-center gap-1.5 rounded-lg border px-2 py-1 backdrop-blur-md transition-all duration-200"
            style={{
              backgroundColor: marker.bgColor,
              borderColor: marker.borderColor,
              boxShadow: selected
                ? `0 0 22px ${marker.color}55`
                : hovered
                  ? `0 0 16px ${marker.color}40`
                  : "none",
              transform: selected ? "scale(1.06)" : "scale(1)",
            }}
          >
            {/* signal */}
            <span
              className="flex h-5 w-5 items-center justify-center rounded-md"
              style={{
                color: marker.color,
                backgroundColor: `${marker.color}14`,
              }}
            >
              {marker.icon}
            </span>

            {/* text */}
            <span className="text-left">
              <span
                className="block whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: marker.color }}
              >
                {marker.label}
              </span>

              <span className="block whitespace-nowrap text-[7px] text-slate-500">
                {marker.subtitle}
              </span>
            </span>

            <MapPin
              size={10}
              className="ml-1 text-slate-500 transition-colors group-hover:text-slate-300"
            />
          </div>

          {/* ==================================================
              SELECTED INTELLIGENCE CARD
             ================================================== */}

          {selected && (
            <div
              className="absolute left-1/2 top-[calc(100%+10px)] w-[210px] -translate-x-1/2 rounded-xl border bg-[#06111f]/95 p-3 text-left shadow-2xl backdrop-blur-xl"
              style={{
                borderColor: marker.borderColor,
              }}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Executive Intelligence
                  </div>

                  <div className="mt-1 text-[11px] font-semibold text-white">
                    {marker.headline}
                  </div>
                </div>

                <span
                  className="h-2 w-2 flex-shrink-0 rounded-full"
                  style={{
                    backgroundColor: marker.color,
                    boxShadow: `0 0 10px ${marker.color}`,
                  }}
                />
              </div>

              <div className="flex items-end justify-between border-t border-white/5 pt-2">
                <div>
                  <div className="text-[8px] uppercase tracking-[0.14em] text-slate-600">
                    Current signal
                  </div>

                  <div
                    className="mt-0.5 text-[16px] font-semibold"
                    style={{ color: marker.color }}
                  >
                    {marker.metric}
                  </div>
                </div>

                <div className="max-w-[95px] text-right text-[8px] leading-relaxed text-slate-500">
                  {marker.metricLabel}
                </div>
              </div>
            </div>
          )}
        </button>
      </Html>
    </group>
  );
};