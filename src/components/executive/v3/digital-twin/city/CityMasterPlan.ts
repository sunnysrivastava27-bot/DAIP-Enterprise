/* ============================================================
   DAIP DIGITAL TWIN
   KANPUR CITY MASTER PLAN
   ============================================================

   PURPOSE
   -------
   This file is the CITY DATA LAYER.

   It does NOT render 3D objects.

   It defines:
   - city extent
   - major districts
   - urban character
   - major roads
   - parks
   - water bodies
   - landmarks
   - industrial areas
   - education areas
   - healthcare areas
   - future GIS anchors

   IMPORTANT
   ----------
   Coordinates are DAIP local 3D coordinates.

   They are NOT claimed to be survey-grade GIS coordinates.

   Later these coordinates can be replaced by:
   - GIS
   - satellite
   - OSM
   - KDA GIS
   - official master-plan datasets

   The renderer should not need to change.
   ============================================================ */


/* ============================================================
   CITY EXTENT
   ============================================================ */

export const KANPUR_CITY = {
  id: "kanpur",
  name: "Kanpur",
  displayName: "Kanpur Development Authority",
  
  /*
   Large city canvas.
   We are deliberately increasing the diameter substantially
   from the previous 180 x 180 demo environment.
  */
  width: 360,
  depth: 300,

  /*
   North is negative Z in our DAIP scene.
  */
  north: -150,
  south: 150,
  west: -180,
  east: 180,

  center: {
    x: 0,
    z: 0,
  },

  terrain: {
    width: 390,
    depth: 330,
  },
} as const;


/* ============================================================
   TYPES
   ============================================================ */

export type CityDistrictType =
  | "central"
  | "residential"
  | "commercial"
  | "industrial"
  | "education"
  | "healthcare"
  | "government"
  | "transport"
  | "recreation"
  | "mixed-use"
  | "riverfront";


export interface CityDistrict {
  id: string;
  name: string;
  type: CityDistrictType;

  center: [number, number];

  width: number;
  depth: number;

  density:
    | "low"
    | "medium"
    | "high"
    | "very-high";

  buildingCharacter:
    | "bungalow"
    | "low-rise"
    | "mixed"
    | "mid-rise"
    | "high-rise"
    | "institutional"
    | "industrial";

  color: string;

  description: string;
}


export interface CityRoad {
  id: string;
  name: string;

  category:
    | "expressway"
    | "arterial"
    | "major"
    | "collector"
    | "local";

  points: Array<[number, number]>;

  width: number;

  importance: number;

  color: string;
}


export interface CityWaterBody {
  id: string;
  name: string;

  type:
    | "river"
    | "lake"
    | "pond"
    | "drain";

  points: Array<[number, number]>;

  width: number;

  color: string;
}


export interface CityPark {
  id: string;
  name: string;

  center: [number, number];

  width: number;
  depth: number;

  type:
    | "city-park"
    | "neighborhood-park"
    | "green-belt"
    | "riverfront"
    | "sports";

  color: string;
}


export interface CityLandmark {
  id: string;
  name: string;

  category:
    | "government"
    | "education"
    | "healthcare"
    | "transport"
    | "commercial"
    | "recreation"
    | "religious"
    | "industrial"
    | "heritage";

  position: [number, number];

  scale: number;

  importance: "local" | "major" | "strategic";

  color: string;
}


/* ============================================================
   DISTRICTS
   ============================================================

   This is the first DAIP representation of Kanpur's urban
   structure.

   These are intentionally large zones.

   Later each district will contain:
   - wards
   - blocks
   - roads
   - plots
   - properties
   - buildings
   ============================================================ */

export const KANPUR_DISTRICTS: CityDistrict[] = [

  /* ----------------------------------------------------------
     NORTH / NORTH-WEST
     ---------------------------------------------------------- */

  {
    id: "kalyanpur",
    name: "Kalyanpur",
    type: "education",
    center: [-95, -90],
    width: 90,
    depth: 70,
    density: "medium",
    buildingCharacter: "mixed",
    color: "#4f8a72",
    description:
      "Kalyanpur and the western education/residential belt.",
  },

  {
    id: "iit-kanpur",
    name: "IIT Kanpur",
    type: "education",
    center: [-145, -115],
    width: 55,
    depth: 45,
    density: "low",
    buildingCharacter: "institutional",
    color: "#367a8c",
    description:
      "Major educational and research campus zone.",
  },

  {
    id: "rawatpur",
    name: "Rawatpur",
    type: "residential",
    center: [-35, -85],
    width: 65,
    depth: 55,
    density: "high",
    buildingCharacter: "mixed",
    color: "#9b8b68",
    description:
      "Dense residential and mixed urban belt.",
  },

  {
    id: "kakadeo",
    name: "Kakadeo",
    type: "mixed-use",
    center: [5, -85],
    width: 60,
    depth: 55,
    density: "very-high",
    buildingCharacter: "mid-rise",
    color: "#a47b55",
    description:
      "Dense mixed-use urban district with strong commercial activity.",
  },


  /* ----------------------------------------------------------
     CENTRAL KANPUR
     ---------------------------------------------------------- */

  {
    id: "civil-lines",
    name: "Civil Lines",
    type: "central",
    center: [-20, -30],
    width: 75,
    depth: 65,
    density: "high",
    buildingCharacter: "mixed",
    color: "#466f7c",
    description:
      "Central administrative, commercial and institutional zone.",
  },

  {
    id: "swaroop-nagar",
    name: "Swaroop Nagar",
    type: "mixed-use",
    center: [-75, -35],
    width: 55,
    depth: 50,
    density: "high",
    buildingCharacter: "mid-rise",
    color: "#876b52",
    description:
      "Established central residential and commercial district.",
  },

  {
    id: "parade",
    name: "Parade / Central Market",
    type: "commercial",
    center: [35, -15],
    width: 55,
    depth: 45,
    density: "very-high",
    buildingCharacter: "mid-rise",
    color: "#9a6a45",
    description:
      "High-intensity central commercial district.",
  },

  {
    id: "kanpur-central",
    name: "Kanpur Central",
    type: "transport",
    center: [45, 15],
    width: 45,
    depth: 35,
    density: "very-high",
    buildingCharacter: "mixed",
    color: "#526b80",
    description:
      "Major railway and urban transport node.",
  },


  /* ----------------------------------------------------------
     SOUTH / SOUTH-WEST
     ---------------------------------------------------------- */

  {
    id: "govind-nagar",
    name: "Govind Nagar",
    type: "residential",
    center: [-65, 55],
    width: 75,
    depth: 65,
    density: "high",
    buildingCharacter: "mixed",
    color: "#8c8068",
    description:
      "Large established residential and commercial district.",
  },

  {
    id: "kidwai-nagar",
    name: "Kidwai Nagar",
    type: "residential",
    center: [-10, 70],
    width: 75,
    depth: 65,
    density: "high",
    buildingCharacter: "mixed",
    color: "#9b8769",
    description:
      "Dense southern residential district.",
  },

  {
    id: "barra",
    name: "Barra",
    type: "residential",
    center: [65, 75],
    width: 90,
    depth: 70,
    density: "high",
    buildingCharacter: "low-rise",
    color: "#907b61",
    description:
      "Large southern residential expansion belt.",
  },

  {
    id: "naubasta",
    name: "Naubasta",
    type: "mixed-use",
    center: [110, 125],
    width: 70,
    depth: 55,
    density: "medium",
    buildingCharacter: "low-rise",
    color: "#81765e",
    description:
      "Southern growth and mixed residential corridor.",
  },


  /* ----------------------------------------------------------
     WEST
     ---------------------------------------------------------- */

  {
    id: "panki",
    name: "Panki",
    type: "industrial",
    center: [-125, 25],
    width: 85,
    depth: 85,
    density: "medium",
    buildingCharacter: "industrial",
    color: "#765e4e",
    description:
      "Major western industrial and logistics belt.",
  },

  {
    id: "dada-nagar",
    name: "Dada Nagar",
    type: "industrial",
    center: [-115, 90],
    width: 60,
    depth: 55,
    density: "medium",
    buildingCharacter: "industrial",
    color: "#795c4d",
    description:
      "Established industrial area.",
  },


  /* ----------------------------------------------------------
     EAST
     ---------------------------------------------------------- */

  {
    id: "jajmau",
    name: "Jajmau",
    type: "industrial",
    center: [120, 20],
    width: 80,
    depth: 75,
    density: "medium",
    buildingCharacter: "industrial",
    color: "#78594c",
    description:
      "Eastern industrial district along the Ganga corridor.",
  },

  {
    id: "chakeri",
    name: "Chakeri",
    type: "transport",
    center: [145, 95],
    width: 75,
    depth: 65,
    density: "medium",
    buildingCharacter: "mixed",
    color: "#586d78",
    description:
      "Airport, highway and southern-eastern transport gateway.",
  },


  /* ----------------------------------------------------------
     SOUTH-EAST
     ---------------------------------------------------------- */

  {
    id: "shyam-nagar",
    name: "Shyam Nagar",
    type: "residential",
    center: [60, 115],
    width: 55,
    depth: 45,
    density: "medium",
    buildingCharacter: "low-rise",
    color: "#8b7c64",
    description:
      "Southern residential development zone.",
  },


  /* ----------------------------------------------------------
     NORTH-EAST
     ---------------------------------------------------------- */

  {
    id: "nawabganj",
    name: "Nawabganj",
    type: "recreation",
    center: [70, -85],
    width: 60,
    depth: 55,
    density: "low",
    buildingCharacter: "low-rise",
    color: "#4c795d",
    description:
      "Green and institutional northern belt.",
  },
];


/* ============================================================
   GANGA RIVER
   ============================================================

   The river is one of the most important visual elements.

   It should NOT be represented as a small circular pond.

   It will eventually become a large continuous water corridor
   across the northern/eastern side of the city.
   ============================================================ */

export const KANPUR_WATER: CityWaterBody[] = [

  {
    id: "ganga",
    name: "Ganga River",
    type: "river",

    points: [
      [-180, -125],
      [-145, -120],
      [-110, -115],
      [-75, -110],
      [-40, -105],
      [-5, -100],
      [30, -92],
      [65, -82],
      [100, -70],
      [135, -52],
      [180, -35],
    ],

    width: 28,

    color: "#3b8292",
  },

  {
    id: "pandu",
    name: "Pandu River",
    type: "river",

    points: [
      [-135, 105],
      [-100, 100],
      [-65, 96],
      [-30, 92],
      [5, 90],
      [40, 86],
      [75, 82],
      [110, 78],
    ],

    width: 9,

    color: "#477b82",
  },
];


/* ============================================================
   MAJOR PARKS / GREEN AREAS
   ============================================================ */

export const KANPUR_PARKS: CityPark[] = [

  {
    id: "moti-jheel",
    name: "Moti Jheel",
    center: [-40, -55],
    width: 28,
    depth: 22,
    type: "city-park",
    color: "#3e805b",
  },

  {
    id: "phool-bagh",
    name: "Phool Bagh",
    center: [15, -5],
    width: 25,
    depth: 20,
    type: "city-park",
    color: "#47855d",
  },

  {
    id: "green-park",
    name: "Green Park",
    center: [-5, -70],
    width: 32,
    depth: 24,
    type: "sports",
    color: "#39714f",
  },

  {
    id: "nawabganj-green-belt",
    name: "Nawabganj Green Belt",
    center: [65, -92],
    width: 48,
    depth: 32,
    type: "green-belt",
    color: "#3c7754",
  },

  {
    id: "ganga-riverfront",
    name: "Ganga Riverfront",
    center: [40, -100],
    width: 90,
    depth: 18,
    type: "riverfront",
    color: "#4b8b65",
  },

  {
    id: "south-city-park",
    name: "South City Green",
    center: [-45, 105],
    width: 35,
    depth: 28,
    type: "neighborhood-park",
    color: "#4d8058",
  },
];


/* ============================================================
   MAJOR ROAD NETWORK
   ============================================================

   IMPORTANT:
   This is the beginning of a road hierarchy.

   We are intentionally NOT creating a perfect grid.

   Real cities have:
   - diagonal roads
   - curved corridors
   - irregular intersections
   - ring connections
   - local streets
   - dead ends
   - alleys

   The next phase will generate local roads inside each
   district.
   ============================================================ */

export const KANPUR_ROADS: CityRoad[] = [

  /* ----------------------------------------------------------
     PRIMARY EAST-WEST CORRIDORS
     ---------------------------------------------------------- */

  {
    id: "east-west-central",
    name: "Central East-West Corridor",
    category: "arterial",
    points: [
      [-180, 0],
      [-135, -3],
      [-90, -5],
      [-45, -4],
      [0, -2],
      [45, 1],
      [90, 8],
      [135, 16],
      [180, 25],
    ],
    width: 8,
    importance: 10,
    color: "#454d52",
  },

  {
    id: "south-central-corridor",
    name: "South Central Corridor",
    category: "arterial",
    points: [
      [-170, 55],
      [-125, 52],
      [-80, 50],
      [-35, 53],
      [10, 58],
      [55, 64],
      [100, 70],
      [145, 82],
      [175, 92],
    ],
    width: 7,
    importance: 9,
    color: "#424a4f",
  },


  /* ----------------------------------------------------------
     NORTH-SOUTH CORRIDORS
     ---------------------------------------------------------- */

  {
    id: "west-north-south",
    name: "Panki-Kalyanpur Corridor",
    category: "arterial",
    points: [
      [-135, -145],
      [-130, -110],
      [-128, -75],
      [-125, -35],
      [-120, 5],
      [-115, 45],
      [-110, 90],
      [-105, 140],
    ],
    width: 8,
    importance: 10,
    color: "#424a4f",
  },

  {
    id: "central-north-south",
    name: "Central Kanpur North-South Corridor",
    category: "major",
    points: [
      [-25, -145],
      [-22, -110],
      [-20, -75],
      [-18, -40],
      [-15, 0],
      [-12, 40],
      [-10, 80],
      [-8, 125],
      [-5, 150],
    ],
    width: 7,
    importance: 9,
    color: "#454d52",
  },

  {
    id: "east-north-south",
    name: "Jajmau-Chakeri Corridor",
    category: "arterial",
    points: [
      [105, -110],
      [108, -75],
      [112, -40],
      [118, 0],
      [125, 40],
      [135, 80],
      [145, 120],
      [150, 150],
    ],
    width: 8,
    importance: 10,
    color: "#41494e",
  },


  /* ----------------------------------------------------------
     WESTERN INDUSTRIAL CONNECTOR
     ---------------------------------------------------------- */

  {
    id: "panki-industrial",
    name: "Panki Industrial Connector",
    category: "major",
    points: [
      [-180, 25],
      [-155, 25],
      [-130, 26],
      [-105, 28],
      [-80, 30],
      [-55, 32],
    ],
    width: 7,
    importance: 8,
    color: "#4a5053",
  },


  /* ----------------------------------------------------------
     SOUTHERN CONNECTOR
     ---------------------------------------------------------- */

  {
    id: "kidwai-barra",
    name: "Kidwai Nagar-Barra Corridor",
    category: "major",
    points: [
      [-75, 75],
      [-45, 76],
      [-15, 78],
      [15, 80],
      [45, 82],
      [75, 85],
      [105, 90],
    ],
    width: 6,
    importance: 8,
    color: "#4b5154",
  },


  /* ----------------------------------------------------------
     RIVER CORRIDOR
     ---------------------------------------------------------- */

  {
    id: "ganga-river-road",
    name: "Ganga Riverfront Road",
    category: "major",
    points: [
      [-165, -95],
      [-125, -90],
      [-85, -87],
      [-45, -84],
      [-5, -80],
      [35, -72],
      [75, -60],
      [115, -42],
      [155, -25],
    ],
    width: 5,
    importance: 7,
    color: "#50575a",
  },
];


/* ============================================================
   MAJOR LANDMARKS
   ============================================================ */

export const KANPUR_LANDMARKS: CityLandmark[] = [

  {
    id: "kda",
    name: "Kanpur Development Authority",
    category: "government",
    position: [-20, -20],
    scale: 2.0,
    importance: "strategic",
    color: "#18bcd8",
  },

  {
    id: "iit-kanpur",
    name: "IIT Kanpur",
    category: "education",
    position: [-145, -115],
    scale: 2.8,
    importance: "major",
    color: "#3ca6c6",
  },

  {
    id: "kanpur-central",
    name: "Kanpur Central Railway Station",
    category: "transport",
    position: [45, 15],
    scale: 2.0,
    importance: "strategic",
    color: "#e6a23c",
  },

  {
    id: "green-park",
    name: "Green Park Stadium",
    category: "commercial",
    position: [-5, -70],
    scale: 1.8,
    importance: "major",
    color: "#55a66a",
  },

  {
    id: "jajmau-industrial",
    name: "Jajmau Industrial Area",
    category: "industrial",
    position: [120, 20],
    scale: 2.2,
    importance: "strategic",
    color: "#c37b55",
  },

  {
    id: "panki-industrial",
    name: "Panki Industrial Area",
    category: "industrial",
    position: [-125, 25],
    scale: 2.2,
    importance: "strategic",
    color: "#c37b55",
  },

  {
    id: "chakeri",
    name: "Chakeri Airport Zone",
    category: "transport",
    position: [145, 95],
    scale: 2.0,
    importance: "major",
    color: "#6c9bb0",
  },

  {
    id: "moti-jheel",
    name: "Moti Jheel",
    category: "recreation",
    position: [-40, -55],
    scale: 1.5,
    importance: "major",
    color: "#42a56b",
  },
];


/* ============================================================
   CITY INTELLIGENCE ZONES
   ============================================================

   These will eventually connect directly to DAIP intelligence:

   - Revenue
   - Properties
   - Encroachments
   - Projects
   - Health
   - Roads
   - Complaints
   - Assets
   - Land bank
   ============================================================ */

export const KANPUR_INTELLIGENCE_ZONES = [

  {
    id: "zone-central",
    name: "Central Administrative Zone",
    districtIds: [
      "civil-lines",
      "swaroop-nagar",
      "parade",
    ],
    priority: "critical",
  },

  {
    id: "zone-west",
    name: "Western Industrial Zone",
    districtIds: [
      "panki",
      "dada-nagar",
    ],
    priority: "high",
  },

  {
    id: "zone-east",
    name: "Eastern Industrial Zone",
    districtIds: [
      "jajmau",
      "chakeri",
    ],
    priority: "high",
  },

  {
    id: "zone-south",
    name: "Southern Growth Zone",
    districtIds: [
      "kidwai-nagar",
      "barra",
      "naubasta",
      "shyam-nagar",
    ],
    priority: "high",
  },

  {
    id: "zone-north",
    name: "Northern Education Zone",
    districtIds: [
      "kalyanpur",
      "iit-kanpur",
      "rawatpur",
      "kakadeo",
    ],
    priority: "medium",
  },
] as const;


/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

export const getDistrictById = (
  id: string
): CityDistrict | undefined =>
  KANPUR_DISTRICTS.find(
    (district) => district.id === id
  );


export const getLandmarkById = (
  id: string
): CityLandmark | undefined =>
  KANPUR_LANDMARKS.find(
    (landmark) => landmark.id === id
  );


export const getRoadById = (
  id: string
): CityRoad | undefined =>
  KANPUR_ROADS.find(
    (road) => road.id === id
  );


/* ============================================================
   MASTER EXPORT
   ============================================================ */

export const KANPUR_MASTER_PLAN = {
  city: KANPUR_CITY,

  districts: KANPUR_DISTRICTS,

  roads: KANPUR_ROADS,

  water: KANPUR_WATER,

  parks: KANPUR_PARKS,

  landmarks: KANPUR_LANDMARKS,

  intelligenceZones: KANPUR_INTELLIGENCE_ZONES,
} as const;


export default KANPUR_MASTER_PLAN;