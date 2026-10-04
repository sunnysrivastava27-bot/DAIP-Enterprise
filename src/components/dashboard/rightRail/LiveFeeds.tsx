import React from "react";
import {
    CloudRain,
    TrafficCone,
    Droplets,
    Shield,
} from "lucide-react";

import RightRailCard from "./RightRailCard";

const feeds = [
    {
        icon: CloudRain,
        title: "Monsoon",
        status: "Normal",
    },
    {
        icon: TrafficCone,
        title: "Traffic",
        status: "Normal",
    },
    {
        icon: Droplets,
        title: "Water Supply",
        status: "Stable",
    },
    {
        icon: Shield,
        title: "Law & Order",
        status: "Normal",
    },
];

const LiveFeeds: React.FC = () => {
    return (
        <RightRailCard title="LIVE FEEDS">
            <div className="h-full px-4 py-3">
                <div className="space-y-5">
                    {feeds.map((feed) => {
                        const Icon = feed.icon;

                        return (
                            <div
                                key={feed.title}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-slate-700
                                        bg-[#101826]
                                    "
                                >
                                    <Icon
                                        size={18}
                                        className="text-cyan-400"
                                    />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        {feed.title}
                                    </div>

                                    <div className="text-xs text-slate-400">
                                        {feed.status}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </RightRailCard>
    );
};

export default LiveFeeds;