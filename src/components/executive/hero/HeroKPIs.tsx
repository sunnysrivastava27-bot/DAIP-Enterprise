import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock3,
  TrendingUp,
} from "lucide-react";

export interface HeroKPIsData {
  decisionsAwaiting: number;
  estimatedReviewTime: string;
  revenueOpportunity: string;
}

interface HeroKPIsProps {
  data: HeroKPIsData;
}

export default function HeroKPIs({
  data,
}: HeroKPIsProps) {
  const kpis = [
    {
      icon: AlertCircle,
      iconColor: "text-amber-400",
      value: data.decisionsAwaiting.toString(),
      label: "Decisions Awaiting",
    },
    {
      icon: Clock3,
      iconColor: "text-cyan-400",
      value: data.estimatedReviewTime,
      label: "Estimated Review Time",
    },
    {
      icon: TrendingUp,
      iconColor: "text-emerald-400",
      value: data.revenueOpportunity,
      label: "Revenue Opportunity",
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap items-start gap-10">
      {kpis.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            className="flex items-start gap-3"
          >
            <div
              className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/70 ${item.iconColor}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>

              <p className="text-xl font-semibold text-white">
                {item.value}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {item.label}
              </p>

            </div>

          </motion.div>
        );
      })}
    </div>
  );
}