import fs from "node:fs";
import path from "node:path";

const RAW_FILE = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur/raw/kanpur-buildings.geojson",
);

console.log("");
console.log("============================================================");
console.log("DAIP — KANPUR BUILDING DATA VALIDATION");
console.log("============================================================");
console.log("");

if (!fs.existsSync(RAW_FILE)) {
  throw new Error(`Building dataset not found:\n${RAW_FILE}`);
}

const fileStats = fs.statSync(RAW_FILE);

console.log(`File: ${RAW_FILE}`);
console.log(
  `File size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`,
);
console.log("");

const raw = fs.readFileSync(RAW_FILE, "utf8");
const data = JSON.parse(raw);

if (!data || data.type !== "FeatureCollection") {
  throw new Error("Dataset is not a GeoJSON FeatureCollection.");
}

if (!Array.isArray(data.features)) {
  throw new Error("GeoJSON FeatureCollection has no features array.");
}

const features = data.features;

const geometryCounts = {};
const propertyKeys = new Set();

let emptyGeometryCount = 0;
let invalidCoordinateCount = 0;

let polygonCount = 0;
let multiPolygonCount = 0;

let heightCount = 0;
let floorCount = 0;
let idCount = 0;

let minLon = Infinity;
let minLat = Infinity;
let maxLon = -Infinity;
let maxLat = -Infinity;

const ids = new Set();
let duplicateIdCount = 0;

function inspectCoordinate(coordinate) {
  if (!Array.isArray(coordinate) || coordinate.length < 2) {
    invalidCoordinateCount += 1;
    return;
  }

  const lon = Number(coordinate[0]);
  const lat = Number(coordinate[1]);

  if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
    invalidCoordinateCount += 1;
    return;
  }

  minLon = Math.min(minLon, lon);
  minLat = Math.min(minLat, lat);
  maxLon = Math.max(maxLon, lon);
  maxLat = Math.max(maxLat, lat);
}

function inspectCoordinates(coordinates) {
  if (!Array.isArray(coordinates)) {
    invalidCoordinateCount += 1;
    return;
  }

  if (
    coordinates.length >= 2 &&
    typeof coordinates[0] === "number"
  ) {
    inspectCoordinate(coordinates);
    return;
  }

  for (const child of coordinates) {
    inspectCoordinates(child);
  }
}

for (const feature of features) {
  if (!feature || feature.type !== "Feature") {
    invalidCoordinateCount += 1;
    continue;
  }

  const geometry = feature.geometry;
  const properties =
    feature.properties &&
    typeof feature.properties === "object"
      ? feature.properties
      : {};

  Object.keys(properties).forEach((key) =>
    propertyKeys.add(key),
  );

  if (!geometry) {
    emptyGeometryCount += 1;
  } else {
    geometryCounts[geometry.type] =
      (geometryCounts[geometry.type] || 0) + 1;

    if (geometry.type === "Polygon") {
      polygonCount += 1;
    }

    if (geometry.type === "MultiPolygon") {
      multiPolygonCount += 1;
    }

    if (!geometry.coordinates) {
      emptyGeometryCount += 1;
    } else {
      inspectCoordinates(geometry.coordinates);
    }
  }

  const possibleId =
    feature.id ??
    properties.id ??
    properties["@id"] ??
    properties["id"];

  if (
    possibleId !== undefined &&
    possibleId !== null &&
    String(possibleId).trim() !== ""
  ) {
    idCount += 1;

    const id = String(possibleId);

    if (ids.has(id)) {
      duplicateIdCount += 1;
    } else {
      ids.add(id);
    }
  }

  const possibleHeight =
    properties.height ??
    properties["height"];

  if (
    possibleHeight !== undefined &&
    possibleHeight !== null &&
    Number.isFinite(Number(possibleHeight))
  ) {
    heightCount += 1;
  }

  const possibleFloors =
    properties.num_floors ??
    properties["num_floors"] ??
    properties.levels ??
    properties["levels"];

  if (
    possibleFloors !== undefined &&
    possibleFloors !== null &&
    Number.isFinite(Number(possibleFloors))
  ) {
    floorCount += 1;
  }
}

console.log("DATASET");
console.log("------------------------------------------------------------");
console.log(`Feature count:          ${features.length}`);
console.log("");

console.log("GEOMETRY");
console.log("------------------------------------------------------------");

for (const [type, count] of Object.entries(geometryCounts)) {
  console.log(`${type.padEnd(22)} ${count}`);
}

console.log("");
console.log(`Polygon count:          ${polygonCount}`);
console.log(`MultiPolygon count:     ${multiPolygonCount}`);
console.log(`Empty geometry count:   ${emptyGeometryCount}`);
console.log(`Invalid coordinate count: ${invalidCoordinateCount}`);
console.log("");

console.log("IDENTIFIERS");
console.log("------------------------------------------------------------");
console.log(`Features with ID:       ${idCount}`);
console.log(`Unique IDs:             ${ids.size}`);
console.log(`Duplicate IDs:          ${duplicateIdCount}`);
console.log("");

console.log("BUILDING ATTRIBUTES");
console.log("------------------------------------------------------------");
console.log(`Height values:          ${heightCount}`);
console.log(`Floor values:           ${floorCount}`);
console.log("");

console.log("GEOGRAPHIC EXTENT");
console.log("------------------------------------------------------------");

if (Number.isFinite(minLon)) {
  console.log(`West:                   ${minLon}`);
  console.log(`South:                  ${minLat}`);
  console.log(`East:                   ${maxLon}`);
  console.log(`North:                  ${maxLat}`);
} else {
  console.log("No valid coordinates found.");
}

console.log("");

console.log("PROPERTY FIELDS");
console.log("------------------------------------------------------------");

const sortedPropertyKeys = [...propertyKeys].sort();

for (const key of sortedPropertyKeys) {
  console.log(key);
}

console.log("");

console.log("============================================================");
console.log("VALIDATION COMPLETE");
console.log("============================================================");
console.log("");