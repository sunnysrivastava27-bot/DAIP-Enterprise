import React from "react";
import type { LucideIcon } from "lucide-react";

interface ExecutiveCardHeaderProps {
    title: string;
    icon: LucideIcon;
    color?: string;
    bgColor?: string;
    borderColor?: string;
}

const ExecutiveCardHeader: React.FC<ExecutiveCardHeaderProps> = ({
    title,
    icon: Icon,
    color = "text-cyan-400",
    bgColor = "bg-cyan-500/10",
    borderColor = "border-cyan-400/20",
}) => {
    return (
        <div
            className="
                h-[30px]
                flex
                items-center
                gap-2
                flex-shrink-0
            "
        >

            {/* Icon */}
            <div
                className={`
                    w-[30px]
                    h-[30px]
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    ${bgColor}
                    ${borderColor}
                `}
            >
                <Icon
                    size={15}
                    className={color}
                />
            </div>

            {/* Title */}
            <h3
                className={`
                    text-[11px]
                    leading-[15px]
                    uppercase
                    tracking-[0.20em]
                    font-semibold
                    ${color}
                `}
            >
                {title}
            </h3>

        </div>
    );
};

export default ExecutiveCardHeader;