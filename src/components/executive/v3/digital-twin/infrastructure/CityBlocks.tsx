import React from "react";

/* ============================================================
   DAIP KANPUR DIGITAL TWIN
   CITY BLOCK LAYER

   Purpose:
   - Defines the urban blocks between major roads.
   - Creates the physical structure of the city.
   - Blocks are intentionally independent from buildings.
   - Buildings, parks, schools, hospitals, markets, etc.
     will later occupy these blocks.

   ROAD STRUCTURE

   Outer road       ±60
   Main roads       ±42
   Secondary roads  ±21

   The spaces between these roads become city blocks.
============================================================ */

interface CityBlockData {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  type:
    | "residential"
    | "commercial"
    | "mixed"
    | "institutional"
    | "industrial"
    | "green"
    | "civic";
}

/* ============================================================
   KANPUR URBAN BLOCK MAP

   We are NOT filling the entire city with identical blocks.

   Real cities contain:
   - residential neighbourhoods
   - markets
   - institutions
   - government areas
   - industrial areas
   - parks
   - mixed-use streets
============================================================ */

export const CITY_BLOCKS: CityBlockData[] = [
  /* ==========================================================
     NORTH-WEST
  ========================================================== */

  {
    id: "NW-R01",
    x: -52,
    z: -52,
    width: 14,
    depth: 14,
    type: "residential",
  },
  {
    id: "NW-R02",
    x: -36,
    z: -52,
    width: 10,
    depth: 14,
    type: "mixed",
  },
  {
    id: "NW-R03",
    x: -27,
    z: -52,
    width: 8,
    depth: 14,
    type: "residential",
  },

  {
    id: "NW-R04",
    x: -52,
    z: -36,
    width: 14,
    depth: 10,
    type: "residential",
  },
  {
    id: "NW-R05",
    x: -36,
    z: -36,
    width: 10,
    depth: 10,
    type: "residential",
  },
  {
    id: "NW-C01",
    x: -27,
    z: -36,
    width: 8,
    depth: 10,
    type: "commercial",
  },

  /* ==========================================================
     NORTH-CENTRAL
  ========================================================== */

  {
    id: "NC-R01",
    x: -10,
    z: -52,
    width: 18,
    depth: 14,
    type: "residential",
  },
  {
  id: "NC-E01",
  x: 10,
  z: -52,
  width: 18,
  depth: 14,
  type: "institutional",
},

  {
    id: "NC-C01",
    x: -10,
    z: -36,
    width: 18,
    depth: 10,
    type: "commercial",
  },
  {
    id: "NC-R02",
    x: 10,
    z: -36,
    width: 18,
    depth: 10,
    type: "mixed",
  },

  /* ==========================================================
     NORTH-EAST
  ========================================================== */

  {
    id: "NE-C01",
    x: 27,
    z: -52,
    width: 8,
    depth: 14,
    type: "commercial",
  },
  {
    id: "NE-R01",
    x: 36,
    z: -52,
    width: 10,
    depth: 14,
    type: "residential",
  },
  {
    id: "NE-R02",
    x: 52,
    z: -52,
    width: 14,
    depth: 14,
    type: "residential",
  },

  {
    id: "NE-R03",
    x: 27,
    z: -36,
    width: 8,
    depth: 10,
    type: "residential",
  },
  {
    id: "NE-R04",
    x: 36,
    z: -36,
    width: 10,
    depth: 10,
    type: "mixed",
  },
  {
    id: "NE-R05",
    x: 52,
    z: -36,
    width: 14,
    depth: 10,
    type: "residential",
  },

  /* ==========================================================
     WEST-CENTRAL
  ========================================================== */

  {
    id: "W-R01",
    x: -52,
    z: -10,
    width: 14,
    depth: 18,
    type: "residential",
  },
  {
    id: "W-C01",
    x: -36,
    z: -10,
    width: 10,
    depth: 18,
    type: "commercial",
  },

  {
    id: "W-R02",
    x: -52,
    z: 10,
    width: 14,
    depth: 18,
    type: "mixed",
  },
  {
    id: "W-R03",
    x: -36,
    z: 10,
    width: 10,
    depth: 18,
    type: "residential",
  },

  /* ==========================================================
     CENTRAL URBAN CORE
  ========================================================== */

  {
    id: "CC-C01",
    x: -10,
    z: -10,
    width: 18,
    depth: 18,
    type: "commercial",
  },

  {
    id: "CC-C02",
    x: 10,
    z: -10,
    width: 18,
    depth: 18,
    type: "mixed",
  },

  {
    id: "CC-C03",
    x: -10,
    z: 10,
    width: 18,
    depth: 18,
    type: "civic",
  },

  {
    id: "CC-G01",
    x: 10,
    z: 10,
    width: 18,
    depth: 18,
    type: "green",
  },

  /* ==========================================================
     EAST-CENTRAL
  ========================================================== */

  {
    id: "E-C01",
    x: 36,
    z: -10,
    width: 10,
    depth: 18,
    type: "commercial",
  },
  {
    id: "E-R01",
    x: 52,
    z: -10,
    width: 14,
    depth: 18,
    type: "residential",
  },

  {
    id: "E-R02",
    x: 36,
    z: 10,
    width: 10,
    depth: 18,
    type: "mixed",
  },
  {
    id: "E-R03",
    x: 52,
    z: 10,
    width: 14,
    depth: 18,
    type: "residential",
  },

  /* ==========================================================
     SOUTH-WEST
  ========================================================== */

  {
    id: "SW-R01",
    x: -52,
    z: 36,
    width: 14,
    depth: 10,
    type: "residential",
  },
  {
    id: "SW-R02",
    x: -36,
    z: 36,
    width: 10,
    depth: 10,
    type: "mixed",
  },
  {
    id: "SW-C01",
    x: -27,
    z: 36,
    width: 8,
    depth: 10,
    type: "commercial",
  },

  {
    id: "SW-R03",
    x: -52,
    z: 52,
    width: 14,
    depth: 14,
    type: "residential",
  },
  {
    id: "SW-R04",
    x: -36,
    z: 52,
    width: 10,
    depth: 14,
    type: "residential",
  },
  {
    id: "SW-I01",
    x: -27,
    z: 52,
    width: 8,
    depth: 14,
    type: "industrial",
  },

  /* ==========================================================
     SOUTH-CENTRAL
  ========================================================== */

  {
    id: "SC-R01",
    x: -10,
    z: 36,
    width: 18,
    depth: 10,
    type: "residential",
  },
  {
    id: "SC-H01",
    x: 10,
    z: 36,
    width: 18,
    depth: 10,
    type: "institutional",
  },

  {
    id: "SC-I01",
    x: -10,
    z: 52,
    width: 18,
    depth: 14,
    type: "industrial",
  },
  {
    id: "SC-U01",
    x: 10,
    z: 52,
    width: 18,
    depth: 14,
    type: "institutional",
  },

  /* ==========================================================
     SOUTH-EAST
  ========================================================== */

  {
    id: "SE-I01",
    x: 27,
    z: 36,
    width: 8,
    depth: 10,
    type: "industrial",
  },
  {
    id: "SE-R01",
    x: 36,
    z: 36,
    width: 10,
    depth: 10,
    type: "residential",
  },
  {
    id: "SE-R02",
    x: 52,
    z: 36,
    width: 14,
    depth: 10,
    type: "residential",
  },

  {
    id: "SE-I02",
    x: 27,
    z: 52,
    width: 8,
    depth: 14,
    type: "industrial",
  },
  {
    id: "SE-R03",
    x: 36,
    z: 52,
    width: 10,
    depth: 14,
    type: "mixed",
  },
  {
    id: "SE-R04",
    x: 52,
    z: 52,
    width: 14,
    depth: 14,
    type: "residential",
  },
];

/* ============================================================
   BLOCK MATERIALS

   These are deliberately subtle.

   We do NOT want colourful toy-like blocks.
   Buildings and vegetation will provide most of the visual
   variation later.
============================================================ */

const BLOCK_COLORS: Record<CityBlockData["type"], string> = {
  residential: "#697866",
  commercial: "#747967",
  mixed: "#707966",
  institutional: "#68786b",
  industrial: "#656e64",
  green: "#5d775c",
  civic: "#6f786a",
};

/* ============================================================
   CITY BLOCK COMPONENT
============================================================ */

const CityBlocks: React.FC = () => {
  return (
    <group name="kanpur-city-blocks">
      {CITY_BLOCKS.map((block) => (
        <mesh
          key={block.id}
          position={[block.x, -0.57, block.z]}
          receiveShadow
        >
          <boxGeometry
            args={[
              block.width,
              0.12,
              block.depth,
            ]}
          />

          <meshStandardMaterial
            color={BLOCK_COLORS[block.type]}
            roughness={0.98}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
};

export default CityBlocks;