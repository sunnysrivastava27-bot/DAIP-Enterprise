import type { ReactNode } from "react";

export interface DAIPPanelProps {
  title?: string;
  subtitle?: string;

  children: ReactNode;

  actions?: ReactNode;

  className?: string;

  variant?: "default" | "glass" | "outlined";

  padding?: "none" | "sm" | "md" | "lg";

  loading?: boolean;
}