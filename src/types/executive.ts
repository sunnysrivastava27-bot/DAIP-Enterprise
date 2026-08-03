export interface ExecutiveBrief {
  greeting: string;
  officerName: string;
  designation: string;
  summary: string;
  confidence: number;
  generatedAt: string;
}

export interface HeroMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface CitySnapshot {
  id: string;
  title: string;
  value: string;
  status: "good" | "warning" | "critical";
}

export interface ExecutiveHeroData {
  brief: ExecutiveBrief;
  metrics: HeroMetric[];
  citySnapshot: CitySnapshot[];
}