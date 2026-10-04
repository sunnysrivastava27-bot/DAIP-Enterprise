export type DistrictType =
  | "government"
  | "commercial"
  | "residential"
  | "institutional"
  | "industrial"
  | "green"
  | "water"
  | "infrastructure";

export type BuildingType =
  | "government"
  | "commercial"
  | "residential"
  | "institutional"
  | "industrial"
  | "utility";

export type IntelligenceStatus =
  | "attention"
  | "monitor"
  | "active"
  | "operational";

export interface DistrictData {
  id: string;
  name: string;
  type: DistrictType;
  x: number;
  y: number;
  width: number;
  depth: number;
}

export interface BuildingData {
  id: string;
  districtId: string;
  type: BuildingType;
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  rotation?: number;
}

export interface RoadData {
  id: string;
  type: "primary" | "secondary" | "collector" | "sector";
  points: [number, number][];
}

export interface IntelligenceMarkerData {
  id: string;
  label: string;
  subtitle: string;
  status: IntelligenceStatus;
  x: number;
  y: number;
}

export const digitalTwinDistricts: DistrictData[] = [
  {
    id: "industrial",
    name: "Industrial Zone",
    type: "industrial",
    x: -8,
    y: -5,
    width: 6,
    depth: 5,
  },
  {
    id: "institutional",
    name: "Institutional District",
    type: "institutional",
    x: 0,
    y: -6,
    width: 7,
    depth: 5,
  },
  {
    id: "residential",
    name: "Residential Sectors",
    type: "residential",
    x: 7,
    y: -5,
    width: 6,
    depth: 5,
  },
  {
    id: "commercial",
    name: "Commercial District",
    type: "commercial",
    x: -8,
    y: 2,
    width: 6,
    depth: 5,
  },
  {
    id: "central-government",
    name: "Government Complex",
    type: "government",
    x: 0,
    y: 1,
    width: 5,
    depth: 5,
  },
  {
    id: "smart-city",
    name: "Smart City Infrastructure",
    type: "infrastructure",
    x: 8,
    y: 2,
    width: 5,
    depth: 5,
  },
  {
    id: "central-park",
    name: "Central Park",
    type: "green",
    x: -3,
    y: 7,
    width: 7,
    depth: 4,
  },
  {
    id: "water-management",
    name: "Water Management Zone",
    type: "water",
    x: 7,
    y: 7,
    width: 6,
    depth: 4,
  },
];

export const digitalTwinBuildings: BuildingData[] = [
  // Government / central complex
  {
    id: "gov-main",
    districtId: "central-government",
    type: "government",
    x: 0,
    y: 1,
    width: 3,
    depth: 2,
    height: 3.8,
  },
  {
    id: "gov-east",
    districtId: "central-government",
    type: "government",
    x: 2.2,
    y: 1.2,
    width: 1.4,
    depth: 1.5,
    height: 2.4,
  },
  {
    id: "gov-west",
    districtId: "central-government",
    type: "government",
    x: -2.2,
    y: 1.2,
    width: 1.4,
    depth: 1.5,
    height: 2.4,
  },

  // Commercial
  {
    id: "commercial-01",
    districtId: "commercial",
    type: "commercial",
    x: -8,
    y: 1,
    width: 1.5,
    depth: 1.5,
    height: 4.8,
  },
  {
    id: "commercial-02",
    districtId: "commercial",
    type: "commercial",
    x: -6.2,
    y: 1.2,
    width: 1.3,
    depth: 1.5,
    height: 3.8,
  },
  {
    id: "commercial-03",
    districtId: "commercial",
    type: "commercial",
    x: -8.5,
    y: 3.2,
    width: 1.8,
    depth: 1.2,
    height: 3.2,
  },

  // Institutional
  {
    id: "institutional-01",
    districtId: "institutional",
    type: "institutional",
    x: -2.5,
    y: -6,
    width: 2,
    depth: 1.6,
    height: 3.2,
  },
  {
    id: "institutional-02",
    districtId: "institutional",
    type: "institutional",
    x: 0,
    y: -6.5,
    width: 2.2,
    depth: 1.8,
    height: 4.2,
  },
  {
    id: "institutional-03",
    districtId: "institutional",
    type: "institutional",
    x: 2.7,
    y: -6,
    width: 1.8,
    depth: 1.5,
    height: 2.8,
  },

  // Residential
  {
    id: "residential-01",
    districtId: "residential",
    type: "residential",
    x: 6.5,
    y: -5,
    width: 1.2,
    depth: 1.2,
    height: 3.2,
  },
  {
    id: "residential-02",
    districtId: "residential",
    type: "residential",
    x: 8.2,
    y: -5,
    width: 1.2,
    depth: 1.2,
    height: 4.4,
  },
  {
    id: "residential-03",
    districtId: "residential",
    type: "residential",
    x: 10,
    y: -5,
    width: 1.2,
    depth: 1.2,
    height: 3.6,
  },
  {
    id: "residential-04",
    districtId: "residential",
    type: "residential",
    x: 7.2,
    y: -3,
    width: 1.1,
    depth: 1.1,
    height: 2.8,
  },
  {
    id: "residential-05",
    districtId: "residential",
    type: "residential",
    x: 9,
    y: -3,
    width: 1.1,
    depth: 1.1,
    height: 3.5,
  },

  // Industrial
  {
    id: "industrial-01",
    districtId: "industrial",
    type: "industrial",
    x: -8,
    y: -5,
    width: 2.4,
    depth: 1.8,
    height: 2.8,
  },
  {
    id: "industrial-02",
    districtId: "industrial",
    type: "industrial",
    x: -5.2,
    y: -5,
    width: 1.8,
    depth: 1.5,
    height: 4.8,
  },

  // Smart city
  {
    id: "smart-01",
    districtId: "smart-city",
    type: "utility",
    x: 7,
    y: 2,
    width: 1.5,
    depth: 1.5,
    height: 4,
  },
  {
    id: "smart-02",
    districtId: "smart-city",
    type: "utility",
    x: 9,
    y: 2,
    width: 1.4,
    depth: 1.4,
    height: 2.8,
  },
  {
    id: "smart-03",
    districtId: "smart-city",
    type: "utility",
    x: 8,
    y: 4,
    width: 1.7,
    depth: 1.4,
    height: 3.4,
  },
];

export const digitalTwinRoads: RoadData[] = [
  {
    id: "primary-east-west",
    type: "primary",
    points: [
      [-13, 0],
      [-7, 0],
      [0, 0],
      [7, 0],
      [13, 0],
    ],
  },
  {
    id: "primary-north-south",
    type: "primary",
    points: [
      [0, -10],
      [0, -6],
      [0, 0],
      [0, 5],
      [0, 10],
    ],
  },
  {
    id: "secondary-northwest",
    type: "secondary",
    points: [
      [-11, -7],
      [-6, -3],
      [-2, 0],
    ],
  },
  {
    id: "secondary-northeast",
    type: "secondary",
    points: [
      [11, -7],
      [6, -3],
      [2, 0],
    ],
  },
  {
    id: "secondary-southwest",
    type: "secondary",
    points: [
      [-11, 7],
      [-6, 3],
      [-2, 0],
    ],
  },
  {
    id: "secondary-southeast",
    type: "secondary",
    points: [
      [11, 7],
      [6, 3],
      [2, 0],
    ],
  },
];

export const digitalTwinMarkers: IntelligenceMarkerData[] = [
  {
    id: "zone-4",
    label: "Zone 4",
    subtitle: "Revenue Leakage",
    status: "attention",
    x: -7.5,
    y: -1.5,
  },
  {
    id: "ward-18",
    label: "Ward 18",
    subtitle: "Flood Risk Alert",
    status: "monitor",
    x: 8,
    y: -2,
  },
  {
    id: "project-32",
    label: "Project 32",
    subtitle: "Delayed",
    status: "active",
    x: -5,
    y: 5,
  },
  {
    id: "ward-7",
    label: "Ward 7",
    subtitle: "Complaints Resolved",
    status: "operational",
    x: 7,
    y: 5,
  },
];