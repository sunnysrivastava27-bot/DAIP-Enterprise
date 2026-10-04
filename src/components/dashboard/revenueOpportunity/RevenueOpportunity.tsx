import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

import ExecutiveCard from "../executive/ExecutiveCard";
import ExecutiveCardHeader from "../executive/ExecutiveCardHeader";
import ExecutiveCardBody from "../executive/ExecutiveCardBody";

interface Contributor {
    label: string;
    value: string;
    percentage: string;
}

const RevenueOpportunity: React.FC = () => {
    const contributors: Contributor[] = [
        {
            label: "Property Tax",
            value: "₹8.2 Cr",
            percentage: "44%",
        },
        {
            label: "Development Charges",
            value: "₹4.6 Cr",
            percentage: "25%",
        },
        {
            label: "Trade License",
            value: "₹3.1 Cr",
            percentage: "17%",
        },
        {
            label: "Lease Renewal",
            value: "₹2.7 Cr",
            percentage: "14%",
        },
    ];

    return (
        <ExecutiveCard>

            {/* HEADER */}
            <ExecutiveCardHeader
                title="REVENUE OPPORTUNITY"
                icon={TrendingUp}
                color="text-emerald-400"
                bgColor="bg-emerald-500/10"
                borderColor="border-emerald-400/20"
            />

            {/* CONTENT */}
            <ExecutiveCardBody>

                <div className="flex h-full min-h-0 flex-col">

                    {/* =====================================================
                        HERO
                    ====================================================== */}
                    <div className="shrink-0">

                        <div
                            className="
                                text-[9px]
                                leading-[12px]
                                text-slate-400
                            "
                        >
                            Recoverable Revenue
                        </div>

                        <div
                            className="
                                mt-0.5
                                text-[16px]
                                leading-[18px]
                                font-semibold
                                text-emerald-400
                            "
                        >
                            ₹18.6 Cr
                        </div>

                        <div
                            className="
                                mt-0.5
                                text-[9px]
                                leading-[12px]
                                text-slate-400
                            "
                        >
                            Within 45 Days
                        </div>

                    </div>


                    {/* =====================================================
                        TOP CONTRIBUTORS
                    ====================================================== */}
                    <div className="mt-1 shrink-0">

                        <div
                            className="
                                mb-0.5
                                text-[8px]
                                leading-[10px]
                                uppercase
                                tracking-[0.16em]
                                text-slate-500
                            "
                        >
                            Top Contributors
                        </div>

                        <div className="flex flex-col">

                            {contributors.map((item) => (
                                <div
                                    key={item.label}
                                    className="
                                        flex
                                        min-h-[17px]
                                        items-center
                                        justify-between
                                        border-b
                                        border-white/5
                                    "
                                >

                                    {/* LABEL */}
                                    <span
                                        className="
                                            min-w-0
                                            truncate
                                            text-[10px]
                                            leading-[14px]
                                            text-slate-300
                                        "
                                    >
                                        {item.label}
                                    </span>

                                    {/* VALUE */}
                                   <div
    className="
        ml-2
        mr-2
        flex
        shrink-0
        items-center
        gap-2
    "
>

                                        <span
    className="
        text-[10px]
        leading-[14px]
        font-medium
        text-slate-300
    "
>
    {item.value}
</span>

<span
    className="
        text-[9px]
        leading-[14px]
        text-slate-500
    "
>
    ({item.percentage})
</span>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>


                    {/* =====================================================
                        BOTTOM INTELLIGENCE
                    ====================================================== */}
                    <div
                        className="
                            mt-1
                            shrink-0
                            border-t
                            border-white/5
                            pt-1
                            flex
                            items-center
                            justify-between
                        "
                    >

                        {/* TOP ZONE */}
                        <div className="min-w-0">

                            <div
                                className="
                                    text-[8px]
                                    leading-[10px]
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-500
                                "
                            >
                                Top Zone
                            </div>

                            <div
                                className="
                                    mt-0.5
                                    text-[10px]
                                    leading-[13px]
                                    font-medium
                                    text-emerald-400
                                "
                            >
                                Zone 4
                            </div>

                        </div>


                        {/* CONFIDENCE */}
                        <div className="text-right">

                            <div
                                className="
                                    text-[8px]
                                    leading-[10px]
                                    uppercase
                                    tracking-[0.16em]
                                    text-slate-500
                                "
                            >
                                Confidence
                            </div>

                            <div
                                className="
                                    mt-0.5
                                    text-[10px]
                                    leading-[13px]
                                    font-medium
                                    text-emerald-400
                                "
                            >
                                High
                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        ACTION
                    ====================================================== */}
                    <button
                        type="button"
                        className="
                            mt-1
                            shrink-0
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-1
                            border-t
                            border-white/5
                            pt-1
                            text-[9px]
                            leading-[12px]
                            font-medium
                            text-cyan-400
                            transition-opacity
                            hover:opacity-80
                        "
                    >
                        Explore Opportunity
                        <ArrowRight size={10} />
                    </button>

                </div>

            </ExecutiveCardBody>

        </ExecutiveCard>
    );
};

export default RevenueOpportunity;