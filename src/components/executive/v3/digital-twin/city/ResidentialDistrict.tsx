import React from "react";

interface ResidentialBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const ResidentialBuilding: React.FC<ResidentialBuildingProps> = ({
  position = [0, 0, 0],
  scale = 1,
  rotation = 0,
}) => {
  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale}
    >
      {/* =====================================================
          MAIN BUILDING
      ===================================================== */}

      <mesh
        position={[0, 0.72, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.72, 1.44, 0.62]} />

        <meshStandardMaterial
          color="#173b52"
          roughness={0.55}
          metalness={0.38}
          emissive="#06354d"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP
      ===================================================== */}

      <mesh
        position={[0, 1.48, 0]}
        castShadow
      >
        <boxGeometry args={[0.76, 0.08, 0.66]} />

        <meshStandardMaterial
          color="#24556d"
          roughness={0.48}
          metalness={0.42}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP WATER / SERVICE TANK
      ===================================================== */}

      <mesh position={[0, 1.62, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.18, 10]} />

        <meshStandardMaterial
          color="#245d72"
          roughness={0.45}
          metalness={0.45}
        />
      </mesh>

      {/* =====================================================
          FRONT WINDOWS
      ===================================================== */}

      {[0.35, 0.72, 1.09].map((y) => (
        <mesh
          key={`front-${y}`}
          position={[0, y, 0.316]}
        >
          <boxGeometry args={[0.48, 0.16, 0.025]} />

          <meshBasicMaterial
            color="#5ee7ff"
            transparent
            opacity={0.72}
          />
        </mesh>
      ))}

      {/* =====================================================
          LEFT WINDOWS
      ===================================================== */}

      {[0.35, 0.72, 1.09].map((y) => (
        <mesh
          key={`left-${y}`}
          position={[-0.366, y, 0]}
        >
          <boxGeometry args={[0.025, 0.16, 0.42]} />

          <meshBasicMaterial
            color="#4fd8ee"
            transparent
            opacity={0.62}
          />
        </mesh>
      ))}

      {/* =====================================================
          RIGHT WINDOWS
      ===================================================== */}

      {[0.35, 0.72, 1.09].map((y) => (
        <mesh
          key={`right-${y}`}
          position={[0.366, y, 0]}
        >
          <boxGeometry args={[0.025, 0.16, 0.42]} />

          <meshBasicMaterial
            color="#4fd8ee"
            transparent
            opacity={0.62}
          />
        </mesh>
      ))}

      {/* =====================================================
          MAIN ENTRANCE
      ===================================================== */}

      <mesh
        position={[0, 0.18, 0.326]}
      >
        <boxGeometry args={[0.18, 0.32, 0.035]} />

        <meshBasicMaterial
          color="#79efff"
          transparent
          opacity={0.58}
        />
      </mesh>

      {/* =====================================================
          SMALL SIDE BALCONIES
      ===================================================== */}

      <mesh
        position={[-0.42, 0.78, 0.27]}
      >
        <boxGeometry args={[0.12, 0.035, 0.18]} />

        <meshStandardMaterial
          color="#2b6378"
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>

      <mesh
        position={[0.42, 1.02, 0.27]}
      >
        <boxGeometry args={[0.12, 0.035, 0.18]} />

        <meshStandardMaterial
          color="#2b6378"
          roughness={0.5}
          metalness={0.35}
        />
      </mesh>
    </group>
  );
};

export default ResidentialBuilding;