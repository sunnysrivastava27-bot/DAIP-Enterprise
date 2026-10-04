import fs from "node:fs/promises";
import path from "node:path";

/* ============================================================
   DAIP — KANPUR 3D ROAD NETWORK BUILDER
   ------------------------------------------------------------
   INPUT
   -----
   data/kanpur/processed/kanpur-roads-clipped.geojson

   OUTPUT
   ------
   data/kanpur/processed/kanpur-roads-3d.json

   PURPOSE
   -------
   Convert real OSM road geometry from longitude/latitude into
   a local metric coordinate system suitable for Three.js.

   IMPORTANT
   ---------
   - GIS source remains untouched.
   - This is a visualization-ready derivative.
   - No synthetic road coordinates are generated.
   - Coordinates are based on the real OSM geometry.
============================================================ */

/* ============================================================
   PATHS
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
  "kanpur-roads-3d.json",
);

/* ============================================================
   LOCAL CITY ORIGIN
   ------------------------------------------------------------
   Approximate Kanpur city reference point.

   Longitude → X
   Latitude  → Z

   Three.js convention:
     X = east / west
     Z = north / south

   We keep Y for elevation and set it to zero here because
   this dataset is only the road network.
============================================================ */

const ORIGIN = {
  longitude: 80.322,
  latitude: 26.461,
};

/* ============================================================
   SCALE
   ------------------------------------------------------------
   1 world unit = 100 metres.

   This produces a city-scale model that fits comfortably
   within the existing Three.js camera range.
============================================================ */

const METERS_TO_WORLD_UNITS = 0.01;

/* ============================================================
   ROAD VISUAL HIERARCHY
============================================================ */

const ROAD_DEFINITIONS = {
  motorway: {
    category: "motorway",
    priority: 1,
    width: 3.8,
    height: 0.085,
    lod: 0,
  },

  motorway_link: {
    category: "motorway",
    priority: 2,
    width: 2.8,
    height: 0.07,
    lod: 0,
  },

  trunk: {
    category: "trunk",
    priority: 2,
    width: 3.4,
    height: 0.08,
    lod: 0,
  },

  trunk_link: {
    category: "trunk",
    priority: 3,
    width: 2.5,
    height: 0.065,
    lod: 0,
  },

  primary: {
    category: "primary",
    priority: 3,
    width: 2.8,
    height: 0.07,
    lod: 0,
  },

  primary_link: {
    category: "primary",
    priority: 4,
    width: 2.1,
    height: 0.06,
    lod: 0,
  },

  secondary: {
    category: "secondary",
    priority: 4,
    width: 2.25,
    height: 0.06,
    lod: 1,
  },

  secondary_link: {
    category: "secondary",
    priority: 5,
    width: 1.8,
    height: 0.055,
    lod: 1,
  },

  tertiary: {
    category: "tertiary",
    priority: 5,
    width: 1.65,
    height: 0.05,
    lod: 1,
  },

  tertiary_link: {
    category: "tertiary",
    priority: 6,
    width: 1.4,
    height: 0.045,
    lod: 1,
  },

  residential: {
    category: "residential",
    priority: 6,
    width: 1.15,
    height: 0.04,
    lod: 2,
  },

  living_street: {
    category: "residential",
    priority: 7,
    width: 0.95,
    height: 0.035,
    lod: 2,
  },

  service: {
    category: "service",
    priority: 8,
    width: 0.72,
    height: 0.028,
    lod: 3,
  },

  unclassified: {
    category: "local",
    priority: 8,
    width: 0.85,
    height: 0.03,
    lod: 3,
  },

  industrial: {
    category: "industrial",
    priority: 7,
    width: 1.15,
    height: 0.035,
    lod: 2,
  },

  road: {
    category: "local",
    priority: 8,
    width: 0.8,
    height: 0.03,
    lod: 3,
  },

  unknown: {
    category: "local",
    priority: 9,
    width: 0.75,
    height: 0.028,
    lod: 3,
  },
};

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
   GEO CONVERSION
   ------------------------------------------------------------
   Approximate local ENU-style projection.

   Longitude distance varies by latitude, so longitude is
   multiplied by cos(latitude).

   Result:
     X = east/west
     Z = north/south
============================================================ */

const metersPerDegreeLatitude =
  111_320;

const metersPerDegreeLongitude =
  111_320 *
  Math.cos(
    (ORIGIN.latitude *
      Math.PI) /
      180,
  );

const lonLatToWorld = (
  longitude,
  latitude,
) => {
  const eastMeters =
    (longitude -
      ORIGIN.longitude) *
    metersPerDegreeLongitude;

  const northMeters =
    (latitude -
      ORIGIN.latitude) *
    metersPerDegreeLatitude;

  return [
    eastMeters *
      METERS_TO_WORLD_UNITS,

    0,

    -(
      northMeters *
      METERS_TO_WORLD_UNITS
    ),
  ];
};

/* ============================================================
   DISTANCE
============================================================ */

const distance2D = (
  a,
  b,
) => {
  const dx =
    b[0] - a[0];

  const dz =
    b[1] - a[1];

  return Math.sqrt(
    dx * dx +
      dz * dz,
  );
};

/* ============================================================
   DOUGLAS-PEUCKER SIMPLIFICATION
   ------------------------------------------------------------
   Works in already projected world coordinates.

   This keeps the real road shape while reducing unnecessary
   vertices for rendering.
============================================================ */

const perpendicularDistance = (
  point,
  start,
  end,
) => {
  const x =
    point[0];

  const z =
    point[1];

  const x1 =
    start[0];

  const z1 =
    start[1];

  const x2 =
    end[0];

  const z2 =
    end[1];

  const dx =
    x2 - x1;

  const dz =
    z2 - z1;

  if (
    dx === 0 &&
    dz === 0
  ) {
    return distance2D(
      point,
      start,
    );
  }

  const t =
    (
      (x - x1) * dx +
      (z - z1) * dz
    ) /
    (
      dx * dx +
      dz * dz
    );

  const clampedT =
    Math.max(
      0,
      Math.min(
        1,
        t,
      ),
    );

  const projection = [
    x1 +
      clampedT * dx,

    z1 +
      clampedT * dz,
  ];

  return distance2D(
    point,
    projection,
  );
};

const simplifyLine = (
  points,
  tolerance,
) => {
  if (
    points.length <= 2
  ) {
    return points;
  }

  let maxDistance =
    0;

  let index = 0;

  const first =
    points[0];

  const last =
    points[
      points.length - 1
    ];

  for (
    let i = 1;
    i <
      points.length - 1;
    i += 1
  ) {
    const distance =
      perpendicularDistance(
        points[i],
        first,
        last,
      );

    if (
      distance >
      maxDistance
    ) {
      index = i;
      maxDistance =
        distance;
    }
  }

  if (
    maxDistance >
    tolerance
  ) {
    const left =
      simplifyLine(
        points.slice(
          0,
          index + 1,
        ),
        tolerance,
      );

    const right =
      simplifyLine(
        points.slice(index),
        tolerance,
      );

    return [
      ...left.slice(
        0,
        -1,
      ),
      ...right,
    ];
  }

  return [
    first,
    last,
  ];
};

/* ============================================================
   ROAD CLASS NORMALIZATION
============================================================ */

const getHighway =
  (properties) => {
    const value =
      properties?.highway ??
      properties?.fclass ??
      "unknown";

    const normalized =
      String(
        value,
      )
        .trim()
        .toLowerCase();

    if (
      ROAD_DEFINITIONS[
        normalized
      ]
    ) {
      return normalized;
    }

    return "unknown";
  };

/* ============================================================
   FLATTEN GEOMETRY
============================================================ */

const extractLineCoordinates =
  (geometry) => {
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
   CONVERT LINE
============================================================ */

const convertLine =
  (
    coordinates,
    simplificationTolerance,
  ) => {
    const projected =
      [];

    for (
      const coordinate of coordinates
    ) {
      if (
        !Array.isArray(
          coordinate,
        ) ||
        coordinate.length <
          2
      ) {
        continue;
      }

      const longitude =
        Number(
          coordinate[0],
        );

      const latitude =
        Number(
          coordinate[1],
        );

      if (
        !Number.isFinite(
          longitude,
        ) ||
        !Number.isFinite(
          latitude,
        )
      ) {
        continue;
      }

      const [
        x,
        ,
        z,
      ] =
        lonLatToWorld(
          longitude,
          latitude,
        );

      projected.push([
        x,
        z,
      ]);
    }

    if (
      projected.length <
      2
    ) {
      return null;
    }

    const simplified =
      simplifyLine(
        projected,
        simplificationTolerance,
      );

    if (
      simplified.length <
      2
    ) {
      return null;
    }

    let length =
      0;

    for (
      let i = 1;
      i <
        simplified.length;
      i += 1
    ) {
      length +=
        distance2D(
          simplified[
            i - 1
          ],
          simplified[i],
        );
    }

    return {
      points:
        simplified.map(
          ([x, z]) => [
            Number(
              x.toFixed(3),
            ),
            Number(
              z.toFixed(3),
            ),
          ],
        ),

      length:
        Number(
          length.toFixed(3),
        ),
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
    "DAIP — KANPUR 3D ROAD NETWORK BUILDER",
  );
  console.log(
    "============================================================",
  );
  console.log("");

  try {
    await fs.access(
      INPUT_FILE,
    );
  } catch {
    throw new Error(
      [
        "Validated Kanpur road dataset was not found.",
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

  const sourceFeatures =
    Array.isArray(
      data.features,
    )
      ? data.features
      : [];

  if (
    sourceFeatures.length === 0
  ) {
    throw new Error(
      "Input road dataset contains zero features.",
    );
  }

  console.log(
    `Source road features: ${sourceFeatures.length.toLocaleString()}`,
  );

  console.log("");

  console.log(
    "LOCAL ORIGIN:",
  );

  console.log(
    `Longitude: ${ORIGIN.longitude}`,
  );

  console.log(
    `Latitude : ${ORIGIN.latitude}`,
  );

  console.log("");

  console.log(
    `Scale: 1 world unit = ${Math.round(
      1 /
        METERS_TO_WORLD_UNITS,
    )} metres`,
  );

  console.log("");

  const roads = [];

  const categoryCounts =
    new Map();

  let skippedFeatures =
    0;

  let inputSegments =
    0;

  let outputSegments =
    0;

  let inputPoints =
    0;

  let outputPoints =
    0;

  for (
    let featureIndex = 0;
    featureIndex <
      sourceFeatures.length;
    featureIndex += 1
  ) {
    const sourceFeature =
      sourceFeatures[
        featureIndex
      ];

    if (
      !sourceFeature?.geometry
    ) {
      skippedFeatures +=
        1;

      continue;
    }

    const highway =
      getHighway(
        sourceFeature.properties,
      );

    const definition =
      ROAD_DEFINITIONS[
        highway
      ];

    /*
     * Higher hierarchy roads preserve more geometric detail.
     * Local roads are simplified a little more.
     */
    let tolerance = 0.015;

    if (
      definition.lod === 0
    ) {
      tolerance = 0.008;
    } else if (
      definition.lod === 1
    ) {
      tolerance = 0.012;
    } else if (
      definition.lod === 2
    ) {
      tolerance = 0.02;
    } else {
      tolerance = 0.03;
    }

    const lines =
      extractLineCoordinates(
        sourceFeature.geometry,
      );

    if (
      lines.length === 0
    ) {
      skippedFeatures +=
        1;

      continue;
    }

    const convertedSegments =
      [];

    for (
      const coordinates of
        lines
    ) {
      inputSegments +=
        1;

      inputPoints +=
        coordinates.length;

      const converted =
        convertLine(
          coordinates,
          tolerance,
        );

      if (!converted) {
        continue;
      }

      convertedSegments.push(
        converted,
      );

      outputSegments +=
        1;

      outputPoints +=
        converted.points.length;
    }

    if (
      convertedSegments.length ===
      0
    ) {
      skippedFeatures +=
        1;

      continue;
    }

    const category =
      definition.category;

    categoryCounts.set(
      category,
      (
        categoryCounts.get(
          category,
        ) ?? 0
      ) + 1,
    );

    const osmId =
      sourceFeature.properties
        ?.osmId ??
      sourceFeature.properties
        ?.osm_id ??
      null;

    const roadName =
      sourceFeature.properties
        ?.name ??
      null;

    const roadRef =
      sourceFeature.properties
        ?.ref ??
      null;

    const oneWay =
      sourceFeature.properties
        ?.oneway ??
      null;

    const maxSpeed =
      sourceFeature.properties
        ?.maxspeed ??
      null;

    roads.push({
      id:
        osmId !== null &&
        osmId !== undefined
          ? String(osmId)
          : `road-${featureIndex}`,

      osmId,

      name:
        roadName,

      ref:
        roadRef,

      highway,

      category,

      priority:
        definition.priority,

      width:
        definition.width,

      height:
        definition.height,

      lod:
        definition.lod,

      oneway:
        oneWay,

      maxspeed:
        maxSpeed,

      segments:
        convertedSegments,
    });

    if (
      (featureIndex + 1) %
        5000 ===
      0
    ) {
      console.log(
        `Processed ${(
          featureIndex + 1
        ).toLocaleString()} / ${sourceFeatures.length.toLocaleString()} roads`,
      );
    }
  }

  /* ==========================================================
     OUTPUT BBOX
  ========================================================== */

  let minX = Infinity;
  let minZ = Infinity;

  let maxX = -Infinity;
  let maxZ = -Infinity;

  let totalLength =
    0;

  for (
    const road of roads
  ) {
    for (
      const segment of road.segments
    ) {
      totalLength +=
        segment.length;

      for (
        const [
          x,
          z,
        ] of segment.points
      ) {
        minX = Math.min(
          minX,
          x,
        );

        maxX = Math.max(
          maxX,
          x,
        );

        minZ = Math.min(
          minZ,
          z,
        );

        maxZ = Math.max(
          maxZ,
          z,
        );
      }
    }
  }

  /* ==========================================================
     METADATA
  ========================================================== */

  const output = {
    version: "1.0",

    type:
      "DAIP_KANPUR_3D_ROAD_NETWORK",

    metadata: {
      source:
        "OpenStreetMap via Geofabrik Central Zone",

      sourceDataset:
        "kanpur-roads-clipped.geojson",

      boundarySource:
        "DataMeet candidate Kanpur city boundary",

      boundaryValidation:
        "CANDIDATE-PASS",

      officialKdaBoundary:
        false,

      generatedAt:
        new Date().toISOString(),

      coordinateSystem: {
        source:
          "WGS84 / EPSG:4326",

        output:
          "DAIP local city coordinates",

        originLongitude:
          ORIGIN.longitude,

        originLatitude:
          ORIGIN.latitude,

        axisConvention:
          "X=east, Y=elevation, Z=south",

        metersToWorldUnits:
          METERS_TO_WORLD_UNITS,
      },

      sourceFeatureCount:
        sourceFeatures.length,

      outputRoadCount:
        roads.length,

      skippedFeatures:
        skippedFeatures,

      inputSegments:
        inputSegments,

      outputSegments:
        outputSegments,

      inputPoints:
        inputPoints,

      outputPoints:
        outputPoints,

      simplificationRatio:
        inputPoints > 0
          ? Number(
              (
                outputPoints /
                inputPoints
              ).toFixed(4),
            )
          : 0,

      totalRoadLengthWorldUnits:
        Number(
          totalLength.toFixed(
            3,
          ),
        ),

      totalRoadLengthMetres:
        Number(
          (
            totalLength /
            METERS_TO_WORLD_UNITS
          ).toFixed(1),
        ),

      boundsWorld: {
        minX:
          Number(
            minX.toFixed(
              3,
            ),
          ),

        maxX:
          Number(
            maxX.toFixed(
              3,
            ),
          ),

        minZ:
          Number(
            minZ.toFixed(
              3,
            ),
          ),

        maxZ:
          Number(
            maxZ.toFixed(
              3,
            ),
          ),
      },

      attribution:
        "© OpenStreetMap contributors",

      notes:
        "Real OSM road geometry converted into DAIP local Three.js coordinates. This is a visualization-ready derivative of the validated candidate Kanpur road dataset.",
    },

    categoryCounts:
      Object.fromEntries(
        categoryCounts,
      ),

    roads,
  };

  /* ==========================================================
     SAVE
  ========================================================== */

  await fs.mkdir(
    path.dirname(
      OUTPUT_FILE,
    ),
    {
      recursive: true,
    },
  );

  await fs.writeFile(
    OUTPUT_FILE,
    JSON.stringify(
      output,
      null,
      2,
    ),
    "utf8",
  );

  /* ==========================================================
     REPORT
  ========================================================== */

  console.log("");

  console.log(
    "============================================================",
  );

  console.log(
    "3D ROAD NETWORK RESULTS",
  );

  console.log(
    "============================================================",
  );

  console.log(
    `Input roads: ${sourceFeatures.length.toLocaleString()}`,
  );

  console.log(
    `Output roads: ${roads.length.toLocaleString()}`,
  );

  console.log(
    `Skipped roads: ${skippedFeatures.toLocaleString()}`,
  );

  console.log("");

  console.log(
    `Input coordinate points: ${inputPoints.toLocaleString()}`,
  );

  console.log(
    `Output coordinate points: ${outputPoints.toLocaleString()}`,
  );

  console.log(
    `Simplification ratio: ${
      inputPoints > 0
        ? (
            outputPoints /
            inputPoints
          ).toFixed(3)
        : "0"
    }`,
  );

  console.log("");

  console.log(
    "ROAD CATEGORY COUNTS",
  );

  console.log(
    "------------------------------------------------------------",
  );

  for (
    const [
      category,
      count,
    ] of categoryCounts
  ) {
    console.log(
      `${category.padEnd(
        18,
      )} ${count.toLocaleString()}`,
    );
  }

  console.log("");

  console.log(
    "LOCAL WORLD BOUNDS",
  );

  console.log(
    "------------------------------------------------------------",
  );

  console.log(
    `X: ${minX.toFixed(
      2,
    )} → ${maxX.toFixed(2)}`,
  );

  console.log(
    `Z: ${minZ.toFixed(
      2,
    )} → ${maxZ.toFixed(2)}`,
  );

  console.log("");

  console.log(
    `Approx road length: ${(
      totalLength /
      METERS_TO_WORLD_UNITS
    ).toFixed(0)} metres`,
  );

  console.log("");

  console.log(
    "SUCCESS",
  );

  console.log(
    `Output: ${OUTPUT_FILE}`,
  );

  console.log("");

  console.log(
    "This dataset is now ready to be consumed by a dedicated",
  );

  console.log(
    "Three.js CityRoadNetwork renderer.",
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
      "KANPUR 3D ROAD NETWORK BUILD FAILED",
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