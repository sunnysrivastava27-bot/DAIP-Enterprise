import React, { useMemo } from "react";
import { CITY_BLOCKS } from "./infrastructure/CityBlocks";

/* ============================================================
   DAIP DIGITAL TWIN V3
   KANPUR CITY BUILDINGS

   Architecture:
   - Buildings are generated from CITY_BLOCKS.
   - No arbitrary city coordinates.
   - Green blocks remain open.
   - Building architecture varies by land use.
   - Deterministic generation: no Math.random().
   - Lightweight procedural geometry.
============================================================ */

/* ============================================================
   BUILDING TYPES
============================================================ */

type BuildingType =
  | "residential"
  | "residentialLight"
  | "commercial"
  | "office"
  | "hospital"
  | "school"
  | "government";

/* ============================================================
   BUILDING PROPS
============================================================ */

interface BuildingProps {
  position: [number, number, number];
  scale?: [number, number, number];
  type: BuildingType;
  rotation?: number;
  accent?: string;
  variant?: number;
}

/* ============================================================
   BUILDING MATERIAL PALETTE
============================================================ */

const BUILDING_PALETTE: Record<
  BuildingType,
  {
    body: string;
    secondary: string;
    roof: string;
    window: string;
    accent: string;
  }
> = {
  residential: {
    body: "#8d7767",
    secondary: "#b59a82",
    roof: "#4d5559",
    window: "#8fdde5",
    accent: "#d58c58",
  },

  residentialLight: {
    body: "#aa967f",
    secondary: "#cbb69b",
    roof: "#596167",
    window: "#9be5eb",
    accent: "#dca064",
  },

  commercial: {
    body: "#536c78",
    secondary: "#718b95",
    roof: "#283d46",
    window: "#79dce8",
    accent: "#25b8d0",
  },

  office: {
    body: "#4f6676",
    secondary: "#748e9b",
    roof: "#263943",
    window: "#a8edf3",
    accent: "#29c4df",
  },

  hospital: {
    body: "#d5e1e3",
    secondary: "#eef5f5",
    roof: "#60757c",
    window: "#71d9e7",
    accent: "#27a9cf",
  },

  school: {
    body: "#c6a674",
    secondary: "#dec28c",
    roof: "#68736c",
    window: "#83d6de",
    accent: "#e0a34d",
  },

  government: {
    body: "#c2c8c6",
    secondary: "#e0e4e2",
    roof: "#626f74",
    window: "#8ddbe5",
    accent: "#45bfd3",
  },
};

/* ============================================================
   WINDOWS
   ------------------------------------------------------------
   Lightweight procedural window system.
============================================================ */

interface WindowsProps {
  width: number;
  height: number;
  depth: number;
  floors: number;
  columns: number;
  color: string;
}

const Windows: React.FC<WindowsProps> = ({
  width,
  height,
  depth,
  floors,
  columns,
  color,
}) => {
  const windows: React.ReactNode[] = [];

  const horizontalSpacing =
    width / Math.max(columns, 1);

  const verticalSpacing =
    height / Math.max(floors, 1);

  for (let floor = 0; floor < floors; floor++) {
    for (let column = 0; column < columns; column++) {
      const x =
        -width / 2 +
        horizontalSpacing / 2 +
        column * horizontalSpacing;

      const y =
        0.2 +
        verticalSpacing / 2 +
        floor * verticalSpacing;

      windows.push(
        <mesh
          key={`window-${floor}-${column}`}
          position={[
            x,
            y,
            depth / 2 + 0.012,
          ]}
        >
          <boxGeometry
            args={[
              Math.max(
                horizontalSpacing * 0.42,
                0.035
              ),
              Math.max(
                verticalSpacing * 0.42,
                0.035
              ),
              0.018,
            ]}
          />

          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.12}
            roughness={0.25}
            metalness={0.12}
          />
        </mesh>
      );
    }
  }

  return <>{windows}</>;
};

/* ============================================================
   BUILDING COMPONENT
   ------------------------------------------------------------
   This is the actual architectural renderer.

   CityBuildings generates WHERE buildings go.
   Building determines WHAT each building looks like.
============================================================ */

const Building: React.FC<BuildingProps> = ({
  position,
  scale = [1, 1, 1],
  type,
  rotation = 0,
  accent,
}) => {
  const palette =
    BUILDING_PALETTE[type];

  const buildingAccent =
    accent || palette.accent;

  /* ----------------------------------------------------------
     TYPE FLAGS
  ---------------------------------------------------------- */

  const isResidential =
    type === "residential" ||
    type === "residentialLight";

  const isCommercial =
    type === "commercial";

  const isOffice =
    type === "office";

  const isHospital =
    type === "hospital";

  const isSchool =
    type === "school";

  const isGovernment =
    type === "government";

  /* ----------------------------------------------------------
     BUILDING DIMENSIONS
  ---------------------------------------------------------- */

  let width = 0.78;
  let depth = 0.62;
  let height = 1.0;
  let floors = 4;
  let columns = 3;

  if (type === "residential") {
    width = 0.78;
    depth = 0.62;
    height = 1.0;
    floors = 4;
    columns = 3;
  }

  if (type === "residentialLight") {
    width = 0.72;
    depth = 0.58;
    height = 0.82;
    floors = 3;
    columns = 2;
  }

  if (type === "commercial") {
    width = 0.9;
    depth = 0.68;
    height = 1.28;
    floors = 5;
    columns = 4;
  }

  if (type === "office") {
    width = 0.82;
    depth = 0.66;
    height = 1.65;
    floors = 7;
    columns = 4;
  }

  if (type === "hospital") {
    width = 0.92;
    depth = 0.72;
    height = 1.38;
    floors = 6;
    columns = 4;
  }

  if (type === "school") {
    width = 1.02;
    depth = 0.72;
    height = 0.92;
    floors = 3;
    columns = 4;
  }

  if (type === "government") {
    width = 1.0;
    depth = 0.72;
    height = 1.08;
    floors = 4;
    columns = 3;
  }

  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale}
    >
      {/* ======================================================
          MAIN BUILDING MASS
      ====================================================== */}

      <mesh
        castShadow
        receiveShadow
        position={[
          0,
          height / 2,
          0,
        ]}
      >
        <boxGeometry
          args={[
            width,
            height,
            depth,
          ]}
        />

        <meshStandardMaterial
          color={palette.body}
          roughness={0.62}
          metalness={
            isCommercial || isOffice
              ? 0.28
              : 0.12
          }
        />
      </mesh>

      {/* ======================================================
          SECONDARY ARCHITECTURAL MASS
      ====================================================== */}

      {!isSchool && (
        <mesh
          castShadow
          position={[
            isGovernment
              ? -0.27
              : 0.17,
            height * 0.57,
            0,
          ]}
        >
          <boxGeometry
            args={[
              isGovernment
                ? 0.42
                : 0.25,
              height * 0.66,
              depth + 0.025,
            ]}
          />

          <meshStandardMaterial
            color={palette.secondary}
            roughness={0.55}
            metalness={
              isOffice
                ? 0.25
                : 0.1
            }
          />
        </mesh>
      )}

      {/* ======================================================
          FRONT WINDOWS
      ====================================================== */}

      <Windows
        width={width * 0.82}
        height={height * 0.76}
        depth={depth}
        floors={floors}
        columns={columns}
        color={palette.window}
      />

      {/* ======================================================
          SIDE WINDOWS
      ====================================================== */}

      {floors >= 4 && (
        <group>
          {[0, 1, 2, 3].map(
            (floor) => (
              <mesh
                key={`side-window-${floor}`}
                position={[
                  width / 2 + 0.014,
                  0.42 +
                    floor * 0.22,
                  -0.12,
                ]}
                rotation={[
                  0,
                  Math.PI / 2,
                  0,
                ]}
              >
                <boxGeometry
                  args={[
                    0.16,
                    0.11,
                    0.018,
                  ]}
                />

                <meshStandardMaterial
                  color={palette.window}
                  emissive={palette.window}
                  emissiveIntensity={0.1}
                  roughness={0.25}
                />
              </mesh>
            )
          )}
        </group>
      )}

      {/* ======================================================
          ROOF
      ====================================================== */}

      <mesh
        castShadow
        position={[
          0,
          height + 0.045,
          0,
        ]}
      >
        <boxGeometry
          args={[
            width + 0.09,
            0.09,
            depth + 0.08,
          ]}
        />

        <meshStandardMaterial
          color={palette.roof}
          roughness={0.72}
          metalness={0.16}
        />
      </mesh>

      {/* ======================================================
          ROOFTOP SERVICE UNIT
      ====================================================== */}

      <mesh
        position={[
          0,
          height + 0.14,
          0,
        ]}
      >
        <boxGeometry
          args={[
            0.18,
            0.11,
            0.15,
          ]}
        />

        <meshStandardMaterial
          color="#45545b"
          roughness={0.72}
          metalness={0.25}
        />
      </mesh>

      {/* ======================================================
          SMALL ROOFTOP ANTENNA
      ====================================================== */}

      <mesh
        position={[
          0,
          height + 0.3,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            0.012,
            0.012,
            0.22,
            8,
          ]}
        />

        <meshBasicMaterial
          color="#c9f7fa"
        />
      </mesh>

      {/* ======================================================
          COMMERCIAL SIGN BAND
      ====================================================== */}

      {isCommercial && (
        <mesh
          position={[
            0,
            height * 0.62,
            depth / 2 + 0.025,
          ]}
        >
          <boxGeometry
            args={[
              width * 0.78,
              0.075,
              0.025,
            ]}
          />

          <meshStandardMaterial
            color={buildingAccent}
            emissive={buildingAccent}
            emissiveIntensity={0.35}
          />
        </mesh>
      )}

      {/* ======================================================
          OFFICE HORIZONTAL FACADE BANDS
      ====================================================== */}

      {isOffice && (
        <group>
          {[0.28, 0.54, 0.8].map(
            (ratio) => (
              <mesh
                key={`office-band-${ratio}`}
                position={[
                  0,
                  height * ratio,
                  depth / 2 + 0.028,
                ]}
              >
                <boxGeometry
                  args={[
                    width * 0.9,
                    0.035,
                    0.02,
                  ]}
                />

                <meshBasicMaterial
                  color="#8eeaf3"
                />
              </mesh>
            )
          )}
        </group>
      )}

      {/* ======================================================
          HOSPITAL CROSS
      ====================================================== */}

      {isHospital && (
        <group
          position={[
            0,
            height * 0.7,
            depth / 2 + 0.045,
          ]}
        >
          <mesh>
            <boxGeometry
              args={[
                0.13,
                0.035,
                0.018,
              ]}
            />

            <meshBasicMaterial
              color="#ffffff"
            />
          </mesh>

          <mesh>
            <boxGeometry
              args={[
                0.035,
                0.13,
                0.018,
              ]}
            />

            <meshBasicMaterial
              color="#ffffff"
            />
          </mesh>
        </group>
      )}

      {/* ======================================================
          SCHOOL ENTRY CANOPY
      ====================================================== */}

      {isSchool && (
        <group>
          <mesh
            castShadow
            position={[
              0,
              0.35,
              depth / 2 + 0.13,
            ]}
          >
            <boxGeometry
              args={[
                width * 0.72,
                0.09,
                0.25,
              ]}
            />

            <meshStandardMaterial
              color={palette.secondary}
              roughness={0.72}
            />
          </mesh>

          <mesh
            position={[
              0,
              0.7,
              depth / 2 + 0.04,
            ]}
          >
            <boxGeometry
              args={[
                width * 0.7,
                0.06,
                0.025,
              ]}
            />

            <meshStandardMaterial
              color={buildingAccent}
              emissive={buildingAccent}
              emissiveIntensity={0.14}
            />
          </mesh>
        </group>
      )}

      {/* ======================================================
          GOVERNMENT COLUMNS
      ====================================================== */}

      {isGovernment && (
        <group>
          {[-0.28, 0, 0.28].map(
            (x) => (
              <mesh
                key={`gov-column-${x}`}
                castShadow
                position={[
                  x,
                  height * 0.52,
                  depth / 2 + 0.045,
                ]}
              >
                <boxGeometry
                  args={[
                    0.055,
                    height * 0.72,
                    0.055,
                  ]}
                />

                <meshStandardMaterial
                  color="#eef2f0"
                  roughness={0.4}
                  metalness={0.05}
                />
              </mesh>
            )
          )}
        </group>
      )}

      {/* ======================================================
          RESIDENTIAL BALCONY DETAILS
      ====================================================== */}

      {isResidential && (
        <group>
          {[0.42, 0.66, 0.9].map(
            (ratio, index) => (
              <mesh
                key={`balcony-${index}`}
                position={[
                  width * 0.18,
                  height * ratio,
                  depth / 2 + 0.065,
                ]}
              >
                <boxGeometry
                  args={[
                    0.22,
                    0.035,
                    0.13,
                  ]}
                />

                <meshStandardMaterial
                  color="#70787a"
                  roughness={0.72}
                  metalness={0.08}
                />
              </mesh>
            )
          )}
        </group>
      )}

      {/* ======================================================
          BUILDING BASE / PLINTH
      ====================================================== */}

      <mesh
        receiveShadow
        position={[
          0,
          0.035,
          0,
        ]}
      >
        <boxGeometry
          args={[
            width + 0.12,
            0.07,
            depth + 0.12,
          ]}
        />

        <meshStandardMaterial
          color="#48565a"
          roughness={0.86}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

/* ============================================================
   KANPUR CITY BUILDING FABRIC — URBAN NEIGHBOURHOOD GENERATOR
   ------------------------------------------------------------
   The previous generator filled every block with a rigid
   rows × columns grid. That produced the "more boxes" look.

   This version:
   - keeps CITY_BLOCKS as the spatial framework
   - creates fewer, larger and more varied parcels
   - leaves deliberate internal open space
   - creates setbacks from roads
   - varies building footprint and height
   - aligns most buildings to a street edge
   - keeps buildings grounded at y = 0
   - keeps green blocks completely open
   - remains deterministic; no Math.random()
============================================================ */

const hashValue = (value: number) => {
  const x = Math.sin(value * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const lerp = (
  min: number,
  max: number,
  value: number,
) => min + (max - min) * value;

const clampValue = (
  value: number,
  min: number,
  max: number,
) => Math.max(min, Math.min(max, value));

const chooseBuildingType = (
  blockType: string,
  seed: number,
): BuildingType => {
  const value = hashValue(seed);

  switch (blockType) {
    case "residential":
      return value < 0.62
        ? "residentialLight"
        : "residential";

    case "mixed":
      if (value < 0.42) return "residential";
      if (value < 0.72) return "residentialLight";
      if (value < 0.9) return "commercial";
      return "office";

    case "commercial":
      return value < 0.56
        ? "commercial"
        : "office";

    case "institutional":
      if (value < 0.34) return "school";
      if (value < 0.66) return "government";
      return "hospital";

    case "industrial":
      return value < 0.68
        ? "commercial"
        : "office";

    case "civic":
      return value < 0.7
        ? "government"
        : "office";

    default:
      return "residential";
  }
};

const CityBuildings: React.FC = () => {
  const buildings = useMemo(() => {
    const result: React.ReactNode[] = [];

    CITY_BLOCKS.forEach((block, blockIndex) => {
      /* Green blocks are intentionally left completely open. */
      if (block.type === "green") return;

      const blockWidth = Math.max(
        Number(block.width) || 0,
        4,
      );

      const blockDepth = Math.max(
        Number(block.depth) || 0,
        4,
      );

      /*
       * Keep a generous road/setback margin.
       * The old implementation used a fixed grid inside the block.
       */
      const roadMargin = 1.65;

      const usableWidth = Math.max(
        blockWidth - roadMargin * 2,
        3.4,
      );

      const usableDepth = Math.max(
        blockDepth - roadMargin * 2,
        3.4,
      );

      const type = String(block.type);

      /*
       * Larger parcels create a neighbourhood feel instead of
       * a collection of tiny repeated plots.
       */
      const targetParcel =
        type === "residential"
          ? 3.8
          : type === "mixed"
            ? 4.1
            : type === "commercial"
              ? 4.5
              : type === "institutional"
                ? 5.4
                : 4.7;

      const columns = clampValue(
        Math.floor(
          usableWidth / targetParcel,
        ),
        1,
        7,
      );

      const rows = clampValue(
        Math.floor(
          usableDepth / targetParcel,
        ),
        1,
        7,
      );

      const stepX =
        usableWidth /
        Math.max(columns, 1);

      const stepZ =
        usableDepth /
        Math.max(rows, 1);

      const centreColumn =
        (columns - 1) / 2;

      const centreRow =
        (rows - 1) / 2;

      /*
       * Density is deliberately lower than the previous version.
       * Empty land is important for believable urban composition.
       */
      const density =
        type === "residential"
          ? 0.76
          : type === "mixed"
            ? 0.72
            : type === "commercial"
              ? 0.62
              : type === "institutional"
                ? 0.48
                : type === "industrial"
                  ? 0.52
                  : 0.5;

      for (
        let row = 0;
        row < rows;
        row += 1
      ) {
        for (
          let column = 0;
          column < columns;
          column += 1
        ) {
          const seed =
            blockIndex * 7919 +
            row * 173 +
            column * 313;

          const variation =
            hashValue(seed);

          const isEdge =
            column === 0 ||
            row === 0 ||
            column === columns - 1 ||
            row === rows - 1;

          const distanceFromCentre =
            Math.sqrt(
              Math.pow(
                column - centreColumn,
                2,
              ) +
                Math.pow(
                  row - centreRow,
                  2,
                ),
            );

          /*
           * Preserve a few courtyards / open parcels in the middle.
           * Street-edge parcels are more consistently occupied.
           */
          const openProbability =
            isEdge
              ? 0.07
              : distanceFromCentre < 1.15
                ? 0.30
                : 0.17;

          if (variation < openProbability) {
            continue;
          }

          if (
            variation >
            density + 0.16
          ) {
            continue;
          }

          /*
           * Irregular parcel dimensions and offsets.
           * These are deterministic, so the city never changes
           * randomly between renders.
           */
          const parcelWidth = clampValue(
            stepX *
              lerp(
                0.66,
                0.88,
                hashValue(seed + 11),
              ),
            1.9,
            Math.max(
              stepX - 0.28,
              1.9,
            ),
          );

          const parcelDepth = clampValue(
            stepZ *
              lerp(
                0.64,
                0.86,
                hashValue(seed + 19),
              ),
            1.8,
            Math.max(
              stepZ - 0.28,
              1.8,
            ),
          );

          const offsetX =
            (hashValue(seed + 23) - 0.5) *
            stepX *
            0.24;

          const offsetZ =
            (hashValue(seed + 29) - 0.5) *
            stepZ *
            0.24;

          const parcelX =
            Number(block.x) -
            usableWidth / 2 +
            stepX / 2 +
            column * stepX +
            offsetX;

          const parcelZ =
            Number(block.z) -
            usableDepth / 2 +
            stepZ / 2 +
            row * stepZ +
            offsetZ;

          /*
           * A small ground plate visually connects each building
           * to its plot. This avoids the isolated/floating-object
           * appearance of the previous city.
           */
          result.push(
            <mesh
              key={`${block.id}-parcel-ground-${row}-${column}`}
              receiveShadow
              position={[
                parcelX,
                0.012,
                parcelZ,
              ]}
              rotation={[
                0,
                (hashValue(seed + 37) - 0.5) * 0.05,
                0,
              ]}
            >
              <boxGeometry
                args={[
                  parcelWidth,
                  0.025,
                  parcelDepth,
                ]}
              />
              <meshStandardMaterial
                color="#737b72"
                roughness={0.96}
              />
            </mesh>,
          );

          /*
           * Some residential plots get a small courtyard.
           * This breaks the repetitive "one box per cell" pattern.
           */
          if (
            type === "residential" &&
            variation > 0.57 &&
            parcelWidth > 2.5 &&
            parcelDepth > 2.35
          ) {
            result.push(
              <mesh
                key={`${block.id}-courtyard-${row}-${column}`}
                receiveShadow
                position={[
                  parcelX +
                    parcelWidth * 0.17,
                  0.032,
                  parcelZ +
                    parcelDepth * 0.08,
                ]}
              >
                <boxGeometry
                  args={[
                    Math.min(
                      parcelWidth * 0.28,
                      0.72,
                    ),
                    0.02,
                    Math.min(
                      parcelDepth * 0.25,
                      0.62,
                    ),
                  ]}
                />
                <meshStandardMaterial
                  color="#879b7b"
                  roughness={0.98}
                />
              </mesh>,
            );
          }

          const buildingType =
            chooseBuildingType(
              type,
              seed + 41,
            );

          /*
           * Keep a clear setback from the access/street edge.
           */
          const setback =
            type === "commercial"
              ? 0.22
              : type === "mixed"
                ? 0.28
                : 0.36;

          const buildingX =
            parcelX +
            (hashValue(seed + 47) - 0.5) *
              parcelWidth *
              0.14;

          const buildingZ =
            parcelZ +
            setback * 0.12 +
            (hashValue(seed + 53) - 0.5) *
              parcelDepth *
              0.13;

          /*
           * Building scale varies by land use.
           * Residential neighbourhoods stay predominantly low/mid-rise.
           */
          let baseScale = 1.6;

          if (
            buildingType ===
            "residential"
          ) {
            baseScale = lerp(
              1.52,
              1.82,
              hashValue(seed + 59),
            );
          }

          if (
            buildingType ===
            "residentialLight"
          ) {
            baseScale = lerp(
              1.36,
              1.6,
              hashValue(seed + 61),
            );
          }

          if (
            buildingType ===
            "commercial"
          ) {
            baseScale = lerp(
              1.68,
              1.94,
              hashValue(seed + 67),
            );
          }

          if (
            buildingType ===
            "office"
          ) {
            baseScale = lerp(
              1.72,
              2.02,
              hashValue(seed + 71),
            );
          }

          if (
            buildingType ===
            "school"
          ) {
            baseScale = lerp(
              1.82,
              2.12,
              hashValue(seed + 73),
            );
          }

          if (
            buildingType ===
            "hospital"
          ) {
            baseScale = lerp(
              1.92,
              2.25,
              hashValue(seed + 79),
            );
          }

          if (
            buildingType ===
            "government"
          ) {
            baseScale = lerp(
              1.84,
              2.14,
              hashValue(seed + 83),
            );
          }

          /*
           * Keep every building within its parcel.
           */
          const widthScale = Math.min(
            baseScale *
              lerp(
                0.84,
                1.0,
                hashValue(seed + 89),
              ),
            Math.max(
              (parcelWidth - 0.38) /
                1.18,
              1.0,
            ),
          );

          const depthScale = Math.min(
            baseScale *
              lerp(
                0.84,
                1.0,
                hashValue(seed + 97),
              ),
            Math.max(
              (parcelDepth - 0.38) /
                0.92,
              1.0,
            ),
          );

          const heightScale =
            buildingType ===
            "residentialLight"
              ? lerp(
                  0.88,
                  1.02,
                  hashValue(seed + 101),
                )
              : buildingType ===
                  "residential"
                ? lerp(
                    0.92,
                    1.1,
                    hashValue(seed + 103),
                  )
                : lerp(
                    0.92,
                    1.12,
                    hashValue(seed + 107),
                  );

          /*
           * Buildings generally follow the street/block axis.
           * Only a tiny micro-rotation prevents mechanical perfection.
           */
          const streetRotation =
            column === 0 ||
            column === columns - 1
              ? 0
              : row === 0 ||
                  row === rows - 1
                ? Math.PI / 2
                : hashValue(seed + 109) >
                    0.55
                  ? 0
                  : Math.PI / 2;

          const microRotation =
            (hashValue(seed + 113) -
              0.5) *
            0.035;

          result.push(
            <Building
              key={`${block.id}-building-${row}-${column}`}
              position={[
                buildingX,
                0,
                buildingZ,
              ]}
              scale={[
                widthScale,
                heightScale,
                depthScale,
              ]}
              type={buildingType}
              rotation={
                streetRotation +
                microRotation
              }
              variant={Math.floor(
                hashValue(seed + 127) *
                  12,
              )}
            />,
          );
        }
      }
    });

    return result;
  }, []);

  return (
    <group name="kanpur-city-buildings">
      {buildings}
    </group>
  );
};

export default CityBuildings;