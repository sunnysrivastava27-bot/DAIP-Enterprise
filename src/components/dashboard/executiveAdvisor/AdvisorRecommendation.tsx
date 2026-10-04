import React from "react";
import { Sparkles } from "lucide-react";

const AdvisorRecommendation: React.FC = () => {
    return (
        <div className="space-y-1.5">

            {/* Executive Insight */}

            <div className="flex items-center gap-2">

                <div
                    className="
                        w-[30px]
                        h-[30px]
                        rounded-lg
                        bg-cyan-500/10
                        border
                        border-cyan-400/20
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                    "
                >
                    <Sparkles
                        size={15}
                        className="text-cyan-400"
                    />
                </div>

                <span
                    className="
                        text-[9px]
                        uppercase
                        tracking-[0.20em]
                        text-cyan-400
                        font-semibold
                    "
                >
                    EXECUTIVE INSIGHT
                </span>

            </div>

            {/* Recommendation */}

            <div>

                <h3
                    className="
                        text-[13px]
                        font-semibold
                        text-white
                    "
                >
                    Focus on Zone 4 Today
                </h3>

                <p
                    className="
                        mt-2
                        text-[10px]
                        leading-[15px]
                        text-slate-400
                    "
                >
                    Revenue leakage{" "}
                    <span className="text-amber-400 font-medium">
                        ↑18%
                    </span>

                    <br />

                    <span className="text-red-400 font-medium">
                        12
                    </span>{" "}
                    critical encroachments.
                </p>

            </div>

            {/* Key Drivers */}

            <div className="pt-1 border-t border-white/5">

                <div
                    className="
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                        mb-1
                    "
                >
                    KEY DRIVERS
                </div>

                <div className="space-y-0.5">

                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400 text-[9px]">•</span>

                        <span className="text-[10px] text-slate-300">
                            <span className="text-red-400 font-medium">
                                8
                            </span>{" "}
                            plots pending
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400 text-[9px]">•</span>

                        <span className="text-[10px] text-slate-300">
                            <span className="text-amber-400 font-medium">
                                Recovery
                            </span>{" "}
                            below target
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-cyan-400 text-[9px]">•</span>

                        <span className="text-[10px] text-slate-300">
                            <span className="text-red-400 font-medium">
                                3
                            </span>{" "}
                            VIP complaints
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdvisorRecommendation;