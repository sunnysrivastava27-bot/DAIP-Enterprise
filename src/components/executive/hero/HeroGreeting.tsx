import { motion } from "framer-motion";
import {
  Sparkles,
  AlertCircle,
  Clock3,
  TrendingUp,
  Play,
} from "lucide-react";

export interface HeroGreetingData {
  greeting: string;
  chairmanName: string;
  description: string;

  decisionsAwaiting: number;
  estimatedReviewTime: string;
  revenueOpportunity: string;
}

export interface HeroGreetingProps {
  data: HeroGreetingData;
  onStartBriefing?: () => void;
}

export default function HeroGreeting({
  data,
  onStartBriefing,
}: HeroGreetingProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex h-full w-full flex-col justify-between"
    >
      <div>
        {/* Executive Intelligence Briefing */}

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Executive Intelligence Briefing
          </span>
        </div>

        {/* Greeting */}

        <div className="mt-4">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight">
            <span className="block text-white">
              {data.greeting},
            </span>

            <span className="mt-1 block bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              {data.chairmanName}
            </span>
          </h1>
        </div>

        {/* Description */}

        <p className="mt-3 text-[14px] leading-6 text-slate-400">
          {data.description}
        </p>

        {/* KPI Row */}

        <div className="mt-5 grid grid-cols-3 gap-3">
          {kpis.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-800/60
                  bg-slate-900/40
                  px-3
                  py-3
                "
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/70 ${item.iconColor}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <div className="text-lg font-bold text-white">
                    {item.value}
                  </div>

                  <div className="text-[10px] leading-4 text-slate-400">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Executive Briefing */}

      <div className="pt-5">
        <button
          type="button"
          onClick={onStartBriefing}
          className="
            group
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-sky-600
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-cyan-500/20
            transition-all
            duration-300
            hover:scale-[1.01]
          "
        >
          <Play className="h-4 w-4 fill-current" />
          <span>Start Executive Briefing</span>
        </button>
      </div>
    </motion.div>
  );
}