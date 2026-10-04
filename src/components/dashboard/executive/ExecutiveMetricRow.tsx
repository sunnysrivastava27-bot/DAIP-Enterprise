import React from "react";

interface Props {
    label: string;
    value: string;
    valueColor?: string;
    className?: string;
}

const ExecutiveMetricRow: React.FC<Props> = ({
    label,
    value,
    valueColor = "text-white",
    className = "",
}) => {
    return (
        <div
            className={`
                flex
                items-center
                justify-between
                ${className}
            `}
        >
            <span className="text-[10px] leading-[14px] text-slate-400">
                {label}
            </span>

            <span
                className={`
                    text-[12px]
                    leading-[14px]
                    font-semibold
                    ${valueColor}
                `}
            >
                {value}
            </span>
        </div>
    );
};

export default ExecutiveMetricRow;