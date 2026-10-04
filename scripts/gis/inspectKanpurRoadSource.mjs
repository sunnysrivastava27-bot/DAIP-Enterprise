import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import path from "node:path";
import unzipper from "unzipper";
import shapefile from "shapefile";

/* ============================================================
   DAIP — KANPUR ROAD SOURCE INSPECTOR
   CENTRAL ZONE
============================================================ */

const SOURCE_FILE = path.resolve(
  "scripts/gis/source/central-zone-260817-free.shp.zip",
);

const TEMP_DIR = path.resolve(
  "scripts/gis/temp/inspect-roads",
);

/* ============================================================
   MAIN
============================================================ */

const main = async () => {
  console.log("");
  console.log(
    "============================================================",
  );
  console.log(
    "DAIP — KANPUR ROAD SOURCE INSPECTOR",
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
        `Expected file: ${SOURCE_FILE}`,
      ].join("\n"),
    );
  }

  console.log(
    "SOURCE FILE:",
  );

  console.log(
    SOURCE_FILE,
  );

  console.log("");

  const archive =
    await unzipper.Open.file(
      SOURCE_FILE,
    );

  const roadEntries =
    archive.files.filter(
      (entry) => {
        const lower =
          entry.path.toLowerCase();

        return (
          lower.includes(
            "gis_osm_roads_free_1.",
          ) &&
          (
            lower.endsWith(".shp") ||
            lower.endsWith(".dbf") ||
            lower.endsWith(".shx") ||
            lower.endsWith(".prj") ||
            lower.endsWith(".cpg")
          )
        );
      },
    );

  if (!roadEntries.length) {
    throw new Error(
      "Road shapefile components were not found in the Central Zone ZIP.",
    );
  }

  console.log(
    "ROAD COMPONENTS FOUND:",
  );

  for (
    const entry of roadEntries
  ) {
    console.log(
      `  ${entry.path}`,
    );
  }

  console.log("");

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

  const extracted = {};

  for (
    const entry of roadEntries
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
        .extname(
          fileName,
        )
        .slice(1)
        .toLowerCase();

    extracted[extension] =
      outputPath;
  }

  if (
    !extracted.shp ||
    !extracted.dbf
  ) {
    throw new Error(
      "Road SHP/DBF files were not extracted correctly.",
    );
  }

  console.log("");

  console.log(
    "Opening Central Zone road layer...",
  );

  const source =
    await shapefile.open(
      extracted.shp,
      extracted.dbf,
    );

  let count = 0;

  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  const classes =
    new Map();

  while (
    count < 10
  ) {
    const result =
      await source.read();

    if (
      result.done
    ) {
      break;
    }

    count += 1;

    const feature =
      result.value;

    console.log("");
    console.log(
      `========== FEATURE ${count} ==========`,
    );

    console.log(
      "PROPERTIES:",
    );

    console.log(
      feature.properties,
    );

    console.log(
      "GEOMETRY TYPE:",
      feature.geometry?.type,
    );

    if (
      feature.geometry?.type ===
      "LineString"
    ) {
      const coordinates =
        feature.geometry.coordinates;

      if (
        coordinates.length
      ) {
        console.log(
          "FIRST COORDINATE:",
          coordinates[0],
        );
      }

      for (
        const point of coordinates
      ) {
        const lon =
          Number(point[0]);

        const lat =
          Number(point[1]);

        if (
          Number.isFinite(lon) &&
          Number.isFinite(lat)
        ) {
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
    }

    const roadClass =
      feature.properties?.fclass;

    if (
      roadClass
    ) {
      const key =
        String(
          roadClass,
        );

      classes.set(
        key,
        (
          classes.get(key) ??
          0
        ) + 1,
      );
    }
  }

  console.log("");

  console.log(
    "============================================================",
  );

  console.log(
    "DIAGNOSTIC SUMMARY",
  );

  console.log(
    "============================================================",
  );

  console.log(
    `Features inspected: ${count}`,
  );

  console.log(
    `Longitude range: ${minLon} to ${maxLon}`,
  );

  console.log(
    `Latitude range: ${minLat} to ${maxLat}`,
  );

  console.log("");

  console.log(
    "Road classes in inspected records:",
  );

  for (
    const [
      name,
      quantity,
    ] of classes
  ) {
    console.log(
      `  ${name}: ${quantity}`,
    );
  }

  console.log("");

  await fs.rm(
    TEMP_DIR,
    {
      recursive: true,
      force: true,
    },
  );

  console.log(
    "Inspection complete.",
  );
};

main().catch(
  (error) => {
    console.error("");
    console.error(
      "DIAGNOSTIC FAILED:",
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