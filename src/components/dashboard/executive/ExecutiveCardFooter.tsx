import React from "react";

interface ExecutiveCardFooterProps {
    leftLabel: string;
    leftValue: string;
    rightLabel: string;
    rightValue: string;
    rightColor?: string;
}

const ExecutiveCardFooter: React.FC<ExecutiveCardFooterProps> = ({
    leftLabel,
    leftValue,
    rightLabel,
    rightValue,
    rightColor = "text-emerald-400",
}) => {
    return (
        <div
            className="
                border-t
                border-white/5
                px-3
                pt-2
                pb-.5
                flex
                items-center
                justify-between
                flex-shrink-0
            "
        >
            <div>
                <div
                    className="
                        text-[8px]
                        leading-[12px]
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    {leftLabel}
                </div>

                <div
                    className="
                        mt-1
                        text-[10px]
                        leading-[15px]
                        text-slate-300
                    "
                >
                    {leftValue}
                </div>
            </div>

            <div className="text-right">
                <div
                    className="
                        text-[8px]
                        leading-[12px]
                        uppercase
                        tracking-[0.18em]
                        text-slate-500
                    "
                >
                    {rightLabel}
                </div>

                <div
                    className={`
                        mt-1
                        text-[11px]
                        leading-[15px]
                        font-semibold
                        ${rightColor}
                    `}
                >
                    {rightValue}
                </div>
            </div>
        </div>
    );
};

export default ExecutiveCardFooter;