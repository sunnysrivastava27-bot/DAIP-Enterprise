import type { ExecutiveHeroData } from "../types/executive";

export const executiveHeroData: ExecutiveHeroData = {
  brief: {
    greeting: "Good Morning",
    officerName: "Chairman",
    designation: "Kanpur Development Authority",
    summary:
      "Revenue collection is on track. Two high-priority projects require immediate attention. Citizen satisfaction has improved compared to last week.",
    confidence: 96,
    generatedAt: "08:30 AM",
  },

  metrics: [
    {
      id: "revenue",
      title: "Revenue Today",
      value: "₹2.45 Cr",
      change: "+12%",
      trend: "up",
    },
    {
      id: "projects",
      title: "Active Projects",
      value: "128",
      change: "+5",
      trend: "up",
    },
    {
      id: "citizens",
      title: "Citizen Satisfaction",
      value: "94%",
      change: "+3%",
      trend: "up",
    },
    {
      id: "alerts",
      title: "Critical Alerts",
      value: "7",
      change: "-2",
      trend: "down",
    },
  ],

  citySnapshot: [
    {
      id: "traffic",
      title: "Traffic",
      value: "Normal",
      status: "good",
    },
    {
      id: "water",
      title: "Water Supply",
      value: "98%",
      status: "good",
    },
    {
      id: "projects",
      title: "Projects",
      value: "92% On Schedule",
      status: "warning",
    },
    {
      id: "emergency",
      title: "Emergency",
      value: "2 Active",
      status: "critical",
    },
  ],
};