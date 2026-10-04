import React from "react";

interface ExecutiveInfoProps {
    label: string;
    value: string;
}

const ExecutiveInfo: React.FC<ExecutiveInfoProps> = ({
    label,
    value,
}) => {
    return (
        <div className="flex items-center justify-between">
            <div
                className="
                    text-[9px]
                    leading-[13px]
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                "
            >
                {label}
            </div>

            <div
                className="
                    text-[10px]
                    leading-[13px]
                    font-medium
                    text-emerald-400
                "
            >
                {value}
            </div>
        </div>
    );
};

export default ExecutiveInfo;