import React, { memo, useMemo } from "react";

import useMap from "../context/useMap";

/* ==========================================================
   GIS Layers
========================================================== */

import BoundaryLayer from "./layers/BoundaryLayer";
import WaterLayer from "./layers/WaterLayer";
import ParkLayer from "./layers/ParkLayer";
import RoadLayer from "./layers/RoadLayer";
import SectorLayer from "./layers/SectorLayer";
import ProjectLayer from "./layers/ProjectLayer";

/* ==========================================================
   Layer Definition
========================================================== */

interface LayerDefinition {
  id: string;
  visible: boolean;
  zIndex: number;
  component: React.ReactNode;
}

/* ==========================================================
   Layer Manager
========================================================== */

function LayerManager() {
  const { layers } = useMap();

  const layerRegistry = useMemo<LayerDefinition[]>(() => {
    return [
      {
        id: "boundary",
        visible: true,
        zIndex: 1,
        component: <BoundaryLayer />,
      },

      {
        id: "water",
        visible: true,
        zIndex: 5,
        component: <WaterLayer />,
      },

      {
        id: "parks",
        visible: true,
        zIndex: 10,
        component: <ParkLayer />,
      },

      {
        id: "roads",
        visible: true,
        zIndex: 20,
        component: <RoadLayer />,
      },

      {
        id: "sectors",
        visible: true,
        zIndex: 30,
        component: <SectorLayer />,
      },

      /* ======================================================
         LIVE PROJECT LAYER
      ====================================================== */

      {
        id: "projects",
        visible: layers.projects,
        zIndex: 40,
        component: <ProjectLayer />,
      },

      /* ======================================================
         FUTURE LAYERS
      ====================================================== */

      // {
      //   id: "officers",
      //   visible: layers.officers,
      //   zIndex: 50,
      //   component: <OfficerLayer />,
      // },

      // {
      //   id: "complaints",
      //   visible: layers.complaints,
      //   zIndex: 60,
      //   component: <ComplaintLayer />,
      // },

      // {
      //   id: "revenue",
      //   visible: layers.revenue,
      //   zIndex: 70,
      //   component: <RevenueLayer />,
      // },

      // {
      //   id: "ai-hotspots",
      //   visible: layers.aiHotspots,
      //   zIndex: 80,
      //   component: <AIHotspotLayer />,
      // },
    ]
      .filter((layer) => layer.visible)
      .sort((a, b) => a.zIndex - b.zIndex);
  }, [layers]);

  return (
    <>
      {layerRegistry.map((layer) => (
        <React.Fragment key={layer.id}>
          {layer.component}
        </React.Fragment>
      ))}
    </>
  );
}

export default memo(LayerManager);