import React from "react";

interface OfficeBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const OfficeBuilding: React.FC<OfficeBuildingProps> = ({
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
          MAIN OFFICE TOWER
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 1.35, 0]}
      >
        <boxGeometry args={[1.35, 2.7, 1.05]} />

        <meshStandardMaterial
          color="#1d3f58"
          roughness={0.38}
          metalness={0.58}
          emissive="#063b55"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* =====================================================
          SECONDARY SIDE MASS
         ===================================================== */}

      <mesh
        castShadow
        position={[0.78, 0.72, -0.05]}
      >
        <boxGeometry args={[0.28, 1.42, 0.88]} />

        <meshStandardMaterial
          color="#244c64"
          roughness={0.42}
          metalness={0.5}
          emissive="#07455f"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =====================================================
          ROOF CAP
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 2.76, 0]}
      >
        <boxGeometry args={[1.46, 0.12, 1.16]} />

        <meshStandardMaterial
          color="#38677d"
          roughness={0.34}
          metalness={0.55}
          emissive="#08627c"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* =====================================================
          FRONT GLASS WINDOW BANDS
         ===================================================== */}

      {[2.25, 1.72, 1.19, 0.66].map((y) => (
        <mesh
          key={`front-${y}`}
          position={[0, y, 0.536]}
        >
          <boxGeometry args={[1.05, 0.28, 0.025]} />

          <meshStandardMaterial
            color="#42d9ef"
            emissive="#0db9d8"
            emissiveIntensity={0.42}
            metalness={0.45}
            roughness={0.2}
            transparent
            opacity={0.62}
          />
        </mesh>
      ))}

      {/* =====================================================
          FRONT VERTICAL FRAME
         ===================================================== */}

      {[-0.42, 0, 0.42].map((x) => (
        <mesh
          key={`frame-${x}`}
          position={[x, 1.46, 0.552]}
        >
          <boxGeometry args={[0.035, 2.35, 0.035]} />

          <meshBasicMaterial color="#5de5f7" />
        </mesh>
      ))}

      {/* =====================================================
          SIDE GLASS WINDOWS
         ===================================================== */}

      {[2.25, 1.72, 1.19, 0.66].map((y) => (
        <mesh
          key={`side-${y}`}
          position={[0.686, y, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.78, 0.28, 0.025]} />

          <meshStandardMaterial
            color="#2fc4df"
            emissive="#0a9fbd"
            emissiveIntensity={0.34}
            transparent
            opacity={0.56}
          />
        </mesh>
      ))}

      {/* =====================================================
          CENTRAL ENTRANCE
         ===================================================== */}

      <mesh
        position={[0, 0.3, 0.555]}
      >
        <boxGeometry args={[0.34, 0.58, 0.04]} />

        <meshStandardMaterial
          color="#75efff"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* =====================================================
          ENTRANCE CANOPY
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.62, 0.72]}
      >
        <boxGeometry args={[0.62, 0.06, 0.34]} />

        <meshStandardMaterial
          color="#3a6c82"
          roughness={0.36}
          metalness={0.58}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP MECHANICAL UNIT
         ===================================================== */}

      <mesh
        castShadow
        position={[-0.32, 2.98, -0.16]}
      >
        <boxGeometry args={[0.32, 0.34, 0.32]} />

        <meshStandardMaterial
          color="#31596e"
          roughness={0.55}
          metalness={0.38}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP ANTENNA
         ===================================================== */}

      <mesh
        position={[-0.32, 3.32, -0.16]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.52, 8]} />

        <meshBasicMaterial color="#69eaff" />
      </mesh>

      {/* =====================================================
          BUILDING BASE
         ===================================================== */}

      <mesh
        receiveShadow
        position={[0, 0.04, 0]}
      >
        <boxGeometry args={[1.56, 0.08, 1.26]} />

        <meshStandardMaterial
          color="#15374b"
          roughness={0.7}
          metalness={0.28}
        />
      </mesh>
    </group>
  );
};

export default OfficeBuilding;