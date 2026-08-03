import {
  Building2,
  Landmark,
  AlertTriangle,
  IndianRupee,
  Users,
  Bot,
} from "lucide-react";

import KPICard from "./KPICard";

export default function KPISection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gap: 18,
        width: "100%",
      }}
    >
      <KPICard title="Running Projects" value="148" growth="+12%" color="#35D8FF" icon={<Building2 />} trend={[18, 24, 22, 29, 31, 36]} status="healthy" />
      <KPICard title="Revenue Collection" value="₹42.8Cr" growth="+8%" color="#4ADE80" icon={<IndianRupee />} trend={[16, 20, 19, 27, 35, 40]} status="healthy" />
      <KPICard title="Citizen Grievances" value="286" growth="+4%" color="#FFD54A" icon={<Users />} trend={[12, 16, 14, 18, 21, 24]} status="watch" />
      <KPICard title="Encroachments" value="34" growth="-2%" color="#FF8A65" icon={<AlertTriangle />} trend={[14, 13, 12, 10, 9, 8]} status="alert" />
      <KPICard title="AI Recommendations" value="16" growth="+6%" color="#A855F7" icon={<Bot />} trend={[10, 14, 17, 20, 22, 24]} status="healthy" />
      <KPICard title="Authority Assets" value="1,284" growth="+3%" color="#60A5FA" icon={<Landmark />} trend={[20, 24, 21, 26, 28, 30]} status="healthy" />
    </div>
  );
}