import fs from "node:fs";
import path from "node:path";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { pick } from "stream-json/filters/pick.js";
import { parser } from "stream-json";
import { streamArray } from "stream-json/streamers/stream-array.js";
import { chain } from "stream-chain";

// ============================================================
// DAIP — KANPUR BUILDING DATA PROCESSOR
// ============================================================
// Purpose:
//   Convert the large Overture GeoJSON building dataset into
//   spatially partitioned DAIP building tiles.
//
// IMPORTANT:
//   - Does NOT modify the raw GeoJSON.
//   - Does NOT simplify building footprints.
//   - Does NOT invent building positions.
//   - Preserves Polygon / MultiPolygon geometry.
//   - Streams the source file instead of JSON.parse().
// ============================================================

const ROOT = process.cwd();

const INPUT_FILE = path.resolve(
  ROOT,
  "src/components/executive/v3/digital-twin/data/kanpur/raw/kanpur-buildings.geojson"
);

const OUTPUT_DIR = path.resolve(
  ROOT,
  "src/components/executive/v3/digital-twin/data/kanpur/processed/buildings"
);

// ------------------------------------------------------------
// Validated Kanpur dataset extent
// From the completed dataset validation.
// ------------------------------------------------------------

const EXTENT = {
  west: 80.1938176,
  south: 26.3087423,
  east: 80.4783594,
  north: 26.5454951,
};

// ------------------------------------------------------------
// Spatial grid
//
// 32 x 32 gives approximately 1 km scale tiles across the
// validated Kanpur extent.
//
// We intentionally partition the city rather than creating
// one enormous processed JSON file.
// ------------------------------------------------------------

const TILE_COLUMNS = 32;
const TILE_ROWS = 32;

// ------------------------------------------------------------
// Local coordinate origin
//
// Three.js will eventually work in local metres rather than
// longitude / latitude.
//
// Origin = centre of validated dataset extent.
// ------------------------------------------------------------

const ORIGIN_LON = (EXTENT.west + EXTENT.east) / 2;
const ORIGIN_LAT = (EXTENT.south + EXTENT.north) / 2;

const METERS_PER_DEG_LAT = 111320;
const METERS_PER_DEG_LON =
  111320 * Math.cos((ORIGIN_LAT * Math.PI) / 180);

// ------------------------------------------------------------
// Statistics
// ------------------------------------------------------------

let featureCount = 0;
let polygonCount = 0;
let multiPolygonCount = 0;
let skippedCount = 0;
let invalidGeometryCount = 0;

let minHeight = Infinity;
let maxHeight = -Infinity;

const tileCounts = new Map();

// ------------------------------------------------------------
// Tile writers
// ------------------------------------------------------------

const tileWriters = new Map();

function tileKey(tx, ty) {
  return `${tx}-${ty}`;
}

function tilePath(tx, ty) {
  return path.join(
    OUTPUT_DIR,
    `tile-${String(tx).padStart(2, "0")}-${String(ty).padStart(2, "0")}.json`
  );
}

async function openTile(tx, ty) {
  const key = tileKey(tx, ty);

  if (tileWriters.has(key)) {
    return tileWriters.get(key);
  }

  const filePath = tilePath(tx, ty);

  const stream = fs.createWriteStream(filePath, {
    encoding: "utf8",
  });

  stream.write("[\n");

  const writer = {
    stream,
    first: true,
    count: 0,
    tx,
    ty,
    filePath,
  };

  tileWriters.set(key, writer);

  return writer;
}

function writeTileRecord(writer, record) {
  const prefix = writer.first ? "" : ",\n";

  writer.stream.write(
    prefix + JSON.stringify(record)
  );

  writer.first = false;
  writer.count += 1;

  tileCounts.set(
    tileKey(writer.tx, writer.ty),
    writer.count
  );
}

async function closeTiles() {
  for (const writer of tileWriters.values()) {
    writer.stream.write("\n]\n");
    await new Promise((resolve, reject) => {
      writer.stream.once("finish", resolve);
      writer.stream.once("error", reject);
      writer.stream.end();
    });
  }
}

// ------------------------------------------------------------
// Coordinate conversion
// ------------------------------------------------------------

function lonLatToLocal(lon, lat) {
  const x =
    (lon - ORIGIN_LON) *
    METERS_PER_DEG_LON;

  const z =
    (ORIGIN_LAT - lat) *
    METERS_PER_DEG_LAT;

  return [x, z];
}

// ------------------------------------------------------------
// Convert a GeoJSON ring:
//
//   [[lon, lat], [lon, lat], ...]
//
// into:
//
//   [[x, z], [x, z], ...]
// ------------------------------------------------------------

function convertRing(ring) {
  if (!Array.isArray(ring) || ring.length < 4) {
    return null;
  }

  const converted = [];

  for (const coordinate of ring) {
    if (
      !Array.isArray(coordinate) ||
      coordinate.length < 2
    ) {
      return null;
    }

    const lon = Number(coordinate[0]);
    const lat = Number(coordinate[1]);

    if (
      !Number.isFinite(lon) ||
      !Number.isFinite(lat)
    ) {
      return null;
    }

    converted.push(
      lonLatToLocal(lon, lat)
    );
  }

  return converted;
}

// ------------------------------------------------------------
// Polygon conversion
// ------------------------------------------------------------

function convertPolygon(coordinates) {
  if (!Array.isArray(coordinates)) {
    return null;
  }

  const rings = [];

  for (const ring of coordinates) {
    const converted = convertRing(ring);

    if (!converted) {
      return null;
    }

    rings.push(converted);
  }

  return rings.length > 0 ? rings : null;
}

// ------------------------------------------------------------
// Geometry conversion
// ------------------------------------------------------------

function convertGeometry(geometry) {
  if (!geometry || !geometry.type) {
    return null;
  }

  if (geometry.type === "Polygon") {
    const polygon = convertPolygon(
      geometry.coordinates
    );

    if (!polygon) {
      return null;
    }

    return {
      type: "Polygon",
      coordinates: polygon,
    };
  }

  if (geometry.type === "MultiPolygon") {
    const polygons = [];

    for (const polygonCoordinates of geometry.coordinates) {
      const polygon = convertPolygon(
        polygonCoordinates
      );

      if (!polygon) {
        return null;
      }

      polygons.push(polygon);
    }

    if (polygons.length === 0) {
      return null;
    }

    return {
      type: "MultiPolygon",
      coordinates: polygons,
    };
  }

  return null;
}

// ------------------------------------------------------------
// Extract a usable numeric value
// ------------------------------------------------------------

function numericValue(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;
}

// ------------------------------------------------------------
// Height extraction
//
// Priority:
//   1. height
//   2. num_floors * 3.2m
//
// We do NOT fabricate height when neither exists.
// ------------------------------------------------------------

function extractHeight(properties) {
  const directHeight = numericValue(
    properties?.height
  );

  if (
    directHeight !== null &&
    directHeight > 0
  ) {
    return directHeight;
  }

  const floors = numericValue(
    properties?.num_floors
  );

  if (
    floors !== null &&
    floors > 0
  ) {
    return floors * 3.2;
  }

  return null;
}

// ------------------------------------------------------------
// Extract centroid from first valid coordinate.
//
// Used only for tile assignment.
// Geometry itself remains untouched.
// ------------------------------------------------------------

function getFeatureCentroid(feature) {
  const geometry = feature.geometry;

  if (!geometry) {
    return null;
  }

  let lonSum = 0;
  let latSum = 0;
  let count = 0;

  function collectRing(ring) {
    if (!Array.isArray(ring)) {
      return;
    }

    for (const coordinate of ring) {
      if (
        !Array.isArray(coordinate) ||
        coordinate.length < 2
      ) {
        continue;
      }

      const lon = Number(coordinate[0]);
      const lat = Number(coordinate[1]);

      if (
        !Number.isFinite(lon) ||
        !Number.isFinite(lat)
      ) {
        continue;
      }

      lonSum += lon;
      latSum += lat;
      count += 1;
    }
  }

  if (geometry.type === "Polygon") {
    for (const ring of geometry.coordinates) {
      collectRing(ring);
    }
  }

  if (geometry.type === "MultiPolygon") {
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) {
        collectRing(ring);
      }
    }
  }

  if (count === 0) {
    return null;
  }

  return [
    lonSum / count,
    latSum / count,
  ];
}

// ------------------------------------------------------------
// Determine spatial tile
// ------------------------------------------------------------

function getTile(lon, lat) {
  const normalizedX =
    (lon - EXTENT.west) /
    (EXTENT.east - EXTENT.west);

  const normalizedY =
    (EXTENT.north - lat) /
    (EXTENT.north - EXTENT.south);

  let tx = Math.floor(
    normalizedX * TILE_COLUMNS
  );

  let ty = Math.floor(
    normalizedY * TILE_ROWS
  );

  tx = Math.max(
    0,
    Math.min(TILE_COLUMNS - 1, tx)
  );

  ty = Math.max(
    0,
    Math.min(TILE_ROWS - 1, ty)
  );

  return { tx, ty };
}

// ------------------------------------------------------------
// Extract useful source properties
// ------------------------------------------------------------

function extractProperties(properties = {}) {
  return {
    class: properties.class ?? null,
    subtype: properties.subtype ?? null,
    names: properties.names ?? null,
    height: numericValue(properties.height),
    num_floors: numericValue(properties.num_floors),
    num_floors_underground:
      numericValue(
        properties.num_floors_underground
      ),
    level: numericValue(properties.level),
    is_underground:
      properties.is_underground ?? null,
    facade_color:
      properties.facade_color ?? null,
    facade_material:
      properties.facade_material ?? null,
    roof_material:
      properties.roof_material ?? null,
    roof_shape:
      properties.roof_shape ?? null,
    has_parts:
      properties.has_parts ?? null,
    sources:
      properties.sources ?? null,
    version:
      properties.version ?? null,
  };
}

// ------------------------------------------------------------
// Convert one feature
// ------------------------------------------------------------

async function processFeature(feature) {
  featureCount += 1;

  if (
    featureCount % 100000 === 0
  ) {
    console.log(
      `Processed ${featureCount.toLocaleString()} buildings...`
    );
  }

  if (
    !feature ||
    feature.type !== "Feature" ||
    !feature.geometry
  ) {
    skippedCount += 1;
    return;
  }

  if (
    feature.geometry.type !== "Polygon" &&
    feature.geometry.type !== "MultiPolygon"
  ) {
    skippedCount += 1;
    return;
  }

  if (feature.geometry.type === "Polygon") {
    polygonCount += 1;
  } else {
    multiPolygonCount += 1;
  }

  const centroid = getFeatureCentroid(feature);

  if (!centroid) {
    invalidGeometryCount += 1;
    return;
  }

  const [lon, lat] = centroid;

  if (
    lon < EXTENT.west ||
    lon > EXTENT.east ||
    lat < EXTENT.south ||
    lat > EXTENT.north
  ) {
    skippedCount += 1;
    return;
  }

  const geometry = convertGeometry(
    feature.geometry
  );

  if (!geometry) {
    invalidGeometryCount += 1;
    return;
  }

  const { tx, ty } = getTile(lon, lat);

  const properties = extractProperties(
    feature.properties ?? {}
  );

  const height = extractHeight(
    feature.properties ?? {}
  );

  if (height !== null) {
    minHeight = Math.min(
      minHeight,
      height
    );

    maxHeight = Math.max(
      maxHeight,
      height
    );
  }

  const id =
    feature.id ??
    feature.properties?.id ??
    `kanpur-building-${featureCount}`;

  const record = {
    id: String(id),

    geometry,

    centroid: lonLatToLocal(
      lon,
      lat
    ),

    height,

    properties,
  };

  const writer = await openTile(
    tx,
    ty
  );

  writeTileRecord(
    writer,
    record
  );
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------

async function main() {
  console.log("");
  console.log(
    "============================================================"
  );
  console.log(
    "DAIP — KANPUR BUILDING DATA PROCESSOR"
  );
  console.log(
    "============================================================"
  );
  console.log("");

  console.log("INPUT:");
  console.log(INPUT_FILE);
  console.log("");

  console.log("OUTPUT:");
  console.log(OUTPUT_DIR);
  console.log("");

  console.log("GRID:");
  console.log(
    `${TILE_COLUMNS} x ${TILE_ROWS} = ${
      TILE_COLUMNS * TILE_ROWS
    } tiles`
  );
  console.log("");

  console.log("LOCAL ORIGIN:");
  console.log(
    `Longitude: ${ORIGIN_LON}`
  );
  console.log(
    `Latitude : ${ORIGIN_LAT}`
  );
  console.log("");

  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(
      `Input file not found:\n${INPUT_FILE}`
    );
  }

  await rm(
    OUTPUT_DIR,
    {
      recursive: true,
      force: true,
    }
  );

  await mkdir(
    OUTPUT_DIR,
    {
      recursive: true,
    }
  );

  console.log(
    "Starting streaming processor..."
  );
  console.log("");

  const pipeline = chain([
    fs.createReadStream(
      INPUT_FILE,
      {
        encoding: "utf8",
      }
    ),
    parser(),
    pick({
      filter: "features",
    }),
    streamArray(),
  ]);

  pipeline.on(
    "data",
    async ({ value }) => {
      pipeline.pause();

      try {
        await processFeature(value);
      } catch (error) {
        console.error(
          "Feature processing error:",
          error
        );

        skippedCount += 1;
      }

      pipeline.resume();
    }
  );

  await new Promise(
    (resolve, reject) => {
      pipeline.once(
        "end",
        resolve
      );

      pipeline.once(
        "error",
        reject
      );
    }
  );

  await closeTiles();

  // ----------------------------------------------------------
  // Manifest
  // ----------------------------------------------------------

  const tiles = [];

  for (
    let ty = 0;
    ty < TILE_ROWS;
    ty += 1
  ) {
    for (
      let tx = 0;
      tx < TILE_COLUMNS;
      tx += 1
    ) {
      const key = tileKey(
        tx,
        ty
      );

      const count =
        tileCounts.get(key) ?? 0;

      if (count === 0) {
        continue;
      }

      tiles.push({
        id: key,
        x: tx,
        y: ty,
        file:
          `tile-${String(tx).padStart(
            2,
            "0"
          )}-${String(ty).padStart(
            2,
            "0"
          )}.json`,
        count,
      });
    }
  }

  const manifest = {
    version: 1,

    source: {
      file:
        "raw/kanpur-buildings.geojson",
      featureCount,
    },

    extent: EXTENT,

    grid: {
      columns: TILE_COLUMNS,
      rows: TILE_ROWS,
    },

    coordinateSystem: {
      type:
        "DAIP_LOCAL_METRIC",
      origin: {
        longitude: ORIGIN_LON,
        latitude: ORIGIN_LAT,
      },
      metersPerDegree: {
        longitude:
          METERS_PER_DEG_LON,
        latitude:
          METERS_PER_DEG_LAT,
      },
      axes: {
        x: "east",
        y: "up",
        z: "south",
      },
    },

    statistics: {
      featureCount,
      polygonCount,
      multiPolygonCount,
      skippedCount,
      invalidGeometryCount,
      heightValues:
        Number.isFinite(minHeight)
          ? {
              min: minHeight,
              max: maxHeight,
            }
          : null,
    },

    tiles,
  };

  await writeFile(
    path.join(
      OUTPUT_DIR,
      "manifest.json"
    ),
    JSON.stringify(
      manifest,
      null,
      2
    ),
    "utf8"
  );

  console.log("");
  console.log(
    "============================================================"
  );
  console.log(
    "PROCESSING COMPLETE"
  );
  console.log(
    "============================================================"
  );
  console.log("");

  console.log(
    `Features read      : ${featureCount.toLocaleString()}`
  );

  console.log(
    `Polygon features   : ${polygonCount.toLocaleString()}`
  );

  console.log(
    `MultiPolygon       : ${multiPolygonCount.toLocaleString()}`
  );

  console.log(
    `Skipped            : ${skippedCount.toLocaleString()}`
  );

  console.log(
    `Invalid geometry   : ${invalidGeometryCount.toLocaleString()}`
  );

  console.log(
    `Tiles written      : ${tiles.length.toLocaleString()}`
  );

  if (Number.isFinite(minHeight)) {
    console.log(
      `Minimum height     : ${minHeight}`
    );

    console.log(
      `Maximum height     : ${maxHeight}`
    );
  }

  console.log("");
  console.log(
    `Output directory:`
  );
  console.log(OUTPUT_DIR);
  console.log("");
}

main().catch(
  (error) => {
    console.error("");
    console.error(
      "PROCESSING FAILED"
    );
    console.error("");
    console.error(error);
    process.exit(1);
  }
);