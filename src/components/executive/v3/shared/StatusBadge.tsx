import React from "react";

import { theme } from "../../../../design-system";

type StatusType =
  | "success"
  | "warning"
  | "danger"
  | "info";

interface StatusBadgeProps {
  label: string;
  status: StatusType;
}

const statusColor = {
  success: theme.colors.status.success,
  warning: theme.colors.status.warning,
  danger: theme.colors.status.danger,
  info: theme.colors.status.info,
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  status,
}) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: statusColor[status],
        background: `${statusColor[status]}20`,
      }}
    >
      {label}
    </span>
  );
};

export default StatusBadge;