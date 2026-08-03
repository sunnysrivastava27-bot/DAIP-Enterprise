import Badge from "./Badge";
import type { StatusBadgeProps, BadgeVariant } from "./types";

const statusConfig: Record<
  StatusBadgeProps["status"],
  {
    label: string;
    variant: BadgeVariant;
    dot: boolean;
  }
> = {
  active: {
    label: "Active",
    variant: "success",
    dot: true,
  },

  inactive: {
    label: "Inactive",
    variant: "secondary",
    dot: false,
  },

  pending: {
    label: "Pending",
    variant: "warning",
    dot: false,
  },

  completed: {
    label: "Completed",
    variant: "success",
    dot: false,
  },

  failed: {
    label: "Failed",
    variant: "danger",
    dot: false,
  },

  online: {
    label: "Online",
    variant: "success",
    dot: true,
  },

  offline: {
    label: "Offline",
    variant: "danger",
    dot: true,
  },
};

export default function StatusBadge({
  status,
  size = "md",
  pill = true,
  className = "",
  style,
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      size={size}
      pill={pill}
      dot={config.dot}
      className={className}
      style={style}
      {...props}
    >
      {config.label}
    </Badge>
  );
}