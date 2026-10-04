import React, { useMemo } from "react";
import { Cylinder, Sphere, Box } from "@react-three/drei";

/* ============================================================
   DAIP DIGITAL TWIN — CITY PARK SYSTEM V2
   ------------------------------------------------------------
   PURPOSE
   - Realistic landscaped parks
   - Natural-looking trees
   - Grass variation
   - Walking paths
   - Bushes
   - Benches
   - Small park details

   IMPORTANT
   ------------------------------------------------------------
   Trees are deliberately NOT made from one spherical canopy.

   Each tree contains:
   - trunk
   - main branches
   - secondary branches
   - multiple irregular foliage masses

   This prevents the "balloon tree" appearance.
   ============================================================ */


/* ============================================================
   TREE
   ============================================================ */

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  variant?: number;
}

const Tree: React.FC<TreeProps> = ({
  position,
  scale = 1,
  variant = 0,
}) => {
  /*
     Deterministic variation.

     We do NOT use Math.random().
     The Digital Twin must remain visually stable.
  */

  const rotationY =
    ((variant % 7) - 3) * 0.11;

  const crownTilt =
    ((variant % 5) - 2) * 0.045;

  const height =
    0.95 +
    ((variant % 4) * 0.08);

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, rotationY, 0]}
    >

      {/* ======================================================
          MAIN TRUNK
         ====================================================== */}

      <Cylinder
        args={[0.075, 0.115, 0.72 * height, 7]}
        position={[0, 0.36 * height, 0]}
      >
        <meshStandardMaterial
          color="#5a3927"
          roughness={0.98}
          metalness={0}
        />
      </Cylinder>


      {/* ======================================================
          MAIN LEFT BRANCH
         ====================================================== */}

      <Cylinder
        args={[0.035, 0.06, 0.42, 6]}
        position={[-0.105, 0.62 * height, 0]}
        rotation={[0, 0, -0.62]}
      >
        <meshStandardMaterial
          color="#573725"
          roughness={0.98}
          metalness={0}
        />
      </Cylinder>


      {/* ======================================================
          MAIN RIGHT BRANCH
         ====================================================== */}

      <Cylinder
        args={[0.032, 0.055, 0.4, 6]}
        position={[0.115, 0.65 * height, 0.01]}
        rotation={[0, 0, 0.58]}
      >
        <meshStandardMaterial
          color="#573725"
          roughness={0.98}
          metalness={0}
        />
      </Cylinder>


      {/* ======================================================
          BACK BRANCH
         ====================================================== */}

      <Cylinder
        args={[0.028, 0.05, 0.32, 6]}
        position={[0.01, 0.69 * height, -0.08]}
        rotation={[0.42, 0, 0.08]}
      >
        <meshStandardMaterial
          color="#513323"
          roughness={0.98}
          metalness={0}
        />
      </Cylinder>


      {/* ======================================================
          FOLIAGE CLUSTERS

          IMPORTANT:
          These are flattened / irregular rather than
          perfect spheres.
         ====================================================== */}

      {/* Lower left canopy */}
      <Sphere
        args={[0.34, 9, 7]}
        position={[-0.22, 0.83 * height, 0.01]}
        scale={[1.18, 0.82, 0.96]}
        rotation={[0, 0, -0.08]}
      >
        <meshStandardMaterial
          color="#176b43"
          roughness={0.96}
          metalness={0}
        />
      </Sphere>


      {/* Lower right canopy */}
      <Sphere
        args={[0.36, 9, 7]}
        position={[0.22, 0.86 * height, 0.02]}
        scale={[1.08, 0.78, 1.0]}
        rotation={[0, 0, 0.1]}
      >
        <meshStandardMaterial
          color="#1c7b48"
          roughness={0.96}
          metalness={0}
        />
      </Sphere>


      {/* Main upper canopy */}
      <Sphere
        args={[0.38, 10, 8]}
        position={[0.02, 1.08 * height, 0]}
        scale={[1.16, 0.88, 1.05]}
        rotation={[crownTilt, 0, -crownTilt]}
      >
        <meshStandardMaterial
          color="#23844d"
          roughness={0.96}
          metalness={0}
        />
      </Sphere>


      {/* Upper left foliage */}
      <Sphere
        args={[0.23, 8, 7]}
        position={[-0.28, 1.1 * height, -0.05]}
        scale={[1.12, 0.78, 0.92]}
      >
        <meshStandardMaterial
          color="#2a9154"
          roughness={0.96}
          metalness={0}
        />
      </Sphere>


      {/* Upper right foliage */}
      <Sphere
        args={[0.24, 8, 7]}
        position={[0.28, 1.12 * height, 0.03]}
        scale={[1.05, 0.76, 0.9]}
      >
        <meshStandardMaterial
          color="#197746"
          roughness={0.96}
          metalness={0}
        />
      </Sphere>


      {/* Small rear foliage mass */}
      <Sphere
        args={[0.2, 8, 7]}
        position={[0.02, 1.19 * height, -0.17]}
        scale={[1.05, 0.72, 0.85]}
      >
        <meshStandardMaterial
          color="#12683d"
          roughness={0.96}
          metalness={0}
        />
      </Sphere>

    </group>
  );
};


/* ============================================================
   BUSH
   ============================================================ */

const Bush: React.FC<{
  position: [number, number, number];
  scale?: number;
  variant?: number;
}> = ({
  position,
  scale = 1,
  variant = 0,
}) => {

  const offset =
    ((variant % 3) - 1) * 0.04;

  return (
    <group
      position={position}
      scale={scale}
    >

      <Sphere
        args={[0.19, 8, 7]}
        position={[0, 0.16, 0]}
        scale={[1.15, 0.78, 1]}
      >
        <meshStandardMaterial
          color="#237548"
          roughness={0.98}
          metalness={0}
        />
      </Sphere>

      <Sphere
        args={[0.15, 8, 7]}
        position={[0.16, 0.19, 0.02 + offset]}
        scale={[1.05, 0.72, 0.92]}
      >
        <meshStandardMaterial
          color="#2b8b50"
          roughness={0.98}
          metalness={0}
        />
      </Sphere>

      <Sphere
        args={[0.14, 8, 7]}
        position={[-0.14, 0.18, 0.03]}
        scale={[1.05, 0.7, 0.9]}
      >
        <meshStandardMaterial
          color="#1b653e"
          roughness={0.98}
          metalness={0}
        />
      </Sphere>

    </group>
  );
};


/* ============================================================
   BENCH
   ============================================================ */

const Bench: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({
  position,
  rotation = [0, 0, 0],
}) => {

  return (
    <group
      position={position}
      rotation={rotation}
    >

      {/* Seat */}
      <Box
        args={[0.65, 0.08, 0.18]}
        position={[0, 0.28, 0]}
      >
        <meshStandardMaterial
          color="#7a4b2d"
          roughness={0.88}
          metalness={0}
        />
      </Box>


      {/* Back */}
      <Box
        args={[0.65, 0.25, 0.07]}
        position={[0, 0.47, -0.07]}
      >
        <meshStandardMaterial
          color="#6b4228"
          roughness={0.88}
          metalness={0}
        />
      </Box>


      {/* Left leg */}
      <Box
        args={[0.06, 0.28, 0.06]}
        position={[-0.23, 0.14, 0]}
      >
        <meshStandardMaterial
          color="#252b2d"
          roughness={0.82}
          metalness={0}
        />
      </Box>


      {/* Right leg */}
      <Box
        args={[0.06, 0.28, 0.06]}
        position={[0.23, 0.14, 0]}
      >
        <meshStandardMaterial
          color="#252b2d"
          roughness={0.82}
          metalness={0}
        />
      </Box>

    </group>
  );
};


/* ============================================================
   INDIVIDUAL PARK
   ============================================================ */

const Park: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: number;
}> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  variant = 0,
}) => {

  const trees = useMemo<TreeProps[]>(
    () => [

      {
        position: [-1.15, 0, -0.55],
        scale: 0.9,
        variant: variant + 1,
      },

      {
        position: [-0.55, 0, 0.72],
        scale: 1.05,
        variant: variant + 2,
      },

      {
        position: [0.35, 0, -0.72],
        scale: 0.82,
        variant: variant + 3,
      },

      {
        position: [1.05, 0, 0.5],
        scale: 1.12,
        variant: variant + 4,
      },

      {
        position: [0.7, 0, 0.95],
        scale: 0.68,
        variant: variant + 5,
      },

      {
        position: [-1.25, 0, 0.72],
        scale: 0.72,
        variant: variant + 6,
      },

    ],
    [variant]
  );


  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >

      {/* ======================================================
          GRASS BASE
         ====================================================== */}

      <Cylinder
        args={[2.15, 2.05, 0.08, 32]}
        position={[0, 0.04, 0]}
      >
        <meshStandardMaterial
          color={
            variant % 2 === 0
              ? "#176b43"
              : "#1d7548"
          }
          roughness={1}
          metalness={0}
        />
      </Cylinder>


      {/* Inner lawn */}
      <Cylinder
        args={[1.65, 1.58, 0.035, 32]}
        position={[0, 0.1, 0]}
      >
        <meshStandardMaterial
          color="#21824d"
          roughness={1}
          metalness={0}
        />
      </Cylinder>


      {/* ======================================================
          WALKING PATH
         ====================================================== */}

      <Box
        args={[3.7, 0.045, 0.32]}
        position={[0, 0.125, 0]}
      >
        <meshStandardMaterial
          color="#899b91"
          roughness={0.96}
          metalness={0}
        />
      </Box>


      {/* Cross path */}
      <Box
        args={[0.32, 0.045, 3.4]}
        position={[0, 0.13, 0]}
      >
        <meshStandardMaterial
          color="#87968d"
          roughness={0.96}
          metalness={0}
        />
      </Box>


      {/* ======================================================
          CENTRAL LANDSCAPE FEATURE
         ====================================================== */}

      <Cylinder
        args={[0.5, 0.58, 0.08, 24]}
        position={[0, 0.17, 0]}
      >
        <meshStandardMaterial
          color="#2c9b62"
          roughness={1}
          metalness={0}
        />
      </Cylinder>


      <Sphere
        args={[0.2, 12, 8]}
        position={[0, 0.33, 0]}
        scale={[1.4, 0.28, 1.4]}
      >
        <meshStandardMaterial
          color="#39b875"
          roughness={0.88}
          metalness={0}
        />
      </Sphere>


      {/* ======================================================
          TREES
         ====================================================== */}

      {trees.map((tree, index) => (
        <Tree
          key={`tree-${index}`}
          position={tree.position}
          scale={tree.scale}
          variant={tree.variant}
        />
      ))}


      {/* ======================================================
          BUSHES
         ====================================================== */}

      <Bush
        position={[-0.75, 0.13, -0.1]}
        scale={0.9}
        variant={variant + 1}
      />

      <Bush
        position={[0.85, 0.13, -0.05]}
        scale={0.75}
        variant={variant + 2}
      />

      <Bush
        position={[0.05, 0.13, 0.85]}
        scale={0.7}
        variant={variant + 3}
      />


      {/* ======================================================
          BENCHES
         ====================================================== */}

      <Bench
        position={[-0.45, 0.15, 0.35]}
        rotation={[0, Math.PI * 0.25, 0]}
      />

      <Bench
        position={[0.65, 0.15, -0.45]}
        rotation={[0, -Math.PI * 0.7, 0]}
      />


      {/* ======================================================
          SMALL PARK LIGHT — LEFT
         ====================================================== */}

      <group position={[-1.55, 0.15, 0]}>

        <Cylinder
          args={[0.025, 0.025, 0.55, 8]}
          position={[0, 0.28, 0]}
        >
          <meshStandardMaterial
            color="#263b40"
            roughness={0.82}
            metalness={0}
          />
        </Cylinder>

        <Sphere
          args={[0.06, 8, 8]}
          position={[0, 0.58, 0]}
        >
          <meshStandardMaterial
            color="#baf7d8"
            emissive="#64e6a5"
            emissiveIntensity={1.5}
          />
        </Sphere>

      </group>


      {/* ======================================================
          SMALL PARK LIGHT — RIGHT
         ====================================================== */}

      <group position={[1.55, 0.15, 0.1]}>

        <Cylinder
          args={[0.025, 0.025, 0.55, 8]}
          position={[0, 0.28, 0]}
        >
          <meshStandardMaterial
            color="#263b40"
            roughness={0.82}
            metalness={0}
          />
        </Cylinder>

        <Sphere
          args={[0.06, 8, 8]}
          position={[0, 0.58, 0]}
        >
          <meshStandardMaterial
            color="#baf7d8"
            emissive="#64e6a5"
            emissiveIntensity={1.5}
          />
        </Sphere>

      </group>

    </group>
  );
};


/* ============================================================
   CITY PARK SYSTEM
   ============================================================ */

const CityParks: React.FC = () => {
  return (
    <group name="kanpur-city-parks">

      {/* ======================================================
          CENTRAL CIVIC PARK
         ====================================================== */}

      <Park
        position={[-3.8, 0, 2.8]}
        scale={1.15}
        variant={0}
      />


      {/* ======================================================
          RESIDENTIAL PARK
         ====================================================== */}

      <Park
        position={[4.2, 0, 1.7]}
        scale={0.82}
        rotation={[0, 0.18, 0]}
        variant={1}
      />


      {/* ======================================================
          SMALL NEIGHBOURHOOD PARK
         ====================================================== */}

      <Park
        position={[3.1, 0, -4.2]}
        scale={0.7}
        rotation={[0, -0.25, 0]}
        variant={2}
      />


      {/* ======================================================
          SMALL GREEN POCKET
         ====================================================== */}

      <Park
        position={[-4.7, 0, -3.6]}
        scale={0.62}
        rotation={[0, 0.3, 0]}
        variant={3}
      />

    </group>
  );
};


export default CityParks;