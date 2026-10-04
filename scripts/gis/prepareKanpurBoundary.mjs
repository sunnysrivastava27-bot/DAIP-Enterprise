import fs from "node:fs/promises";
import path from "node:path";
import {
  area,
  bbox,
  booleanIntersects,
  feature,
  featureCollection,
} from "@turf/turf";

/* ============================================================
   DAIP — KANPUR BOUNDARY VALIDATION
   ============================================================

   PURPOSE
   -------
   1. Download the candidate Kanpur city boundary.
   2. Save the raw boundary locally.
   3. Validate geometry.
   4. Calculate geographic extent.
   5. Calculate area.
   6. Compare it with KDA's published ~300 sq.km. city-area
      statement as a SANITY CHECK only.
   7. Test how many of our real OSM road features intersect it.

   IMPORTANT
   ---------
   This DataMeet boundary is a CANDIDATE CITY BOUNDARY.

   It is NOT being represented here as an official KDA
   authority boundary.

   Later, when KDA supplies/authorizes an authority GIS
   boundary, that official geometry will replace this candidate.
============================================================ */

/* ============================================================
   SOURCE
============================================================ */

const SOURCE_URL =
  "https://raw.githubusercontent.com/datameet/Municipal_Spatial_Data/master/Kanpur/Kanpur_city_boundaries.geojson";

/* ============================================================
   OUTPUT
============================================================ */

const DATA_DIR = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur",
);

const RAW_DIR = path.join(
  DATA_DIR,
  "raw",
);

const BOUNDARY_DIR = path.join(
  DATA_DIR,
  "boundaries",
);

const RAW_BOUNDARY_FILE = path.join(
  BOUNDARY_DIR,
  "kanpur-city-boundary-datameet.geojson",
);

const VALIDATED_BOUNDARY_FILE = path.join(
  BOUNDARY_DIR,
  "kanpur-city-boundary-validated.geojson",
);

const ROADS_FILE = path.join(
  RAW_DIR,
  "kanpur-roads.geojson",
);

/* ============================================================
   EXPECTED KANPUR REFERENCE
   ============================================================ */

const KANPUR_REFERENCE = {
  latitude: 26.461,
  longitude: 80.322,
};

/*
 * KDA publicly describes Kanpur city area as approximately
 * 300 square kilometres.
 *
 * We use this only as a broad sanity check.
 */
const KDA_PUBLISHED_AREA_SQ_KM =
  300;

/*
 * Sanity tolerance is intentionally broad because:
 * - city boundary
 * - municipal boundary
 * - planning/authority boundary
 *
 * are not guaranteed to be identical.
 */
const AREA_SANITY_MIN_SQ_KM = 180;

const AREA_SANITY_MAX_SQ_KM = 420;

/* ============================================================
   DOWNLOAD
============================================================ */

const downloadBoundary =
  async () => {
    console.log(
      "Downloading candidate Kanpur city boundary...",
    );

    const response =
      await fetch(
        SOURCE_URL,
        {
          headers: {
            Accept:
              "application/geo+json, application/json",
            "User-Agent":
              "DAIP-Kanpur-Digital-Twin/1.0",
          },
        },
      );

    if (!response.ok) {
      throw new Error(
        `Boundary download failed: ${response.status} ${response.statusText}`,
      );
    }

    const data =
      await response.json();

    return data;
  };

/* ============================================================
   GEOMETRY NORMALIZATION
============================================================ */

const normalizeBoundary =
  (data) => {
    if (
      data.type ===
      "FeatureCollection"
    ) {
      if (
        !Array.isArray(
          data.features,
        ) ||
        data.features.length === 0
      ) {
        throw new Error(
          "Boundary FeatureCollection contains no features.",
        );
      }

      return data;
    }

    if (
      data.type ===
        "Feature" &&
      data.geometry
    ) {
      return featureCollection([
        data,
      ]);
    }

    if (
      data.type ===
        "Polygon" ||
      data.type ===
        "MultiPolygon"
    ) {
      return featureCollection([
        feature(
          data,
        ),
      ]);
    }

    throw new Error(
      `Unsupported boundary GeoJSON type: ${data.type}`,
    );
  };

/* ============================================================
   BUILD UNIFIED BOUNDARY
============================================================ */

const buildBoundaryFeature =
  (collection) => {
    /*
     * We keep the source geometry intact rather than trying to
     * dissolve/rebuild it blindly.
     *
     * If there is one feature, that is the boundary.
     *
     * If there are multiple features, we keep them as a
     * FeatureCollection and validate the combined extent.
     */
    if (
      collection.features.length ===
      1
    ) {
      return collection.features[0];
    }

    return collection;
  };

/* ============================================================
   AREA
============================================================ */

const calculateAreaSqKm =
  (boundary) => {
    const squareMeters =
      area(boundary);

    return (
      squareMeters / 1_000_000
    );
  };

/* ============================================================
   BOUNDARY REPORT
============================================================ */

const printBoundaryReport =
  (boundary) => {
    const boundaryBbox =
      bbox(boundary);

    const areaSqKm =
      calculateAreaSqKm(
        boundary,
      );

    console.log("");
    console.log(
      "============================================================",
    );

    console.log(
      "BOUNDARY VALIDATION",
    );

    console.log(
      "============================================================",
    );

    console.log("");

    console.log(
      "Bounding box:",
    );

    console.log(
      `  west  : ${boundaryBbox[0]}`,
    );

    console.log(
      `  south : ${boundaryBbox[1]}`,
    );

    console.log(
      `  east  : ${boundaryBbox[2]}`,
    );

    console.log(
      `  north : ${boundaryBbox[3]}`,
    );

    console.log("");

    console.log(
      `Calculated boundary area: ${areaSqKm.toFixed(2)} sq.km`,
    );

    console.log(
      `KDA published reference: approximately ${KDA_PUBLISHED_AREA_SQ_KM} sq.km`,
    );

    const passesAreaSanity =
      areaSqKm >=
        AREA_SANITY_MIN_SQ_KM &&
      areaSqKm <=
        AREA_SANITY_MAX_SQ_KM;

    console.log("");

    console.log(
      `Area sanity check: ${
        passesAreaSanity
          ? "PASS"
          : "REVIEW"
      }`,
    );

    /*
     * Reference point check.
     *
     * For a FeatureCollection we test whether the reference
     * point intersects any boundary feature.
     */
    const referencePoint =
      feature({
        type: "Point",
        coordinates: [
          KANPUR_REFERENCE.longitude,
          KANPUR_REFERENCE.latitude,
        ],
      });

    let referenceIntersects =
      false;

    if (
      boundary.type ===
      "FeatureCollection"
    ) {
      referenceIntersects =
        boundary.features.some(
          (item) =>
            booleanIntersects(
              referencePoint,
              item,
            ),
        );
    } else {
      referenceIntersects =
        booleanIntersects(
          referencePoint,
          boundary,
        );
    }

    console.log(
      `Kanpur reference-point check: ${
        referenceIntersects
          ? "PASS"
          : "REVIEW"
      }`,
    );

    return {
      boundaryBbox,
      areaSqKm,
      passesAreaSanity,
      referenceIntersects,
    };
  };

/* ============================================================
   ROAD OVERLAY TEST
============================================================ */

const validateRoadOverlay =
  async (
    boundary,
  ) => {
    try {
      await fs.access(
        ROADS_FILE,
      );
    } catch {
      console.log("");
      console.log(
        "Road overlay test: SKIPPED",
      );
      console.log(
        "kanpur-roads.geojson was not found.",
      );

      return {
        available: false,
        intersectingRoads: 0,
        totalRoads: 0,
      };
    }

    console.log("");

    console.log(
      "Loading real OSM road dataset...",
    );

    const roads =
      JSON.parse(
        await fs.readFile(
          ROADS_FILE,
          "utf8",
        ),
      );

    const roadFeatures =
      Array.isArray(
        roads.features,
      )
        ? roads.features
        : [];

    let intersectingRoads =
      0;

    for (
      const road of roadFeatures
    ) {
      if (
        !road.geometry
      ) {
        continue;
      }

      let intersects =
        false;

      if (
        boundary.type ===
        "FeatureCollection"
      ) {
        for (
          const boundaryFeature of
            boundary.features
        ) {
          if (
            booleanIntersects(
              road,
              boundaryFeature,
            )
          ) {
            intersects = true;
            break;
          }
        }
      } else {
        intersects =
          booleanIntersects(
            road,
            boundary,
          );
      }

      if (intersects) {
        intersectingRoads += 1;
      }
    }

    console.log(
      `Road features in raw dataset: ${roadFeatures.length.toLocaleString()}`,
    );

    console.log(
      `Road features intersecting candidate boundary: ${intersectingRoads.toLocaleString()}`,
    );

    return {
      available: true,
      intersectingRoads,
      totalRoads:
        roadFeatures.length,
    };
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
    "DAIP — KANPUR CITY BOUNDARY VALIDATION",
  );

  console.log(
    "============================================================",
  );

  console.log("");

  console.log(
    "Candidate source:",
  );

  console.log(
    SOURCE_URL,
  );

  console.log("");

  /* ----------------------------------------------------------
     Download
  ---------------------------------------------------------- */

  const sourceData =
    await downloadBoundary();

  /* ----------------------------------------------------------
     Normalize
  ---------------------------------------------------------- */

  const normalized =
    normalizeBoundary(
      sourceData,
    );

  /* ----------------------------------------------------------
     Build boundary object
  ---------------------------------------------------------- */

  const boundary =
    buildBoundaryFeature(
      normalized,
    );

  /* ----------------------------------------------------------
     Create folders
  ---------------------------------------------------------- */

  await fs.mkdir(
    BOUNDARY_DIR,
    {
      recursive: true,
    },
  );

  /* ----------------------------------------------------------
     Save raw candidate
  ---------------------------------------------------------- */

  await fs.writeFile(
    RAW_BOUNDARY_FILE,
    JSON.stringify(
      normalized,
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    `Raw candidate saved: ${RAW_BOUNDARY_FILE}`,
  );

  /* ----------------------------------------------------------
     Validate
  ---------------------------------------------------------- */

  const report =
    printBoundaryReport(
      boundary,
    );

  /* ----------------------------------------------------------
     Road overlay
  ---------------------------------------------------------- */

  const roadReport =
    await validateRoadOverlay(
      boundary,
    );

  /* ----------------------------------------------------------
     Validation metadata
  ---------------------------------------------------------- */

  const validated = {
    type: "FeatureCollection",

    metadata: {
      source:
        "DataMeet Municipal Spatial Data — Kanpur city boundary",

      sourceUrl:
        SOURCE_URL,

      validationStatus:
        report.passesAreaSanity &&
        report.referenceIntersects
          ? "CANDIDATE-PASS"
          : "REVIEW",

      officialKdaBoundary:
        false,

      importantNote:
        "This is a candidate city boundary and must not be represented as an official KDA authority boundary without authoritative confirmation.",

      calculatedAreaSqKm:
        report.areaSqKm,

      kdaPublishedAreaReferenceSqKm:
        KDA_PUBLISHED_AREA_SQ_KM,

      roadOverlayAvailable:
        roadReport.available,

      roadFeaturesIntersecting:
        roadReport.intersectingRoads,
    },

    features:
      normalized.features,
  };

  await fs.writeFile(
    VALIDATED_BOUNDARY_FILE,
    JSON.stringify(
      validated,
      null,
      2,
    ),
    "utf8",
  );

  console.log("");

  console.log(
    "============================================================",
  );

  console.log(
    "VALIDATION RESULT",
  );

  console.log(
    "============================================================",
  );

  console.log(
    `Area check: ${
      report.passesAreaSanity
        ? "PASS"
        : "REVIEW"
    }`,
  );

  console.log(
    `Kanpur reference point: ${
      report.referenceIntersects
        ? "PASS"
        : "REVIEW"
    }`,
  );

  console.log(
    `Road overlay: ${
      roadReport.available
        ? "CHECKED"
        : "SKIPPED"
    }`,
  );

  console.log("");

  console.log(
    `Validated candidate saved: ${VALIDATED_BOUNDARY_FILE}`,
  );

  console.log("");

  console.log(
    "IMPORTANT:",
  );

  console.log(
    "This boundary is NOT yet approved as the official KDA boundary.",
  );

  console.log(
    "It is a validated candidate city boundary.",
  );

  console.log("");
};

main().catch(
  (error) => {
    console.error("");
    console.error(
      "BOUNDARY VALIDATION FAILED:",
    );

    console.error(
      error instanceof Error
        ? error.message
        : error,
    );

    console.error("");

    process.exit(1);
  },
);