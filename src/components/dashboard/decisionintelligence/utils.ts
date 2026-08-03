export const getRiskColor = (score: number): string => {
  if (score >= 75) return "text-red-400";
  if (score >= 40) return "text-amber-400";
  return "text-emerald-400";
};

export const getRiskProgressColor = (score: number): string => {
  if (score >= 75) return "bg-red-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-emerald-500";
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-IN").format(value);
};

export const getConfidenceStatus = (confidence: number): string => {
  if (confidence >= 95) return "Excellent";
  if (confidence >= 85) return "Good";
  if (confidence >= 70) return "Average";
  return "Low";
};