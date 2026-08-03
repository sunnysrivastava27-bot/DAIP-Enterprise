import {
  Activity,
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  Landmark,
  Radar,
  TrendingUp,
} from "lucide-react";

import type {
  DecisionItem,
  EngineHealth,
  ExecutiveMetric,
  MonitoringItem,
  PredictionCard,
  RecommendationItem,
  RiskAssessmentItem,
} from "./types";

export const executiveMetrics: ExecutiveMetric[] = [
  {
    id: 1,
    title: "AI Confidence",
    value: "98.4%",
    subtitle: "Decision Engine Accuracy",
    icon: BrainCircuit,
    color: "text-cyan-400",
  },
  {
    id: 2,
    title: "Operational Risk",
    value: "12%",
    subtitle: "Authority Risk Index",
    icon: AlertTriangle,
    color: "text-orange-400",
  },
  {
    id: 3,
    title: "Forecast Reliability",
    value: "96%",
    subtitle: "Prediction Confidence",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    id: 4,
    title: "Connected Departments",
    value: "18",
    subtitle: "Live Integrated Systems",
    icon: Radar,
    color: "text-violet-400",
  },
];

export const decisionQueue: DecisionItem[] = [
  {
    id: 1,
    title: "Ring Road Package-II",
    department: "Engineering",
    priority: "Critical",
    risk: 89,
    financialImpact: "₹48 Cr",
    deadline: "Today",
    confidence: 98,
  },
  {
    id: 2,
    title: "Sector-7 Building Approval",
    department: "Town Planning",
    priority: "High",
    risk: 64,
    financialImpact: "₹12 Cr",
    deadline: "Tomorrow",
    confidence: 94,
  },
  {
    id: 3,
    title: "Contractor Payment Release",
    department: "Finance",
    priority: "Medium",
    risk: 38,
    financialImpact: "₹6.8 Cr",
    deadline: "2 Days",
    confidence: 91,
  },
];

export const riskAssessment: RiskAssessmentItem[] = [
  {
    id: 1,
    department: "Infrastructure Projects",
    status: "High",
    score: 84,
  },
  {
    id: 2,
    department: "Revenue Collection",
    status: "Medium",
    score: 42,
  },
  {
    id: 3,
    department: "Citizen Services",
    status: "Low",
    score: 18,
  },
];

export const predictions: PredictionCard[] = [
  {
    id: 1,
    title: "Revenue Forecast",
    value: "₹4.82 Cr",
    description:
      "Expected revenue by month-end based on present collection trends.",
    trend: "up",
  },
  {
    id: 2,
    title: "Project Completion",
    value: "93%",
    description:
      "Predicted completion if execution continues at the current pace.",
    trend: "stable",
  },
];

export const monitoringFeed: MonitoringItem[] = [
  {
    id: 1,
    title: "Revenue collection exceeded today's target.",
    time: "2 min ago",
    category: "Revenue",
  },
  {
    id: 2,
    title: "Engineering department uploaded a new DPR.",
    time: "6 min ago",
    category: "Projects",
  },
  {
    id: 3,
    title: "Citizen grievance backlog reduced by 8%.",
    time: "11 min ago",
    category: "Citizen Services",
  },
  {
    id: 4,
    title: "Finance department released payment batch.",
    time: "19 min ago",
    category: "Finance",
  },
];

export const recommendations: RecommendationItem[] = [
  {
    id: 1,
    title: "Approve Ring Road Package-II",
    description:
      "Approval within 24 hours will reduce overall project delay by an estimated 18 days.",
    priority: "Critical",
    impact: "High",
  },
  {
    id: 2,
    title: "Review Building Approvals",
    description:
      "Fast-track pending commercial building approvals in Sector-7.",
    priority: "High",
    impact: "Medium",
  },
  {
    id: 3,
    title: "Increase Drainage Budget",
    description:
      "Allocate additional funds before the monsoon to minimize flood risk.",
    priority: "Medium",
    impact: "High",
  },
  {
    id: 4,
    title: "Initiate Land Dispute Review",
    description:
      "Legal review is recommended for Zone-3 disputed parcels.",
    priority: "Medium",
    impact: "Medium",
  },
];

export const engineHealth: EngineHealth = {
  models: 18,
  predictions: 264,
  accuracy: 98.4,
  status: "All Systems Active",
};

export const executiveSummary = {
  pendingDecisions: 12,
  financialExposure: "₹68 Cr",
  criticalProjects: 3,
  aiConfidence: "98.4%",
};

export const footerStatus = {
  lastSync: "30 seconds ago",
  engine: "DAIP Decision Intelligence Engine",
};

export const icons = {
  activity: Activity,
  analytics: BarChart3,
  revenue: Landmark,
};