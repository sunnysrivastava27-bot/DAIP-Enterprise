import fs from "node:fs/promises";
import path from "node:path";

/* ============================================================
   DAIP — KANPUR ROAD NETWORK VALIDATION
   ------------------------------------------------------------
   INPUT
   -----
   data/kanpur/processed/kanpur-roads-clipped.geojson

   OUTPUT
   ------
   data/kanpur/processed/
   kanpur-road-network-validation.json

   PURPOSE
   -------
   Validate the selected real Kanpur road network before it
   enters the 3D Digital Twin.

   CHECKS
   ------
   1. File exists
   2. GeoJSON structure
   3. Feature count
   4. Geometry types
   5. Empty / invalid coordinate arrays
   6. Bounding box
   7. Road-class distribution
   8. Duplicate OSM IDs
   9. Null / missing OSM IDs
   10. Metadata consistency
============================================================ */

const DATA_DIR = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur",
);

const INPUT_FILE = path.join(
  DATA_DIR,
  "processed",
  "kanpur-roads-clipped.geojson",
);

const OUTPUT_FILE = path.join(
  DATA_DIR,
  "processed",
  "kanpur-road-network-validation.json",
);

/* ============================================================
   EXPECTED DATASET
============================================================ */

const EXPECTED_MIN_ROADS = 10000;

/* ============================================================
   ROAD CLASSES
============================================================ */

const ROAD_CLASSES = [
  "motorway",
  "motorway_link",
  "trunk",
  "trunk_link",
  "primary",
  "primary_link",
  "secondary",
  "secondary_link",
  "tertiary",
  "tertiary_link",
  "unclassified",
  "residential",
  "living_street",
  "service",
  "industrial",
  "road",
  "unknown",
];

/* ============================================================
   READ JSON
============================================================ */

const readJson = async (
  filePath,
) => {
  return JSON.parse(
    await fs.readFile(
      filePath,
      "utf8",
    ),
  );
};

/* ============================================================
   COORDINATE VALIDATION
============================================================ */

const isValidCoordinate = (
  coordinate,
) => {
  return (
    Array.isArray(
      coordinate,
    ) &&
    coordinate.length >= 2 &&
    Number.isFinite(
      Number(coordinate[0]),
    ) &&
    Number.isFinite(
      Number(coordinate[1]),
    )
  );
};

/* ============================================================
   GEOMETRY COORDINATES
============================================================ */

const getLineCoordinates = (
  geometry,
) => {
  if (!geometry) {
    return [];
  }

  if (
    geometry.type ===
    "LineString"
  ) {
    return [
      geometry.coordinates,
    ];
  }

  if (
    geometry.type ===
    "MultiLineString"
  ) {
    return geometry.coordinates;
  }

  return [];
};

/* ============================================================
   MAIN
============================================================ */

const main = async () => {
  console.log("");
  console.log(
    "============================================================",
  );
  console.log(
    "DAIP — KANPUR ROAD NETWORK VALIDATION",
  );
  console.log(
    "============================================================",
  );
  console.log("");

  /* ----------------------------------------------------------
     INPUT
  ---------------------------------------------------------- */

  try {
    await fs.access(
      INPUT_FILE,
    );
  } catch {
    throw new Error(
      [
        "Validated Kanpur road network was not found.",
        "",
        `Expected: ${INPUT_FILE}`,
      ].join("\n"),
    );
  }

  console.log(
    "INPUT:",
  );

  console.log(
    INPUT_FILE,
  );

  console.log("");

  const data =
    await readJson(
      INPUT_FILE,
    );

  /* ==========================================================
     BASIC STRUCTURE
  ========================================================== */

  const checks = {
    fileReadable: true,

    validGeoJSONType:
      data.type ===
      "FeatureCollection",

    featuresArray:
      Array.isArray(
        data.features,
      ),

    featureCountAboveMinimum:
      Array.isArray(
        data.features,
      ) &&
      data.features.length >=
        EXPECTED_MIN_ROADS,

    supportedGeometryTypes:
      true,

    emptyGeometries: 0,

    invalidCoordinates: 0,

    duplicateOsmIds: 0,

    missingOsmIds: 0,

    lineStringFeatures: 0,

    multiLineStringFeatures: 0,

    unsupportedGeometryFeatures: 0,
  };

  if (
    !checks.validGeoJSONType
  ) {
    throw new Error(
      "Input is not a GeoJSON FeatureCollection.",
    );
  }

  if (
    !checks.featuresArray
  ) {
    throw new Error(
      "GeoJSON does not contain a valid features array.",
    );
  }

  const features =
    data.features;

  /* ==========================================================
     STATISTICS
  ========================================================== */

  const classCounts =
    Object.fromEntries(
      ROAD_CLASSES.map(
        (roadClass) => [
          roadClass,
          0,
        ],
      ),
    );

  const osmIds =
    new Set();

  let totalCoordinates =
    0;

  let minLon = Infinity;
  let minLat = Infinity;

  let maxLon = -Infinity;
  let maxLat = -Infinity;

  /* ==========================================================
     FEATURE VALIDATION
  ========================================================== */

  features.forEach(
    (feature, index) => {
      if (
        !feature ||
        feature.type !==
          "Feature"
      ) {
        checks.unsupportedGeometryFeatures +=
          1;

        return;
      }

      const geometry =
        feature.geometry;

      if (!geometry) {
        checks.emptyGeometries +=
          1;

        return;
      }

      const geometryType =
        geometry.type;

      if (
        geometryType ===
        "LineString"
      ) {
        checks.lineStringFeatures +=
          1;
      } else if (
        geometryType ===
        "MultiLineString"
      ) {
        checks.multiLineStringFeatures +=
          1;
      } else {
        checks.unsupportedGeometryFeatures +=
          1;

        return;
      }

      const lineGroups =
        getLineCoordinates(
          geometry,
        );

      if (
        lineGroups.length ===
        0
      ) {
        checks.emptyGeometries +=
          1;

        return;
      }

      let featureHasValidGeometry =
        false;

      for (
        const coordinates of
          lineGroups
      ) {
        if (
          !Array.isArray(
            coordinates,
          ) ||
          coordinates.length <
            2
        ) {
          checks.emptyGeometries +=
            1;

          continue;
        }

        for (
          const coordinate of
            coordinates
        ) {
          if (
            !isValidCoordinate(
              coordinate,
            )
          ) {
            checks.invalidCoordinates +=
              1;

            continue;
          }

          featureHasValidGeometry =
            true;

          totalCoordinates +=
            1;

          const lon =
            Number(
              coordinate[0],
            );

          const lat =
            Number(
              coordinate[1],
            );

          minLon = Math.min(
            minLon,
            lon,
          );

          maxLon = Math.max(
            maxLon,
            lon,
          );

          minLat = Math.min(
            minLat,
            lat,
          );

          maxLat = Math.max(
            maxLat,
            lat,
          );
        }
      }

      if (!featureHasValidGeometry) {
        checks.emptyGeometries +=
          1;
      }

      /* --------------------------------------------------------
         OSM ID
      -------------------------------------------------------- */

      const osmId =
        feature.properties?.osmId ??
        feature.properties?.osm_id ??
        null;

      if (
        osmId === null ||
        osmId === undefined ||
        String(osmId).trim() === ""
      ) {
        checks.missingOsmIds +=
          1;
      } else {
        const key =
          String(osmId);

        if (
          osmIds.has(key)
        ) {
          checks.duplicateOsmIds +=
            1;
        } else {
          osmIds.add(key);
        }
      }

      /* --------------------------------------------------------
         ROAD CLASS
      -------------------------------------------------------- */

      const roadClass =
        String(
          feature.properties?.highway ??
            feature.properties?.fclass ??
            "unknown",
        )
          .trim()
          .toLowerCase() ||
        "unknown";

      if (
        Object.prototype.hasOwnProperty.call(
          classCounts,
          roadClass,
        )
      ) {
        classCounts[
          roadClass
        ] += 1;
      } else {
        classCounts.unknown +=
          1;
      }
    },
  );

  /* ==========================================================
     FINAL CHECKS
  ========================================================== */

  checks.supportedGeometryTypes =
    checks.unsupportedGeometryFeatures ===
    0;

  const roadCount =
    features.length;

  const duplicateFree =
    checks.duplicateOsmIds ===
    0;

  const geometryClean =
    checks.emptyGeometries ===
      0 &&
    checks.invalidCoordinates ===
      0 &&
    checks.unsupportedGeometryFeatures ===
      0;

  const boundingBoxAvailable =
    Number.isFinite(
      minLon,
    ) &&
    Number.isFinite(
      minLat,
    ) &&
    Number.isFinite(
      maxLon,
    ) &&
    Number.isFinite(
      maxLat,
    );

  /* ==========================================================
     GEOGRAPHIC SANITY CHECK
     ----------------------------------------------------------
     We expect Kanpur approximately around:
       longitude: 80.x
       latitude : 26.x

     This is only a sanity check, not an official boundary test.
  ========================================================== */

  const geographicSanity =
    boundingBoxAvailable &&
    minLon >= 79.5 &&
    maxLon <= 81.0 &&
    minLat >= 25.8 &&
    maxLat <= 27.0;

  const networkPass =
    roadCount >=
      EXPECTED_MIN_ROADS &&
    checks.validGeoJSONType &&
    checks.featuresArray &&
    checks.supportedGeometryTypes &&
    geometryClean &&
    duplicateFree &&
    boundingBoxAvailable &&
    geographicSanity;

  /* ==========================================================
     REPORT
  ========================================================== */

  const report = {
    validationStatus:
      networkPass
        ? "PASS"
        : "REVIEW",

    generatedAt:
      new Date().toISOString(),

    source: {
      roadDataset:
        "OpenStreetMap via Geofabrik Central Zone",

      boundaryDataset:
        "DataMeet candidate Kanpur city boundary",

      officialKdaBoundary:
        false,
    },

    dataset: {
      featureCount:
        roadCount,

      coordinateCount:
        totalCoordinates,

      geometryTypes: {
        LineString:
          checks.lineStringFeatures,

        MultiLineString:
          checks.multiLineStringFeatures,
      },

      roadClassCounts:
        classCounts,

      uniqueOsmIds:
        osmIds.size,
    },

    spatialExtent: {
      west:
        boundingBoxAvailable
          ? minLon
          : null,

      south:
        boundingBoxAvailable
          ? minLat
          : null,

      east:
        boundingBoxAvailable
          ? maxLon
          : null,

      north:
        boundingBoxAvailable
          ? maxLat
          : null,
    },

    checks: {
      validGeoJSONType:
        checks.validGeoJSONType,

      featuresArray:
        checks.featuresArray,

      featureCountAboveMinimum:
        checks.featureCountAboveMinimum,

      supportedGeometryTypes:
        checks.supportedGeometryTypes,

      emptyGeometries:
        checks.emptyGeometries,

      invalidCoordinates:
        checks.invalidCoordinates,

      duplicateOsmIds:
        checks.duplicateOsmIds,

      missingOsmIds:
        checks.missingOsmIds,

      geographicSanity:
        geographicSanity,
    },

    interpretation: {
      datasetReadyFor3D:
        networkPass,

      officialKdaBoundaryConfirmed:
        false,

      notes:
        networkPass
          ? "Road dataset passed structural and geographic validation. It can proceed to the 3D visualization stage, while the boundary remains a candidate city boundary rather than an officially confirmed KDA authority boundary."
          : "Road dataset requires review before entering the 3D Digital Twin.",
    },
  };

  /* ==========================================================
     SAVE REPORT
  ========================================================== */

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      report,
      null,
      2,
    ),
    "utf8",
  );

  /* ==========================================================
     TERMINAL REPORT
  ========================================================== */

  console.log(
    "============================================================",
  );

  console.log(
    "VALIDATION RESULTS",
  );

  console.log(
    "============================================================",
  );

  console.log("");

  console.log(
    `Total road features: ${roadCount.toLocaleString()}`,
  );

  console.log(
    `Total coordinates: ${totalCoordinates.toLocaleString()}`,
  );

  console.log("");

  console.log(
    "Geometry:",
  );

  console.log(
    `  LineString: ${checks.lineStringFeatures.toLocaleString()}`,
  );

  console.log(
    `  MultiLineString: ${checks.multiLineStringFeatures.toLocaleString()}`,
  );

  console.log(
    `  Empty: ${checks.emptyGeometries.toLocaleString()}`,
  );

  console.log(
    `  Invalid coordinates: ${checks.invalidCoordinates.toLocaleString()}`,
  );

  console.log(
    `  Unsupported: ${checks.unsupportedGeometryFeatures.toLocaleString()}`,
  );

  console.log("");

  console.log(
    "OSM IDs:",
  );

  console.log(
    `  Unique: ${osmIds.size.toLocaleString()}`,
  );

  console.log(
    `  Duplicate: ${checks.duplicateOsmIds.toLocaleString()}`,
  );

  console.log(
    `  Missing: ${checks.missingOsmIds.toLocaleString()}`,
  );

  console.log("");

  console.log(
    "Bounding box:",
  );

  console.log(
    `  West : ${minLon}`,
  );

  console.log(
    `  South: ${minLat}`,
  );

  console.log(
    `  East : ${maxLon}`,
  );

  console.log(
    `  North: ${maxLat}`,
  );

  console.log("");

  console.log(
    "ROAD CLASS DISTRIBUTION",
  );

  console.log(
    "------------------------------------------------------------",
  );

  for (
    const roadClass of
      ROAD_CLASSES
  ) {
    const count =
      classCounts[
        roadClass
      ];

    if (
      count > 0
    ) {
      console.log(
        `${roadClass.padEnd(
          18,
        )} ${count.toLocaleString()}`,
      );
    }
  }

  console.log("");

  console.log(
    "============================================================",
  );

  console.log(
    `GEOGRAPHIC SANITY: ${
      geographicSanity
        ? "PASS"
        : "REVIEW"
    }`,
  );

  console.log(
    `GEOMETRY QUALITY: ${
      geometryClean
        ? "PASS"
        : "REVIEW"
    }`,
  );

  console.log(
    `DUPLICATE OSM IDS: ${
      duplicateFree
        ? "PASS"
        : "REVIEW"
    }`,
  );

  console.log(
    `OVERALL STATUS: ${
      networkPass
        ? "PASS"
        : "REVIEW"
    }`,
  );

  console.log(
    "============================================================",
  );

  console.log("");

  console.log(
    `Validation report saved: ${OUTPUT_FILE}`,
  );

  console.log("");
};

main().catch(
  (error) => {
    console.error("");
    console.error(
      "KANPUR ROAD NETWORK VALIDATION FAILED",
    );
    console.error("");

    console.error(
      error instanceof Error
        ? error.message
        : error,
    );

    console.error("");

    process.exit(1);
  },
);