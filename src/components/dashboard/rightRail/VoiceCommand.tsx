import React from "react";
import { Mic } from "lucide-react";

import rightRailTokens from "./rightRail.tokens";

/* ==========================================================
   DAIP Enterprise V3
   AI Voice Command
========================================================== */

const VoiceCommand: React.FC = () => {
    return (
       <section
    className={`
        h-full
        w-full
        flex
        flex-col
                ${rightRailTokens.layout.sectionBackground}
                ${rightRailTokens.layout.sectionBorder}
                ${rightRailTokens.layout.sectionRadius}
                ${rightRailTokens.voice.padding}
            `}
        >
            {/* =======================================
                HEADER
            ======================================== */}

            <span className={rightRailTokens.header.caption}>
                AI VOICE COMMAND
            </span>

            {/* =======================================
                VOICE ORB
            ======================================== */}

            <div className="flex flex-1 items-center justify-center">
                <div
                    className={`
                        relative
                        flex
                        items-center
                        justify-center
                        rounded-full
                        ${rightRailTokens.voice.orbSize}
                        ${rightRailTokens.voice.orbBackground}
                        ${rightRailTokens.voice.orbBorder}
                    `}
                >
                    <div className={rightRailTokens.voice.innerRing} />

                    <div className="absolute inset-4 rounded-full border border-cyan-400/30" />

                    <Mic
                        size={34}
                        className="text-cyan-400"
                    />
                </div>
            </div>

            {/* =======================================
                INPUT
            ======================================== */}

            <div
                className="
                    mt-2
                    rounded-xl
                    border
                    border-slate-700
                    bg-[#101826]
                    px-4
                    py-3
                "
            >
                <div className="text-sm text-slate-400">
                    Ask DAIP...
                </div>
            </div>

            {/* =======================================
                FOOTER
            ======================================== */}

            <div className={rightRailTokens.voice.footer}>
                Press <strong>⌥⌘</strong> to speak
            </div>
        </section>
    );
};

export default VoiceCommand;