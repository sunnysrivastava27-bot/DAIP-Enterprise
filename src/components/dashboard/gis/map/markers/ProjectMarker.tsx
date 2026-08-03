import { memo } from "react";

import type { GISProject } from "../data/projects";
import useMap from "../../context/useMap";

interface ProjectMarkerProps {
  project: GISProject;
}

function getStatusColor(status: GISProject["status"]) {
  switch (status) {
    case "Running":
      return "#22c55e";

    case "Completed":
      return "#3b82f6";

    case "Delayed":
      return "#ef4444";

    case "Planned":
      return "#94a3b8";

    default:
      return "#64748b";
  }
}

function ProjectMarker({
  project,
}: ProjectMarkerProps) {

  const {
    selectedProject,
    selectProject,
  } = useMap();

  const selected =
    selectedProject?.id === project.id;

  const color = getStatusColor(project.status);

  return (

    <g
      transform={`translate(${project.location.x}, ${project.location.y})`}
      style={{
        cursor: "pointer",
      }}
      onClick={() => selectProject(project)}
    >

      {/* Outer Ring */}

      <circle
        r={selected ? 22 : 18}
        fill="white"
        stroke={color}
        strokeWidth={selected ? 4 : 3}
      />

      {/* Progress Circle */}

      <circle
        r="10"
        fill={color}
      />

      {/* Progress */}

      <text
        y="4"
        textAnchor="middle"
        fontSize="8"
        fontWeight="700"
        fill="white"
      >
        {project.progress}%
      </text>

      {/* Project Name */}

      <text
        y="34"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#ffffff"
      >
        {project.name}
      </text>

    </g>

  );

}

export default memo(ProjectMarker);