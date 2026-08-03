export interface NetworkRoute {
  id: string;
  from: string;
  to: string;

  bidirectional?: boolean;

  packetDelay?: number;

  flowSpeed?: number;

  priority?: "national" | "state" | "regional";
}

export const networkRoutes: NetworkRoute[] = [

  // ===========================
  // DELHI → LUCKNOW
  // ===========================

  {
    id: "delhi-lucknow",
    from: "DELHI",
    to: "LUCKNOW",

    priority: "national",
    bidirectional: true,

    packetDelay: 0,
    flowSpeed: 1,
  },

  // ===========================
  // LUCKNOW → KANPUR
  // ===========================

  {
    id: "lucknow-kanpur",
    from: "LUCKNOW",
    to: "KANPUR",

    priority: "state",
    bidirectional: true,

    packetDelay: 0.7,
    flowSpeed: 0.95,
  },

  // ===========================
  // LUCKNOW → PATNA
  // ===========================

  {
    id: "lucknow-patna",
    from: "LUCKNOW",
    to: "PATNA",

    priority: "state",
    bidirectional: true,

    packetDelay: 1.4,
    flowSpeed: 0.9,
  },

  // ===========================
  // PATNA → KOLKATA
  // ===========================

  {
    id: "patna-kolkata",
    from: "PATNA",
    to: "KOLKATA",

    priority: "state",
    bidirectional: true,

    packetDelay: 2.1,
    flowSpeed: 0.85,
  },

  // ===========================
  // KANPUR → BENGALURU
  // (Temporary route while Mumbai is disabled)
  // ===========================

  {
    id: "kanpur-bengaluru",
    from: "KANPUR",
    to: "BENGALURU",

    priority: "regional",
    bidirectional: true,

    packetDelay: 2.8,
    flowSpeed: 0.8,
  },

  // ===========================
  // BENGALURU → CHENNAI
  // ===========================

  {
    id: "bengaluru-chennai",
    from: "BENGALURU",
    to: "CHENNAI",

    priority: "regional",
    bidirectional: true,

    packetDelay: 3.5,
    flowSpeed: 0.75,
  },

];