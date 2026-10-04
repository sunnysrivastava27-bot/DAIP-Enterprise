import React from "react";

interface SchoolBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const SchoolBuilding: React.FC<SchoolBuildingProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = 0,
}) => {
  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, rotation, 0]}
    >
      {/* =========================================================
          MAIN SCHOOL BLOCK
      ========================================================= */}

      <mesh castShadow position={[0, 0.48, 0]}>
        <boxGeometry args={[1.35, 0.82, 0.92]} />

        <meshStandardMaterial
          color="#1b4359"
          roughness={0.52}
          metalness={0.38}
          emissive="#075875"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* =========================================================
          UPPER SCHOOL WING
      ========================================================= */}

      <mesh castShadow position={[0, 0.94, 0]}>
        <boxGeometry args={[1.05, 0.12, 0.76]} />

        <meshStandardMaterial
          color="#28566c"
          roughness={0.46}
          metalness={0.42}
        />
      </mesh>

      {/* =========================================================
          LEFT CLASSROOM WING
      ========================================================= */}

      <mesh castShadow position={[-0.66, 0.42, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.8]} />

        <meshStandardMaterial
          color="#173b51"
          roughness={0.54}
          metalness={0.34}
        />
      </mesh>

      {/* =========================================================
          RIGHT CLASSROOM WING
      ========================================================= */}

      <mesh castShadow position={[0.66, 0.42, 0]}>
        <boxGeometry args={[0.25, 0.7, 0.8]} />

        <meshStandardMaterial
          color="#173b51"
          roughness={0.54}
          metalness={0.34}
        />
      </mesh>

      {/* =========================================================
          FRONT WINDOWS
      ========================================================= */}

      {[-0.45, -0.15, 0.15, 0.45].map((x) => (
        <mesh
          key={`lower-${x}`}
          position={[x, 0.48, 0.466]}
        >
          <boxGeometry args={[0.15, 0.18, 0.025]} />

          <meshBasicMaterial color="#39d7e9" />
        </mesh>
      ))}

      {/* =========================================================
          UPPER WINDOWS
      ========================================================= */}

      {[-0.38, 0, 0.38].map((x) => (
        <mesh
          key={`upper-${x}`}
          position={[x, 0.76, 0.466]}
        >
          <boxGeometry args={[0.16, 0.12, 0.025]} />

          <meshBasicMaterial color="#2dc9df" />
        </mesh>
      ))}

      {/* =========================================================
          SCHOOL ENTRANCE
      ========================================================= */}

      <mesh position={[0, 0.38, 0.475]}>
        <boxGeometry args={[0.26, 0.34, 0.06]} />

        <meshBasicMaterial
          color="#6beaff"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* =========================================================
          ENTRANCE CANOPY
      ========================================================= */}

      <mesh position={[0, 0.58, 0.57]}>
        <boxGeometry args={[0.48, 0.05, 0.22]} />

        <meshStandardMaterial
          color="#2d6178"
          roughness={0.4}
          metalness={0.42}
        />
      </mesh>

      {/* =========================================================
          ROOFTOP UTILITY
      ========================================================= */}

      <mesh position={[-0.38, 1.08, -0.12]}>
        <boxGeometry args={[0.2, 0.16, 0.2]} />

        <meshStandardMaterial
          color="#31596a"
          roughness={0.56}
          metalness={0.34}
        />
      </mesh>

      <mesh position={[0.36, 1.07, -0.12]}>
        <boxGeometry args={[0.18, 0.14, 0.18]} />

        <meshStandardMaterial
          color="#2c5366"
          roughness={0.56}
          metalness={0.34}
        />
      </mesh>

      {/* =========================================================
          SCHOOL DIGITAL BEACON
      ========================================================= */}

      <mesh position={[0, 1.25, -0.16]}>
        <cylinderGeometry args={[0.025, 0.025, 0.28, 10]} />

        <meshBasicMaterial color="#69eaff" />
      </mesh>

      {/* =========================================================
          SCHOOL BASE
      ========================================================= */}

      <mesh
        receiveShadow
        position={[0, 0.04, 0]}
      >
        <boxGeometry args={[1.7, 0.08, 1.25]} />

        <meshStandardMaterial
          color="#15394c"
          roughness={0.72}
          metalness={0.24}
        />
      </mesh>
    </group>
  );
};

export default SchoolBuilding;