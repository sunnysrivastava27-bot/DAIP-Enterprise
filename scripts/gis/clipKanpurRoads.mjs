import fs from "node:fs/promises";
import path from "node:path";

import {
  booleanIntersects,
} from "@turf/turf";

/* ============================================================
   DAIP — KANPUR ROAD NETWORK SELECTION V3
   ------------------------------------------------------------
   PURPOSE
   -------
   Select all real OSM road features that intersect the
   validated candidate Kanpur city boundary.

   This is deliberately a SELECTION step.

   Exact geometric clipping will be a separate later step.

   INPUT
   -----
   raw/kanpur-roads.geojson
   boundaries/kanpur-city-boundary-validated.geojson

   OUTPUT
   ------
   processed/kanpur-roads-clipped.geojson
============================================================ */

const DATA_DIR = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur",
);

const RAW_ROADS_FILE = path.join(
  DATA_DIR,
  "raw",
  "kanpur-roads.geojson",
);

const BOUNDARY_FILE = path.join(
  DATA_DIR,
  "boundaries",
  "kanpur-city-boundary-validated.geojson",
);

const OUTPUT_DIR = path.join(
  DATA_DIR,
  "processed",
);

const OUTPUT_FILE = path.join(
  OUTPUT_DIR,
  "kanpur-roads-clipped.geojson",
);

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
   GET BOUNDARY FEATURES
============================================================ */

const getBoundaryFeatures = (
  boundaryData,
) => {
  if (
    boundaryData.type ===
    "FeatureCollection"
  ) {
    return boundaryData.features;
  }

  if (
    boundaryData.type ===
    "Feature"
  ) {
    return [boundaryData];
  }

  throw new Error(
    `Unsupported boundary type: ${boundaryData.type}`,
  );
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
    "DAIP — KANPUR ROAD NETWORK SELECTION",
  );
  console.log(
    "============================================================",
  );
  console.log("");

  const roads =
    await readJson(
      RAW_ROADS_FILE,
    );

  const boundaryData =
    await readJson(
      BOUNDARY_FILE,
    );

  const roadFeatures =
    Array.isArray(
      roads.features,
    )
      ? roads.features
      : [];

  const boundaryFeatures =
    getBoundaryFeatures(
      boundaryData,
    );

  if (
    roadFeatures.length === 0
  ) {
    throw new Error(
      "Raw road dataset contains zero features.",
    );
  }

  if (
    boundaryFeatures.length === 0
  ) {
    throw new Error(
      "Boundary contains zero features.",
    );
  }

  console.log(
    `Raw road features: ${roadFeatures.length.toLocaleString()}`,
  );

  console.log(
    `Boundary features: ${boundaryFeatures.length}`,
  );

  console.log("");

  const selectedFeatures = [];

  const seenIds =
    new Set();

  let processed = 0;

  let intersecting = 0;

  for (
    const road of roadFeatures
  ) {
    processed += 1;

    if (
      !road?.geometry
    ) {
      continue;
    }

    let intersects =
      false;

    /* --------------------------------------------------------
       Test the road against every boundary polygon.
    -------------------------------------------------------- */

    for (
      const boundaryFeature of
        boundaryFeatures
    ) {
      if (
        !boundaryFeature?.geometry
      ) {
        continue;
      }

      try {
        if (
          booleanIntersects(
            road,
            boundaryFeature,
          )
        ) {
          intersects = true;
          break;
        }
      } catch {
        /*
         * Ignore one invalid geometry and continue.
         */
      }
    }

    if (!intersects) {
      continue;
    }

    intersecting += 1;

    /* --------------------------------------------------------
       Prevent duplicate OSM road IDs.
    -------------------------------------------------------- */

    const osmId =
      road.properties?.osmId ??
      road.properties?.osm_id ??
      null;

    if (
      osmId !== null &&
      osmId !== undefined
    ) {
      const key =
        String(osmId);

      if (
        seenIds.has(key)
      ) {
        continue;
      }

      seenIds.add(key);
    }

    selectedFeatures.push(
      road,
    );

    if (
      processed %
        2500 ===
      0
    ) {
      console.log(
        `Processed ${processed.toLocaleString()} / ${roadFeatures.length.toLocaleString()} roads`,
      );
    }
  }

  console.log("");

  console.log(
    "============================================================",
  );

  console.log(
    "SELECTION RESULTS",
  );

  console.log(
    "============================================================",
  );

  console.log(
    `Raw roads: ${roadFeatures.length.toLocaleString()}`,
  );

  console.log(
    `Road features intersecting boundary: ${intersecting.toLocaleString()}`,
  );

  console.log(
    `Final unique Kanpur road features: ${selectedFeatures.length.toLocaleString()}`,
  );

  console.log("");

  await fs.mkdir(
    OUTPUT_DIR,
    {
      recursive: true,
    },
  );

  const output = {
    type: "FeatureCollection",

    metadata: {
      source:
        "OpenStreetMap via Geofabrik Central Zone",

      boundarySource:
        "DataMeet candidate Kanpur city boundary",

      boundaryValidation:
        "CANDIDATE-PASS",

      officialKdaBoundary:
        false,

      processingMode:
        "BOUNDARY-INTERSECTION-SELECTION",

      generatedAt:
        new Date().toISOString(),

      rawRoadFeatureCount:
        roadFeatures.length,

      intersectingRoadFeatureCount:
        intersecting,

      finalFeatureCount:
        selectedFeatures.length,

      attribution:
        "© OpenStreetMap contributors",

      notes:
        "Road features intersecting the validated candidate Kanpur city boundary. This dataset is selected, not geometrically clipped at the boundary edge.",
    },

    features:
      selectedFeatures,
  };

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      output,
      null,
      2,
    ),
    "utf8",
  );

  console.log(
    "SUCCESS",
  );

  console.log(
    `Output: ${OUTPUT_FILE}`,
  );

  console.log(
    `Final feature count: ${selectedFeatures.length.toLocaleString()}`,
  );

  console.log("");
};

main().catch(
  (error) => {
    console.error("");
    console.error(
      "KANPUR ROAD SELECTION FAILED",
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