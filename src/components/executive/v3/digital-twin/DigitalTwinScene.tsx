import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import RealCityEnvironment from "./RealCityEnvironment";
import GooglePhotorealisticTiles from "./GooglePhotorealisticTiles";

interface DigitalTwinSceneProps {
  children: React.ReactNode;
}

const DigitalTwinScene: React.FC<DigitalTwinSceneProps> = ({
  children,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div
      className="h-full w-full min-h-0"
      style={{
        height: "100%",
        width: "100%",
        minHeight: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        camera={{
          position: [12, 10, 12],
          fov: 38,
          near: 0.05,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        {/* =====================================================
            EXISTING DAIP CITY ENVIRONMENT
            ===================================================== */}

        <RealCityEnvironment />

        {/* =====================================================
            GOOGLE PHOTOREALISTIC CITY
            CALIBRATION REMAINS UNCHANGED
            ===================================================== */}

        <GooglePhotorealisticTiles />

        {/* =====================================================
            DAIP INTELLIGENCE LAYERS
            ===================================================== */}

        {children}

        {/* =====================================================
            CHAIRMAN CAMERA CONTROL
            -----------------------------------------------------
            IMPORTANT:
            OrbitControls remain ACTIVE.

            No automatic movement.
            No cinematic tour.
            No FREE EXPLORE mode.
            No pointer-lock camera.
            ===================================================== */}

        <OrbitControls
          ref={controlsRef}
          makeDefault

          /* -----------------------------
             DAMPING
             ----------------------------- */
          enableDamping
          dampingFactor={0.08}

          /* -----------------------------
             ROTATION
             ----------------------------- */
          enableRotate
          rotateSpeed={0.65}

          /* -----------------------------
             PAN
             ----------------------------- */
          enablePan
          panSpeed={1.0}
          screenSpacePanning

          /* -----------------------------
             ZOOM
             ----------------------------- */
          enableZoom
          zoomSpeed={1.2}

          /*
           * Allow the Chairman to get
           * considerably closer to the
           * actual city surface.
           */
          minDistance={0.03}
          maxDistance={500}

          /* -----------------------------
             CAMERA ANGLE
             ----------------------------- */

          /*
           * Prevent going underneath
           * the Google city surface.
           */
          minPolarAngle={Math.PI * 0.05}
          maxPolarAngle={Math.PI * 0.94}

          /* -----------------------------
             IMPORTANT
             ----------------------------- */

          autoRotate={false}

          /*
           * Start by looking toward the
           * calibrated city origin.
           */
          target={[0, -0.555, 0]}
        />
      </Canvas>
    </div>
  );
};

export default DigitalTwinScene;