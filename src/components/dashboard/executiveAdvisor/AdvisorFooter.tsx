import React from "react";

const AdvisorFooter: React.FC = () => {

    return (

        <div
            className="
                border-t
                border-white/5
                pt-2
                space-y-2
            "
        >

            <div className="flex justify-between items-center">

                <span
                    className="
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    AI Confidence
                </span>

                <span
                    className="
                        text-[11px]
                        font-semibold
                        text-emerald-400
                    "
                >
                    96%
                </span>

            </div>

            <div className="flex justify-between items-center">

                <span
                    className="
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    Updated
                </span>

                <span
                    className="
                        text-[10px]
                        text-slate-300
                    "
                >
                    2 min ago
                </span>

            </div>

        </div>

    );

};

export default AdvisorFooter;