import React from "react";
import { ArrowRight } from "lucide-react";

import RightRailCard from "./RightRailCard";

const ViewCalendar: React.FC = () => {
    return (
        <RightRailCard title="">
            <button
                className="
                    h-full
                    w-full
                    flex
                    items-center
                    justify-between
                    px-4
                    text-cyan-400
                    hover:text-cyan-300
                    transition-colors
                "
            >
                <span className="text-sm font-semibold">
                    View Calendar
                </span>

                <ArrowRight
    size={16}
    className="mr-1"
/>
            </button>
        </RightRailCard>
    );
};

export default ViewCalendar;