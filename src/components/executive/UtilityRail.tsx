import React from "react";
import { Mic } from "lucide-react";

const UtilityRail: React.FC = () => {
  return (
    <aside
      className="
        flex
        h-full
        min-h-screen
        w-full
        flex-col
        items-center
        rounded-3xl
        border
        border-slate-800/70
        bg-[#050A13]
        py-6
      "
    >
      <span
        className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.25em]
          text-cyan-400
          text-center
        "
      >
        AI Voice
      </span>

      <div className="mt-8">
        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-cyan-500/30
            bg-cyan-500/10
          "
        >
          <Mic size={34} className="text-cyan-400" />
        </div>
      </div>

      <div className="mt-auto text-center">
        <p className="text-xs text-slate-500">
          Ask DAIP...
        </p>
      </div>
    </aside>
  );
};

export default UtilityRail;