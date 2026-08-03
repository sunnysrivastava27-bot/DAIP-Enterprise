import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
  growth: string;
  trend?: number[];
  status?: "healthy" | "watch" | "alert";
}

export default function KPICard({
  title,
  value,
  icon,
  color,
  growth,
  trend = [20, 24, 18, 30, 27, 35],
  status = "healthy",
}: KPICardProps) {
  const isNegative = growth.trim().startsWith("-");
  const statusStyles = {
    healthy: { border: "rgba(82, 242, 135, 0.2)", badge: "text-emerald-400" },
    watch: { border: "rgba(245, 158, 11, 0.2)", badge: "text-amber-400" },
    alert: { border: "rgba(255, 123, 114, 0.2)", badge: "text-rose-400" },
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: 190,
        minHeight: 140,
        borderRadius: 18,
        background: "rgba(255,255,255,.05)",
        border: `1px solid ${statusStyles[status].border}`,
        backdropFilter: "blur(14px)",
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        transition: "transform 180ms ease, border-color 180ms ease",
        cursor: "pointer",
      }}
      className="hover:-translate-y-1"
      title={`${title}: ${growth}`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#8FAEC7", fontSize: 15, fontWeight: 500 }}>{title}</span>
        <div style={{ color }}>{icon}</div>
      </div>

      <div style={{ marginTop: 12, fontSize: 38, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{value}</div>

      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "end", gap: 2, height: 24 }}>
          {trend.map((point, index) => (
            <div
              key={`${title}-${index}`}
              style={{ width: 4, height: `${Math.max(8, point)}%`, background: color, borderRadius: 999 }}
            />
          ))}
        </div>
        <span className={statusStyles[status].badge} style={{ fontSize: 12, fontWeight: 600 }}>
          {status === "healthy" ? "Stable" : status === "watch" ? "Watch" : "Alert"}
        </span>
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", paddingTop: 12, color: isNegative ? "#FF7B72" : "#52F287", fontSize: 14, fontWeight: 600 }}>
        {isNegative ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />}
        <span style={{ marginLeft: 5 }}>{growth}</span>
      </div>
    </div>
  );
}