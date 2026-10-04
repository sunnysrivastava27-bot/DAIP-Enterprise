import React from "react";

interface RightRailCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const RightRailCard: React.FC<RightRailCardProps> = ({
    title,
    children,
    className = "",
}) => {
    return (
        <section
            className={`
                h-full
                w-full
                flex
                flex-col
                rounded-2xl
                border
                border-slate-800/70
                bg-[#09111D]
                overflow-hidden
                ${className}
            `}
        >
            {title && (
    <div
        className="
            px-4
            py-3
            border-b
            border-slate-800/70
        "
    >
        <span
            className="
                text-[11px]
                uppercase
                tracking-[0.22em]
                text-cyan-400
            "
        >
            {title}
        </span>
    </div>
)}
            <div className="flex-1 min-h-0">
                {children}
            </div>
        </section>
    );
};

export default RightRailCard;