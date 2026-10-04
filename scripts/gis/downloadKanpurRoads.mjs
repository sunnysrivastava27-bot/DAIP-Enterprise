/**
 * ============================================================
 * DAIP — KANPUR DIGITAL TWIN
 * REAL ROAD GIS INGESTION — TILE DOWNLOADER V2
 * ============================================================
 *
 * PURPOSE
 * -------
 * Download the actual mapped Kanpur road network from
 * OpenStreetMap through Overpass API.
 *
 * WHY TILE DOWNLOADS?
 * -------------------
 * A single large Kanpur query previously returned:
 *
 *     504 Gateway Timeout
 *
 * Overpass is intended for selected geographic queries, and
 * large requests can take too long. We therefore split Kanpur
 * into smaller geographic tiles.
 *
 * ARCHITECTURE
 * ------------
 *
 *     KANPUR BOUNDING AREA
 *            |
 *       +----+----+----+
 *       |    |    |    |
 *       +----+----+----+
 *       |    |    |    |
 *       +----+----+----+
 *            |
 *        merge roads
 *            |
 *       remove duplicates
 *            |
 *     kanpur-roads.geojson
 *
 * IMPORTANT
 * ---------
 * This is an initial geographic extraction.
 *
 * It is NOT yet the official KDA boundary.
 *
 * Later:
 *
 *     Official KDA boundary
 *             ↓
 *     exact geographic clipping
 *             ↓
 *     DAIP road layer
 *
 * REQUIREMENTS
 * ------------
 * Node.js 18+
 *
 * No npm package is required.
 * Node's built-in fetch is used.
 * ============================================================
 */

import fs from "node:fs/promises";
import path from "node:path";

/* ============================================================
   OUTPUT
============================================================ */

const OUTPUT_DIR = path.resolve(
  "src/components/executive/v3/digital-twin/data/kanpur/raw",
);

const OUTPUT_FILE = path.join(
  OUTPUT_DIR,
  "kanpur-roads.geojson",
);

/* ============================================================
   INITIAL KANPUR EXTRACTION WINDOW
   ------------------------------------------------------------
   This is a working geographic envelope only.
   It is NOT the official KDA administrative boundary.
============================================================ */

const BBOX = {
  south: 26.32,
  west: 80.12,
  north: 26.60,
  east: 80.55,
};

/* ============================================================
   TILE SIZE
   ------------------------------------------------------------
   Smaller tiles reduce timeout risk.

   Approximately:
       0.08° latitude
       0.08° longitude

   Kanpur therefore becomes roughly 24 tiles.
============================================================ */

const TILE_LATITUDE = 0.08;
const TILE_LONGITUDE = 0.08;

/* ============================================================
   REQUEST SETTINGS
============================================================ */

const REQUEST_TIMEOUT_MS = 120000;

const MAX_RETRIES_PER_ENDPOINT = 3;

const DELAY_BETWEEN_TILES_MS = 1200;

const DELAY_BETWEEN_RETRIES_MS = 3500;

/* ============================================================
   OVERPASS SERVERS
   ------------------------------------------------------------
   First endpoint:
       Official/main Overpass instance
   Second endpoint:
       Global public fallback instance
============================================================ */

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",

  "https://overpass.private.coffee/api/interpreter",
];

/* ============================================================
   ROAD CLASSES
   ------------------------------------------------------------
   We intentionally exclude footways, paths and pedestrian-only
   infrastructure from this first city skeleton.
============================================================ */

const HIGHWAY_FILTER =
  "motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street|service|industrial|road";

/* ============================================================
   SMALL HELPERS
============================================================ */

const sleep = (milliseconds) =>
  new Promise((resolve) =>
    setTimeout(resolve, milliseconds),
  );

const formatNumber = (value) =>
  Number(value.toFixed(6));

/* ============================================================
   TILE GENERATOR
============================================================ */

const createTiles = () => {
  const tiles = [];

  let row = 0;

  for (
    let south = BBOX.south;
    south < BBOX.north;
    south += TILE_LATITUDE
  ) {
    let column = 0;

    const tileSouth = south;

    const tileNorth = Math.min(
      south + TILE_LATITUDE,
      BBOX.north,
    );

    for (
      let west = BBOX.west;
      west < BBOX.east;
      west += TILE_LONGITUDE
    ) {
      const tileWest = west;

      const tileEast = Math.min(
        west + TILE_LONGITUDE,
        BBOX.east,
      );

      tiles.push({
        id: `r${row + 1}-c${column + 1}`,

        south: formatNumber(tileSouth),

        west: formatNumber(tileWest),

        north: formatNumber(tileNorth),

        east: formatNumber(tileEast),
      });

      column += 1;
    }

    row += 1;
  }

  return tiles;
};

/* ============================================================
   OVERPASS QUERY
============================================================ */

const createQuery = (tile) => `
[out:json][timeout:90];

way["highway"~"^(${HIGHWAY_FILTER})$"](
  ${tile.south},
  ${tile.west},
  ${tile.north},
  ${tile.east}
);

out geom;
`;

/* ============================================================
   FETCH WITH ABORT TIMEOUT
============================================================ */

const fetchWithTimeout = async (
  endpoint,
  query,
) => {
  const controller =
    new AbortController();

  const timeout = setTimeout(
    () =>
      controller.abort(),
    REQUEST_TIMEOUT_MS,
  );

  try {
    const response =
      await fetch(endpoint, {
        method: "POST",

        body:
          "data=" +
          encodeURIComponent(query),

        headers: {
          "User-Agent":
            "DAIP-Kanpur-Digital-Twin/1.0",
          Accept:
            "application/json",
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        signal:
          controller.signal,
      });

    return response;
  } finally {
    clearTimeout(timeout);
  }
};

/* ============================================================
   DOWNLOAD ONE TILE
============================================================ */

const downloadTile = async (
  tile,
) => {
  const query =
    createQuery(tile);

  let lastError = null;

  for (
    const endpoint of OVERPASS_ENDPOINTS
  ) {
    for (
      let attempt = 1;
      attempt <=
      MAX_RETRIES_PER_ENDPOINT;
      attempt += 1
    ) {
      try {
        console.log(
          `   ${tile.id} → ${endpoint} → attempt ${attempt}`,
        );

        const response =
          await fetchWithTimeout(
            endpoint,
            query,
          );

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status} ${response.statusText}`,
          );
        }

        const data =
          await response.json();

        if (
          !data ||
          !Array.isArray(
            data.elements,
          )
        ) {
          throw new Error(
            "Unexpected Overpass response.",
          );
        }

        console.log(
          `   ✓ ${tile.id}: ${data.elements.length} road ways`,
        );

        return data.elements;
      } catch (error) {
        lastError = error;

        const message =
          error instanceof Error
            ? error.message
            : String(error);

        console.log(
          `   ✗ ${tile.id}: ${message}`,
        );

        if (
          attempt <
          MAX_RETRIES_PER_ENDPOINT
        ) {
          console.log(
            `   waiting ${
              DELAY_BETWEEN_RETRIES_MS /
              1000
            }s before retry...`,
          );

          await sleep(
            DELAY_BETWEEN_RETRIES_MS,
          );
        }
      }
    }

    console.log(
      `   Switching Overpass server...`,
    );
  }

  throw new Error(
    `Tile ${tile.id} failed after trying all Overpass endpoints. Last error: ${
      lastError instanceof Error
        ? lastError.message
        : String(lastError)
    }`,
  );
};

/* ============================================================
   CONVERT OSM WAY → GEOJSON FEATURE
============================================================ */

const wayToFeature = (
  element,
) => {
  if (
    !element ||
    element.type !== "way" ||
    !Array.isArray(
      element.geometry,
    ) ||
    element.geometry.length < 2
  ) {
    return null;
  }

  const coordinates =
    element.geometry
      .map((point) => [
        Number(point.lon),
        Number(point.lat),
      ])
      .filter(
        ([longitude, latitude]) =>
          Number.isFinite(
            longitude,
          ) &&
          Number.isFinite(
            latitude,
          ),
      );

  if (
    coordinates.length < 2
  ) {
    return null;
  }

  const tags =
    element.tags ?? {};

  return {
    type: "Feature",

    properties: {
      osmId: element.id,

      name:
        tags.name ?? null,

      highway:
        tags.highway ?? null,

      ref:
        tags.ref ?? null,

      lanes:
        tags.lanes ?? null,

      maxspeed:
        tags.maxspeed ?? null,

      oneway:
        tags.oneway ?? null,

      surface:
        tags.surface ?? null,

      bridge:
        tags.bridge ?? null,

      tunnel:
        tags.tunnel ?? null,
    },

    geometry: {
      type: "LineString",

      coordinates,
    },
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
    "DAIP — KANPUR REAL ROAD GIS INGESTION",
  );
  console.log(
    "============================================================",
  );
  console.log("");

  console.log(
    "Source: OpenStreetMap via Overpass API",
  );

  console.log(
    `Bounding area: ${BBOX.south}, ${BBOX.west} → ${BBOX.north}, ${BBOX.east}`,
  );

  console.log("");

  const tiles =
    createTiles();

  console.log(
    `Tiles to download: ${tiles.length}`,
  );

  console.log("");

  /*
   * Store OSM ways by their actual OSM ID.
   *
   * The tile boundaries overlap conceptually in practice,
   * and a road may appear in more than one tile.
   *
   * Map-based deduplication prevents duplicate features.
   */
  const roadWays =
    new Map();

  /*
   * ----------------------------------------------------------
   * DOWNLOAD TILES SEQUENTIALLY
   * ----------------------------------------------------------
   *
   * Sequential requests are deliberate.
   *
   * We do not send 24 requests simultaneously because that
   * would unnecessarily load public Overpass infrastructure.
   */
  for (
    let index = 0;
    index < tiles.length;
    index += 1
  ) {
    const tile =
      tiles[index];

    console.log(
      `[${index + 1}/${tiles.length}] Downloading ${tile.id}`,
    );

    const elements =
      await downloadTile(
        tile,
      );

    for (
      const element of elements
    ) {
      if (
        element.type !==
          "way" ||
        !element.id
      ) {
        continue;
      }

      if (
        !roadWays.has(
          element.id,
        )
      ) {
        roadWays.set(
          element.id,
          element,
        );
      }
    }

    console.log(
      `   Total unique road ways so far: ${roadWays.size}`,
    );

    /*
     * Gentle delay before the next tile.
     */
    if (
      index <
      tiles.length - 1
    ) {
      await sleep(
        DELAY_BETWEEN_TILES_MS,
      );
    }
  }

  console.log("");

  console.log(
    "All tiles downloaded.",
  );

  console.log(
    `Unique OSM road ways: ${roadWays.size}`,
  );

  /* ==========================================================
     CONVERT TO GEOJSON
  ========================================================== */

  const features = [];

  for (
    const element of roadWays.values()
  ) {
    const feature =
      wayToFeature(
        element,
      );

    if (feature) {
      features.push(
        feature,
      );
    }
  }

  /* ==========================================================
     GEOJSON PACKAGE
  ========================================================== */

  const geojson = {
    type: "FeatureCollection",

    metadata: {
      source:
        "OpenStreetMap via Overpass API",

      bbox: [
        BBOX.west,
        BBOX.south,
        BBOX.east,
        BBOX.north,
      ],

      downloadedAt:
        new Date().toISOString(),

      tileCount:
        tiles.length,

      featureCount:
        features.length,

      attribution:
        "© OpenStreetMap contributors",

      notes:
        "Initial Kanpur urban extraction. " +
        "This bounding box is not the official KDA boundary.",
    },

    features,
  };

  /* ==========================================================
     SAVE
  ========================================================== */

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

  console.log("");

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
    `Road features saved: ${features.length}`,
  );

  console.log(
    `Output file: ${OUTPUT_FILE}`,
  );

  console.log("");

  console.log(
    "NEXT STEP:",
  );

  console.log(
    "Normalize this GeoJSON into DAIP CityRoad[] records.",
  );

  console.log("");
};

/* ============================================================
   RUN
============================================================ */

main().catch(
  (error) => {
    console.error("");
    console.error(
      "============================================================",
    );
    console.error(
      "KANPUR ROAD GIS INGESTION FAILED",
    );
    console.error(
      "============================================================",
    );

    console.error(
      error instanceof Error
        ? error.message
        : error,
    );

    console.error("");

    process.exit(
      1,
    );
  },
);