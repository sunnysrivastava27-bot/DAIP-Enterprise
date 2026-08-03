import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface HeroHeaderData {
  greeting: string;
  chairmanName: string;
  description: string;
}

interface HeroHeaderProps {
  data: HeroHeaderData;
}

export default function HeroHeader({
  data,
}: HeroHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Executive Intelligence Badge */}

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

        <Sparkles className="h-4 w-4 text-cyan-300" />

        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Executive Intelligence Briefing
        </span>

      </div>

      {/* Greeting */}

      <div className="mt-8">

        <h1 className="text-[48px] font-bold leading-[1.02] tracking-[-0.04em]">

          <span className="block text-white">
            {data.greeting},
          </span>

          <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            {data.chairmanName}
          </span>

        </h1>

      </div>

      {/* Description */}

      <p className="mt-6 max-w-[640px] text-[17px] leading-8 text-slate-400">
        {data.description}
      </p>

    </motion.div>
  );
}