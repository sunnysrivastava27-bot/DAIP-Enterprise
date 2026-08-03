import type { LucideIcon } from "lucide-react";

export type Priority = "Critical" | "High" | "Medium" | "Low";

export type RiskLevel = "High" | "Medium" | "Low";

export interface ExecutiveMetric {
    id: number;
    title: string;
    value: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
}

export interface DecisionItem {
    id: number;
    title: string;
    department: string;
    priority: Priority;
    risk: number;
    financialImpact: string;
    deadline: string;
    confidence: number;
}

export interface RiskAssessmentItem {
    id: number;
    department: string;
    status: RiskLevel;
    score: number;
}

export interface PredictionCard {
    id: number;
    title: string;
    value: string;
    description: string;
    trend: "up" | "down" | "stable";
}

export interface MonitoringItem {
    id: number;
    title: string;
    time: string;
    category: string;
}

export interface RecommendationItem {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    impact: string;
}

export interface EngineHealth {
    models: number;
    predictions: number;
    accuracy: number;
    status: string;
}