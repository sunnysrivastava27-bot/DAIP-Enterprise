import React from "react";
import {
  Activity,
  CalendarDays,
  Clock3,
  Mic,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   LIVE FEEDS
============================================================ */

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

/* ============================================================
   MEETINGS
============================================================ */

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

/* ============================================================
   COMPONENT
============================================================ */

const RightRail: React.FC = () => {
  return (

    <aside
      className="
        flex
        flex-col
        h-full
        gap-5
      "
    >

      {/* ======================================================
          LIVE FEEDS
      ======================================================= */}

      <section
        className="
          rounded-3xl
          border
          border-slate-800/70
          bg-[#09111D]
          overflow-hidden
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800/70
            px-5
            py-4
          "
        >

          <div className="flex items-center gap-3">

            <Activity
              size={18}
              className="text-cyan-400"
            />

            <div>

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.22em]
                  text-cyan-400
                "
              >
                Live Operations
              </p>

              <h3
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-white
                "
              >
                Live Feeds
              </h3>

            </div>

          </div>

          <button
            className="
              text-xs
              font-medium
              text-cyan-400
              hover:text-cyan-300
            "
          >
            View All
          </button>

        </div>

        <div className="p-4 space-y-3">
		          {liveFeeds.map((feed) => (

            <div
              key={feed.title}
              className="
                group
                rounded-2xl
                border
                border-slate-800/70
                bg-[#0D1726]
                p-4
                transition-all
                duration-300
                hover:border-cyan-500/40
                hover:bg-[#111E30]
              "
            >

              <div className="flex items-start gap-3">

                <div
                  className={`
                    mt-1
                    h-2.5
                    w-2.5
                    rounded-full
                    ${feed.color}
                  `}
                />

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h4
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        {feed.title}
                      </h4>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-slate-400
                        "
                      >
                        {feed.status}
                      </p>

                    </div>

                    <ChevronRight
                      size={15}
                      className="
                        mt-1
                        text-slate-500
                        transition
                        group-hover:text-cyan-400
                      "
                    />

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ======================================================
          UPCOMING MEETINGS
      ======================================================= */}

      <section
        className="
          rounded-3xl
          border
          border-slate-800/70
          bg-[#09111D]
          overflow-hidden
        "
      >

        <div
          className="
            flex
            items-center
            border-b
            border-slate-800/70
            px-5
            py-4
          "
        >

          <CalendarDays
            size={18}
            className="text-cyan-400"
          />

          <div className="ml-3">

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-cyan-400
              "
            >
              Schedule
            </p>

            <h3
              className="
                mt-1
                text-base
                font-semibold
                text-white
              "
            >
              Upcoming Meetings
            </h3>

          </div>

        </div>

        <div className="p-4 space-y-3">
		          {meetings.map((meeting) => (

            <div
              key={meeting.time}
              className="
                group
                rounded-2xl
                border
                border-slate-800/70
                bg-[#0D1726]
                p-4
                transition-all
                duration-300
                hover:border-cyan-500/40
                hover:bg-[#111E30]
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-3">

                  <Clock3
                    size={16}
                    className="mt-1 text-cyan-400"
                  />

                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {meeting.time}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-400
                      "
                    >
                      {meeting.title}
                    </p>

                  </div>

                </div>

                <ChevronRight
                  size={15}
                  className="
                    mt-1
                    text-slate-500
                    transition
                    group-hover:text-cyan-400
                  "
                />

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ======================================================
          AI VOICE COMMAND
      ======================================================= */}

      <section
        className="
          rounded-3xl
          border
          border-slate-800/70
          bg-[#09111D]
          overflow-hidden
        "
      >

        <div
          className="
            flex
            items-center
            border-b
            border-slate-800/70
            px-5
            py-4
          "
        >

          <Mic
            size={18}
            className="text-cyan-400"
          />

          <div className="ml-3">

            <p
              className="
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-cyan-400
              "
            >
              Executive Assistant
            </p>

            <h3
              className="
                mt-1
                text-base
                font-semibold
                text-white
              "
            >
              AI Voice Command
            </h3>

          </div>

        </div>

        <div
          className="
            p-6
            flex
            flex-col
            items-center
          "
        >
		          {/* Voice Orb */}

          <div
            className="
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              border
              border-cyan-500/30
              bg-cyan-500/10
            "
          >

            <div
              className="
                absolute
                inset-2
                rounded-full
                border
                border-cyan-400/20
              "
            />

            <Mic
              size={34}
              className="relative z-10 text-cyan-400"
            />

          </div>

          <p
            className="
              mt-6
              text-sm
              font-semibold
              text-white
            "
          >
            Ask DAIP Anything
          </p>

          <p
            className="
              mt-2
              text-center
              text-xs
              leading-5
              text-slate-400
            "
          >
            Voice assistant is ready to execute
            executive commands.
          </p>

          <button
            className="
              mt-6
              flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-950
              transition
              hover:bg-cyan-400
            "
          >

            Activate Voice

            <ChevronRight size={16} />

          </button>

          <p
            className="
              mt-4
              text-center
              text-[11px]
              text-slate-500
            "
          >
            Press "/" anywhere inside DAIP
          </p>

        </div>

      </section>

    </aside>

  );
};

export default RightRail;

		