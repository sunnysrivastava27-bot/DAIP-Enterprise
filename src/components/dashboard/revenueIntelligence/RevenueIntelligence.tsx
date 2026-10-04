import React from "react";
import { Landmark } from "lucide-react";

import ExecutiveCard from "../executive/ExecutiveCard";
import ExecutiveCardHeader from "../executive/ExecutiveCardHeader";
import ExecutiveCardContent from "../executive/ExecutiveCardContent";
import ExecutiveCardFooter from "../executive/ExecutiveCardFooter";

const RevenueIntelligence: React.FC = () => {
    return (
        <ExecutiveCard>

            <ExecutiveCardHeader
                title="REVENUE INTELLIGENCE"
                icon={Landmark}
                color="text-emerald-400"
                bgColor="bg-emerald-500/10"
                borderColor="border-emerald-400/20"
            />

            <ExecutiveCardContent
                hero={{
                    label: "Today's Revenue",
                    value: "₹2.84 Cr",
                    change: "▲ 12% vs Yesterday",
                }}

                metrics={[
                    {
                        label: "Collection Efficiency",
                        value: "94%",
                        valueColor: "text-emerald-400",
                    },
                    {
                        label: "Outstanding",
                        value: "₹128 Cr",
                        valueColor: "text-amber-400",
                    },
                    {
                        label: "Top Revenue Source",
                        value: "Property Tax",
                        valueColor: "text-cyan-400",
                    },
                ]}

                info={{
                    label: "Revenue Status",
                    value: "ON TRACK",
                }}
            />

            <ExecutiveCardFooter
                leftLabel="Updated"
                leftValue="2 min ago"
                rightLabel="Data Quality"
                rightValue="98%"
            />

        </ExecutiveCard>
    );
};

export default RevenueIntelligence;