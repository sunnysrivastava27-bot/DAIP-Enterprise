import { motion } from "framer-motion";
import {
  Building2,
  IndianRupee,
  FolderKanban,
  Users,
  ArrowUpRight,
} from "lucide-react";

type ColorKey = "cyan" | "emerald" | "violet" | "amber";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: ColorKey;
}

const stats: StatItem[] = [
  {
    title: "Projects",
    value: "128",
    change: "+12%",
    icon: FolderKanban,
    color: "cyan",
  },
  {
    title: "Revenue",
    value: "₹486 Cr",
    change: "+8.6%",
    icon: IndianRupee,
    color: "emerald",
  },
  {
    title: "Citizen Services",
    value: "94%",
    change: "+4%",
    icon: Users,
    color: "violet",
  },
  {
    title: "Town Planning",
    value: "326",
    change: "+16",
    icon: Building2,
    color: "amber",
  },
];

const colorMap: Record<
  ColorKey,
  {
    bg: string;
    border: string;
    text: string;
    progress: string;
  }
> = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    progress: "bg-cyan-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    progress: "bg-emerald-400",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
    progress: "bg-violet-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    progress: "bg-amber-400",
  },
};

export default function HeroStats() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        const theme = colorMap[item.color];

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
            }}
            whileHover={{ y: -4 }}
            className={`rounded-3xl border ${theme.border} ${theme.bg} p-6 backdrop-blur-xl`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`rounded-2xl border ${theme.border} ${theme.bg} p-3`}
              >
                <Icon className={`h-6 w-6 ${theme.text}`} />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1">
                <ArrowUpRight className={`h-3.5 w-3.5 ${theme.text}`} />
                <span className={`text-xs font-semibold ${theme.text}`}>
                  {item.change}
                </span>
              </div>
            </div>

            <h3 className="mt-6 text-sm font-medium text-slate-400">
              {item.title}
            </h3>

            <div className="mt-2 text-4xl font-bold tracking-tight text-white">
              {item.value}
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{
                  duration: 1,
                  delay: 0.2 + index * 0.1,
                }}
                className={`h-full rounded-full ${theme.progress}`}
              />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Updated in real-time from integrated DAIP services
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}