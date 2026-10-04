import fs from "node:fs";
import path from "node:path";

const RAW_FILE = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur/raw/kanpur-buildings.geojson",
);

console.log("");
console.log("============================================================");
console.log("DAIP — KANPUR BUILDING GEOMETRY ANALYSIS");
console.log("============================================================");
console.log("");

if (!fs.existsSync(RAW_FILE)) {
  throw new Error(`Building dataset not found:\n${RAW_FILE}`);
}

const data = JSON.parse(fs.readFileSync(RAW_FILE, "utf8"));

if (!data || data.type !== "FeatureCollection") {
  throw new Error("Invalid GeoJSON FeatureCollection.");
}

const features = data.features;

let polygonCount = 0;
let multiPolygonCount = 0;

let totalRings = 0;
let totalVertices = 0;

let minVertices = Infinity;
let maxVertices = 0;

let totalAreaApprox = 0;

const vertexBuckets = {
  "4-5": 0,
  "6-10": 0,
  "11-20": 0,
  "21-50": 0,
  "51-100": 0,
  "101-250": 0,
  "251-500": 0,
  "501+": 0,
};

function processRing(ring) {
  if (!Array.isArray(ring)) return;

  const vertexCount = ring.length;

  totalRings += 1;
  totalVertices += vertexCount;

  minVertices = Math.min(minVertices, vertexCount);
  maxVertices = Math.max(maxVertices, vertexCount);

  if (vertexCount <= 5) {
    vertexBuckets["4-5"] += 1;
  } else if (vertexCount <= 10) {
    vertexBuckets["6-10"] += 1;
  } else if (vertexCount <= 20) {
    vertexBuckets["11-20"] += 1;
  } else if (vertexCount <= 50) {
    vertexBuckets["21-50"] += 1;
  } else if (vertexCount <= 100) {
    vertexBuckets["51-100"] += 1;
  } else if (vertexCount <= 250) {
    vertexBuckets["101-250"] += 1;
  } else if (vertexCount <= 500) {
    vertexBuckets["251-500"] += 1;
  } else {
    vertexBuckets["501+"] += 1;
  }
}

function processPolygonCoordinates(coordinates) {
  if (!Array.isArray(coordinates)) return;

  for (const ring of coordinates) {
    processRing(ring);
  }
}

function processGeometry(geometry) {
  if (!geometry) return;

  if (geometry.type === "Polygon") {
    polygonCount += 1;
    processPolygonCoordinates(geometry.coordinates);
  }

  if (geometry.type === "MultiPolygon") {
    multiPolygonCount += 1;

    for (const polygon of geometry.coordinates) {
      processPolygonCoordinates(polygon);
    }
  }
}

for (const feature of features) {
  processGeometry(feature.geometry);
}

const averageVertices =
  features.length > 0
    ? totalVertices / features.length
    : 0;

console.log("DATASET");
console.log("------------------------------------------------------------");
console.log(`Features:               ${features.length}`);
console.log(`Polygon features:       ${polygonCount}`);
console.log(`MultiPolygon features:  ${multiPolygonCount}`);
console.log("");

console.log("GEOMETRY SIZE");
console.log("------------------------------------------------------------");
console.log(`Total rings:            ${totalRings.toLocaleString()}`);
console.log(`Total vertices:         ${totalVertices.toLocaleString()}`);
console.log(
  `Average vertices/building: ${averageVertices.toFixed(2)}`,
);
console.log(
  `Minimum ring vertices:  ${minVertices}`,
);
console.log(
  `Maximum ring vertices:  ${maxVertices}`,
);
console.log("");

console.log("RING VERTEX DISTRIBUTION");
console.log("------------------------------------------------------------");

for (const [bucket, count] of Object.entries(vertexBuckets)) {
  console.log(
    `${bucket.padEnd(12)} ${count.toLocaleString()}`,
  );
}

console.log("");

console.log("============================================================");
console.log("ANALYSIS COMPLETE");
console.log("============================================================");
console.log("");