import React, { useMemo } from "react";
import * as THREE from "three";

import KANPUR_ROADS_3D from "./data/kanpur/processed/kanpur-roads-3d.json";
/*
 * ==============================================================
 * DAIP — KANPUR DIGITAL TWIN
 * REAL GIS ROAD NETWORK V5
 * ==============================================================
 *
 * This component renders the real OSM-derived Kanpur road
 * network produced by:
 *
 *   kanpur-roads.geojson
 *          ↓
 *   kanpur-roads-clipped.geojson
 *          ↓
 *   kanpur-roads-3d.json
 *
 * IMPORTANT
 * ---------
 * This file does NOT generate a synthetic road grid.
 *
 * It consumes the real GIS-derived 3D road dataset.
 *
 * The source GIS dataset remains untouched.
 *
 * Coordinate convention:
 *
 *   X = east / west
 *   Y = elevation
 *   Z = south / north
 *
 * Roads are grouped into a small number of GPU-friendly
 * meshes rather than creating thousands of React mesh objects.
 *
 * ==============================================================
 */

type RoadCategory =
  | "trunk"
  | "primary"
  | "secondary"
  | "tertiary"
  | "residential"
  | "service"
  | "industrial"
  | "local";

interface RoadSegmentData {
  points: [number, number][];
  length: number;
}

interface RoadData {
  id: string;
  osmId: string | number | null;
  name: string | null;
  ref: string | null;
  highway: string;
  category: RoadCategory;
  priority: number;
  width: number;
  height: number;
  lod: number;
  oneway: string | null;
  maxspeed: string | number | null;
  segments: RoadSegmentData[];
}

interface KanpurRoadDataset {
  version: string;
  type: string;
  metadata: {
    source?: string;
    sourceDataset?: string;
    boundarySource?: string;
    boundaryValidation?: string;
    officialKdaBoundary?: boolean;
    generatedAt?: string;
    outputRoadCount?: number;
    outputPoints?: number;
    [key: string]: unknown;
  };
  categoryCounts?: Record<
    string,
    number
  >;
  roads: RoadData[];
}

const roadDataset =
  KANPUR_ROADS_3D as unknown as KanpurRoadDataset;

/*
 * ==============================================================
 * VISUAL HIERARCHY
 * ==============================================================
 */

interface VisualDefinition {
  color: string;
  widthMultiplier: number;
  yOffset: number;
  sidewalk: boolean;
  marking: boolean;
  markingWidth: number;
  markingOpacity: number;
}

const VISUALS: Record<
  RoadCategory,
  VisualDefinition
> = {
  trunk: {
    color: "#252c30",
    widthMultiplier: 1.25,
    yOffset: 0.045,
    sidewalk: true,
    marking: true,
    markingWidth:  0.018,
    markingOpacity: 0.95,
  },

  primary: {
    color: "#293236",
    widthMultiplier: 1.18,
    yOffset: 0.044,
    sidewalk: true,
    marking: true,
    markingWidth: 0.015,
    markingOpacity: 0.9,
  },

  secondary: {
    color: "#323a3e",
    widthMultiplier: 1.08,
    yOffset: 0.043,
    sidewalk: true,
    marking: true,
    markingWidth:0.012,
    markingOpacity: 0.72,
  },

  tertiary: {
    color: "#384145",
    widthMultiplier: 1.0,
    yOffset: 0.041,
    sidewalk: false,
    marking: false,
    markingWidth: 0,
    markingOpacity: 0,
  },

  residential: {
    color: "#434b4e",
    widthMultiplier: 0.94,
    yOffset: 0.038,
    sidewalk: false,
    marking: false,
    markingWidth: 0,
    markingOpacity: 0,
  },

  service: {
    color: "#4a5255",
    widthMultiplier: 0.88,
    yOffset: 0.036,
    sidewalk: false,
    marking: false,
    markingWidth: 0,
    markingOpacity: 0,
  },

  industrial: {
    color: "#343d40",
    widthMultiplier: 1.02,
    yOffset: 0.041,
    sidewalk: false,
    marking: false,
    markingWidth: 0,
    markingOpacity: 0,
  },

  local: {
    color: "#454d50",
    widthMultiplier: 0.9,
    yOffset: 0.036,
    sidewalk: false,
    marking: false,
    markingWidth: 0,
    markingOpacity: 0,
  },
};

/*
 * ==============================================================
 * CATEGORY ORDER
 * ==============================================================
 */

const CATEGORY_ORDER: RoadCategory[] = [
  "trunk",
  "primary",
  "secondary",
  "tertiary",
  "industrial",
  "residential",
  "local",
  "service",
];

/*
 * ==============================================================
 * ROAD GEOMETRY HELPERS
 * ==============================================================
 */

/**
 * Adds a flat ribbon segment to a shared geometry.
 *
 * Each consecutive pair of GIS points becomes a small quad.
 *
 * This is intentionally simple and robust:
 *
 *   p1 -------- p2
 *    \          /
 *     \        /
 *   p1'--------p2'
 *
 * The complete road network can therefore be rendered using
 * only a few meshes.
 */
const addRibbonSegment = (
  positions: number[],
  indices: number[],
  start: [number, number],
  end: [number, number],
  width: number,
  y: number,
) => {
  const x1 = start[0];
  const z1 = start[1];

  const x2 = end[0];
  const z2 = end[1];

  const dx = x2 - x1;
  const dz = z2 - z1;

  const length =
    Math.sqrt(
      dx * dx + dz * dz,
    );

  if (length < 0.001) {
    return;
  }

  const halfWidth =
    width / 2;

  const nx =
    -dz / length;

  const nz =
    dx / length;

  const ax =
    x1 + nx * halfWidth;

  const az =
    z1 + nz * halfWidth;

  const bx =
    x1 - nx * halfWidth;

  const bz =
    z1 - nz * halfWidth;

  const cx =
    x2 + nx * halfWidth;

  const cz =
    z2 + nz * halfWidth;

  const dx2 =
    x2 - nx * halfWidth;

  const dz2 =
    z2 - nz * halfWidth;

  const base =
    positions.length / 3;

  positions.push(
    ax,
    y,
    az,

    bx,
    y,
    bz,

    cx,
    y,
    cz,

    dx2,
    y,
    dz2,
  );

  indices.push(
    base,
    base + 1,
    base + 2,

    base + 1,
    base + 3,
    base + 2,
  );
};

/**
 * Build one BufferGeometry for an entire road category.
 */
const buildRoadGeometry = (
  roads: RoadData[],
  category: RoadCategory,
) => {
  const positions: number[] = [];
  const indices: number[] = [];

  const visual =
    VISUALS[category];

  for (
    const road of roads
  ) {
    for (
      const segment of road.segments
    ) {
      const points =
        segment.points;

      if (
        points.length < 2
      ) {
        continue;
      }

      const width =
  road.width *
  visual.widthMultiplier *
  0.01;

      for (
        let i = 1;
        i < points.length;
        i += 1
      ) {
        addRibbonSegment(
          positions,
          indices,
          points[i - 1],
          points[i],
          width,
          visual.yOffset,
        );
      }
    }
  }

  if (
    positions.length === 0
  ) {
    return null;
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      positions,
      3,
    ),
  );

  geometry.setIndex(indices);

  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  return geometry;
};

/*
 * ==============================================================
 * MARKING GEOMETRY
 * ==============================================================
 *
 * We only mark major roads.
 *
 * We deliberately do NOT mark all 22,340 residential roads.
 */

const buildMarkingGeometry = (
  roads: RoadData[],
  category: RoadCategory,
) => {
  const visual =
    VISUALS[category];

  if (!visual.marking) {
    return null;
  }

  const positions: number[] = [];
  const indices: number[] = [];

  for (
    const road of roads
  ) {
    for (
      const segment of road.segments
    ) {
      const points =
        segment.points;

      if (
        points.length < 2
      ) {
        continue;
      }

      /*
       * Create small centerline dashes along each road segment.
       */
      for (
        let i = 1;
        i < points.length;
        i += 1
      ) {
        const start =
          points[i - 1];

        const end =
          points[i];

        const dx =
          end[0] -
          start[0];

        const dz =
          end[1] -
          start[1];

        const length =
          Math.sqrt(
            dx * dx +
              dz * dz,
          );

        if (
          length < 4
        ) {
          continue;
        }

        const nx =
          -dz / length;

        const nz =
          dx / length;

        /*
         * Dash interval in world units.
         */
        const dashLength =
          category === "trunk"
            ? 4.6
            : category === "primary"
              ? 4.0
              : 3.5;

        const gap =
          category === "trunk"
            ? 4.6
            : category === "primary"
              ? 4.8
              : 5.5;

        const cycle =
          dashLength + gap;

        const count =
          Math.max(
            1,
            Math.floor(
              length / cycle,
            ),
          );

        for (
          let dash = 0;
          dash < count;
          dash += 1
        ) {
          const distance =
            dash * cycle;

          const t1 =
            Math.min(
              1,
              distance /
                length,
            );

          const t2 =
            Math.min(
              1,
              (distance +
                dashLength) /
                length,
            );

          if (
            t2 <= t1
          ) {
            continue;
          }

          const x1 =
            start[0] +
            dx * t1;

          const z1 =
            start[1] +
            dz * t1;

          const x2 =
            start[0] +
            dx * t2;

          const z2 =
            start[1] +
            dz * t2;

          const half =
            visual.markingWidth /
            2;

          const base =
            positions.length /
            3;

          positions.push(
            x1 + nx * half,
            visual.yOffset +
              0.008,
            z1 + nz * half,

            x1 - nx * half,
            visual.yOffset +
              0.008,
            z1 - nz * half,

            x2 + nx * half,
            visual.yOffset +
              0.008,
            z2 + nz * half,

            x2 - nx * half,
            visual.yOffset +
              0.008,
            z2 - nz * half,
          );

          indices.push(
            base,
            base + 1,
            base + 2,

            base + 1,
            base + 3,
            base + 2,
          );
        }
      }
    }
  }

  if (
    positions.length === 0
  ) {
    return null;
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      positions,
      3,
    ),
  );

  geometry.setIndex(indices);

  geometry.computeBoundingSphere();

  return geometry;
};

/*
 * ==============================================================
 * SIDEWALK GEOMETRY
 * ==============================================================
 *
 * Sidewalks only for trunk / primary / secondary.
 *
 * We create them as thin ribbons beside roads.
 */

const buildSidewalkGeometry = (
  roads: RoadData[],
  category: RoadCategory,
) => {
  const visual =
    VISUALS[category];

  if (!visual.sidewalk) {
    return null;
  }

  const positions: number[] = [];
  const indices: number[] = [];

  for (
    const road of roads
  ) {
    const roadWidth =
  road.width *
  visual.widthMultiplier *
  0.03;

    for (
      const segment of road.segments
    ) {
      const points =
        segment.points;

      if (
        points.length < 2
      ) {
        continue;
      }

      for (
        let i = 1;
        i < points.length;
        i += 1
      ) {
        const start =
          points[i - 1];

        const end =
          points[i];

        const dx =
          end[0] -
          start[0];

        const dz =
          end[1] -
          start[1];

        const length =
          Math.sqrt(
            dx * dx +
              dz * dz,
          );

        if (
          length < 0.01
        ) {
          continue;
        }

        const nx =
          -dz / length;

        const nz =
          dx / length;

        const inner =
  roadWidth / 2 +
  0.0015;

const outer =
  roadWidth / 2 +
  0.007;

        const startLeft = [
          start[0] +
            nx * inner,
          start[1] +
            nz * inner,
        ];

        const startLeftOuter = [
          start[0] +
            nx * outer,
          start[1] +
            nz * outer,
        ];

        const endLeft = [
          end[0] +
            nx * inner,
          end[1] +
            nz * inner,
        ];

        const endLeftOuter = [
          end[0] +
            nx * outer,
          end[1] +
            nz * outer,
        ];

        const startRight = [
          start[0] -
            nx * inner,
          start[1] -
            nz * inner,
        ];

        const startRightOuter = [
          start[0] -
            nx * outer,
          start[1] -
            nz * outer,
        ];

        const endRight = [
          end[0] -
            nx * inner,
          end[1] -
            nz * inner,
        ];

        const endRightOuter = [
          end[0] -
            nx * outer,
          end[1] -
            nz * outer,
        ];

        const base =
          positions.length /
          3;

        const y =
          visual.yOffset +
          0.012;

        positions.push(
          startLeft[0],
          y,
          startLeft[1],

          startLeftOuter[0],
          y,
          startLeftOuter[1],

          endLeft[0],
          y,
          endLeft[1],

          endLeftOuter[0],
          y,
          endLeftOuter[1],

          startRight[0],
          y,
          startRight[1],

          startRightOuter[0],
          y,
          startRightOuter[1],

          endRight[0],
          y,
          endRight[1],

          endRightOuter[0],
          y,
          endRightOuter[1],
        );

        /*
         * Left sidewalk
         */
        indices.push(
          base,
          base + 1,
          base + 2,

          base + 1,
          base + 3,
          base + 2,
        );

        /*
         * Right sidewalk
         */
        indices.push(
          base + 4,
          base + 6,
          base + 5,

          base + 5,
          base + 6,
          base + 7,
        );
      }
    }
  }

  if (
    positions.length === 0
  ) {
    return null;
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      positions,
      3,
    ),
  );

  geometry.setIndex(indices);

  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  return geometry;
};

/*
 * ==============================================================
 * MATERIALS
 * ==============================================================
 */

const createRoadMaterial =
  (category: RoadCategory) => {
    const visual =
      VISUALS[category];

    return new THREE.MeshStandardMaterial(
      {
        color:
          visual.color,

        roughness: 0.96,

        metalness: 0.01,

        side:
          THREE.DoubleSide,
      },
    );
  };

const createMarkingMaterial =
  (category: RoadCategory) => {
    const visual =
      VISUALS[category];

    return new THREE.MeshBasicMaterial(
      {
        color:
          category ===
          "trunk"
            ? "#f1eee2"
            : "#dedfd9",

        transparent: true,

        opacity:
          visual.markingOpacity,

        depthWrite: false,

        side:
          THREE.DoubleSide,
      },
    );
  };

const sidewalkMaterial =
  new THREE.MeshStandardMaterial(
    {
      color: "#7b8280",

      roughness: 0.97,

      metalness: 0,

      side:
        THREE.DoubleSide,
    },
  );

/*
 * ==============================================================
 * MAIN COMPONENT
 * ==============================================================
 */

const CityRoadNetwork: React.FC =
  () => {
    /*
     * ----------------------------------------------------------
     * Group roads by visual category.
     * ----------------------------------------------------------
     */

    const roadsByCategory =
      useMemo(() => {
        const grouped =
          new Map<
            RoadCategory,
            RoadData[]
          >();

        for (
          const category of
            CATEGORY_ORDER
        ) {
          grouped.set(
            category,
            [],
          );
        }

        for (
          const road of
            roadDataset.roads
        ) {
          const category =
            CATEGORY_ORDER.includes(
              road.category,
            )
              ? road.category
              : "local";

          grouped
            .get(category)!
            .push(road);
        }

        return grouped;
      }, []);

    /*
     * ----------------------------------------------------------
     * Build all GPU geometries once.
     * ----------------------------------------------------------
     */

    const geometryData =
      useMemo(() => {
        const result: Array<{
          category: RoadCategory;
          roadGeometry:
            | THREE.BufferGeometry
            | null;
          markingGeometry:
            | THREE.BufferGeometry
            | null;
          sidewalkGeometry:
            | THREE.BufferGeometry
            | null;
        }> = [];

        for (
          const category of
            CATEGORY_ORDER
        ) {
          const roads =
            roadsByCategory.get(
              category,
            ) ?? [];

          result.push({
            category,

            roadGeometry:
              buildRoadGeometry(
                roads,
                category,
              ),

            markingGeometry:
              buildMarkingGeometry(
                roads,
                category,
              ),

            sidewalkGeometry:
              buildSidewalkGeometry(
                roads,
                category,
              ),
          });
        }

        return result;
      }, [roadsByCategory]);

    /*
     * ----------------------------------------------------------
     * Renderer
     * ----------------------------------------------------------
     */

    return (
      <group
        name="kanpur-real-gis-road-network"
      >
        {geometryData.map(
          ({
            category,
            roadGeometry,
            markingGeometry,
            sidewalkGeometry,
          }) => {
            const visual =
              VISUALS[category];

            return (
              <group
                key={category}
              >
                {roadGeometry && (
                  <mesh
                    geometry={
                      roadGeometry
                    }
                    castShadow
                    receiveShadow
                    frustumCulled
                  >
                    <primitive
                      object={createRoadMaterial(
                        category,
                      )}
                      attach="material"
                    />
                  </mesh>
                )}

                {sidewalkGeometry && (
                  <mesh
                    geometry={
                      sidewalkGeometry
                    }
                    receiveShadow
                    frustumCulled
                  >
                    <primitive
                      object={
                        sidewalkMaterial
                      }
                      attach="material"
                    />
                  </mesh>
                )}

                {markingGeometry &&
                  visual.marking && (
                    <mesh
                      geometry={
                        markingGeometry
                      }
                      frustumCulled
                    >
                      <primitive
                        object={createMarkingMaterial(
                          category,
                        )}
                        attach="material"
                      />
                    </mesh>
                  )}
              </group>
            );
          },
        )}
      </group>
    );
  };

export default CityRoadNetwork;