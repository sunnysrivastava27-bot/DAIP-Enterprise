import type {
  AdministrativeZone,
  AuthorityConfig,
  CityBoundary,
  CityBuilding,
  CityGreenSpace,
  CityParcel,
  CityPlace,
  CityProject,
  CityRoad,
  CityTwinData,
  CityWaterBody,
  LandUseZone,
  PropertyIntelligence,
} from "../CityTwinConfig";

/* ============================================================
   DAIP — KANPUR CITY DATA PACKAGE
   ============================================================

   IMPORTANT
   ----------
   This file is the Kanpur-specific DATA CONTRACT.

   It is deliberately separated from the DAIP rendering engine.

   DAIP CORE:
       reusable software

   KANPUR PACKAGE:
       Kanpur-specific geography + authority data

   FUTURE:
       LDA → Lucknow package
       ADA → Agra package
       etc.

   ============================================================

   SOURCE STRATEGY
   ---------------
   1. KDA / official planning data
   2. OpenStreetMap / Overture for geographic base layers
   3. Google Open Buildings / equivalent building-footprint
      source where licensing and deployment terms permit
   4. Authority-provided GIS/property/project datasets

   REAL GEOMETRY IS NOT HARD-CODED HERE.

   The arrays below will be populated by the GIS ingestion
   pipeline after we download and normalize the actual datasets.
============================================================ */


/* ============================================================
   KANPUR AUTHORITY
============================================================ */

export const KANPUR_AUTHORITY: AuthorityConfig = {
  id: "KDA",

  name: "Kanpur Development Authority",

  shortName: "KDA",

  city: "Kanpur",

  state: "Uttar Pradesh",

  country: "India",

  coordinateSystem: "WGS84",

  /*
   * Reference centre only.
   *
   * This is NOT the city boundary.
   * It is only used as a convenient geographic anchor.
   */
  center: {
    latitude: 26.4610,
    longitude: 80.3218,
  },
};


/* ============================================================
   DATASET STATUS
   ============================================================

   These flags tell DAIP what has actually been ingested.

   We intentionally start with false values.

   The Digital Twin should NEVER pretend a layer exists when
   the underlying source data has not been loaded.
============================================================ */

export const KANPUR_DATA_STATUS = {
  boundary: false,
  roads: false,
  buildings: false,
  parcels: false,
  landUse: false,
  water: false,
  greenSpaces: false,
  places: false,
  administrativeZones: false,
  projects: false,
  propertyIntelligence: false,
} as const;


/* ============================================================
   SOURCE REGISTRY
============================================================ */

export interface KanpurDataSource {
  id: string;

  layer:
    | "boundary"
    | "roads"
    | "buildings"
    | "parcels"
    | "landUse"
    | "water"
    | "greenSpaces"
    | "places"
    | "administrativeZones"
    | "projects"
    | "propertyIntelligence";

  name: string;

  provider: string;

  /*
   * Data format expected after ingestion.
   */
  format:
    | "GeoJSON"
    | "GeoParquet"
    | "CSV"
    | "API"
    | "AuthorityGIS";

  /*
   * Whether this source is currently configured in the package.
   */
  configured: boolean;

  /*
   * Human-readable note.
   */
  note: string;
}


/* ============================================================
   KANPUR SOURCE REGISTRY
============================================================ */

export const KANPUR_DATA_SOURCES: KanpurDataSource[] = [
  {
    id: "kda-master-plan",

    layer: "landUse",

    name: "Kanpur Master Plan",

    provider: "Kanpur Development Authority",

    format: "AuthorityGIS",

    configured: true,

    note:
      "Primary planning reference for Kanpur land-use structure.",
  },

  {
    id: "osm-kanpur-roads",

    layer: "roads",

    name: "OpenStreetMap Kanpur Roads",

    provider: "OpenStreetMap",

    format: "GeoJSON",

    configured: true,

    note:
      "Base road network. Normalize into DAIP CityRoad records.",
  },

  {
    id: "overture-transportation",

    layer: "roads",

    name: "Overture Transportation",

    provider: "Overture Maps Foundation",

    format: "GeoParquet",

    configured: true,

    note:
      "Secondary/validation road source and transportation enrichment.",
  },

  {
    id: "overture-buildings",

    layer: "buildings",

    name: "Overture Buildings",

    provider: "Overture Maps Foundation",

    format: "GeoParquet",

    configured: true,

    note:
      "Building-footprint source for GIS-driven 3D generation.",
  },

  {
    id: "google-open-buildings",

    layer: "buildings",

    name: "Google Open Buildings",

    provider: "Google Research",

    format: "CSV",

    configured: true,

    note:
      "Building footprint source with confidence information. " +
      "Use only according to its applicable dataset/license terms.",
  },

  {
    id: "osm-kanpur-water",

    layer: "water",

    name: "OpenStreetMap Water",

    provider: "OpenStreetMap",

    format: "GeoJSON",

    configured: true,

    note:
      "River, canal, lake, pond and drainage features where mapped.",
  },

  {
    id: "overture-water",

    layer: "water",

    name: "Overture Water",

    provider: "Overture Maps Foundation",

    format: "GeoParquet",

    configured: true,

    note:
      "Water feature validation/enrichment layer.",
  },

  {
    id: "osm-kanpur-green",

    layer: "greenSpaces",

    name: "OpenStreetMap Green Areas",

    provider: "OpenStreetMap",

    format: "GeoJSON",

    configured: true,

    note:
      "Parks, gardens, playgrounds and mapped open green spaces.",
  },

  {
    id: "overture-places",

    layer: "places",

    name: "Overture Places",

    provider: "Overture Maps Foundation",

    format: "GeoParquet",

    configured: true,

    note:
      "Institutions, markets, landmarks and other mapped places.",
  },

  {
    id: "authority-property-gis",

    layer: "parcels",

    name: "Authority Property GIS",

    provider: "Development Authority",

    format: "AuthorityGIS",

    configured: false,

    note:
      "Must be supplied or licensed by the authority for Property 360.",
  },

  {
    id: "authority-wards",

    layer: "administrativeZones",

    name: "Authority Ward / Zone GIS",

    provider: "Development Authority / Local Government",

    format: "AuthorityGIS",

    configured: false,

    note:
      "Official administrative boundaries should replace inferred boundaries.",
  },

  {
    id: "authority-projects",

    layer: "projects",

    name: "Authority Project Database",

    provider: "Development Authority",

    format: "API",

    configured: false,

    note:
      "DAIP Project & Works data will be connected here.",
  },

  {
    id: "authority-enforcement",

    layer: "propertyIntelligence",

    name: "Authority Enforcement / Property Intelligence",

    provider: "Development Authority",

    format: "API",

    configured: false,

    note:
      "Encroachment, approvals, inspections and enforcement data.",
  },
];


/* ============================================================
   RAW GIS DATA CONTAINERS
   ============================================================

   Initially empty.

   The ingestion layer will populate these arrays.

   IMPORTANT:
   Do not manually invent city coordinates here.
============================================================ */

export const KANPUR_BOUNDARY: CityBoundary | undefined =
  undefined;

export const KANPUR_ROADS: CityRoad[] = [];

export const KANPUR_BUILDINGS: CityBuilding[] = [];

export const KANPUR_PARCELS: CityParcel[] = [];

export const KANPUR_LAND_USE: LandUseZone[] = [];

export const KANPUR_WATER: CityWaterBody[] = [];

export const KANPUR_GREEN_SPACES: CityGreenSpace[] = [];

export const KANPUR_PLACES: CityPlace[] = [];

export const KANPUR_ADMINISTRATIVE_ZONES: AdministrativeZone[] =
  [];

export const KANPUR_PROJECTS: CityProject[] = [];

export const KANPUR_PROPERTY_INTELLIGENCE: PropertyIntelligence[] =
  [];


/* ============================================================
   DATASET METADATA
============================================================ */

export const KANPUR_DATASETS = [
  {
    datasetId: "kda-master-plan",

    name: "Kanpur Master Plan",

    source: "Kanpur Development Authority",

    version: "Current official planning reference",

    license:
      "Use according to KDA publication / permission terms.",
  },

  {
    datasetId: "osm-kanpur",

    name: "OpenStreetMap Kanpur",

    source: "OpenStreetMap contributors",

    version: "Ingestion release to be recorded",

    license: "ODbL",
  },

  {
    datasetId: "overture-kanpur",

    name: "Overture Maps Kanpur",

    source: "Overture Maps Foundation",

    version: "Ingestion release to be recorded",

    license:
      "Use according to the applicable Overture theme license.",
  },

  {
    datasetId: "google-open-buildings",

    name: "Google Open Buildings",

    source: "Google Research",

    version: "V3",

    license:
      "Use according to the applicable Google Open Buildings dataset terms.",
  },
] as const;


/* ============================================================
   COMPLETE KANPUR DATASET
============================================================ */

export const KANPUR_CITY_DATA: CityTwinData = {
  authority: KANPUR_AUTHORITY,

  boundary: KANPUR_BOUNDARY,

  roads: KANPUR_ROADS,

  buildings: KANPUR_BUILDINGS,

  parcels: KANPUR_PARCELS,

  landUse: KANPUR_LAND_USE,

  water: KANPUR_WATER,

  greenSpaces: KANPUR_GREEN_SPACES,

  places: KANPUR_PLACES,

  administrativeZones:
    KANPUR_ADMINISTRATIVE_ZONES,

  projects: KANPUR_PROJECTS,

  propertyIntelligence:
    KANPUR_PROPERTY_INTELLIGENCE,

  datasets: KANPUR_DATASETS.map(
    (dataset) => ({
      datasetId: dataset.datasetId,

      name: dataset.name,

      source: dataset.source,

      version: dataset.version,

      license: dataset.license,
    }),
  ),
};


/* ============================================================
   HELPERS
============================================================ */

/*
 * Returns true when a geographic layer has actually been
 * populated.
 */
export const hasKanpurData = (
  layer:
    | "boundary"
    | "roads"
    | "buildings"
    | "parcels"
    | "landUse"
    | "water"
    | "greenSpaces"
    | "places"
    | "administrativeZones"
    | "projects"
    | "propertyIntelligence",
): boolean => {
  switch (layer) {
    case "boundary":
      return Boolean(KANPUR_BOUNDARY);

    case "roads":
      return KANPUR_ROADS.length > 0;

    case "buildings":
      return KANPUR_BUILDINGS.length > 0;

    case "parcels":
      return KANPUR_PARCELS.length > 0;

    case "landUse":
      return KANPUR_LAND_USE.length > 0;

    case "water":
      return KANPUR_WATER.length > 0;

    case "greenSpaces":
      return KANPUR_GREEN_SPACES.length > 0;

    case "places":
      return KANPUR_PLACES.length > 0;

    case "administrativeZones":
      return KANPUR_ADMINISTRATIVE_ZONES.length > 0;

    case "projects":
      return KANPUR_PROJECTS.length > 0;

    case "propertyIntelligence":
      return KANPUR_PROPERTY_INTELLIGENCE.length > 0;

    default:
      return false;
  }
};


/*
 * Returns a compact readiness summary.
 */
export const getKanpurDataReadiness = () => ({
  boundary: hasKanpurData("boundary"),

  roads: hasKanpurData("roads"),

  buildings: hasKanpurData("buildings"),

  parcels: hasKanpurData("parcels"),

  landUse: hasKanpurData("landUse"),

  water: hasKanpurData("water"),

  greenSpaces: hasKanpurData("greenSpaces"),

  places: hasKanpurData("places"),

  administrativeZones:
    hasKanpurData(
      "administrativeZones",
    ),

  projects:
    hasKanpurData("projects"),

  propertyIntelligence:
    hasKanpurData(
      "propertyIntelligence",
    ),
});


/* ============================================================
   DEFAULT EXPORT
============================================================ */

export default KANPUR_CITY_DATA;