import React from "react";


interface CommercialBuildingProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: number;
}

export const CommercialBuilding: React.FC<CommercialBuildingProps> = ({
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
          MAIN COMMERCIAL BUILDING
         ===================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[0, 0.85, 0]}
      >
        <boxGeometry args={[1.65, 1.7, 1.3]} />

        <meshStandardMaterial
          color="#254b60"
          roughness={0.44}
          metalness={0.5}
          emissive="#06465b"
          emissiveIntensity={0.11}
        />
      </mesh>

      {/* =====================================================
          LOWER RETAIL PODIUM
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.32, 0.08]}
      >
        <boxGeometry args={[1.85, 0.62, 1.48]} />

        <meshStandardMaterial
          color="#315b6e"
          roughness={0.5}
          metalness={0.42}
          emissive="#07536a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP CAP
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 1.76, 0]}
      >
        <boxGeometry args={[1.76, 0.12, 1.4]} />

        <meshStandardMaterial
          color="#3a6678"
          roughness={0.38}
          metalness={0.52}
          emissive="#08657b"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* =====================================================
          FRONT SHOP WINDOWS
         ===================================================== */}

      {[-0.62, -0.21, 0.21, 0.62].map((x) => (
        <mesh
          key={`shop-${x}`}
          position={[x, 0.38, 0.74]}
        >
          <boxGeometry args={[0.31, 0.34, 0.025]} />

          <meshStandardMaterial
            color="#4bdff2"
            emissive="#16bcd7"
            emissiveIntensity={0.48}
            metalness={0.38}
            roughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* =====================================================
          UPPER FRONT WINDOWS
         ===================================================== */}

      {[-0.55, 0, 0.55].map((x) => (
        <React.Fragment key={`upper-${x}`}>
          {[1.08, 1.48].map((y) => (
            <mesh
              key={`${x}-${y}`}
              position={[x, y, 0.656]}
            >
              <boxGeometry args={[0.34, 0.24, 0.025]} />

              <meshStandardMaterial
                color="#3ed1e8"
                emissive="#0faecb"
                emissiveIntensity={0.38}
                transparent
                opacity={0.64}
              />
            </mesh>
          ))}
        </React.Fragment>
      ))}

      {/* =====================================================
          SIDE WINDOWS
         ===================================================== */}

      {[0.38, 0.92, 1.48].map((y) => (
        <mesh
          key={`side-${y}`}
          position={[0.836, y, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[0.62, 0.25, 0.025]} />

          <meshStandardMaterial
            color="#36c9df"
            emissive="#0b9eb9"
            emissiveIntensity={0.32}
            transparent
            opacity={0.58}
          />
        </mesh>
      ))}

      {/* =====================================================
          MAIN ENTRANCE
         ===================================================== */}

      <mesh
        position={[0, 0.38, 0.755]}
      >
        <boxGeometry args={[0.42, 0.48, 0.04]} />

        <meshStandardMaterial
          color="#7aefff"
          emissive="#25d3ed"
          emissiveIntensity={0.58}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* =====================================================
          ENTRANCE CANOPY
         ===================================================== */}

      <mesh
        castShadow
        position={[0, 0.66, 0.92]}
      >
        <boxGeometry args={[0.75, 0.06, 0.32]} />

        <meshStandardMaterial
          color="#416f80"
          roughness={0.38}
          metalness={0.55}
        />
      </mesh>

      {/* =====================================================
          SIDE SIGN / DIGITAL PANEL
         ===================================================== */}

      <mesh
        position={[0.86, 0.82, 0.38]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxGeometry args={[0.48, 0.28, 0.025]} />

        <meshBasicMaterial
          color="#14d9ef"
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP UTILITY UNITS
         ===================================================== */}

      <mesh
        castShadow
        position={[-0.42, 1.98, -0.18]}
      >
        <boxGeometry args={[0.3, 0.28, 0.3]} />

        <meshStandardMaterial
          color="#31596a"
          roughness={0.56}
          metalness={0.34}
        />
      </mesh>

      <mesh
        castShadow
        position={[0.38, 1.96, -0.18]}
      >
        <boxGeometry args={[0.25, 0.24, 0.25]} />

        <meshStandardMaterial
          color="#2c5366"
          roughness={0.56}
          metalness={0.34}
        />
      </mesh>

      {/* =====================================================
          ROOFTOP DIGITAL BEACON
         ===================================================== */}

      <mesh
        position={[0, 2.12, -0.22]}
      >
        <cylinderGeometry args={[0.035, 0.035, 0.32, 10]} />

        <meshBasicMaterial color="#69eaff" />
      </mesh>

      {/* =====================================================
          BUILDING BASE
         ===================================================== */}

      <mesh
        receiveShadow
        position={[0, 0.04, 0]}
      >
        <boxGeometry args={[1.94, 0.08, 1.58]} />

        <meshStandardMaterial
          color="#16394c"
          roughness={0.7}
          metalness={0.26}
        />
      </mesh>
    </group>
  );
};

export default CommercialBuilding;
