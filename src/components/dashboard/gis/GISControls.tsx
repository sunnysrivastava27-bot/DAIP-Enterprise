import {
  Search,
  Layers3,
  Filter,
  Map,
  LocateFixed,
  Route,
  Sparkles,
} from "lucide-react";

export default function GISControls() {
  return (
    <div className="px-6 py-4 border-b border-white/10 bg-[#102844]">

      <div className="flex items-center justify-between gap-6">

        {/* Search */}

        <div className="relative flex-1 max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search Property, Project, Road, Asset..."
            className="
              w-full
              h-12
              rounded-xl
              border
              border-white/10
              bg-white/5
              pl-12
              pr-4
              text-white
              placeholder:text-slate-400
              outline-none
              focus:border-cyan-400
              transition-all
            "
          />

        </div>

        {/* Toolbar */}

        <div className="flex items-center gap-3">

          <button className="flex items-center gap-2 h-12 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 transition-all text-white">

            <Layers3 size={18} />

            <span className="text-sm font-medium">
              Layers
            </span>

          </button>

          <button className="flex items-center gap-2 h-12 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 transition-all text-white">

            <Filter size={18} />

            <span className="text-sm font-medium">
              Filters
            </span>

          </button>

          <button className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 transition-all flex items-center justify-center text-white">

            <Map size={18} />

          </button>

          <button className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 transition-all flex items-center justify-center text-white">

            <LocateFixed size={18} />

          </button>

          <button className="h-12 w-12 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 transition-all flex items-center justify-center text-white">

            <Route size={18} />

          </button>

          <button className="flex items-center gap-2 h-12 px-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all text-cyan-300">

            <Sparkles size={18} />

            <span className="text-sm font-semibold">
              AI Detect
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}