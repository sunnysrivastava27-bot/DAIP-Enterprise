import React from "react";

interface ExecutiveHeroMetricProps {
    label: string;
    value: string;
    change?: string;
    changeColor?: string;
}

const ExecutiveHeroMetric: React.FC<ExecutiveHeroMetricProps> = ({
    label,
    value,
    change,
    changeColor = "text-emerald-400",
}) => {
    return (
        <div>
            <div
                className="
                    text-[10px]
                    leading-[15px]
                    text-slate-400
                "
            >
                {label}
            </div>

            <div
                className="
                    mt-1
                    text-[12px]
                    leading-[15px]
                    font-semibold
                    text-white
                "
            >
                {value}
            </div>

            {change && (
                <div
                    className={`
                        mt-1
                        text-[10px]
                        leading-[15px]
                        font-medium
                        ${changeColor}
                    `}
                >
                    {change}
                </div>
            )}
        </div>
    );
};

export default ExecutiveHeroMetric;