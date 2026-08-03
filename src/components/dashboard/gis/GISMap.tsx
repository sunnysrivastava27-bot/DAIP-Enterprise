import { useEffect, useRef, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import {
  Crosshair,
  LocateFixed,
  Map,
  Navigation,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import type { GISProject } from "./map/data/projects";
import { projects } from "./map/data/projects";

const KANPUR_CENTER: [number, number] = [26.4499, 80.3319];

const heatSpots = [
  { position: [26.472, 80.292] as [number, number], radius: 1800, intensity: 0.45 },
  { position: [26.438, 80.352] as [number, number], radius: 2400, intensity: 0.6 },
  { position: [26.509, 80.316] as [number, number], radius: 1400, intensity: 0.34 },
  { position: [26.412, 80.368] as [number, number], radius: 2200, intensity: 0.5 },
];

const roadLabels = [
  { label: "GT Road", position: [26.472, 80.289] as [number, number] },
  { label: "Ring Road", position: [26.431, 80.352] as [number, number] },
  { label: "Nawabganj Link", position: [26.512, 80.323] as [number, number] },
  { label: "Saraswati Colony", position: [26.398, 80.374] as [number, number] },
];

const roadPaths = [
  [
    [26.485, 80.286],
    [26.467, 80.303],
    [26.448, 80.332],
    [26.426, 80.368],
  ] as [number, number][],
  [
    [26.435, 80.364],
    [26.458, 80.344],
    [26.492, 80.321],
    [26.514, 80.311],
  ] as [number, number][],
  [
    [26.512, 80.311],
    [26.49, 80.298],
    [26.466, 80.289],
  ] as [number, number][],
];

function getMarkerClass(status: GISProject["status"]) {
  switch (status) {
    case "Completed":
      return "marker-completed";
    case "Running":
      return "marker-running";
    case "Delayed":
      return "marker-delayed";
    case "Critical":
      return "marker-critical";
    default:
      return "marker-running";
  }
}

function createMarkerIcon(status: GISProject["status"]) {
  return L.divIcon({
    html: `<span class="project-marker ${getMarkerClass(status)}"></span>`,
    className: "project-marker-wrapper",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

export default function GISMap() {
  const mapRef = useRef<L.Map | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showRoads, setShowRoads] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id ?? null);

  useEffect(() => {
    const timer = window.setTimeout(() => setSelectedProjectId(projects[0]?.id ?? null), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const zoomBy = (direction: 1 | -1) => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const nextZoom = Math.min(18, Math.max(8, map.getZoom() + direction));
    map.flyTo(map.getCenter(), nextZoom, { duration: 1.2, easeLinearity: 0.25 });
  };

  const resetView = () => {
    mapRef.current?.flyTo(KANPUR_CENTER, 12, { duration: 1.2, easeLinearity: 0.25 });
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#071524]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,.18) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,.12),transparent_70%)]" />

      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => zoomBy(1)}
          className="rounded-lg border border-slate-700 bg-slate-800/90 p-2 transition hover:bg-cyan-600"
        >
          <ZoomIn className="h-5 w-5 text-white" />
        </button>

        <button
          onClick={() => zoomBy(-1)}
          className="rounded-lg border border-slate-700 bg-slate-800/90 p-2 transition hover:bg-cyan-600"
        >
          <ZoomOut className="h-5 w-5 text-white" />
        </button>

        <button
          onClick={resetView}
          className="rounded-lg border border-slate-700 bg-slate-800/90 p-2 transition hover:bg-cyan-600"
        >
          <LocateFixed className="h-5 w-5 text-white" />
        </button>

        <button className="rounded-lg border border-slate-700 bg-slate-800/90 p-2 transition hover:bg-cyan-600">
          <Navigation className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-slate-900/90 px-3 py-2">
        <Map className="h-4 w-4 text-cyan-400" />
        <span className="text-xs font-medium text-cyan-300">Development Authority Zone</span>
      </div>

      <div className="absolute bottom-4 left-4 z-30 rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 text-sm text-slate-200 shadow-2xl">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
          Layer Controls
        </div>
        <label className="mb-2 flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={showHeatmap}
            onChange={() => setShowHeatmap((value) => !value)}
            className="rounded border-slate-600 bg-slate-800"
          />
          Heat Map
        </label>
        <label className="mb-2 flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={showRoads}
            onChange={() => setShowRoads((value) => !value)}
            className="rounded border-slate-600 bg-slate-800"
          />
          Road Network
        </label>
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={() => setShowLabels((value) => !value)}
            className="rounded border-slate-600 bg-slate-800"
          />
          Road Labels
        </label>
      </div>

      <div className="absolute inset-0">
        <MapContainer
          center={KANPUR_CENTER}
          zoom={12}
          scrollWheelZoom
          zoomControl={false}
          className="h-full w-full"
          zoomAnimation
          fadeAnimation
          markerZoomAnimation
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {showRoads &&
            roadPaths.map((path, index) => (
              <Polyline
                key={index}
                pathOptions={{ color: "#0f4c81", weight: 3.2, opacity: 0.8 }}
                positions={path}
              />
            ))}

          {showHeatmap &&
            heatSpots.map((spot, index) => (
              <Circle
                key={index}
                center={spot.position}
                radius={spot.radius}
                pathOptions={{
                  fillColor: "#f59e0b",
                  fillOpacity: spot.intensity * 0.24,
                  color: "rgba(245,158,11,0.18)",
                  weight: 1,
                  stroke: true,
                }}
              />
            ))}

          {projects.map((project) => {
            const isActive = selectedProjectId === project.id;
            return (
              <Marker
                key={project.id}
                position={[project.lat, project.lng]}
                icon={createMarkerIcon(project.status)}
                eventHandlers={{
                  mouseover: () => setSelectedProjectId(project.id),
                  click: () => setSelectedProjectId(project.id),
                }}
              >
                <Popup>
                  <div className="min-w-[240px] rounded-lg bg-slate-900 p-3 text-sm text-slate-200">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-white">{project.name}</h3>
                      <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                        {project.status}
                      </span>
                    </div>
                    <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full rounded-full bg-cyan-400" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div><span className="text-slate-300">Value:</span> {project.cost}</div>
                      <div><span className="text-slate-300">Progress:</span> {project.progress}%</div>
                      <div><span className="text-slate-300">Contractor:</span> {project.contractor}</div>
                      <div><span className="text-slate-300">Expected Completion:</span> {project.expectedCompletion}</div>
                      <div><span className="text-slate-300">Current Status:</span> {project.status}</div>
                    </div>
                    {isActive && (
                      <div className="mt-2 rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-300">
                        Active executive focus
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {showLabels &&
            roadLabels.map((label) => (
              <Marker
                key={label.label}
                position={label.position}
                icon={L.divIcon({
                  html: `<div class="road-label">${label.label}</div>`,
                  className: "road-label-wrapper",
                  iconSize: [80, 20],
                  iconAnchor: [40, 10],
                })}
              >
                <Tooltip permanent direction="top" offset={[0, -6]}>
                  {label.label}
                </Tooltip>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Crosshair className="h-7 w-7 text-cyan-400 opacity-70" />
      </div>

      <div className="absolute bottom-4 right-4 rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-slate-300">
        Lat : 26.4499° N
        <br />
        Lon : 80.3319° E
      </div>
    </div>
  );
}