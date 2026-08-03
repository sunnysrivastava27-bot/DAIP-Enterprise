import { motion } from "framer-motion";
import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  Landmark,
} from "lucide-react";

import { executiveSummary } from "../data";

export default function ExecutiveSummary() {
  const cards = [
    {
      title: "Pending Decisions",
      value: executiveSummary.pendingDecisions,
      description: "Require Chairman approval",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Financial Exposure",
      value: executiveSummary.financialExposure,
      description: "Projects under financial risk",
      icon: Landmark,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      title: "Critical Projects",
      value: executiveSummary.criticalProjects,
      description: "Require immediate monitoring",
      icon: CheckCircle2,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "AI Confidence",
      value: executiveSummary.aiConfidence,
      description: "Decision engine accuracy",
      icon: BrainCircuit,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
            }}
            className={`group rounded-2xl border ${card.border} bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${card.iconColor}`} />
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1,
                  delay: 0.3 + index * 0.1,
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400"
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}