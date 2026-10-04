/**
 * ============================================================
 * DAIP — KANPUR ROAD NETWORK BUILDER
 * ============================================================
 *
 * PURPOSE
 * ------------------------------------------------------------
 * Converts processed Kanpur road centerlines into
 * mesh-ready road corridor geometry.
 *
 * This pass establishes:
 * - road hierarchy
 * - stable visualization widths
 * - robust centerline sanitization
 * - continuous left/right corridor edges
 * - safer sharp-corner handling
 * - mesh-ready triangle data
 *
 * IMPORTANT
 * ------------------------------------------------------------
 * - Input coordinates are DAIP local metric coordinates.
 * - They are converted once into DAIP world units here.
 * - No longitude/latitude conversion is performed here.
 * - No buildings are handled here.
 * - No Three.js dependency.
 * - No React dependency.
 *
 * Pipeline:
 *
 * kanpur-roads-3d.json
 *        ↓
 * normalized road records
 *        ↓
 * normalized road hierarchy
 *        ↓
 * visualization width selection
 *        ↓
 * sanitized centerline
 *        ↓
 * left/right corridor edges
 *        ↓
 * mesh-ready road polygons
 *
 * ============================================================
 */

export type RoadCategory =
  | "trunk"
  | "primary"
  | "secondary"
  | "tertiary"
  | "residential"
  | "service"
  | "industrial"
  | "local";

export interface RoadPoint {
  x: number;
  z: number;
}

export interface RoadSegmentInput {
  points: [number, number][];
  length?: number;
}

export interface RoadRecordInput {
  id: string;
  osmId?: string | number | null;
  name?: string | null;
  ref?: string | null;
  highway?: string | null;
  category?: RoadCategory | string;
  width?: number | null;
  height?: number | null;
  oneway?: string | null;
  maxspeed?: string | number | null;
  segments: RoadSegmentInput[];
}

export interface RoadDatasetInput {
  roads: RoadRecordInput[];
  metadata?: Record<string, unknown>;
}

export interface RoadCorridor {
  roadId: string;
  category: RoadCategory;
  widthMetres: number;
  centerline: RoadPoint[];
  left: RoadPoint[];
  right: RoadPoint[];
}

export interface RoadNetworkBuildResult {
  corridors: RoadCorridor[];

  bounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
  };

  roadCount: number;
  segmentCount: number;
  pointCount: number;
}

/**
 * Existing DAIP convention:
 *
 * 1 world unit = 100 metres
 */
export const METRES_TO_WORLD = 0.01;

/**
 * Visualization fallback widths.
 *
 * These are deliberately hierarchical.
 *
 * The values represent the COMPLETE road corridor width,
 * not half-width.
 */
export const FALLBACK_WIDTH_METRES: Record<RoadCategory, number> = {
  trunk: 18,
  primary: 14,
  secondary: 10,
  tertiary: 8,
  industrial: 8,
  residential: 6,
  local: 4.5,
  service: 3.5,
};

/**
 * Minimum acceptable source width.
 *
 * Tiny processed values are not trusted as full carriageway
 * widths because they are often derivative / placeholder data.
 */
const MIN_SOURCE_WIDTH_METRES_BY_CATEGORY: Record<
  RoadCategory,
  number
> = {
  trunk: 10,
  primary: 8,
  secondary: 6,
  tertiary: 5,
  industrial: 5,
  residential: 4,
  local: 3,
  service: 2.5,
};

/**
 * Absolute safety ceiling.
 */
const MAX_SOURCE_WIDTH_METRES = 30;

/**
 * Minimum useful centerline spacing in world units.
 *
 * The source is converted from metres to world units before
 * this threshold is applied.
 */
const MIN_POINT_DISTANCE_WORLD = 0.0005;

/**
 * ------------------------------------------------------------
 * ROAD CATEGORY NORMALIZATION
 * ------------------------------------------------------------
 *
 * Supports both DAIP categories and common OSM highway values.
 */
export function normalizeRoadCategory(
  value: unknown
): RoadCategory {
  if (typeof value !== "string") {
    return "local";
  }

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  switch (normalized) {
    /**
     * Major strategic roads
     */
    case "trunk":
    case "trunk_link":
    case "motorway":
    case "motorway_link":
    case "expressway":
    case "express_way":
      return "trunk";

    /**
     * Primary urban / arterial roads
     */
    case "primary":
    case "primary_link":
    case "arterial":
    case "major_road":
      return "primary";

    /**
     * Secondary roads
     */
    case "secondary":
    case "secondary_link":
      return "secondary";

    /**
     * Tertiary roads
     */
    case "tertiary":
    case "tertiary_link":
    case "collector":
      return "tertiary";

    /**
     * Residential streets
     */
    case "residential":
    case "living_street":
    case "residential_street":
      return "residential";

    /**
     * Industrial roads
     */
    case "industrial":
    case "industrial_road":
      return "industrial";

    /**
     * Service / access roads
     */
    case "service":
    case "service_road":
    case "access":
    case "driveway":
    case "parking_aisle":
      return "service";

    /**
     * Common OSM fallback classes.
     *
     * These are deliberately not promoted to major roads.
     */
    case "unclassified":
    case "road":
    case "street":
    case "track":
    case "path":
    case "footway":
    case "pedestrian":
    case "cycleway":
    case "unknown":
    default:
      return "local";
  }
}

/**
 * ------------------------------------------------------------
 * BASIC GEOMETRY HELPERS
 * ------------------------------------------------------------
 */

function distance(
  a: RoadPoint,
  b: RoadPoint
): number {
  return Math.hypot(
    b.x - a.x,
    b.z - a.z
  );
}

function normalize(
  x: number,
  z: number
): RoadPoint {
  const length = Math.hypot(x, z);

  if (length < 1e-9) {
    return {
      x: 1,
      z: 0,
    };
  }

  return {
    x: x / length,
    z: z / length,
  };
}

function perpendicular(
  direction: RoadPoint
): RoadPoint {
  return {
    x: -direction.z,
    z: direction.x,
  };
}

/**
 * ------------------------------------------------------------
 * CENTERLINE SANITIZATION
 * ------------------------------------------------------------
 *
 * Converts local metric coordinates exactly once into DAIP
 * world coordinates.
 */
export function sanitizeRoadPoints(
  points: [number, number][]
): RoadPoint[] {
  const result: RoadPoint[] = [];

  for (const point of points ?? []) {
    if (!Array.isArray(point)) {
      continue;
    }

    const x =
      Number(point[0]) * METRES_TO_WORLD;

    const z =
      Number(point[1]) * METRES_TO_WORLD;

    if (
      !Number.isFinite(x) ||
      !Number.isFinite(z)
    ) {
      continue;
    }

    const candidate: RoadPoint = {
      x,
      z,
    };

    if (result.length === 0) {
      result.push(candidate);
      continue;
    }

    const previous =
      result[result.length - 1];

    if (
      distance(
        previous,
        candidate
      ) > MIN_POINT_DISTANCE_WORLD
    ) {
      result.push(candidate);
    }
  }

  return result;
}

/**
 * ------------------------------------------------------------
 * ROAD WIDTH
 * ------------------------------------------------------------
 */
export function getRoadWidthMetres(
  road: RoadRecordInput,
  category: RoadCategory
): number {
  const sourceWidth =
    Number(road.width);

  const minimumForCategory =
    MIN_SOURCE_WIDTH_METRES_BY_CATEGORY[
      category
    ];

  if (
    Number.isFinite(sourceWidth) &&
    sourceWidth >= minimumForCategory &&
    sourceWidth <= MAX_SOURCE_WIDTH_METRES
  ) {
    return sourceWidth;
  }

  return FALLBACK_WIDTH_METRES[
    category
  ];
}

/**
 * ------------------------------------------------------------
 * OFFSET GEOMETRY
 * ------------------------------------------------------------
 *
 * Creates stable left/right road edges.
 *
 * Compared with the previous implementation:
 * - handles short segments more safely
 * - prevents huge miter spikes
 * - keeps corner widths visually stable
 */
function offsetPolyline(
  points: RoadPoint[],
  halfWidthWorld: number
): {
  left: RoadPoint[];
  right: RoadPoint[];
} {
  const left: RoadPoint[] = [];
  const right: RoadPoint[] = [];

  if (
    points.length < 2 ||
    halfWidthWorld <= 0
  ) {
    return {
      left,
      right,
    };
  }

  for (
    let i = 0;
    i < points.length;
    i++
  ) {
    const current = points[i];

    const previous =
      i > 0
        ? points[i - 1]
        : points[i];

    const next =
      i < points.length - 1
        ? points[i + 1]
        : points[i];

    const incoming =
      normalize(
        current.x - previous.x,
        current.z - previous.z
      );

    const outgoing =
      normalize(
        next.x - current.x,
        next.z - current.z
      );

    let n1 =
      perpendicular(incoming);

    let n2 =
      perpendicular(outgoing);

    /**
     * End points use the segment normal.
     */
    if (i === 0) {
      n1 = n2;
    }

    if (
      i === points.length - 1
    ) {
      n2 = n1;
    }

    const summed =
      normalize(
        n1.x + n2.x,
        n1.z + n2.z
      );

    const denominator =
      summed.x * n2.x +
      summed.z * n2.z;

    let miterLength: number;

    if (
      Math.abs(denominator) > 0.35
    ) {
      miterLength =
        halfWidthWorld /
        denominator;
    } else {
      /**
       * Very sharp angle:
       * use a normal offset instead of
       * producing a giant spike.
       */
      miterLength =
        halfWidthWorld;
    }

    /**
     * Hard miter limit.
     */
    const maxMiter =
      halfWidthWorld * 2.0;

    miterLength =
      Math.max(
        -maxMiter,
        Math.min(
          maxMiter,
          miterLength
        )
      );

    const miter: RoadPoint = {
      x:
        summed.x *
        miterLength,

      z:
        summed.z *
        miterLength,
    };

    left.push({
      x:
        current.x +
        miter.x,

      z:
        current.z +
        miter.z,
    });

    right.push({
      x:
        current.x -
        miter.x,

      z:
        current.z -
        miter.z,
    });
  }

  return {
    left,
    right,
  };
}

/**
 * ------------------------------------------------------------
 * BUILD ONE ROAD CORRIDOR
 * ------------------------------------------------------------
 */
export function buildRoadCorridor(
  road: RoadRecordInput,
  category: RoadCategory,
  segment: RoadSegmentInput
): RoadCorridor | null {
  const centerline =
    sanitizeRoadPoints(
      segment.points
    );

  if (
    centerline.length < 2
  ) {
    return null;
  }

  const widthMetres =
    getRoadWidthMetres(
      road,
      category
    );

  const widthWorld =
    widthMetres *
    METRES_TO_WORLD;

  const offset =
    offsetPolyline(
      centerline,
      widthWorld / 2
    );

  if (
    offset.left.length < 2 ||
    offset.right.length !==
      offset.left.length
  ) {
    return null;
  }

  return {
    roadId: road.id,
    category,
    widthMetres,
    centerline,
    left: offset.left,
    right: offset.right,
  };
}

/**
 * ------------------------------------------------------------
 * BUILD COMPLETE ROAD NETWORK
 * ------------------------------------------------------------
 */
export function buildRoadNetwork(
  dataset: RoadDatasetInput
): RoadNetworkBuildResult {
  const corridors: RoadCorridor[] = [];

  let segmentCount = 0;
  let pointCount = 0;

  const bounds = {
    minX: Infinity,
    maxX: -Infinity,
    minZ: Infinity,
    maxZ: -Infinity,
  };

  for (
    const road of dataset.roads ?? []
  ) {
    /**
     * Prefer explicit DAIP category.
     *
     * If category is missing, fall back to highway.
     */
    const category =
      normalizeRoadCategory(
        road.category ??
          road.highway
      );

    for (
      const segment of
        road.segments ?? []
    ) {
      segmentCount++;

      const sanitized =
        sanitizeRoadPoints(
          segment.points
        );

      pointCount +=
        sanitized.length;

      for (
        const point of sanitized
      ) {
        bounds.minX =
          Math.min(
            bounds.minX,
            point.x
          );

        bounds.maxX =
          Math.max(
            bounds.maxX,
            point.x
          );

        bounds.minZ =
          Math.min(
            bounds.minZ,
            point.z
          );

        bounds.maxZ =
          Math.max(
            bounds.maxZ,
            point.z
          );
      }

      const corridor =
        buildRoadCorridor(
          road,
          category,
          segment
        );

      if (corridor) {
        corridors.push(
          corridor
        );
      }
    }
  }

  /**
   * Empty dataset safety.
   */
  if (
    !Number.isFinite(
      bounds.minX
    )
  ) {
    bounds.minX = 0;
    bounds.maxX = 0;
    bounds.minZ = 0;
    bounds.maxZ = 0;
  }

  return {
    corridors,

    bounds,

    roadCount:
      dataset.roads?.length ??
      0,

    segmentCount,

    pointCount,
  };
}

/**
 * ------------------------------------------------------------
 * MESH DATA
 * ------------------------------------------------------------
 */
export interface RoadMeshData {
  positions: number[];
  indices: number[];

  roadId: string;
  category: RoadCategory;
  widthMetres: number;
}

/**
 * ------------------------------------------------------------
 * CORRIDOR → TRIANGLE MESH
 * ------------------------------------------------------------
 */
export function corridorToMesh(
  corridor: RoadCorridor,
  y = 0
): RoadMeshData {
  const positions: number[] = [];
  const indices: number[] = [];

  const base = 0;

  for (
    let i = 0;
    i < corridor.left.length;
    i++
  ) {
    const left =
      corridor.left[i];

    const right =
      corridor.right[i];

    positions.push(
      left.x,
      y,
      left.z,

      right.x,
      y,
      right.z
    );
  }

  for (
    let i = 0;
    i <
      corridor.left.length - 1;
    i++
  ) {
    const a =
      base + i * 2;

    const b =
      base + (i + 1) * 2;

    /**
     * Road quad.
     */
    indices.push(
      a,
      b,
      a + 1,

      a + 1,
      b,
      b + 1
    );
  }

  return {
    positions,
    indices,
    roadId:
      corridor.roadId,
    category:
      corridor.category,
    widthMetres:
      corridor.widthMetres,
  };
}

/**
 * ------------------------------------------------------------
 * BUILD ALL ROAD MESHES
 * ------------------------------------------------------------
 */
export function buildRoadMeshes(
  dataset: RoadDatasetInput,
  y = 0
): RoadMeshData[] {
  const network =
    buildRoadNetwork(
      dataset
    );

  return network.corridors.map(
    (corridor) =>
      corridorToMesh(
        corridor,
        y
      )
  );
}