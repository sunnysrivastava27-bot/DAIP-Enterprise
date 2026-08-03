import BoundaryLayer from "./layers/BoundaryLayer";
import SectorLayer from "./layers/SectorLayer";
import RoadLayer from "./layers/RoadLayer";
import WaterLayer from "./layers/WaterLayer";
import ParkLayer from "./layers/ParkLayer";

export default function GISCanvas() {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      {/* Background */}
      <rect
        width="1200"
        height="800"
        fill="#071524"
      />

      {/* GIS Layers */}
      <BoundaryLayer />
      <WaterLayer />
      <ParkLayer />
      <RoadLayer />
      <SectorLayer />
    </svg>
  );
}