import React from "react";
import { Sky } from "@react-three/drei";

import KanpurBuilding3DEngine from "./buildings/KanpurBuilding3DEngine";
import KanpurRoad3DEngine from "./infrastructure/KanpurRoad3DEngine";

/* ============================================================
   DAIP REAL CITY ENVIRONMENT
   ------------------------------------------------------------
   GOOGLE PHOTOREALISTIC CITY SURFACE MODE

   IMPORTANT:
   - Google Photorealistic Tiles are the physical city surface.
   - No synthetic city ground plane.
   - No synthetic civic-core circle.
   - No temporary neighborhood park planes.
   - Roads and buildings remain untouched.
   - KanpurBuilding3DEngine.tsx is NOT modified.
   - KanpurRoad3DEngine.tsx is NOT modified.
============================================================ */


/* ============================================================
   SKY
============================================================ */

const RealisticSky: React.FC = () => {
  return (
    <Sky
      distance={450000}
      sunPosition={[80, 55, 100]}
      inclination={0.48}
      azimuth={0.25}
      turbidity={2.8}
      rayleigh={1.8}
      mieCoefficient={0.003}
      mieDirectionalG={0.75}
    />
  );
};


/* ============================================================
   DAYLIGHT
============================================================ */

const DaylightLighting: React.FC = () => {
  return (
    <>
      <hemisphereLight
        args={[
          "#b9dcff",
          "#68785f",
          1.75,
        ]}
      />

      <directionalLight
        position={[28, 40, 22]}
        intensity={3}
        color="#fff3d4"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-180}
        shadow-camera-right={180}
        shadow-camera-top={180}
        shadow-camera-bottom={-180}
        shadow-bias={-0.00015}
        shadow-normalBias={0.025}
      />

      <directionalLight
        position={[-25, 18, -20]}
        intensity={0.55}
        color="#c4e1ff"
      />
    </>
  );
};


/* ============================================================
   REAL CITY ENVIRONMENT
   ------------------------------------------------------------
   Google Photorealistic Tiles now provide the physical
   city surface.

   This component deliberately contains NO synthetic ground
   geometry because that geometry would sit underneath and
   show through gaps in the Google tiles.
============================================================ */

const RealCityEnvironment: React.FC = () => {
  return (
    <group name="kanpur-real-city-environment">

      {/* ======================================================
          ENVIRONMENT LIGHTING ONLY
         ====================================================== */}

      <group name="kanpur-environment-lighting">
        <RealisticSky />
        <DaylightLighting />
      </group>


      {/* ======================================================
          REAL GIS KANPUR ROAD NETWORK

          Authoritative DAIP road layer.

          DO NOT MODIFY THIS COMPONENT HERE.
         ====================================================== */}

      <KanpurRoad3DEngine />


      {/* ======================================================
          EXISTING KANPUR BUILDING ENGINE

          Kept untouched.
         ====================================================== */}

      <KanpurBuilding3DEngine />

    </group>
  );
};

export default RealCityEnvironment;
