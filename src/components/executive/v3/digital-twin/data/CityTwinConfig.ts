/* ============================================================
   DAIP CITY DIGITAL TWIN — DATA CONTRACT
   ============================================================

   PURPOSE
   -------
   This file defines the common structure used by every
   authority/city Digital Twin.

   The DAIP software stays the same.
   The CITY DATA changes.

   Example:

   KDA → Kanpur
   LDA → Lucknow
   ADA → Agra
   Future Authority → Its Own City

   IMPORTANT
   ----------
   This file does NOT contain Kanpur geometry yet.

   It defines the contract that real GIS data will eventually
   populate.
============================================================ */

/* ============================================================
   AUTHORITY
============================================================ */

export interface AuthorityConfig {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  country: string;

  /*
   * Geographic reference system used by the source data.
   * We will normally ingest geographic coordinates in WGS84.
   */
  coordinateSystem: "WGS84";

  /*
   * Approximate city/twin centre.
   * This is configuration, not the final geometry.
   */
  center: {
    latitude: number;
    longitude: number;
  };
}

/* ============================================================
   CITY BOUNDARY
============================================================ */

export interface CityBoundary {
  id: string;
  name: string;

  /*
   * Polygon coordinates.

   * Format:
   * [longitude, latitude]
   */
  polygon: Array<
    [number, number]
  >;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   ROAD
============================================================ */

export type RoadClass =
  | "national"
  | "state"
  | "arterial"
  | "secondary"
  | "local"
  | "lane"
  | "service"
  | "industrial"
  | "unknown";

export interface CityRoad {
  id: string;
  name?: string;

  class: RoadClass;

  /*
   * Geographic LineString
   *
   * [longitude, latitude]
   */
  geometry: Array<
    [number, number]
  >;

  widthMeters?: number;

  oneWay?: boolean;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   BUILDING
============================================================ */

export type BuildingUse =
  | "residential"
  | "commercial"
  | "mixed"
  | "office"
  | "institutional"
  | "hospital"
  | "school"
  | "university"
  | "government"
  | "industrial"
  | "religious"
  | "warehouse"
  | "utility"
  | "unknown";

export interface CityBuilding {
  id: string;

  /*
   * Actual building footprint.
   *
   * [longitude, latitude]
   */
  footprint: Array<
    [number, number]
  >;

  use: BuildingUse;

  /*
   * Height may come from:
   * - authority GIS
   * - LiDAR
   * - building dataset
   * - estimated model
   */
  heightMeters?: number;

  floors?: number;

  confidence?: number;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   LAND PARCEL
============================================================ */

export interface CityParcel {
  id: string;

  /*
   * Property/parcel boundary
   */
  polygon: Array<
    [number, number]
  >;

  landUse?: BuildingUse | string;

  areaSqMeters?: number;

  /*
   * Authority database identifier when available.
   */
  authorityPropertyId?: string;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   LAND USE
============================================================ */

export type LandUseClass =
  | "residential"
  | "commercial"
  | "mixed"
  | "industrial"
  | "institutional"
  | "recreational"
  | "transport"
  | "public-service"
  | "government"
  | "water"
  | "agriculture"
  | "vacant"
  | "other";

export interface LandUseZone {
  id: string;

  class: LandUseClass;

  polygon: Array<
    [number, number]
  >;

  name?: string;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   WATER
============================================================ */

export type WaterType =
  | "river"
  | "canal"
  | "lake"
  | "pond"
  | "drainage"
  | "reservoir"
  | "other";

export interface CityWaterBody {
  id: string;
  name?: string;

  type: WaterType;

  polygon?: Array<
    [number, number]
  >;

  line?: Array<
    [number, number]
  >;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   PARK / GREEN SPACE
============================================================ */

export type GreenSpaceType =
  | "park"
  | "garden"
  | "forest"
  | "green-belt"
  | "playground"
  | "open-space"
  | "other";

export interface CityGreenSpace {
  id: string;
  name?: string;

  type: GreenSpaceType;

  polygon: Array<
    [number, number]
  >;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   INSTITUTION / PLACE
============================================================ */

export type PlaceType =
  | "hospital"
  | "school"
  | "college"
  | "university"
  | "government"
  | "police"
  | "fire"
  | "religious"
  | "market"
  | "shopping"
  | "transport"
  | "industrial"
  | "landmark"
  | "other";

export interface CityPlace {
  id: string;

  name: string;

  type: PlaceType;

  location: {
    latitude: number;
    longitude: number;
  };

  buildingId?: string;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   ADMINISTRATIVE ZONE
============================================================ */

export type AdministrativeZoneType =
  | "ward"
  | "zone"
  | "sector"
  | "authority"
  | "planning-zone"
  | "other";

export interface AdministrativeZone {
  id: string;

  name: string;

  type: AdministrativeZoneType;

  polygon: Array<
    [number, number]
  >;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   PROJECT
============================================================ */

export type ProjectStatus =
  | "planned"
  | "tender"
  | "active"
  | "completed"
  | "delayed"
  | "cancelled";

export interface CityProject {
  id: string;

  name: string;

  category: string;

  status: ProjectStatus;

  location?: {
    latitude: number;
    longitude: number;
  };

  polygon?: Array<
    [number, number]
  >;

  startDate?: string;
  expectedCompletionDate?: string;

  source: string;
  sourceDate?: string;
}

/* ============================================================
   PROPERTY / DAIP INTELLIGENCE
============================================================ */

export interface PropertyIntelligence {
  propertyId: string;

  parcelId?: string;

  buildingId?: string;

  landUse?: string;

  /*
   * Future DAIP intelligence fields.
   */
  encroachmentRisk?: number;

  constructionStatus?: string;

  approvalStatus?: string;

  revenueStatus?: string;

  enforcementStatus?: string;

  lastInspectionDate?: string;

  source?: string;

  sourceDate?: string;
}

/* ============================================================
   DATASET METADATA
============================================================ */

export interface CityDatasetMetadata {
  datasetId: string;

  name: string;

  source: string;

  version?: string;

  captureDate?: string;

  publishedDate?: string;

  license?: string;

  /*
   * 0–1 confidence value where available.
   */
  confidence?: number;
}

/* ============================================================
   COMPLETE CITY TWIN DATASET
============================================================ */

export interface CityTwinData {
  authority: AuthorityConfig;

  boundary?: CityBoundary;

  roads: CityRoad[];

  buildings: CityBuilding[];

  parcels: CityParcel[];

  landUse: LandUseZone[];

  water: CityWaterBody[];

  greenSpaces: CityGreenSpace[];

  places: CityPlace[];

  administrativeZones: AdministrativeZone[];

  projects: CityProject[];

  propertyIntelligence: PropertyIntelligence[];

  datasets: CityDatasetMetadata[];
}

/* ============================================================
   DIGITAL TWIN SOURCE MODES
============================================================ */

export type CityTwinMode =
  | "procedural"
  | "gis"
  | "hybrid";

/*
 * PROCEDURAL
 * ----------
 * Existing prototype/demo mode.
 *
 * GIS
 * ---
 * Real geographic data is the source of truth.
 *
 * HYBRID
 * ------
 * Real GIS geometry + procedural rendering/details.
 *
 * HYBRID will be especially useful during development.
 */

/* ============================================================
   CITY TWIN CONFIGURATION
============================================================ */

export interface CityTwinConfig {
  mode: CityTwinMode;

  authorityId: string;

  cityName: string;

  coordinateSystem: "WGS84";

  units: "meters";

  /*
   * Which geographic layers are currently available.
   */
  layers: {
    boundary: boolean;
    roads: boolean;
    buildings: boolean;
    parcels: boolean;
    landUse: boolean;
    water: boolean;
    greenSpaces: boolean;
    places: boolean;
    administrativeZones: boolean;
    projects: boolean;
    propertyIntelligence: boolean;
  };

  /*
   * Rendering preferences.
   */
  rendering: {
    terrain: boolean;
    buildings3D: boolean;
    vegetation: boolean;
    roads3D: boolean;
    water3D: boolean;
  };
}

/* ============================================================
   DEFAULT KANPUR CONFIGURATION
   ------------------------------------------------------------
   This is ONLY the configuration.

   It is NOT claiming that these geographic layers are already
   loaded.

   We will connect real Kanpur datasets in the next stages.
============================================================ */

export const KANPUR_TWIN_CONFIG: CityTwinConfig = {
  mode: "hybrid",

  authorityId: "KDA",

  cityName: "Kanpur",

  coordinateSystem: "WGS84",

  units: "meters",

  layers: {
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
  },

  rendering: {
    terrain: true,
    buildings3D: true,
    vegetation: true,
    roads3D: true,
    water3D: true,
  },
};

/* ============================================================
   EXAMPLE AUTHORITY CONFIGURATION
   ------------------------------------------------------------
   These are templates only.

   They do NOT contain city geometry.
============================================================ */

export const LDA_TWIN_CONFIG: CityTwinConfig = {
  ...KANPUR_TWIN_CONFIG,

  authorityId: "LDA",

  cityName: "Lucknow",

  mode: "hybrid",

  layers: {
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
  },
};

/* ============================================================
   HELPER
============================================================ */

export const createEmptyCityTwinData = (
  authority: AuthorityConfig,
): CityTwinData => ({
  authority,

  boundary: undefined,

  roads: [],

  buildings: [],

  parcels: [],

  landUse: [],

  water: [],

  greenSpaces: [],

  places: [],

  administrativeZones: [],

  projects: [],

  propertyIntelligence: [],

  datasets: [],
});