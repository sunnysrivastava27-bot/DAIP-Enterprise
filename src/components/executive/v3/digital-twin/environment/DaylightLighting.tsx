import React from "react";

/**
 * ============================================================
 * DAIP DIGITAL TWIN
 * NATURAL DAYLIGHT SYSTEM
 *
 * One controlled daylight system.
 * ============================================================
 */

const DaylightLighting: React.FC = () => {
  return (
    <>
      {/* ======================================================
          NATURAL SKY / AMBIENT LIGHT
         ====================================================== */}

      <hemisphereLight
        args={["#b9dcff", "#66745b", 1.15]}
      />

      {/* ======================================================
          MAIN SUN
         ====================================================== */}

      <directionalLight
        position={[18, 30, 16]}
        intensity={2.15}
        color="#fff4dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.00015}
        shadow-normalBias={0.025}
      />

      {/* ======================================================
          COOL ENVIRONMENTAL FILL
         ====================================================== */}

      <directionalLight
        position={[-18, 14, -16]}
        intensity={0.28}
        color="#c7e3f7"
      />
    </>
  );
};

export default DaylightLighting;