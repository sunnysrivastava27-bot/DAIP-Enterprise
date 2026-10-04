import React from "react";

interface CollegeBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const CollegeBuilding: React.FC<CollegeBuildingProps> = ({
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
          MAIN COLLEGE BLOCK
      ========================================================= */}

      <mesh castShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[1.45, 1.15, 1.05]} />

        <meshStandardMaterial
          color="#214b63"
          roughness={0.48}
          metalness={0.42}
          emissive="#075875"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =========================================================
          CENTRAL ACADEMIC WING
      ========================================================= */}

      <mesh castShadow position={[0, 1.22, 0]}>
        <boxGeometry args={[1.08, 0.22, 0.86]} />

        <meshStandardMaterial
          color="#2b5b72"
          roughness={0.44}
          metalness={0.46}
        />
      </mesh>

      {/* =========================================================
          LEFT WING
      ========================================================= */}

      <mesh castShadow position={[-0.72, 0.5, 0]}>
        <boxGeometry args={[0.34, 0.82, 0.88]} />

        <meshStandardMaterial
          color="#183e55"
          roughness={0.52}
          metalness={0.38}
        />
      </mesh>

      {/* =========================================================
          RIGHT WING
      ========================================================= */}

      <mesh castShadow position={[0.72, 0.5, 0]}>
        <boxGeometry args={[0.34, 0.82, 0.88]} />

        <meshStandardMaterial
          color="#183e55"
          roughness={0.52}
          metalness={0.38}
        />
      </mesh>

      {/* =========================================================
          ACADEMIC WINDOWS — FRONT
      ========================================================= */}

      {[-0.48, -0.16, 0.16, 0.48].map((x) => (
        <mesh
          key={`front-${x}`}
          position={[x, 0.72, 0.533]}
        >
          <boxGeometry args={[0.16, 0.22, 0.025]} />

          <meshBasicMaterial color="#42dff0" />
        </mesh>
      ))}

      {/* =========================================================
          SECOND ROW WINDOWS
      ========================================================= */}

      {[-0.48, -0.16, 0.16, 0.48].map((x) => (
        <mesh
          key={`upper-${x}`}
          position={[x, 1.03, 0.533]}
        >
          <boxGeometry args={[0.16, 0.16, 0.025]} />

          <meshBasicMaterial color="#2dc9df" />
        </mesh>
      ))}

      {/* =========================================================
          SIDE WINDOWS
      ========================================================= */}

      {[-0.22, 0.05, 0.32].map((z) => (
        <mesh
          key={`side-${z}`}
          position={[-0.895, 0.68, z]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.15, 0.2, 0.025]} />

          <meshBasicMaterial color="#39d7e9" />
        </mesh>
      ))}

      {/* =========================================================
          COLLEGE ENTRANCE
      ========================================================= */}

      <mesh position={[0, 0.42, 0.545]}>
        <boxGeometry args={[0.32, 0.42, 0.06]} />

        <meshBasicMaterial
          color="#6beaff"
          transparent
          opacity={0.62}
        />
      </mesh>

      {/* =========================================================
          ENTRANCE CANOPY
      ========================================================= */}

      <mesh position={[0, 0.67, 0.65]}>
        <boxGeometry args={[0.58, 0.06, 0.26]} />

        <meshStandardMaterial
          color="#2c637b"
          metalness={0.5}
          roughness={0.36}
        />
      </mesh>

      {/* =========================================================
          ROOFTOP ACADEMIC FEATURE
      ========================================================= */}

      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[0.42, 0.16, 0.38]} />

        <meshStandardMaterial
          color="#32677d"
          roughness={0.46}
          metalness={0.42}
        />
      </mesh>

      {/* =========================================================
          ROOFTOP COMMUNICATION MAST
      ========================================================= */}

      <mesh position={[0, 1.72, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.38, 10]} />

        <meshBasicMaterial color="#6deaff" />
      </mesh>

      {/* =========================================================
          COLLEGE COURTYARD BASE
      ========================================================= */}

      <mesh
        receiveShadow
        position={[0, 0.045, 0]}
      >
        <boxGeometry args={[2.05, 0.08, 1.62]} />

        <meshStandardMaterial
          color="#153b4e"
          roughness={0.74}
          metalness={0.24}
        />
      </mesh>

      {/* =========================================================
          COURTYARD GREEN
      ========================================================= */}

      <mesh
        position={[0, 0.09, 0.82]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.15, 0.32]} />

        <meshStandardMaterial
          color="#07594c"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
};

export default CollegeBuilding;