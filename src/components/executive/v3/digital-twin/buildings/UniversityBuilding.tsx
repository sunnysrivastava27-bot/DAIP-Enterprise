import React from "react";

interface UniversityBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const UniversityBuilding: React.FC<UniversityBuildingProps> = ({
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
          MAIN UNIVERSITY COMPLEX
      ========================================================= */}

      <mesh castShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[1.9, 1.25, 1.25]} />

        <meshStandardMaterial
          color="#1c465d"
          roughness={0.46}
          metalness={0.44}
          emissive="#075875"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =========================================================
          CENTRAL ACADEMIC TOWER
      ========================================================= */}

      <mesh castShadow position={[0, 1.48, 0]}>
        <boxGeometry args={[0.78, 0.55, 0.78]} />

        <meshStandardMaterial
          color="#28576e"
          roughness={0.42}
          metalness={0.48}
          emissive="#086581"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =========================================================
          LEFT ACADEMIC WING
      ========================================================= */}

      <mesh castShadow position={[-1.0, 0.62, 0]}>
        <boxGeometry args={[0.38, 1.0, 1.05]} />

        <meshStandardMaterial
          color="#173d54"
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* =========================================================
          RIGHT ACADEMIC WING
      ========================================================= */}

      <mesh castShadow position={[1.0, 0.62, 0]}>
        <boxGeometry args={[0.38, 1.0, 1.05]} />

        <meshStandardMaterial
          color="#173d54"
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* =========================================================
          CENTRAL UNIVERSITY ENTRANCE
      ========================================================= */}

      <mesh position={[0, 0.48, 0.64]}>
        <boxGeometry args={[0.42, 0.55, 0.07]} />

        <meshBasicMaterial
          color="#6beaff"
          transparent
          opacity={0.62}
        />
      </mesh>

      {/* =========================================================
          ENTRANCE CANOPY
      ========================================================= */}

      <mesh position={[0, 0.77, 0.78]}>
        <boxGeometry args={[0.72, 0.07, 0.3]} />

        <meshStandardMaterial
          color="#32657b"
          roughness={0.38}
          metalness={0.48}
        />
      </mesh>

      {/* =========================================================
          FRONT WINDOWS
      ========================================================= */}

      {[-0.68, -0.34, 0.34, 0.68].map((x) => (
        <mesh
          key={`front-lower-${x}`}
          position={[x, 0.64, 0.638]}
        >
          <boxGeometry args={[0.18, 0.22, 0.025]} />

          <meshBasicMaterial color="#38d9eb" />
        </mesh>
      ))}

      {/* =========================================================
          SECOND FLOOR WINDOWS
      ========================================================= */}

      {[-0.68, -0.34, 0.34, 0.68].map((x) => (
        <mesh
          key={`front-upper-${x}`}
          position={[x, 1.02, 0.638]}
        >
          <boxGeometry args={[0.18, 0.2, 0.025]} />

          <meshBasicMaterial color="#2bc9df" />
        </mesh>
      ))}

      {/* =========================================================
          CENTRAL TOWER WINDOWS
      ========================================================= */}

      {[-0.22, 0.22].map((x) => (
        <mesh
          key={`tower-${x}`}
          position={[x, 1.48, 0.398]}
        >
          <boxGeometry args={[0.14, 0.22, 0.025]} />

          <meshBasicMaterial color="#4be1ef" />
        </mesh>
      ))}

      {/* =========================================================
          ROOFTOP UNIVERSITY FEATURE
      ========================================================= */}

      <mesh position={[0, 1.82, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />

        <meshStandardMaterial
          color="#326f88"
          roughness={0.32}
          metalness={0.58}
        />
      </mesh>

      {/* =========================================================
          UNIVERSITY COMMUNICATION MAST
      ========================================================= */}

      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.48, 10]} />

        <meshBasicMaterial color="#6deaff" />
      </mesh>

      {/* =========================================================
          UNIVERSITY SIDE WINDOWS
      ========================================================= */}

      {[-0.3, 0, 0.3].map((z) => (
        <mesh
          key={`left-side-${z}`}
          position={[-1.195, 0.72, z]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.16, 0.22, 0.025]} />

          <meshBasicMaterial color="#32d4e7" />
        </mesh>
      ))}

      {/* =========================================================
          UNIVERSITY BASE
      ========================================================= */}

      <mesh
        receiveShadow
        position={[0, 0.045, 0]}
      >
        <boxGeometry args={[2.55, 0.09, 1.7]} />

        <meshStandardMaterial
          color="#15394c"
          roughness={0.72}
          metalness={0.24}
        />
      </mesh>

      {/* =========================================================
          UNIVERSITY FRONT LANDSCAPE
      ========================================================= */}

      <mesh
        position={[0, 0.095, 0.98]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.34, 24]} />

        <meshStandardMaterial
          color="#075b4d"
          roughness={0.9}
        />
      </mesh>

      {/* =========================================================
          UNIVERSITY DIGITAL BEACON
      ========================================================= */}

      <mesh position={[0, 2.38, 0]}>
        <sphereGeometry args={[0.045, 12, 8]} />

        <meshBasicMaterial color="#69eaff" />
      </mesh>
    </group>
  );
};

export default UniversityBuilding;