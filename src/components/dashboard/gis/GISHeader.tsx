import {
  Activity,
  Layers3,
  RefreshCw,
  Maximize2,
} from "lucide-react";

export default function GISHeader() {
  return (
    <header
      className="
        h-20
        border-b
        border-white/10
        px-6
        flex
        items-center
        justify-between
        bg-[#0F2744]
      "
    >
      {/* Left */}

      <div>
        <h2
          className="
            text-white
            text-[22px]
            font-bold
            tracking-wide
          "
        >
          Spatial Intelligence
        </h2>

        <p
          className="
            text-[#8FB5D8]
            text-sm
            mt-1
          "
        >
          Real-time Administrative & GIS Intelligence
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Live Status */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-500/30
            bg-emerald-500/10
            px-4
            py-2
          "
        >
          <Activity
            size={14}
            className="text-emerald-400"
          />

          <span
            className="
              text-emerald-300
              text-xs
              font-semibold
              tracking-widest
            "
          >
            LIVE
          </span>
        </div>

        {/* Last Sync */}

        <div className="text-right">

          <div
            className="
              text-[11px]
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            Last Sync
          </div>

          <div
            className="
              text-sm
              font-medium
              text-white
            "
          >
            Just now
          </div>

        </div>

        {/* Actions */}

        <button
          className="
            h-10
            w-10
            rounded-xl
            bg-white/5
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition-all
          "
        >
          <RefreshCw size={18} />
        </button>

        <button
          className="
            h-10
            w-10
            rounded-xl
            bg-white/5
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition-all
          "
        >
          <Layers3 size={18} />
        </button>

        <button
          className="
            h-10
            w-10
            rounded-xl
            bg-white/5
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition-all
          "
        >
          <Maximize2 size={18} />
        </button>

      </div>
    </header>
  );
}