import React from "react";

interface HospitalBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

const HospitalBuilding: React.FC<HospitalBuildingProps> = ({
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
          MAIN HOSPITAL MASS
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 1.0, 0]}
      >
        <boxGeometry args={[1.75, 2.0, 1.35]} />

        <meshStandardMaterial
          color="#21465c"
          roughness={0.42}
          metalness={0.48}
          emissive="#06465d"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* =====================================================
          CENTRAL FRONT TOWER
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 1.72, 0.04]}
      >
        <boxGeometry args={[0.82, 1.45, 1.42]} />

        <meshStandardMaterial
          color="#2b5368"
          roughness={0.38}
          metalness={0.5}
          emissive="#07516a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =====================================================
          SIDE WINGS
         ===================================================== */}

      <mesh
        castShadow
        position={[-1.0, 0.68, 0]}
      >
        <boxGeometry args={[0.42, 1.25, 1.18]} />

        <meshStandardMaterial
          color="#294f64"
          roughness={0.44}
          metalness={0.44}
          emissive="#06435a"
          emissiveIntensity={0.08}
        />
      </mesh>

      <mesh
        castShadow
        position={[1.0, 0.68, 0]}
      >
        <boxGeometry args={[0.42, 1.25, 1.18]} />

        <meshStandardMaterial
          color="#294f64"
          roughness={0.44}
          metalness={0.44}
          emissive="#06435a"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* =====================================================
          ROOF CAP
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 2.04, 0]}
      >
        <boxGeometry args={[1.86, 0.12, 1.46]} />

        <meshStandardMaterial
          color="#386579"
          roughness={0.36}
          metalness={0.5}
          emissive="#086179"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =====================================================
          FRONT WINDOW BANDS
         ===================================================== */}

      {[1.78, 1.38, 0.98, 0.58].map((y) => (
        <mesh
          key={`front-window-${y}`}
          position={[0, y, 0.686]}
        >
          <boxGeometry args={[1.34, 0.22, 0.025]} />

          <meshStandardMaterial
            color="#55dff1"
            emissive="#12bdd8"
            emissiveIntensity={0.42}
            metalness={0.42}
            roughness={0.2}
            transparent
            opacity={0.66}
          />
        </mesh>
      ))}

      {/* =====================================================
          FRONT WINDOW DIVIDERS
         ===================================================== */}

      {[-0.48, 0, 0.48].map((x) => (
        <mesh
          key={`front-divider-${x}`}
          position={[x, 1.18, 0.702]}
        >
          <boxGeometry args={[0.035, 1.38, 0.035]} />

          <meshBasicMaterial color="#68e8f5" />
        </mesh>
      ))}

      {/* =====================================================
          SIDE WINDOWS
         ===================================================== */}

      {[1.78, 1.38, 0.98, 0.58].map((y) => (
        <mesh
          key={`side-window-${y}`}
          position={[0.886, y, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.82, 0.22, 0.025]} />

          <meshStandardMaterial
            color="#42cde3"
            emissive="#0da8c4"
            emissiveIntensity={0.32}
            transparent
            opacity={0.58}
          />
        </mesh>
      ))}

      {/* =====================================================
          HOSPITAL ENTRANCE
         ===================================================== */}

      <mesh
        position={[0, 0.38, 0.72]}
      >
        <boxGeometry args={[0.46, 0.55, 0.04]} />

        <meshStandardMaterial
          color="#7af0ff"
          emissive="#25d5ed"
          emissiveIntensity={0.62}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* =====================================================
          ENTRANCE CANOPY
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.68, 0.91]}
      >
        <boxGeometry args={[0.82, 0.07, 0.34]} />

        <meshStandardMaterial
          color="#416f82"
          roughness={0.36}
          metalness={0.54}
        />
      </mesh>

      {/* =====================================================
          HOSPITAL CROSS
         ===================================================== */}

      <mesh
        position={[0, 2.28, 0.73]}
      >
        <boxGeometry args={[0.28, 0.08, 0.035]} />

        <meshBasicMaterial color="#55eaff" />
      </mesh>

      <mesh
        position={[0, 2.28, 0.73]}
      >
        <boxGeometry args={[0.08, 0.28, 0.035]} />

        <meshBasicMaterial color="#55eaff" />
      </mesh>

      {/* =====================================================
          ROOFTOP MECHANICAL UNIT
         ===================================================== */}

      <mesh
        castShadow
        position={[-0.45, 2.27, -0.22]}
      >
        <boxGeometry args={[0.3, 0.3, 0.3]} />

        <meshStandardMaterial
          color="#31596c"
          roughness={0.56}
          metalness={0.36}
        />
      </mesh>

      <mesh
        castShadow
        position={[0.42, 2.25, -0.2]}
      >
        <boxGeometry args={[0.26, 0.26, 0.26]} />

        <meshStandardMaterial
          color="#2c5367"
          roughness={0.56}
          metalness={0.34}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP ANTENNA
         ===================================================== */}

      <mesh
        position={[0.42, 2.62, -0.2]}
      >
        <cylinderGeometry args={[0.018, 0.018, 0.48, 8]} />

        <meshBasicMaterial color="#69eaff" />
      </mesh>

      {/* =====================================================
          BUILDING BASE
         ===================================================== */}

      <mesh
        receiveShadow
        position={[0, 0.04, 0]}
      >
        <boxGeometry args={[2.08, 0.08, 1.62]} />

        <meshStandardMaterial
          color="#15384c"
          roughness={0.7}
          metalness={0.26}
        />
      </mesh>
    </group>
  );
};

export default HospitalBuilding;