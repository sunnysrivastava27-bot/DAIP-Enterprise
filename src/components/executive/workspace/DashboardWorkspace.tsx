import React from "react";

import LeftWorkspace from "./LeftWorkspace";
import RightRail from "../RightRail";

const DashboardWorkspace: React.FC = () => {
  return (
    <section
      className="
        mt-6
        grid
        gap-6
        xl:grid-cols-[minmax(0,1fr)_380px]
      "
    >
      {/* ================= LEFT WORKSPACE ================= */}

      <LeftWorkspace />

      {/* ================= RIGHT RAIL ================= */}

      <RightRail />
    </section>
  );
};

export default DashboardWorkspace;