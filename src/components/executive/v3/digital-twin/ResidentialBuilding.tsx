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
          MAIN RESIDENTIAL MASS
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 0.9, 0]}
      >
        <boxGeometry args={[1.35, 1.8, 1.15]} />

        <meshStandardMaterial
          color="#294b61"
          roughness={0.58}
          metalness={0.32}
          emissive="#06394d"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* =====================================================
          ROOF / TOP SLAB
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 1.86, 0]}
      >
        <boxGeometry args={[1.45, 0.10, 1.25]} />

        <meshStandardMaterial
          color="#365d72"
          roughness={0.48}
          metalness={0.38}
          emissive="#07516a"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* =====================================================
          FRONT WINDOW GRID
         ===================================================== */}

      {[0.48, 0.02, -0.44].map((y) => (
        <React.Fragment key={y}>
          {[-0.38, 0, 0.38].map((x) => (
            <mesh
              key={`${x}-${y}`}
              position={[x, y + 0.15, 0.586]}
            >
              <boxGeometry args={[0.18, 0.22, 0.025]} />

              <meshStandardMaterial
                color="#55d8ef"
                emissive="#1ab9d8"
                emissiveIntensity={0.42}
                transparent
                opacity={0.72}
              />
            </mesh>
          ))}
        </React.Fragment>
      ))}

      {/* =====================================================
          SIDE WINDOWS
         ===================================================== */}

      {[0.48, 0.02, -0.44].map((y) => (
        <mesh
          key={`side-${y}`}
          position={[0.686, y + 0.15, 0.05]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.18, 0.22, 0.025]} />

          <meshStandardMaterial
            color="#42c9e3"
            emissive="#159dbb"
            emissiveIntensity={0.32}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}

      {/* =====================================================
          BALCONY SLABS
         ===================================================== */}

      {[0.47, -0.01, -0.49].map((y) => (
        <mesh
          key={`balcony-${y}`}
          castShadow
          position={[0, y, 0.66]}
        >
          <boxGeometry args={[1.48, 0.06, 0.22]} />

          <meshStandardMaterial
            color="#3b6578"
            roughness={0.55}
            metalness={0.28}
          />
        </mesh>
      ))}

      {/* =====================================================
          CENTRAL ENTRANCE
         ===================================================== */}

      <mesh
        position={[0, 0.18, 0.595]}
      >
        <boxGeometry args={[0.28, 0.45, 0.035]} />

        <meshStandardMaterial
          color="#6deaff"
          emissive="#1bc6e5"
          emissiveIntensity={0.45}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* =====================================================
          BUILDING BASE
         ===================================================== */}

      <mesh
        receiveShadow
        position={[0, 0.04, 0]}
      >
        <boxGeometry args={[1.55, 0.08, 1.35]} />

        <meshStandardMaterial
          color="#17394d"
          roughness={0.72}
          metalness={0.24}
        />
      </mesh>

      {/* =====================================================
          SMALL ROOFTOP UTILITY
         ===================================================== */}

      <mesh
        castShadow
        position={[0.32, 2.04, -0.18]}
      >
        <boxGeometry args={[0.25, 0.25, 0.25]} />

        <meshStandardMaterial
          color="#31586c"
          roughness={0.62}
          metalness={0.28}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP ANTENNA
         ===================================================== */}

      <mesh
        position={[0.32, 2.30, -0.18]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.42, 8]} />

        <meshBasicMaterial color="#67e8f9" />
      </mesh>
    </group>
  );
};

export default ResidentialBuilding;