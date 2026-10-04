import React from "react";

import AdvisorRecommendation from "./AdvisorRecommendation";
import AdvisorFooter from "./AdvisorFooter";
// import AdvisorActions from "./AdvisorActions";

const ExecutiveAdvisor: React.FC = () => {
    return (

     <section
    className="
rounded-2xl
border
border-white/10
bg-[#0F172A]
h-full
min-h-0
overflow-hidden
flex
flex-col
"
>
    <div className="px-3 pt-1 pb-2 flex-shrink-0">

        <h3
            className="
                text-[11px]
                tracking-[0.20em]
                uppercase
                text-cyan-400
                font-semibold
            "
        >
            AI EXECUTIVE ADVISOR
        </h3>

    </div>

    <div className="px-3">

        <AdvisorRecommendation />

    </div>

    <div className="flex-1" />

    <div className="px-3 pb-3">

        <AdvisorFooter />

    </div>

</section>

    );
};

export default ExecutiveAdvisor;