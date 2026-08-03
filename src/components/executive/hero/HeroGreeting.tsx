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
      className="flex w-full flex-col"
    >
      {/* Executive Intelligence Briefing */}

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5">
        <Sparkles className="h-4 w-4 text-cyan-300" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Executive Intelligence Briefing
        </span>
      </div>

      {/* Greeting */}

      <div className="mt-6">
        <h1 className="text-[36px] font-bold leading-tight tracking-tight">
          <span className="block text-white">
            {data.greeting},
          </span>

          <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            {data.chairmanName}
          </span>
        </h1>
      </div>

      {/* Description */}

      <p className="mt-5 max-w-full text-[15px] leading-7 text-slate-400">
        {data.description}
      </p>

      {/* KPI Row */}

      <div className="mt-8 grid w-full grid-cols-3 gap-4">
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
                px-4
                py-4
              "
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/70 ${item.iconColor}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <div className="text-xl font-bold text-white">
                  {item.value}
                </div>

                <div className="mt-1 text-[11px] leading-4 text-slate-400">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Executive Briefing */}

      <div className="mt-8">
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
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-cyan-500/20
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:shadow-cyan-500/30
            active:scale-[0.99]
          "
        >
          <Play className="h-4 w-4 fill-current transition-transform duration-300 group-hover:translate-x-0.5" />

          <span>Start Executive Briefing</span>
        </button>
      </div>
    </motion.div>
  );
}