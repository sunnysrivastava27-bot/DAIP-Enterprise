import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import RightRail from "../components/dashboard/rightRail/RightRail";
import ExecutiveAdvisor from "../components/dashboard/executiveAdvisor/ExecutiveAdvisor";
import RevenueIntelligence from "../components/dashboard/revenueIntelligence/RevenueIntelligence";
import ProjectsIntelligence from "../components/dashboard/projectsIntelligence/ProjectsIntelligence";
import WhatChangedOvernight from "../components/dashboard/whatchangedOvernight/WhatChangedOvernight";
import LiveCitySnapshot from "../components/dashboard/liveCitySnapshot/LiveCitySnapshot";
import RevenueOpportunity from "../components/dashboard/revenueOpportunity/RevenueOpportunity";
import ChairmanWorkspace from "../components/dashboard/workspace/ChairmanWorkspace";
import ExecutiveHeroSection from "../components/executive/v3/ExecutiveHeroSection";

/* ==========================================================
   DAIP ENTERPRISE V3
   Chairman Dashboard
   Responsive Layout Shell (Frozen)
========================================================== */

const LAYOUT = {
    RIGHT_RAIL_WIDTH: 208,

    COLUMN_GAP: 8,
    ROW_GAP: 6,

    HERO_RATIO: 0.32,
    EXECUTIVE_RATIO: 0.33,
    OPERATIONS_RATIO: 0.26,
} as const;

const ChairmanDashboardV3: React.FC = () => {
    const containerRef =
        useRef<HTMLDivElement>(null);

    const [availableHeight, setAvailableHeight] =
        useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (!containerRef.current) return;

            setAvailableHeight(
                containerRef.current.clientHeight
            );
        };

        updateHeight();

        window.addEventListener(
            "resize",
            updateHeight
        );

        return () => {
            window.removeEventListener(
                "resize",
                updateHeight
            );
        };
    }, []);

    const heroHeight = useMemo(() => {
        return Math.max(
            0,
            availableHeight *
                LAYOUT.HERO_RATIO
        );
    }, [availableHeight]);

    const executiveHeight = useMemo(() => {
        return Math.max(
            0,
            availableHeight *
                LAYOUT.EXECUTIVE_RATIO
        );
    }, [availableHeight]);

    const operationsHeight = useMemo(() => {
        return Math.max(
            0,
            availableHeight *
                LAYOUT.OPERATIONS_RATIO
        );
    }, [availableHeight]);

    const workspaceHeight = useMemo(() => {
        return Math.max(
            0,
            availableHeight -
                heroHeight -
                executiveHeight -
                operationsHeight -
                LAYOUT.ROW_GAP * 3
        );
    }, [
        availableHeight,
        heroHeight,
        executiveHeight,
        operationsHeight,
    ]);

    return (
        <DashboardLayout>

            <div
                ref={containerRef}
                className="w-full h-full min-h-0 overflow-hidden"
            >

                <div
                    className="grid h-full min-h-0"
                    style={{
                        columnGap:
                            LAYOUT.COLUMN_GAP,

                        gridTemplateColumns:
                            "1fr auto",
                    }}
                >

                    {/* =====================================
                        LEFT WORKSPACE
                    ====================================== */}

                    <div
                        className="grid h-full min-h-0"
                        style={{
                            rowGap:
                                LAYOUT.ROW_GAP,

                            gridTemplateRows: `
                                ${heroHeight}px
                                ${executiveHeight}px
                                ${operationsHeight}px
                                ${workspaceHeight}px
                            `,
                        }}
                    >

                       {/* =====================================
HERO
====================================== */}

<section className="rounded-2xl border overflow-hidden">
    <ExecutiveHeroSection />
</section>

                        {/* =====================================
                            EXECUTIVE INTELLIGENCE
                        ====================================== */}

                        <section
                            className="grid grid-cols-3 h-full min-h-0"
                            style={{
                                columnGap:
                                    LAYOUT.COLUMN_GAP,
                            }}
                        >

                            <div className="h-full min-h-0">
                                <ExecutiveAdvisor />
                            </div>

                            <div className="h-full min-h-0">
                                <RevenueIntelligence />
                            </div>

                            <div className="h-full min-h-0">
                                <ProjectsIntelligence />
                            </div>

                        </section>


                        {/* =====================================
                            OPERATIONS
                        ====================================== */}

                        <section
                            className="grid grid-cols-3 h-full min-h-0"
                            style={{
                                columnGap:
                                    LAYOUT.COLUMN_GAP,
                            }}
                        >

                            <div className="h-full min-h-0">
                                <WhatChangedOvernight />
                            </div>

                            <div className="h-full min-h-0">
                                <LiveCitySnapshot />
                            </div>

                            <div className="h-full min-h-0">
                                <RevenueOpportunity />
                            </div>

                        </section>


                        {/* =====================================
                            WORKSPACE
                        ====================================== */}

                        <div className="h-full min-h-0">
    <ChairmanWorkspace />
</div>

                    </div>


                    {/* =====================================
                        RIGHT RAIL
                    ====================================== */}

                    <aside
                        className="h-full min-h-0"
                        style={{
                            width:
                                LAYOUT.RIGHT_RAIL_WIDTH,

                            minWidth:
                                LAYOUT.RIGHT_RAIL_WIDTH,

                            maxWidth:
                                LAYOUT.RIGHT_RAIL_WIDTH,
                        }}
                    >
                        <RightRail />
                    </aside>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default ChairmanDashboardV3;