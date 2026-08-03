import GISHeader from "./gis/GISHeader";
import GISControls from "./gis/GISControls";
import GISMap from "./gis/GISMap";
import GISLegend from "./gis/GISLegend";
import GISStats from "./gis/GISStats";

export default function GISPanel() {
  return (
    <div
      className="bg-[#0B1E33] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
      style={{ height: 560 }}
    >
      <GISHeader />

      <GISControls />

      <div className="relative flex-1">

        <GISMap />

        {/* Floating Legend */}
        <div className="absolute bottom-4 left-4 z-20">
          <GISLegend />
        </div>

      </div>

      <GISStats />
    </div>
  );
}