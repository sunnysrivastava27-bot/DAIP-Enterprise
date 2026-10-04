import React from "react";
import {
    AlertTriangle,
    ArrowRight,
    MapPinned,
    Target,
} from "lucide-react";

const ChairmanWorkspace: React.FC = () => {
    return (
        <section
            className="
                h-full
                min-h-0
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#0F172A]
            "
        >
            <div
                className="
                    flex
                    h-full
                    min-h-0
                    items-center
                    gap-4
                    px-4
                "
            >
                {/* WORKSPACE */}
                <div
                    className="
                        flex
                        flex-shrink-0
                        items-center
                        gap-2
                    "
                >
                    <div
                        className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-cyan-400/20
                            bg-cyan-500/10
                        "
                    >
                        <Target
                            size={13}
                            strokeWidth={1.8}
                            className="text-cyan-400"
                        />
                    </div>

                    <div>
                        <div
                            className="
                                text-[9px]
                                leading-[11px]
                                font-medium
                                uppercase
                                tracking-[0.16em]
                                text-cyan-400
                            "
                        >
                            WORKSPACE
                        </div>

                        <div
                            className="
                                mt-0.5
                                text-[9px]
                                leading-[11px]
                                text-slate-400
                            "
                        >
                            Chairman Action
                        </div>
                    </div>
                </div>

                {/* SELECTED INTELLIGENCE */}
                <div
                    className="
                        min-w-0
                        flex-1
                        border-l
                        border-white/5
                        pl-4
                    "
                >
                    <div
                        className="
                            text-[8px]
                            leading-[10px]
                            uppercase
                            tracking-[0.14em]
                            text-slate-500
                        "
                    >
                        Selected Intelligence
                    </div>

                    <div
                        className="
                            mt-1
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                        "
                    >
                        <AlertTriangle
                            size={10}
                            strokeWidth={1.8}
                            className="
                                flex-shrink-0
                                text-amber-400
                            "
                        />

                        <span
                            className="
                                truncate
                                text-[10px]
                                leading-[12px]
                                font-medium
                                text-slate-200
                            "
                        >
                            Zone 4 Revenue Leakage
                        </span>
                    </div>
                </div>

                {/* PRIORITY ACTION */}
                <div
                    className="
                        min-w-0
                        flex-1
                        border-l
                        border-white/5
                        pl-4
                    "
                >
                    <div
                        className="
                            text-[8px]
                            leading-[10px]
                            uppercase
                            tracking-[0.14em]
                            text-slate-500
                        "
                    >
                        Priority Action
                    </div>

                    <div
                        className="
                            mt-1
                            truncate
                            text-[10px]
                            leading-[12px]
                            font-medium
                            text-slate-200
                        "
                    >
                        Review 12 critical encroachments
                    </div>
                </div>

                {/* RELATED MODULE */}
                <div
                    className="
                        min-w-0
                        flex-1
                        border-l
                        border-white/5
                        pl-4
                    "
                >
                    <div
                        className="
                            text-[8px]
                            leading-[10px]
                            uppercase
                            tracking-[0.14em]
                            text-slate-500
                        "
                    >
                        Related Module
                    </div>

                    <div
                        className="
                            mt-1
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                        "
                    >
                        <MapPinned
                            size={10}
                            strokeWidth={1.8}
                            className="
                                flex-shrink-0
                                text-cyan-400
                            "
                        />

                        <span
                            className="
                                truncate
                                text-[10px]
                                leading-[12px]
                                font-medium
                                text-slate-200
                            "
                        >
                            Land Bank Intelligence
                        </span>
                    </div>
                </div>

                {/* ACTION */}
                <button
                    type="button"
                    className="
                        flex
                        flex-shrink-0
                        items-center
                        gap-1.5
                        border-l
                        border-white/5
                        pl-4
                        text-[10px]
                        leading-[12px]
                        font-medium
                        text-cyan-400
                        transition-opacity
                        hover:opacity-80
                    "
                >
                    Open Workspace

                    <ArrowRight
                        size={11}
                        strokeWidth={1.8}
                    />
                </button>
            </div>
        </section>
    );
};

export default ChairmanWorkspace;