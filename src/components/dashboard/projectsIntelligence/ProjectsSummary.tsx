import React from "react";
import { Briefcase } from "lucide-react";

import ExecutiveCard from "../executive/ExecutiveCard";
import ExecutiveCardHeader from "../executive/ExecutiveCardHeader";
import ExecutiveCardContent from "../executive/ExecutiveCardContent";
import ExecutiveCardFooter from "../executive/ExecutiveCardFooter";

const ProjectsSummary: React.FC = () => {
    return (
        <ExecutiveCard>

            <ExecutiveCardHeader
                title="PROJECTS INTELLIGENCE"
                icon={Briefcase}
                color="text-violet-400"
                bgColor="bg-violet-500/10"
                borderColor="border-violet-400/20"
            />

            <ExecutiveCardContent
                hero={{
                    label: "TEST CARD",
                    value: "9999",
                    change: "▲ 8 completed this week",
                }}

                metrics={[
                    {
                        label: "On Schedule",
                        value: "82%",
                        valueColor: "text-emerald-400",
                    },
                    {
                        label: "Delayed",
                        value: "11",
                        valueColor: "text-amber-400",
                    },
                ]}

                info={{
                    label: "PRIORITY PROJECT",
                    value: "Metro Corridor Phase II",
                }}
            />

            <ExecutiveCardFooter
                leftLabel="Updated"
                leftValue="5 min ago"
                rightLabel="Progress"
                rightValue="82%"
            />

        </ExecutiveCard>
    );
};

export default ProjectsSummary;