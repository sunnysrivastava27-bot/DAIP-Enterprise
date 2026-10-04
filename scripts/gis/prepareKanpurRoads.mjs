import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import unzipper from "unzipper";
import shapefile from "shapefile";

/* ============================================================
   DAIP — KANPUR REAL ROAD GIS PREPARATION
   CENTRAL ZONE SOURCE
============================================================ */

const SOURCE_FILE = path.resolve(
  "scripts/gis/source/central-zone-260817-free.shp.zip",
);

const OUTPUT_DIR = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur/raw",
);

const TEMP_DIR = path.resolve(
  "scripts/gis/temp/kanpur-roads",
);

const OUTPUT_FILE = path.join(
  OUTPUT_DIR,
  "kanpur-roads.geojson",
);

/* ============================================================
   KANPUR WORKING ENVELOPE
   ------------------------------------------------------------
   This is NOT the official KDA boundary.
============================================================ */

const BBOX = {
  west: 80.12,
  south: 26.32,
  east: 80.55,
  north: 26.60,
};

/* ============================================================
   ROAD SOURCE EXTRACTION
============================================================ */

const extractRoadFiles =
  async () => {
    console.log(
      "Opening Central Zone ZIP...",
    );

    const archive =
      await unzipper.Open.file(
        SOURCE_FILE,
      );

    const entries =
      archive.files.filter(
        (entry) => {
          const lower =
            entry.path.toLowerCase();

          return (
            lower.includes(
              "gis_osm_roads_free_1.",
            ) &&
            (
              lower.endsWith(
                ".shp",
              ) ||
              lower.endsWith(
                ".dbf",
              ) ||
              lower.endsWith(
                ".shx",
              ) ||
              lower.endsWith(
                ".prj",
              ) ||
              lower.endsWith(
                ".cpg",
              )
            )
          );
        },
      );

    if (!entries.length) {
      throw new Error(
        "Central Zone road shapefile components were not found.",
      );
    }

    await fs.rm(
      TEMP_DIR,
      {
        recursive: true,
        force: true,
      },
    );

    await fs.mkdir(
      TEMP_DIR,
      {
        recursive: true,
      },
    );

    const files = {};

    for (
      const entry of entries
    ) {
      const fileName =
        path.basename(
          entry.path,
        );

      const outputPath =
        path.join(
          TEMP_DIR,
          fileName,
        );

      console.log(
        `Extracting ${fileName}...`,
      );

      await new Promise(
        (resolve, reject) => {
          const output =
            createWriteStream(
              outputPath,
            );

          output.on(
            "finish",
            resolve,
          );

          output.on(
            "error",
            reject,
          );

          entry
            .stream()
            .on(
              "error",
              reject,
            )
            .pipe(output);
        },
      );

      const extension =
        path
          .extname(fileName)
          .slice(1)
          .toLowerCase();

      files[extension] =
        outputPath;
    }

    return files;
  };

/* ============================================================
   GEOMETRY HELPERS
============================================================ */

const flattenCoordinates =
  (geometry) => {
    if (!geometry) {
      return [];
    }

    if (
      geometry.type ===
      "LineString"
    ) {
      return geometry.coordinates;
    }

    if (
      geometry.type ===
      "MultiLineString"
    ) {
      return geometry.coordinates.flat();
    }

    return [];
  };

const geometryIntersectsBbox =
  (geometry) => {
    const coordinates =
      flattenCoordinates(
        geometry,
      );

    if (!coordinates.length) {
      return false;
    }

    let minLon = Infinity;
    let minLat = Infinity;

    let maxLon = -Infinity;
    let maxLat = -Infinity;

    for (
      const point of coordinates
    ) {
      const lon =
        Number(point[0]);

      const lat =
        Number(point[1]);

      if (
        !Number.isFinite(lon) ||
        !Number.isFinite(lat)
      ) {
        continue;
      }

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

    return !(
      maxLon < BBOX.west ||
      minLon > BBOX.east ||
      maxLat < BBOX.south ||
      minLat > BBOX.north
    );
  };

/* ============================================================
   NORMALIZE ROAD FEATURE
============================================================ */

const normalizeFeature =
  (feature) => {
    if (
      !feature ||
      !feature.geometry
    ) {
      return null;
    }

    if (
      !geometryIntersectsBbox(
        feature.geometry,
      )
    ) {
      return null;
    }

    const properties =
      feature.properties ?? {};

    const highway =
      String(
        properties.fclass ??
          properties.highway ??
          "unknown",
      )
        .trim()
        .toLowerCase();

    const osmId =
      properties.osm_id ??
      null;

    return {
      type: "Feature",

      properties: {
        osmId,

        name:
          properties.name ??
          null,

        highway,

        ref:
          properties.ref ??
          null,

        oneway:
          properties.oneway ??
          null,

        maxspeed:
          properties.maxspeed ??
          null,

        lanes:
          properties.lanes ??
          null,

        bridge:
          properties.bridge ??
          null,

        tunnel:
          properties.tunnel ??
          null,

        source:
          "OpenStreetMap via Geofabrik Central Zone",
      },

      geometry:
        feature.geometry,
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
    "DAIP — KANPUR REAL ROAD GIS PREPARATION",
  );
  console.log(
    "============================================================",
  );
  console.log("");

  try {
    await fs.access(
      SOURCE_FILE,
    );
  } catch {
    throw new Error(
      [
        "Central Zone source ZIP was not found.",
        "",
        `Expected: ${SOURCE_FILE}`,
      ].join("\n"),
    );
  }

  console.log(
    "SOURCE:",
  );

  console.log(
    SOURCE_FILE,
  );

  console.log("");

  console.log(
    `Kanpur BBOX: ${BBOX.west}, ${BBOX.south} → ${BBOX.east}, ${BBOX.north}`,
  );

  console.log("");

  const files =
    await extractRoadFiles();

  if (
    !files.shp ||
    !files.dbf
  ) {
    throw new Error(
      "Road SHP/DBF files are missing after extraction.",
    );
  }

  console.log("");

  console.log(
    "Opening Central Zone road layer...",
  );

  const source =
    await shapefile.open(
      files.shp,
      files.dbf,
    );

  const features = [];

  const seenIds =
    new Set();

  const classCounts =
    new Map();

  let rawCount = 0;

  let geometryCount = 0;

  let kanpurCount = 0;

  while (true) {
    const result =
      await source.read();

    if (
      result.done
    ) {
      break;
    }

    rawCount += 1;

    const feature =
      result.value;

    if (
      !feature ||
      !feature.geometry
    ) {
      continue;
    }

    geometryCount += 1;

    const normalized =
      normalizeFeature(
        feature,
      );

    if (!normalized) {
      continue;
    }

    kanpurCount += 1;

    const highway =
      normalized.properties
        .highway;

    classCounts.set(
      highway,
      (
        classCounts.get(
          highway,
        ) ?? 0
      ) + 1,
    );

    const osmId =
      normalized.properties
        .osmId;

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

    features.push(
      normalized,
    );

    if (
      kanpurCount %
        10000 ===
      0
    ) {
      console.log(
        `Kanpur road candidates: ${kanpurCount.toLocaleString()}`,
      );
    }
  }

  console.log("");
  console.log(
    "============================================================",
  );

  console.log(
    "GIS DIAGNOSTICS",
  );

  console.log(
    "============================================================",
  );

  console.log(
    `Raw records read: ${rawCount.toLocaleString()}`,
  );

  console.log(
    `Records with geometry: ${geometryCount.toLocaleString()}`,
  );

  console.log(
    `Kanpur records selected: ${kanpurCount.toLocaleString()}`,
  );

  console.log(
    `Final unique road features: ${features.length.toLocaleString()}`,
  );

  console.log("");

  console.log(
    "Road classes:",
  );

  for (
    const [
      name,
      quantity,
    ] of classCounts
  ) {
    console.log(
      `  ${name}: ${quantity.toLocaleString()}`,
    );
  }

  console.log("");

  const geojson = {
    type: "FeatureCollection",

    metadata: {
      source:
        "OpenStreetMap via Geofabrik Central Zone",

      bbox: [
        BBOX.west,
        BBOX.south,
        BBOX.east,
        BBOX.north,
      ],

      processedAt:
        new Date().toISOString(),

      featureCount:
        features.length,

      attribution:
        "© OpenStreetMap contributors",

      notes:
        "Initial Kanpur working envelope. Not the official KDA boundary.",
    },

    features,
  };

  await fs.mkdir(
    OUTPUT_DIR,
    {
      recursive: true,
    },
  );

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      geojson,
      null,
      2,
    ),
    "utf8",
  );

  await fs.rm(
    TEMP_DIR,
    {
      recursive: true,
      force: true,
    },
  );

  console.log(
    "============================================================",
  );

  console.log(
    "SUCCESS",
  );

  console.log(
    "============================================================",
  );

  console.log(
    `GeoJSON saved: ${OUTPUT_FILE}`,
  );

  console.log(
    `Feature count: ${features.length.toLocaleString()}`,
  );

  console.log("");
};

main().catch(
  async (error) => {
    console.error("");
    console.error(
      "KANPUR GIS PREPARATION FAILED",
    );

    console.error(
      error instanceof Error
        ? error.message
        : error,
    );

    console.error("");

    await fs.rm(
      TEMP_DIR,
      {
        recursive: true,
        force: true,
      },
    );

    process.exit(1);
  },
);