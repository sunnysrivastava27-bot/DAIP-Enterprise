import React from "react";

interface GovernmentBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const GovernmentBuilding: React.FC<GovernmentBuildingProps> = ({
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
          MAIN GOVERNMENT BUILDING
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 0.95, 0]}
      >
        <boxGeometry args={[1.8, 1.9, 1.4]} />

        <meshStandardMaterial
          color="#23485d"
          roughness={0.46}
          metalness={0.42}
          emissive="#06445a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =====================================================
          CENTRAL GOVERNMENT TOWER
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 1.7, -0.02]}
      >
        <boxGeometry args={[0.82, 1.55, 1.46]} />

        <meshStandardMaterial
          color="#2b5267"
          roughness={0.42}
          metalness={0.46}
          emissive="#075069"
          emissiveIntensity={0.09}
        />
      </mesh>

      {/* =====================================================
          SIDE WINGS
         ===================================================== */}

      <mesh
        castShadow
        position={[-0.98, 0.68, 0]}
      >
        <boxGeometry args={[0.42, 1.25, 1.22]} />

        <meshStandardMaterial
          color="#294e63"
          roughness={0.48}
          metalness={0.38}
          emissive="#064158"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh
        castShadow
        position={[0.98, 0.68, 0]}
      >
        <boxGeometry args={[0.42, 1.25, 1.22]} />

        <meshStandardMaterial
          color="#294e63"
          roughness={0.48}
          metalness={0.38}
          emissive="#064158"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* =====================================================
          ROOF CAP
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 2.0, 0]}
      >
        <boxGeometry args={[1.92, 0.12, 1.5]} />

        <meshStandardMaterial
          color="#3a6679"
          roughness={0.4}
          metalness={0.48}
          emissive="#086078"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =====================================================
          FRONT WINDOW BANDS
         ===================================================== */}

      {[1.7, 1.3, 0.9, 0.5].map((y) => (
        <mesh
          key={`front-window-${y}`}
          position={[0, y, 0.711]}
        >
          <boxGeometry args={[1.38, 0.22, 0.025]} />

          <meshStandardMaterial
            color="#51d9ed"
            emissive="#11b9d4"
            emissiveIntensity={0.38}
            metalness={0.4}
            roughness={0.22}
            transparent
            opacity={0.62}
          />
        </mesh>
      ))}

      {/* =====================================================
          FRONT VERTICAL FRAMES
         ===================================================== */}

      {[-0.48, 0, 0.48].map((x) => (
        <mesh
          key={`front-frame-${x}`}
          position={[x, 1.1, 0.728]}
        >
          <boxGeometry args={[0.035, 1.45, 0.035]} />

          <meshBasicMaterial color="#65e5f3" />
        </mesh>
      ))}

      {/* =====================================================
          SIDE WINDOWS
         ===================================================== */}

      {[1.7, 1.3, 0.9, 0.5].map((y) => (
        <mesh
          key={`side-window-${y}`}
          position={[0.911, y, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.84, 0.22, 0.025]} />

          <meshStandardMaterial
            color="#3fc9df"
            emissive="#0c9fbb"
            emissiveIntensity={0.3}
            transparent
            opacity={0.56}
          />
        </mesh>
      ))}

      {/* =====================================================
          MAIN GOVERNMENT ENTRANCE
         ===================================================== */}

      <mesh
        position={[0, 0.38, 0.73]}
      >
        <boxGeometry args={[0.44, 0.52, 0.04]} />

        <meshStandardMaterial
          color="#72ecfa"
          emissive="#20cde5"
          emissiveIntensity={0.55}
          transparent
          opacity={0.76}
        />
      </mesh>

      {/* =====================================================
          ENTRANCE CANOPY
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.67, 0.93]}
      >
        <boxGeometry args={[0.84, 0.07, 0.34]} />

        <meshStandardMaterial
          color="#416e80"
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* =====================================================
          GOVERNMENT EMBLEM / DIGITAL PANEL
         ===================================================== */}

      <mesh
        position={[0, 1.22, 0.735]}
      >
        <boxGeometry args={[0.28, 0.28, 0.025]} />

        <meshBasicMaterial
          color="#63e8f5"
          transparent
          opacity={0.58}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP GOVERNMENT FLAG / BEACON
         ===================================================== */}

      <mesh
        position={[0, 2.32, 0]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.56, 8]} />

        <meshBasicMaterial color="#69eaff" />
      </mesh>

      <mesh
        position={[0.14, 2.48, 0]}
      >
        <boxGeometry args={[0.26, 0.16, 0.025]} />

        <meshBasicMaterial
          color="#39d8ea"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP MECHANICAL UNITS
         ===================================================== */}

      <mesh
        castShadow
        position={[-0.45, 2.18, -0.22]}
      >
        <boxGeometry args={[0.3, 0.28, 0.3]} />

        <meshStandardMaterial
          color="#31586b"
          roughness={0.56}
          metalness={0.34}
        />
      </mesh>

      <mesh
        castShadow
        position={[0.43, 2.16, -0.2]}
      >
        <boxGeometry args={[0.26, 0.24, 0.26]} />

        <meshStandardMaterial
          color="#2c5265"
          roughness={0.56}
          metalness={0.32}
        />
      </mesh>

      {/* =====================================================
          BUILDING BASE
         ===================================================== */}

      <mesh
        receiveShadow
        position={[0, 0.04, 0]}
      >
        <boxGeometry args={[2.12, 0.08, 1.68]} />

        <meshStandardMaterial
          color="#15384c"
          roughness={0.7}
          metalness={0.26}
        />
      </mesh>
    </group>
  );
};

export default GovernmentBuilding;