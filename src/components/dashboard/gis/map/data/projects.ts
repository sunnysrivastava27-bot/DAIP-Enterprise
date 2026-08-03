export type ProjectStatus =
  | "Running"
  | "Completed"
  | "Delayed"
  | "Critical"
  | "Planned";

export type ProjectCategory =
  | "Road"
  | "Housing"
  | "Park"
  | "Water"
  | "Sewer"
  | "Commercial";

export interface GISProject {
  id: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number;
  contractor: string;
  engineer: string;
  cost: string;
  expectedCompletion: string;
  lat: number;
  lng: number;
  location: {
    x: number;
    y: number;
  };
  financial: {
    budget: number;
    spent: number;
  };
}

export const projects: GISProject[] = [
  {
    id: "P-101",
    name: "Ring Road Phase II",
    category: "Road",
    status: "Running",
    progress: 82,
    contractor: "ABC Infra",
    engineer: "Rajesh Singh",
    cost: "₹320 Cr",
    expectedCompletion: "Dec 2026",
    lat: 26.4712,
    lng: 80.3048,
    location: { x: 760, y: 360 },
    financial: { budget: 320, spent: 247 },
  },
  {
    id: "P-102",
    name: "Smart Housing Block",
    category: "Housing",
    status: "Delayed",
    progress: 61,
    contractor: "Sharma Buildcon",
    engineer: "Anil Verma",
    cost: "₹480 Cr",
    expectedCompletion: "Mar 2027",
    lat: 26.4325,
    lng: 80.3526,
    location: { x: 420, y: 520 },
    financial: { budget: 480, spent: 280 },
  },
  {
    id: "P-103",
    name: "City Central Park",
    category: "Park",
    status: "Completed",
    progress: 100,
    contractor: "Green Earth",
    engineer: "Pawan Mishra",
    cost: "₹90 Cr",
    expectedCompletion: "Completed",
    lat: 26.4474,
    lng: 80.3257,
    location: { x: 560, y: 270 },
    financial: { budget: 90, spent: 88 },
  },
  {
    id: "P-104",
    name: "Water Supply Upgrade",
    category: "Water",
    status: "Running",
    progress: 47,
    contractor: "Hydrotech",
    engineer: "Rakesh Tiwari",
    cost: "₹210 Cr",
    expectedCompletion: "Jun 2026",
    lat: 26.4592,
    lng: 80.3645,
    location: { x: 900, y: 210 },
    financial: { budget: 210, spent: 91 },
  },
  {
    id: "P-105",
    name: "Commercial Hub",
    category: "Commercial",
    status: "Critical",
    progress: 24,
    contractor: "BlueSky Infra",
    engineer: "Pending",
    cost: "₹510 Cr",
    expectedCompletion: "Aug 2026",
    lat: 26.4208,
    lng: 80.3134,
    location: { x: 640, y: 620 },
    financial: { budget: 510, spent: 120 },
  },
  {
    id: "P-106",
    name: "Saraswati Sewer Line",
    category: "Sewer",
    status: "Running",
    progress: 73,
    contractor: "AquaWorks",
    engineer: "Naveen Rao",
    cost: "₹154 Cr",
    expectedCompletion: "Oct 2026",
    lat: 26.5014,
    lng: 80.3192,
    location: { x: 680, y: 430 },
    financial: { budget: 154, spent: 112 },
  },
  {
    id: "P-107",
    name: "North Canal Renewal",
    category: "Water",
    status: "Completed",
    progress: 100,
    contractor: "Rivertech",
    engineer: "Deepak Soni",
    cost: "₹126 Cr",
    expectedCompletion: "Completed",
    lat: 26.4897,
    lng: 80.2861,
    location: { x: 720, y: 300 },
    financial: { budget: 126, spent: 124 },
  },
  {
    id: "P-108",
    name: "Riverside Park Extension",
    category: "Park",
    status: "Running",
    progress: 66,
    contractor: "Urban Green",
    engineer: "Sanjay Malhotra",
    cost: "₹84 Cr",
    expectedCompletion: "Jan 2027",
    lat: 26.4178,
    lng: 80.3447,
    location: { x: 590, y: 500 },
    financial: { budget: 84, spent: 55 },
  },
  {
    id: "P-109",
    name: "Kalyanpur Transit Corridor",
    category: "Road",
    status: "Delayed",
    progress: 38,
    contractor: "MetroLink JV",
    engineer: "Aman Gupta",
    cost: "₹292 Cr",
    expectedCompletion: "May 2027",
    lat: 26.4981,
    lng: 80.3502,
    location: { x: 780, y: 550 },
    financial: { budget: 292, spent: 111 },
  },
  {
    id: "P-110",
    name: "Housing Cluster 14",
    category: "Housing",
    status: "Running",
    progress: 88,
    contractor: "Veda Homes",
    engineer: "Puneet Joshi",
    cost: "₹236 Cr",
    expectedCompletion: "Nov 2026",
    lat: 26.4559,
    lng: 80.2922,
    location: { x: 640, y: 280 },
    financial: { budget: 236, spent: 208 },
  },
  {
    id: "P-111",
    name: "Civic Safety Command Center",
    category: "Commercial",
    status: "Critical",
    progress: 18,
    contractor: "SecureGrid",
    engineer: "Meera Sharma",
    cost: "₹67 Cr",
    expectedCompletion: "Sep 2026",
    lat: 26.4396,
    lng: 80.3876,
    location: { x: 520, y: 640 },
    financial: { budget: 67, spent: 12 },
  },
  {
    id: "P-112",
    name: "Industrial Drainage Project",
    category: "Water",
    status: "Completed",
    progress: 100,
    contractor: "JalNirman",
    engineer: "Harish Bhatia",
    cost: "₹118 Cr",
    expectedCompletion: "Completed",
    lat: 26.5124,
    lng: 80.3704,
    location: { x: 800, y: 620 },
    financial: { budget: 118, spent: 116 },
  },
  {
    id: "P-113",
    name: "Railway Overpass Upgrade",
    category: "Road",
    status: "Running",
    progress: 58,
    contractor: "Rajat Infra",
    engineer: "Vikram Singh",
    cost: "₹176 Cr",
    expectedCompletion: "Feb 2027",
    lat: 26.4265,
    lng: 80.2987,
    location: { x: 470, y: 340 },
    financial: { budget: 176, spent: 102 },
  },
  {
    id: "P-114",
    name: "Youth Center Renovation",
    category: "Commercial",
    status: "Delayed",
    progress: 31,
    contractor: "CityWorks",
    engineer: "Ritu Khanna",
    cost: "₹54 Cr",
    expectedCompletion: "Apr 2027",
    lat: 26.4866,
    lng: 80.3381,
    location: { x: 700, y: 470 },
    financial: { budget: 54, spent: 17 },
  },
  {
    id: "P-115",
    name: "Eco Mobility Loop",
    category: "Road",
    status: "Running",
    progress: 79,
    contractor: "Pathways Ltd",
    engineer: "Aarav Mehrotra",
    cost: "₹201 Cr",
    expectedCompletion: "Dec 2026",
    lat: 26.4412,
    lng: 80.3188,
    location: { x: 610, y: 380 },
    financial: { budget: 201, spent: 159 },
  },
];