import React from "react";

interface ExecutiveCardProps {
    children: React.ReactNode;
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({
    children,
}) => {

    return (

        <section
            className="
                h-full
                w-full

                rounded-2xl
                border
                border-white/10

                bg-[#0F172A]

                overflow-hidden

                flex
                flex-col
            "
        >
            {children}
        </section>

    );

};

export default ExecutiveCard;