import { memo } from "react";

import ProjectMarker from "../markers/ProjectMarker";
import { projects } from "../data/projects";

function ProjectLayer() {
  return (
    <g id="project-layer">

      {/* Project Markers */}
      {projects.map((project) => (
        <ProjectMarker
          key={project.id}
          project={project}
        />
      ))}

    </g>
  );
}

export default memo(ProjectLayer);