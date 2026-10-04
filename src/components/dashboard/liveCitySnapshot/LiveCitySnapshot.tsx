import React from "react";
import { Map, ExternalLink } from "lucide-react";

import ExecutiveCard from "../executive/ExecutiveCard";
import ExecutiveCardHeader from "../executive/ExecutiveCardHeader";
import ExecutiveCardBody from "../executive/ExecutiveCardBody";

const LiveCitySnapshot: React.FC = () => {
    return (
        <ExecutiveCard>

            <ExecutiveCardHeader
                title="LIVE CITY SNAPSHOT"
                icon={Map}
                color="text-cyan-400"
                bgColor="bg-cyan-500/10"
                borderColor="border-cyan-400/20"
            />

            <ExecutiveCardBody>

                <div className="flex h-full min-h-0 flex-col">

                    {/* HEADER ACTION */}
                    <div className="mb-1 flex items-center justify-end">

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-1
                                text-[9px]
                                font-medium
                                text-cyan-400
                                hover:opacity-80
                            "
                        >
                            Open Digital Twin
                            <ExternalLink size={10} />
                        </button>

                    </div>

                    {/* CITY SNAPSHOT AREA */}
                    <div
                        className="
                            relative
                            flex-1
                            min-h-0
                            overflow-hidden
                            rounded-lg
                            border
                            border-cyan-400/10
                            bg-[#081321]
                        "
                    >

                        {/* GRID */}
                        <div
                            className="
                                absolute
                                inset-0
                                opacity-30
                                bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)]
                                bg-[size:24px_24px]
                            "
                        />

                        {/* CITY NETWORK */}
                        <div className="absolute inset-[12%]">

                            <div
                                className="
                                    absolute
                                    left-[10%]
                                    top-[45%]
                                    h-px
                                    w-[75%]
                                    rotate-[-12deg]
                                    bg-cyan-400/20
                                "
                            />

                            <div
                                className="
                                    absolute
                                    left-[25%]
                                    top-[15%]
                                    h-[75%]
                                    w-px
                                    rotate-[18deg]
                                    bg-cyan-400/20
                                "
                            />

                            <div
                                className="
                                    absolute
                                    left-[40%]
                                    top-[20%]
                                    h-px
                                    w-[50%]
                                    rotate-[25deg]
                                    bg-cyan-400/20
                                "
                            />

                        </div>

                        {/* ZONE 4 */}
                        <div
                            className="
                                absolute
                                left-[25%]
                                top-[32%]
                                h-3
                                w-3
                                rounded-full
                                bg-red-500
                                shadow-[0_0_12px_rgba(239,68,68,0.8)]
                            "
                        />

                        {/* WARD 18 */}
                        <div
                            className="
                                absolute
                                left-[53%]
                                top-[22%]
                                h-3
                                w-3
                                rounded-full
                                bg-orange-400
                                shadow-[0_0_12px_rgba(251,146,60,0.8)]
                            "
                        />

                        {/* PROJECT 32 */}
                        <div
                            className="
                                absolute
                                left-[45%]
                                top-[57%]
                                h-3
                                w-3
                                rounded-full
                                bg-blue-400
                                shadow-[0_0_12px_rgba(96,165,250,0.8)]
                            "
                        />

                        {/* WARD 7 */}
                        <div
                            className="
                                absolute
                                left-[72%]
                                top-[68%]
                                h-3
                                w-3
                                rounded-full
                                bg-emerald-400
                                shadow-[0_0_12px_rgba(52,211,153,0.8)]
                            "
                        />

                    </div>

                    {/* LEGEND */}
                    <div
                        className="
                            mt-1
                            grid
                            grid-cols-2
                            gap-x-3
                            gap-y-1
                        "
                    >

                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="text-[9px] text-slate-400">
                                Zone 4
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-orange-400" />
                            <span className="text-[9px] text-slate-400">
                                Ward 18
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-blue-400" />
                            <span className="text-[9px] text-slate-400">
                                Project 32
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            <span className="text-[9px] text-slate-400">
                                Ward 7
                            </span>
                        </div>

                    </div>

                </div>

            </ExecutiveCardBody>

        </ExecutiveCard>
    );
};

export default LiveCitySnapshot;