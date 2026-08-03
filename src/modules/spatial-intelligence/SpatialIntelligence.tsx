import React from "react";

import SpatialHeader from "./components/SpatialHeader";
import SpatialToolbar from "./components/SpatialToolbar";
import SpatialOverview from "./components/SpatialOverview";
import SpatialMissionQueue from "./components/SpatialMissionQueue";
import SpatialLegend from "./components/SpatialLegend";
import SpatialStatusBar from "./components/SpatialStatusBar";

const SpatialIntelligence: React.FC = () => {
    return (
        <div className="flex h-full w-full flex-col bg-slate-950 text-white">

            {/* ============================================================
               MODULE HEADER
            ============================================================ */}
            <SpatialHeader />

            {/* ============================================================
               TOOLBAR
            ============================================================ */}
            <SpatialToolbar />

            {/* ============================================================
               MAIN WORKSPACE
            ============================================================ */}
            <div className="flex-1 overflow-hidden p-6">

                <div className="grid h-full grid-cols-12 gap-6">

                    {/* ====================================================
                       LEFT PANEL
                    ==================================================== */}
                    <aside className="col-span-3 flex flex-col gap-6">

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                            <SpatialOverview />
                        </div>

                        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-5 overflow-auto">
                            <SpatialMissionQueue />
                        </div>

                    </aside>

                    {/* ====================================================
                       CENTER MAP WORKSPACE
                    ==================================================== */}
                    <section className="col-span-6 flex flex-col">

                        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 relative overflow-hidden">

                            {/* Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">

                                <div className="text-center">

                                    <div className="mb-3 text-6xl">
                                        🗺️
                                    </div>

                                    <h2 className="text-2xl font-semibold">
                                        Spatial Intelligence Engine
                                    </h2>

                                    <p className="mt-3 text-slate-400">
                                        GIS Canvas will be integrated in Sprint 2
                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* ====================================================
                       RIGHT PANEL
                    ==================================================== */}
                    <aside className="col-span-3 flex flex-col gap-6">

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                            <SpatialLegend />
                        </div>

                        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-5">

                            <h3 className="mb-5 text-lg font-semibold">
                                AI Spatial Insights
                            </h3>

                            <div className="space-y-4">

                                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">

                                    <div className="font-medium">
                                        Priority Recommendation
                                    </div>

                                    <div className="mt-2 text-sm text-slate-300">
                                        AI recommendations will appear here after
                                        the analytics engine is connected.
                                    </div>

                                </div>

                                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">

                                    <div className="font-medium">
                                        Risk Monitoring
                                    </div>

                                    <div className="mt-2 text-sm text-slate-300">
                                        Delayed projects, unauthorized
                                        construction, and revenue anomalies
                                        will be highlighted here.
                                    </div>

                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>

            {/* ============================================================
               STATUS BAR
            ============================================================ */}
            <SpatialStatusBar />

        </div>
    );
};

export default SpatialIntelligence;