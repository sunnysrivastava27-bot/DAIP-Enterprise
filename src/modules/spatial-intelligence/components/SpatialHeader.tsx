import React, { useEffect, useState } from "react";
import {
  Search,
  Bell,
  Settings,
  Maximize2,
  UserCircle2,
  Satellite,
  Map,
  BrainCircuit,
  Wifi,
  CalendarDays,
  Clock3,
  ShieldCheck,
  Activity,
} from "lucide-react";

const SpatialHeader: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = time.toLocaleTimeString("en-IN");

  return (
    <header className="w-full bg-slate-900 rounded-2xl shadow-xl border border-slate-700 overflow-hidden">

      {/* Top Strip */}

      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-3 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-white tracking-wide">
            Spatial Intelligence Engine
          </h1>

          <p className="text-emerald-100 text-sm mt-1">
            Development Authority Intelligence Platform
          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-400">

            <Activity className="w-4 h-4 text-green-300" />

            <span className="text-green-100 text-sm font-semibold">
              LIVE
            </span>

          </div>

          <div className="bg-white/10 rounded-xl p-2">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>

        </div>

      </div>

      {/* Information Row */}

      <div className="px-8 py-5 grid grid-cols-5 gap-4 bg-slate-850">

        <div className="rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-2">

            <Satellite className="text-cyan-400 w-5 h-5" />

            <span className="text-slate-300 text-sm">
              Satellite
            </span>

          </div>

          <p className="text-white text-lg font-semibold mt-2">
            Connected
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-2">

            <BrainCircuit className="text-violet-400 w-5 h-5" />

            <span className="text-slate-300 text-sm">
              AI Engine
            </span>

          </div>

          <p className="text-white text-lg font-semibold mt-2">
            Active
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-2">

            <Map className="text-emerald-400 w-5 h-5" />

            <span className="text-slate-300 text-sm">
              GIS Layer
            </span>

          </div>

          <p className="text-white text-lg font-semibold mt-2">
            24 Layers
          </p>

        </div>

        <div className="px-8 py-5 grid grid-cols-5 gap-4 bg-slate-800">

          <div className="flex items-center gap-2">

            <Wifi className="text-yellow-400 w-5 h-5" />

            <span className="text-slate-300 text-sm">
              Network
            </span>

          </div>

          <p className="text-white text-lg font-semibold mt-2">
            Excellent
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-2">

            <Clock3 className="text-orange-400 w-5 h-5" />

            <span className="text-slate-300 text-sm">
              Server Time
            </span>

          </div>

          <p className="text-white text-lg font-semibold mt-2">
            {currentTime}
          </p>

        </div>

      </div>
            {/* Bottom Command Bar */}

      <div className="px-8 py-5 border-t border-slate-700 bg-slate-900">

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          {/* Search */}

          <div className="relative w-full lg:w-[420px]">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search property, project, survey no., owner..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

          </div>

          {/* Quick Actions */}

          <div className="flex flex-wrap gap-3">

            <button className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white transition-all font-medium">
              New Inspection
            </button>

            <button className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all font-medium">
              Projects
            </button>

            <button className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all font-medium">
              Illegal Construction
            </button>

            <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white transition-all font-medium">
              Revenue Layer
            </button>

          </div>

          {/* Right Controls */}

          <div className="flex items-center gap-4">

            <div className="hidden xl:flex flex-col text-right">

              <span className="text-white font-semibold">
                Vice Chairman
              </span>

              <span className="text-slate-400 text-sm">
                Kanpur Development Authority
              </span>

            </div>

            <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center">

              <UserCircle2 className="text-white" size={28} />

            </div>

            <button className="bg-slate-800 hover:bg-slate-700 transition rounded-xl p-3">
              <Bell className="text-white" size={20} />
            </button>

            <button className="bg-slate-800 hover:bg-slate-700 transition rounded-xl p-3">
              <Settings className="text-white" size={20} />
            </button>

            <button className="bg-slate-800 hover:bg-slate-700 transition rounded-xl p-3">
              <Maximize2 className="text-white" size={20} />
            </button>

          </div>

        </div>

        {/* Footer Status */}

        <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div className="flex items-center gap-6">

            <div className="flex items-center gap-2">

              <CalendarDays
                className="text-cyan-400"
                size={18}
              />

              <span className="text-slate-300 text-sm">
                {today}
              </span>

            </div>

            <div className="flex items-center gap-2">

              <Clock3
                className="text-orange-400"
                size={18}
              />

              <span className="text-slate-300 text-sm">
                {currentTime}
              </span>

            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm border border-green-500/40">
              GIS Connected
            </span>

            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm border border-cyan-500/40">
              AI Active
            </span>

            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm border border-yellow-500/40">
              Satellite Sync
            </span>

            <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm border border-violet-500/40">
              12 Missions Today
            </span>

          </div>

        </div>

      </div>

    </header>
  );
};

export default SpatialHeader;