import React from "react";
import { Clock3 } from "lucide-react";

import rightRailTokens from "./rightRail.tokens";

/* ==========================================================
   DAIP Enterprise V3
   Upcoming Meetings
========================================================== */

const meetings = [
    {
        time: "10:30 AM",
        title: "Executive Committee Review",
    },
    {
        time: "12:00 PM",
        title: "Town Planning Review",
    },
    {
        time: "03:00 PM",
        title: "Revenue Recovery Review",
    },
];

const UpcomingMeetings: React.FC = () => {
    return (
        <section
            className={`
                ${rightRailTokens.layout.sectionBackground}
                ${rightRailTokens.layout.sectionBorder}
                ${rightRailTokens.layout.sectionRadius}
                ${rightRailTokens.layout.overflow}
            `}
        >
            {/* =======================================
                HEADER
            ======================================== */}

            <div
                className={`
                    ${rightRailTokens.header.padding}
                    ${rightRailTokens.header.border}
                `}
            >
                <span className={rightRailTokens.header.caption}>
                    UPCOMING MEETINGS
                </span>
            </div>

            {/* =======================================
                MEETING LIST
            ======================================== */}

            <div className="space-y-4 p-4">
                {meetings.map((meeting) => (
                    <div
                        key={meeting.time}
                        className="
                            flex
                            items-start
                            gap-3
                        "
                    >
                        <Clock3
                            size={16}
                            className="mt-1 text-cyan-400"
                        />

                        <div className="flex flex-col">
                            <span
                                className={
                                    rightRailTokens.meetings.time
                                }
                            >
                                {meeting.time}
                            </span>

                            <span
                                className={
                                    rightRailTokens.meetings.title
                                }
                            >
                                {meeting.title}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UpcomingMeetings;