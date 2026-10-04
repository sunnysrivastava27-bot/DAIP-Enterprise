import React from "react";

import LiveFeeds from "./LiveFeeds";
import UpcomingMeetings from "./UpcomingMeetings";
import ViewCalendar from "./ViewCalendar";
import VoiceCommand from "./VoiceCommand";



/* ==========================================================
   DAIP Enterprise V3
   Right Rail
========================================================== */

const RightRail: React.FC = () => {
    return (
        <aside
    className="
        h-full
        min-h-0
        flex
        flex-col
        gap-2
    "
>
    {/* LIVE FEEDS */}
<div
    style={{ flex: 3 }}
    className="min-h-0 flex"
>
    <LiveFeeds />
</div>

<div
    style={{ flex: 4 }}
    className="min-h-0 flex"
>
    <UpcomingMeetings />
</div>

<div style={{ flex: 0.8 }} className="min-h-0 flex">
    <ViewCalendar />
</div>

<div
    style={{ flex: 2 }}
    className="min-h-0 flex"
>
    <VoiceCommand />
</div>
</aside>
    );
};

export default RightRail;