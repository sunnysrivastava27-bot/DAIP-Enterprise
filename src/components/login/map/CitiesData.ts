export type LabelOffset = {
  x: number;
  y: number;
};

export type LabelPosition = "left" | "right" | "top" | "bottom";

export interface CityData {
  city: string;
  subtitle: string;
  x: number;
  y: number;
  color: string;
  labelOffset: LabelOffset;
  labelPosition: LabelPosition;

  nodeSize: "primary" | "secondary" | "regional";
  glow: number;
}

export const cities: CityData[] = [

  // ===========================
  // DELHI
  // ===========================

  {
    city: "DELHI",
    subtitle: "National Command Centre",

    x: 40,
    y: 30,

    color: "#FFC83D",

    nodeSize: "primary",
    glow: 1.4,

    labelOffset: {
    x: 0,
    y: 38,
},

    labelPosition: "top",
  },

  // ===========================
  // LUCKNOW
  // ===========================

  {
    city: "LUCKNOW",
    subtitle: "State Governance Hub",

    x: 48,
    y: 35,

    color: "#3EDCFF",

    nodeSize: "secondary",
    glow: 1.15,

    labelOffset: {
      x: 26,
      y: 0,
    },

    labelPosition: "right",
  },

  // ===========================
  // KANPUR
  // ===========================

  {
    city: "KANPUR",
    subtitle: "KODEZY Innovation Lab",

    x: 44,
    y: 43,

    color: "#7CFF00",

    nodeSize: "regional",
    glow: 0.9,

    labelOffset: {
      x: 0,
      y: 26,
    },

    labelPosition: "bottom",
  },

  // ===========================
  // EAST INDIA
  // ===========================
    // ===========================
  // PATNA
  // ===========================

  {
    city: "PATNA",
    subtitle: "Data Hub",

    x: 58,
    y: 40,

    color: "#3EDCFF",

    nodeSize: "regional",
    glow: 0.9,

    labelOffset: {
    x: -10,
    y: 22,
},

labelPosition: "left",
  },

  // ===========================
  // KOLKATA
  // ===========================

  {
    city: "KOLKATA",
    subtitle: "Urban Operations Hub",

    x: 61,
    y: 48,

    color: "#3EDCFF",

    nodeSize: "secondary",
    glow: 1.05,

    labelOffset: {
      x: 20,
      y: 0,
    },

    labelPosition: "right",
  },

  // ===========================
  // MUMBAI
  // (Temporarily Disabled)
  // ===========================

  /*
  {
    city: "MUMBAI",
    subtitle: "Urban Analytics Hub",

    x: 34,
    y: 67,

    color: "#3EDCFF",

    nodeSize: "secondary",
    glow: 1.05,

    labelOffset: {
      x: 22,
      y: 0,
    },

    labelPosition: "right",
  },
  */

  // ===========================
  // BENGALURU
  // ===========================

  {
    city: "BENGALURU",
    subtitle: "AI Services Hub",

    x: 41,
    y: 73,

    color: "#3EDCFF",

    nodeSize: "regional",
    glow: 0.9,

    labelOffset: {
    x: 18,
    y: -28,
},

    labelPosition: "right",
  },

  // ===========================
  // CHENNAI
  // ===========================

  {
    city: "CHENNAI",
    subtitle: "Technology Node",

    x: 47,
    y: 78,

    color: "#3EDCFF",

    nodeSize: "regional",
    glow: 0.9,

    labelOffset: {
      x: 20,
      y: 0,
    },

    labelPosition: "right",
  },

];