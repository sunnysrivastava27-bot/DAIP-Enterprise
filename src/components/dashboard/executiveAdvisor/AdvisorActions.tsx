import React from "react";
import {
    ArrowRight,
    Bell,
    FileText,
} from "lucide-react";

const actions = [
    {
        icon: Bell,
        title: "Notify Commissioner",
    },
    {
        icon: FileText,
        title: "Generate Report",
    },
    {
        icon: ArrowRight,
        title: "Open Situation Room",
    },
];

const AdvisorActions: React.FC = () => {

    return (

        <div className="grid grid-cols-3 gap-3 h-full">

            {actions.map((item) => {

                const Icon = item.icon;

                return (

                    <button
    key={item.title}
    className="
        h-[42px]
        rounded-xl
        border
        border-slate-700
        bg-[#101826]
        hover:border-cyan-500/50
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        text-[12px]
        text-white
        font-medium
    "
>

                        <Icon
                            size={16}
                            className="text-cyan-400"
                        />

                        {item.title}

                    </button>

                );

            })}

        </div>

    );

};

export default AdvisorActions;