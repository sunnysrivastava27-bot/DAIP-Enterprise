import React from "react";

const AdvisorKPIs: React.FC = () => {
    const kpis = [
        {
            label: "Revenue",
            value: "₹18.6 Cr",
            status: "+8%",
            color: "text-emerald-400",
        },
        {
            label: "Projects",
            value: "126",
            status: "8 Critical",
            color: "text-cyan-400",
        },
        {
            label: "Recovery",
            value: "92%",
            status: "+4%",
            color: "text-emerald-400",
        },
        {
            label: "Alerts",
            value: "12",
            status: "High",
            color: "text-amber-400",
        },
    ];

    return (
        <div
            className="
                border-t
                border-white/5
                pt-2
            "
        >
            {kpis.map((item, index) => (
                <div
                    key={item.label}
                    className={`
                        flex
                        items-center
                        justify-between
                        py-1
                        ${index !== kpis.length - 1 ? "border-b border-white/5" : ""}
                    `}
                >
                    {/* Metric Name */}

                    <div
                        className="
                            w-[72px]
                            text-[9px]
                            uppercase
                            tracking-[0.12em]
                            text-slate-400
                        "
                    >
                        {item.label}
                    </div>

                    {/* Value */}

                    <div
                        className="
                            flex-1
                            text-center
                            text-[12px]
                            font-semibold
                            text-white
                        "
                    >
                        {item.value}
                    </div>

                    {/* Status */}

                    <div
                        className={`
                            w-[70px]
                            text-right
                            text-[9px]
                            font-medium
                            ${item.color}
                        `}
                    >
                        {item.status}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvisorKPIs;