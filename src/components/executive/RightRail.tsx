import React from "react";
import {
  Activity,
  CalendarDays,
  Clock3,
  Mic,
  ArrowRight,
} from "lucide-react";

const liveFeeds = [
  {
    title: "Smart City Surveillance",
    status: "2 new incidents detected",
    color: "bg-red-500",
  },
  {
    title: "Revenue Collection",
    status: "Collection target exceeded by 12%",
    color: "bg-emerald-500",
  },
  {
    title: "Project Monitoring",
    status: "5 projects completed today",
    color: "bg-cyan-500",
  },
];

const meetings = [
  {
    time: "10:30 AM",
    title: "Executive Review Meeting",
  },
  {
    time: "01:00 PM",
    title: "Revenue Strategy Session",
  },
  {
    time: "04:00 PM",
    title: "Infrastructure Progress Review",
  },
];

const RightRail: React.FC = () => {
  return (
    <aside className="flex h-full w-[320px] flex-col border-l border-slate-800/70 bg-[#050A13]">

      {/* =======================================================
          LIVE FEEDS
      ======================================================== */}

      <section className="border-b border-slate-800/70 p-5">

        <div className="mb-5 flex items-center gap-2">

          <Activity
            size={18}
            className="text-cyan-400"
          />

          <h3 className="text-sm font-semibold tracking-wide text-white">
            Live Feeds
          </h3>

        </div>

        <div className="space-y-4">

          {liveFeeds.map((feed) => (
            <div
              key={feed.title}
              className="rounded-xl border border-slate-700 bg-[#0B1220] p-4"
            >
              <div className="flex items-start gap-3">

                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${feed.color}`}
                />

                <div>

                  <p className="text-sm font-medium text-white">
                    {feed.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {feed.status}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </section>

      {/* =======================================================
          UPCOMING MEETINGS
      ======================================================== */}

      <section className="border-b border-slate-800/70 p-5">

        <div className="mb-5 flex items-center gap-2">

          <CalendarDays
            size={18}
            className="text-cyan-400"
          />

          <h3 className="text-sm font-semibold text-white">
            Upcoming Meetings
          </h3>

        </div>

        <div className="space-y-3">

          {meetings.map((meeting) => (
            <div
              key={meeting.time}
              className="rounded-xl border border-slate-700 bg-[#0B1220] p-4"
            >
              <div className="flex items-center gap-3">

                <Clock3
                  size={16}
                  className="text-cyan-400"
                />

                <div>

                  <p className="text-sm font-semibold text-white">
                    {meeting.time}
                  </p>

                  <p className="text-xs text-slate-400">
                    {meeting.title}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>

      </section>

      {/* =======================================================
          AI VOICE COMMAND
      ======================================================== */}

      <section className="flex flex-1 flex-col p-5">

        <div className="mb-5 flex items-center gap-2">

          <Mic
            size={18}
            className="text-cyan-400"
          />

          <h3 className="text-sm font-semibold text-white">
            AI Voice Command
          </h3>

        </div>

        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-5">

          <div className="mb-5 flex justify-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/15">

              <Mic
                size={26}
                className="text-cyan-400"
              />

            </div>

          </div>

          <p className="text-center text-sm text-slate-300">
            Ask DAIP anything...
          </p>

          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">

            Start Listening

            <ArrowRight size={16} />

          </button>

          <p className="mt-4 text-center text-xs text-slate-500">
            Press "/" to activate voice assistant
          </p>

        </div>

      </section>

    </aside>
  );
};

export default RightRail;