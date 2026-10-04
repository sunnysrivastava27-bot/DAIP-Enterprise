import React, { useMemo } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import BUILDING_TILE_15_17 from "../data/kanpur/processed/buildings/tile-15-17-road-safe-strict.json";

type Point2D = [number, number];
type PolygonRings = Point2D[][];
type BuildingGeometry = { type: "Polygon" | "MultiPolygon"; coordinates: unknown };

type BuildingRecord = {
  id: string;
  geometry: BuildingGeometry;
  height?: number | null;
  properties?: {
    height?: number | null;
    num_floors?: number | null;
    class?: string | null;
    subtype?: string | null;
    facade_color?: string | null;
    sources?: Array<{ dataset?: string; confidence?: number }>;
  };
};

const BUILDINGS = BUILDING_TILE_15_17 as unknown as BuildingRecord[];

/* Preserve the validated current coordinate system/alignment. */
const METRES_TO_WORLD = 0.01;
const BUILDING_BASE_Y = -0.555;
const BUILDING_TO_ROAD_OFFSET_X_WORLD = 1404.4430415067652 * METRES_TO_WORLD;
const BUILDING_TO_ROAD_OFFSET_Z_WORLD = 3771.666315999704 * METRES_TO_WORLD;

const FLOOR_HEIGHT_M = 3.05;
const MIN_HEIGHT_M = 3.0;
const MAX_HEIGHT_M = 18.5;
const PARAPET_HEIGHT_M = 0.28;

const PALETTE = [
  "#D8D1C7", "#C8D2D6", "#D9C4A9", "#C5C9C7",
  "#E0D7C9", "#BFCBD2", "#D1C6B7", "#C9D0CB",
];

function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand01(id: string, salt: string) {
  return (hashString(`${id}:${salt}`) % 10000) / 10000;
}

function sanitizeRing(value: unknown): Point2D[] {
  if (!Array.isArray(value)) return [];
  const ring: Point2D[] = [];
  for (const item of value) {
    if (!Array.isArray(item) || item.length < 2) continue;
    const x = Number(item[0]);
    const z = Number(item[1]);
    if (Number.isFinite(x) && Number.isFinite(z)) ring.push([x, z]);
  }
  if (
    ring.length > 2 &&
    ring[0][0] === ring[ring.length - 1][0] &&
    ring[0][1] === ring[ring.length - 1][1]
  ) ring.pop();
  return ring.length >= 3 ? ring : [];
}

function polygonSets(g: BuildingGeometry): PolygonRings[] {
  if (g.type === "Polygon" && Array.isArray(g.coordinates)) {
    const rings = g.coordinates.map(sanitizeRing).filter((r) => r.length >= 3);
    return rings.length ? [rings] : [];
  }
  if (g.type === "MultiPolygon" && Array.isArray(g.coordinates)) {
    const result: PolygonRings[] = [];
    for (const polygon of g.coordinates) {
      if (!Array.isArray(polygon)) continue;
      const rings = polygon.map(sanitizeRing).filter((r) => r.length >= 3);
      if (rings.length) result.push(rings);
    }
    return result;
  }
  return [];
}

function ringArea(ring: Point2D[]) {
  let sum = 0;
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    sum += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(sum) * 0.5;
}

function footprintArea(polygon: PolygonRings) {
  if (!polygon[0]) return 0;
  return Math.max(
    0,
    ringArea(polygon[0]) -
      polygon.slice(1).reduce((sum, hole) => sum + ringArea(hole), 0),
  );
}

function footprintMetrics(polygon: PolygonRings) {
  const outer = polygon[0];
  if (!outer || outer.length < 3) {
    return { area: 0, width: 0, depth: 0, aspect: 1, compactness: 1 };
  }

  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  let perimeter = 0;

  for (let i = 0; i < outer.length; i++) {
    const [x, z] = outer[i];
    const next = outer[(i + 1) % outer.length];
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
    perimeter += Math.hypot(next[0] - x, next[1] - z);
  }

  const area = footprintArea(polygon);
  const width = maxX - minX;
  const depth = maxZ - minZ;
  const aspect = width > 0 && depth > 0
    ? Math.max(width, depth) / Math.min(width, depth)
    : 1;
  const compactness = perimeter > 0
    ? (4 * Math.PI * Math.max(area, 1e-6)) / (perimeter * perimeter)
    : 1;

  return { area, width, depth, aspect, compactness };
}

function centroidOfRing(ring: Point2D[]): Point2D {
  let x = 0, z = 0;
  for (const [px, pz] of ring) {
    x += px;
    z += pz;
  }
  return [x / ring.length, z / ring.length];
}

/* Used only for upper massing; ground-level GIS footprint remains exact. */
function insetPolygonRings(polygon: PolygonRings, insetRatio: number): PolygonRings {
  if (!polygon[0]) return polygon;
  const scale = THREE.MathUtils.clamp(1 - insetRatio, 0.58, 0.98);

  return polygon.map((ring) => {
    if (ring.length < 3) return ring;
    const [cx, cz] = centroidOfRing(ring);
    return ring.map(([x, z]) => [
      cx + (x - cx) * scale,
      cz + (z - cz) * scale,
    ]);
  });
}

function polygonToPath(ring: Point2D[]) {
  const path = new THREE.Path();
  ring.forEach(([x, z], index) => {
    const X = x * METRES_TO_WORLD;
    const Z = z * METRES_TO_WORLD;
    if (index === 0) path.moveTo(X, Z);
    else path.lineTo(X, Z);
  });
  path.closePath();
  return path;
}

function polygonToShape(polygon: PolygonRings) {
  if (!polygon[0]) return null;
  const shape = new THREE.Shape();

  polygon[0].forEach(([x, z], index) => {
    const X = x * METRES_TO_WORLD;
    const Z = z * METRES_TO_WORLD;
    if (index === 0) shape.moveTo(X, Z);
    else shape.lineTo(X, Z);
  });
  shape.closePath();

  for (const hole of polygon.slice(1)) {
    shape.holes.push(polygonToPath(hole));
  }
  return shape;
}

function extrude(shape: THREE.Shape, heightM: number, yOffsetM: number) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(heightM * METRES_TO_WORLD, 0.01),
    bevelEnabled: false,
    steps: 1,
    curveSegments: 4,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, yOffsetM * METRES_TO_WORLD, 0);
  geometry.computeVertexNormals();
  return geometry;
}

type BuildingFamily =
  | "house"
  | "attached"
  | "villa"
  | "midrise"
  | "commercial"
  | "institutional";

function footprintFamily(building: BuildingRecord, polygon: PolygonRings): BuildingFamily {
  const raw = String(
    building.properties?.class ?? building.properties?.subtype ?? "",
  ).toLowerCase();

  if (
    raw.includes("hospital") || raw.includes("government") ||
    raw.includes("civic") || raw.includes("school") ||
    raw.includes("college") || raw.includes("university")
  ) return "institutional";

  if (
    raw.includes("commercial") || raw.includes("retail") ||
    raw.includes("office") || raw.includes("shop")
  ) return "commercial";

  if (raw.includes("apartment")) return "midrise";

  const m = footprintMetrics(polygon);
  if (m.area < 55) return "house";
  if (m.area < 125 && m.aspect > 1.7) return "attached";
  if (m.area < 180 && m.compactness > 0.55) return "villa";
  if (m.area >= 420) return "midrise";
  if (m.area >= 250) return "commercial";
  return m.aspect > 2.1 ? "attached" : "villa";
}

function inferredFloors(building: BuildingRecord, polygon: PolygonRings) {
  const explicit = Number(building.properties?.num_floors);
  if (Number.isFinite(explicit) && explicit > 0) {
    return THREE.MathUtils.clamp(Math.round(explicit), 1, 6);
  }

  const family = footprintFamily(building, polygon);
  const area = footprintArea(polygon);
  const variation = rand01(building.id, "floors");

  switch (family) {
    case "house":
      return variation < 0.72 ? 1 : 2;
    case "attached":
      return variation < 0.28 ? 1 : variation < 0.88 ? 2 : 3;
    case "villa":
      return variation < 0.18 ? 1 : variation < 0.90 ? 2 : 3;
    case "commercial":
      if (area > 700) return variation < 0.70 ? 3 : 4;
      return variation < 0.25 ? 2 : variation < 0.90 ? 3 : 4;
    case "institutional":
      return variation < 0.35 ? 2 : variation < 0.85 ? 3 : 4;
    case "midrise":
      if (area > 900) return variation < 0.72 ? 4 : 5;
      return variation < 0.62 ? 3 : 4;
  }
}

function buildingHeightM(building: BuildingRecord, polygon: PolygonRings) {
  const explicit = Number(building.height);
  const propertyHeight = Number(building.properties?.height);

  if (Number.isFinite(explicit) && explicit > 0) {
    return THREE.MathUtils.clamp(explicit, MIN_HEIGHT_M, MAX_HEIGHT_M);
  }
  if (Number.isFinite(propertyHeight) && propertyHeight > 0) {
    return THREE.MathUtils.clamp(propertyHeight, MIN_HEIGHT_M, MAX_HEIGHT_M);
  }

  const floors = inferredFloors(building, polygon);
  const variation = 0.92 + rand01(building.id, "floor-height") * 0.12;
  return THREE.MathUtils.clamp(
    floors * FLOOR_HEIGHT_M * variation,
    MIN_HEIGHT_M,
    MAX_HEIGHT_M,
  );
}

function facadeColor(building: BuildingRecord) {
  const supplied = building.properties?.facade_color;
  if (
    typeof supplied === "string" &&
    /^#?[0-9a-f]{6}$/i.test(supplied.trim())
  ) return supplied.startsWith("#") ? supplied : `#${supplied}`;
  return PALETTE[hashString(building.id) % PALETTE.length];
}

function makeBuildingGeometry(building: BuildingRecord, polygon: PolygonRings) {
  const family = footprintFamily(building, polygon);
  const floors = inferredFloors(building, polygon);
  const totalHeightM = buildingHeightM(building, polygon);
  const metrics = footprintMetrics(polygon);

  const originalShape = polygonToShape(polygon);
  if (!originalShape) return null;

  const parts: THREE.BufferGeometry[] = [];

  /*
   * Broad low ground mass. Most of the city stops here or receives
   * only a modest upper setback, avoiding the previous tower-like skyline.
   */
  let groundHeightM = totalHeightM;

  if (family === "house") {
    groundHeightM = Math.min(totalHeightM, 3.35);
  } else if (family === "attached") {
    groundHeightM = floors >= 3 ? 5.8 : totalHeightM;
  } else if (family === "villa") {
    groundHeightM = floors >= 3 ? 5.9 : totalHeightM;
  } else if (family === "commercial") {
    groundHeightM = Math.min(totalHeightM, 7.0);
  } else if (family === "institutional") {
    groundHeightM = Math.min(totalHeightM, 6.6);
  } else {
    groundHeightM = Math.min(totalHeightM, 9.0);
  }

  parts.push(extrude(originalShape, groundHeightM, 0));

  const remainingM = Math.max(totalHeightM - groundHeightM, 0);

  if (remainingM > 0.55) {
    const baseInset =
      family === "house" ? 0.18 :
      family === "attached" ? 0.12 :
      family === "villa" ? 0.14 :
      family === "commercial" ? 0.08 :
      family === "institutional" ? 0.10 : 0.07;

    const upperPolygon = insetPolygonRings(
      polygon,
      baseInset + rand01(building.id, "setback") * 0.045,
    );
    const upperShape = polygonToShape(upperPolygon);

    if (upperShape) {
      const upperHeightM =
        remainingM * (0.90 + rand01(building.id, "upper-height") * 0.08);
      parts.push(extrude(upperShape, upperHeightM, groundHeightM));
    }
  }

  /*
   * Occasional small rooftop room. This is deliberately rare and short,
   * so it reads as a terrace utility room rather than another tower.
   */
  const rooftopChance =
    family === "house" ? 0.16 :
    family === "villa" ? 0.28 :
    family === "attached" ? 0.18 : 0.12;

  if (
    floors >= 2 &&
    metrics.area >= 75 &&
    rand01(building.id, "roof-room") < rooftopChance
  ) {
    const roofInset =
      family === "villa" ? 0.34 :
      family === "house" ? 0.42 : 0.28;
    const roofShape = polygonToShape(insetPolygonRings(polygon, roofInset));

    if (roofShape) {
      parts.push(extrude(
        roofShape,
        family === "house" || family === "villa" ? 1.0 : 1.2,
        totalHeightM,
      ));
    }
  }

  const merged = mergeGeometries(parts, false);
  if (!merged) return null;

  merged.computeVertexNormals();
  merged.computeBoundingSphere();

  return { geometry: merged, heightM: totalHeightM };
}

function makeParapetGeometry(polygon: PolygonRings, topHeightM: number) {
  const shape = polygonToShape(insetPolygonRings(polygon, 0.025));
  if (!shape) return null;
  return extrude(shape, PARAPET_HEIGHT_M, topHeightM);
}

const KanpurBuilding3DEngine: React.FC = () => {
  const meshes = useMemo(() => {
    const result: Array<{
      geometry: THREE.BufferGeometry;
      material: THREE.MeshStandardMaterial;
      kind: "body" | "roof";
    }> = [];

    const bodyMaterials = new Map<string, THREE.MeshStandardMaterial>();
    const roofMaterials = new Map<string, THREE.MeshStandardMaterial>();

    const MAX_BUILDINGS = 12000;
    let count = 0;

    for (const building of BUILDINGS) {
      if (count >= MAX_BUILDINGS) break;
      if (!building?.id || !building.geometry) continue;

      const polygons = polygonSets(building.geometry);
      if (!polygons.length) continue;

      for (const polygon of polygons) {
        const massing = makeBuildingGeometry(building, polygon);
        if (!massing) continue;

        const color = facadeColor(building);
        let bodyMaterial = bodyMaterials.get(color);

        if (!bodyMaterial) {
          bodyMaterial = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.88,
            metalness: 0.01,
            flatShading: false,
          });
          bodyMaterials.set(color, bodyMaterial);
        }

        result.push({
          geometry: massing.geometry,
          material: bodyMaterial,
          kind: "body",
        });

        const parapet = makeParapetGeometry(polygon, massing.heightM);
        if (parapet) {
          const roofColor = new THREE.Color(color)
            .multiplyScalar(0.68)
            .getHexString();

          const key = `#${roofColor}`;
          let roofMaterial = roofMaterials.get(key);

          if (!roofMaterial) {
            roofMaterial = new THREE.MeshStandardMaterial({
              color: key,
              roughness: 0.92,
              metalness: 0.01,
              flatShading: false,
            });
            roofMaterials.set(key, roofMaterial);
          }

          result.push({
            geometry: parapet,
            material: roofMaterial,
            kind: "roof",
          });
        }
      }

      count++;
    }

    return result;
  }, []);

  return (
    <group
      name="kanpur-gis-building-engine-realistic-low-rise"
      position={[
        BUILDING_TO_ROAD_OFFSET_X_WORLD,
        BUILDING_BASE_Y,
        BUILDING_TO_ROAD_OFFSET_Z_WORLD,
      ]}
    >
      {meshes.map((item, index) => (
        <mesh
          key={`${item.kind}-${index}`}
          geometry={item.geometry}
          material={item.material}
          castShadow
          receiveShadow
          frustumCulled
        />
      ))}
    </group>
  );
};

export default KanpurBuilding3DEngine;
