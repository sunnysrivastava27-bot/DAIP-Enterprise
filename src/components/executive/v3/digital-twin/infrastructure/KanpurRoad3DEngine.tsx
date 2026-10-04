import React, { useMemo } from "react";
import * as THREE from "three";

import KANPUR_ROADS_3D from "../data/kanpur/processed/kanpur-roads-3d.json";

/*
 * ============================================================
 * DAIP — KANPUR ROAD FOUNDATION ENGINE
 * ============================================================
 *
 * PURPOSE
 * ------------------------------------------------------------
 * This is a ROAD-ONLY foundation pass.
 *
 * GIS road data
 *      ↓
 * normalized road centerlines
 *      ↓
 * physically readable road corridors
 *      ↓
 * continuous surface strips
 *      ↓
 * junction/corner connectors
 *      ↓
 * curbs + sidewalks
 *
 * IMPORTANT
 * ------------------------------------------------------------
 * 1. No buildings are rendered here.
 * 2. No building coordinates are modified.
 * 3. No camera values are changed.
 * 4. GIS coordinates remain the spatial source of truth.
 * 5. Source road widths are respected when they are usable.
 * 6. Category widths are used only as a visualization fallback,
 *    rather than forcing every road to a single huge width.
 *
 * This pass intentionally does NOT attempt to create lane-level
 * traffic engineering or survey-grade parcel boundaries.
 * The goal is to establish a stable, coherent urban road base
 * before buildings are reintroduced.
 * ============================================================
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

interface RoadPoint {
  x: number;
  z: number;
}

interface RoadSegment {
  points: [number, number][];
  length?: number;
}

interface RoadRecord {
  id: string;
  osmId?: string | number | null;
  name?: string | null;
  ref?: string | null;
  highway?: string | null;
  category?: RoadCategory | string;
  width?: number;
  height?: number;
  oneway?: string | null;
  maxspeed?: string | number | null;
  segments: RoadSegment[];
}

interface RoadDataset {
  roads: RoadRecord[];
  metadata?: Record<string, unknown>;
}

const DATASET = KANPUR_ROADS_3D as unknown as RoadDataset;

/*
 * Existing DAIP road preparation:
 * 1 world unit = 100 metres.
 */
const METRES_TO_WORLD = 0.01;

const ROAD_SURFACE_Y = -0.555;

const SIDEWALK_Y = ROAD_SURFACE_Y + 0.006;

/*
 * IMPORTANT:
 * These are NOT the old "minimum presentation widths".
 *
 * The old renderer promoted, for example, a source 1.15 m
 * residential width to 6 m. That made the displayed network
 * inconsistent with the source.
 *
 * Here we use conservative visual defaults only when the source
 * has no usable width. The source width wins when it is within a
 * sensible range.
 */
const FALLBACK_WIDTH_METRES: Record<RoadCategory, number> = {
  trunk: 14,
  primary: 11,
  secondary: 8,
  tertiary: 6.5,
  industrial: 7,
  residential: 5.5,
  local: 4.5,
  service: 3.5,
};

const MIN_USABLE_SOURCE_WIDTH_M = 2.5;
const MAX_USABLE_SOURCE_WIDTH_M = 24;

/*
 * A modest curb and sidewalk treatment.
 * We do not add sidewalks to every tiny service/local road because
 * that would turn the entire city into a thick double ribbon.
 */
const SIDEWALK_WIDTH_M: Record<RoadCategory, number> = {
  trunk: 1.8,
  primary: 1.6,
  secondary: 1.35,
  tertiary: 1.1,
  industrial: 0.8,
  residential: 0.75,
  local: 0,
  service: 0,
};

const SIDEWALK_CATEGORIES = new Set<RoadCategory>([
  "trunk",
  "primary",
  "secondary",
  "tertiary",
  "industrial",
  "residential",
]);

const ROAD_COLOR: Record<RoadCategory, string> = {
  trunk: "#30383B",
  primary: "#343C3F",
  secondary: "#394144",
  tertiary: "#3F474A",
  industrial: "#424A4D",
  residential: "#474F52",
  local: "#4C5457",
  service: "#525A5D",
};

const SIDEWALK_COLOR = "#9A9B94";

function normalizeCategory(value: unknown): RoadCategory {
  if (
    value === "trunk" ||
    value === "primary" ||
    value === "secondary" ||
    value === "tertiary" ||
    value === "residential" ||
    value === "service" ||
    value === "industrial" ||
    value === "local"
  ) {
    return value;
  }

  return "local";
}

function distance(a: RoadPoint, b: RoadPoint) {
  return Math.hypot(b.x - a.x, b.z - a.z);
}

function normalize(x: number, z: number): RoadPoint {
  const length = Math.hypot(x, z);

  if (length < 1e-9) return { x: 1, z: 0 };

  return {
    x: x / length,
    z: z / length,
  };
}

function normal(direction: RoadPoint): RoadPoint {
  return {
    x: -direction.z,
    z: direction.x,
  };
}

function sanitizePoints(points: [number, number][]) {
  const result: RoadPoint[] = [];

  for (const [x, z] of points) {
    if (!Number.isFinite(x) || !Number.isFinite(z)) continue;

    const point = { x, z };

    if (!result.length || distance(result[result.length - 1], point) > 0.0005) {
      result.push(point);
    }
  }

  return result;
}

/*
 * Width selection:
 * - Prefer the source width if it is plausibly a physical road width.
 * - Reject obviously unusable source values.
 * - Use category fallback only when source width is absent/unusable.
 */
function roadWidthWorld(
  road: RoadRecord,
  category: RoadCategory
) {
  const source = Number(road.width);

  const metres =
    Number.isFinite(source) &&
    source >= MIN_USABLE_SOURCE_WIDTH_M &&
    source <= MAX_USABLE_SOURCE_WIDTH_M
      ? source
      : FALLBACK_WIDTH_METRES[category];

  return metres * METRES_TO_WORLD;
}

/*
 * Build a clean offset polyline with a miter-style join.
 *
 * This is different from simply offsetting each point by one normal:
 * at corners, the left/right edges are intersected so the road does
 * not pinch or create large triangular gaps at bends.
 */
function offsetPolyline(
  points: RoadPoint[],
  halfWidth: number
) {
  const left: RoadPoint[] = [];
  const right: RoadPoint[] = [];

  if (points.length < 2) return { left, right };

  for (let i = 0; i < points.length; i++) {
    const current = points[i];

    const previous =
      i === 0 ? points[i] : points[i - 1];

    const next =
      i === points.length - 1
        ? points[i]
        : points[i + 1];

    const incoming = normalize(
      current.x - previous.x,
      current.z - previous.z
    );

    const outgoing = normalize(
      next.x - current.x,
      next.z - current.z
    );

    let n1 = normal(incoming);
    let n2 = normal(outgoing);

    if (i === 0) {
      n1 = n2;
    }

    if (i === points.length - 1) {
      n2 = n1;
    }

    const sum = normalize(
      n1.x + n2.x,
      n1.z + n2.z
    );

    const denominator =
      sum.x * n2.x + sum.z * n2.z;

    /*
     * Very sharp/reversed corners can produce an unstable miter.
     * Fall back to the outgoing normal in that case.
     */
    const miterLength =
      Math.abs(denominator) > 0.22
        ? halfWidth / denominator
        : halfWidth;

    const miter = {
      x: sum.x * miterLength,
      z: sum.z * miterLength,
    };

    /*
     * Cap extreme miters so a sharp GIS vertex cannot create a huge
     * spike into a neighbouring building/road.
     */
    const maxMiter = halfWidth * 2.25;
    const miterSize = Math.hypot(miter.x, miter.z);

    if (miterSize > maxMiter) {
      const scale = maxMiter / miterSize;
      miter.x *= scale;
      miter.z *= scale;
    }

    left.push({
      x: current.x + miter.x,
      z: current.z + miter.z,
    });

    right.push({
      x: current.x - miter.x,
      z: current.z - miter.z,
    });
  }

  return { left, right };
}

function addStrip(
  positions: number[],
  indices: number[],
  left: RoadPoint[],
  right: RoadPoint[],
  y: number
) {
  if (left.length < 2 || right.length !== left.length) return;

  const base = positions.length / 3;

  for (let i = 0; i < left.length; i++) {
    positions.push(
      left[i].x,
      y,
      left[i].z,
      right[i].x,
      y,
      right[i].z
    );
  }

  for (let i = 0; i < left.length - 1; i++) {
    const a = base + i * 2;
    const b = base + (i + 1) * 2;

    indices.push(
      a,
      a + 1,
      b,
      a + 1,
      b + 1,
      b
    );
  }
}

function addRoadGeometry(
  positions: number[],
  indices: number[],
  points: RoadPoint[],
  width: number
) {
  if (points.length < 2) return;

  const offset = offsetPolyline(points, width / 2);

  addStrip(
    positions,
    indices,
    offset.left,
    offset.right,
    ROAD_SURFACE_Y
  );
}

/*
 * Junction discs are intentionally small and only fill the local overlap
 * between road corridors. They are NOT used to hide bad alignment.
 *
 * We create one connector per road vertex. Since OSM ways frequently meet
 * at the same coordinate, these overlap naturally and produce a continuous
 * surface at T/X/Y junctions.
 */
function addJunctionConnector(
  positions: number[],
  indices: number[],
  point: RoadPoint,
  radius: number,
  y: number
) {
  const segments = 12;
  const base = positions.length / 3;

  positions.push(point.x, y, point.z);

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;

    positions.push(
      point.x + Math.cos(angle) * radius,
      y,
      point.z + Math.sin(angle) * radius
    );
  }

  for (let i = 0; i < segments; i++) {
    const a = base + 1 + i;
    const b = base + 1 + ((i + 1) % segments);

    indices.push(
      base,
      a,
      b
    );
  }
}

function addJunctionsForRoad(
  positions: number[],
  indices: number[],
  points: RoadPoint[],
  width: number
) {
  if (points.length < 2) return;

  const radius = Math.max(
    width * 0.52,
    0.018
  );

  /*
   * Only use actual polyline vertices as connectors. This keeps the
   * operation bounded and respects the GIS geometry.
   */
  for (let i = 0; i < points.length; i++) {
    addJunctionConnector(
      positions,
      indices,
      points[i],
      radius,
      ROAD_SURFACE_Y + 0.0002
    );
  }
}

interface MeshBuild {
  positions: number[];
  indices: number[];
}

function buildCategorySurface(
  roads: RoadRecord[],
  category: RoadCategory
): MeshBuild | null {
  const build: MeshBuild = {
    positions: [],
    indices: [],
  };

  for (const road of roads) {
    const width = roadWidthWorld(road, category);

    for (const segment of road.segments) {
      const points = sanitizePoints(segment.points);

      if (points.length < 2) continue;

      addRoadGeometry(
        build.positions,
        build.indices,
        points,
        width
      );

      /*
       * Junction connectors are intentionally disabled in this pass.
       *
       * The previous implementation placed a connector disc at EVERY
       * GIS polyline vertex, not only at true intersections. In dense
       * road data this creates thousands of overlapping coplanar
       * triangles, which can appear as the large black patch seen in
       * the viewport and can also cause z-fighting.
       *
       * First establish clean road strips. True intersection
       * connectors will be added later using intersection topology.
       */
    }
  }

  return build.positions.length
    ? build
    : null;
}

function buildSidewalks(
  roads: RoadRecord[],
  category: RoadCategory
): MeshBuild | null {
  const sidewalkWidth =
    SIDEWALK_WIDTH_M[category] *
    METRES_TO_WORLD;

  if (!SIDEWALK_CATEGORIES.has(category) || sidewalkWidth <= 0) {
    return null;
  }

  const build: MeshBuild = {
    positions: [],
    indices: [],
  };

  for (const road of roads) {
    const roadWidth = roadWidthWorld(
      road,
      category
    );

    for (const segment of road.segments) {
      const points = sanitizePoints(segment.points);

      if (points.length < 2) continue;

      const offset = offsetPolyline(
        points,
        roadWidth / 2 + sidewalkWidth / 2
      );

      /*
       * Make two narrow strips outside the carriageway.
       */
      const roadOffset = offsetPolyline(
        points,
        roadWidth / 2
      );

      addStrip(
        build.positions,
        build.indices,
        roadOffset.left,
        offset.left,
        SIDEWALK_Y
      );

      addStrip(
        build.positions,
        build.indices,
        offset.right,
        roadOffset.right,
        SIDEWALK_Y
      );
    }
  }

  return build.positions.length
    ? build
    : null;
}

function toGeometry(build: MeshBuild) {
  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      build.positions,
      3
    )
  );

  geometry.setIndex(build.indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  return geometry;
}

const materialCache =
  new Map<string, THREE.MeshStandardMaterial>();

function roadMaterial(category: RoadCategory) {
  const existing =
    materialCache.get(`road:${category}`);

  if (existing) return existing;

  const material =
    new THREE.MeshStandardMaterial({
      color: ROAD_COLOR[category],
      roughness: 0.92,
      metalness: 0.01,
      side: THREE.DoubleSide,
    });

  materialCache.set(
    `road:${category}`,
    material
  );

  return material;
}


const sidewalkMaterial =
  new THREE.MeshStandardMaterial({
    color: SIDEWALK_COLOR,
    roughness: 0.96,
    metalness: 0,
    side: THREE.DoubleSide,
  });

const KanpurRoad3DEngine: React.FC = () => {
  const grouped =
    useMemo(() => {
      const map =
        new Map<
          RoadCategory,
          RoadRecord[]
        >();

      for (const road of DATASET.roads) {
        const category =
          normalizeCategory(road.category);

        const list =
          map.get(category) ?? [];

        list.push(road);
        map.set(category, list);
      }

      return map;
    }, []);

  const roadMeshes =
    useMemo(() => {
      const result: Array<{
        category: RoadCategory;
        geometry: THREE.BufferGeometry;
      }> = [];

      for (const category of Object.keys(
        FALLBACK_WIDTH_METRES
      ) as RoadCategory[]) {
        const roads =
          grouped.get(category) ?? [];

        const build =
          buildCategorySurface(
            roads,
            category
          );

        if (!build) continue;

        result.push({
          category,
          geometry: toGeometry(build),
        });
      }

      return result;
    }, [grouped]);

  const sidewalkMeshes =
    useMemo(() => {
      const result: Array<{
        category: RoadCategory;
        geometry: THREE.BufferGeometry;
      }> = [];

      for (const category of Object.keys(
        FALLBACK_WIDTH_METRES
      ) as RoadCategory[]) {
        const roads =
          grouped.get(category) ?? [];

        const build =
          buildSidewalks(
            roads,
            category
          );

        if (!build) continue;

        result.push({
          category,
          geometry: toGeometry(build),
        });
      }

      return result;
    }, [grouped]);

  return (
    <group name="kanpur-road-foundation">
      {roadMeshes.map(
        ({ category, geometry }) => (
          <mesh
            key={`road-${category}`}
            name={`road-foundation-${category}`}
            geometry={geometry}
            material={roadMaterial(category)}
            receiveShadow
            castShadow={false}
            frustumCulled
          />
        )
      )}

      <group name="kanpur-road-sidewalk-foundation">
        {sidewalkMeshes.map(
          ({ category, geometry }) => (
            <mesh
              key={`sidewalk-${category}`}
              name={`road-sidewalk-foundation-${category}`}
              geometry={geometry}
              material={sidewalkMaterial}
              receiveShadow
              castShadow={false}
              frustumCulled
              renderOrder={2}
            />
          )
        )}
      </group>

      {/*
       * Curb geometry is deliberately omitted as a separate heavy mesh in
       * this first foundation pass. The sidewalk/road edge establishes the
       * street boundary without multiplying geometry objects.
       *
       * Once the road-only test is approved, we can add true curb profiles
       * and intersection-specific pedestrian geometry.
       */}
    </group>
  );
};

export default KanpurRoad3DEngine;