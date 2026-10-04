import React from "react";
import { Landmark } from "lucide-react";

import ExecutiveCard from "../executive/ExecutiveCard";
import ExecutiveCardHeader from "../executive/ExecutiveCardHeader";
import ExecutiveCardBody from "../executive/ExecutiveCardBody";
import ExecutiveCardFooter from "../executive/ExecutiveCardFooter";

import ExecutiveHeroMetric from "../executive/ExecutiveHeroMetric";
import ExecutiveMetricRow from "../executive/ExecutiveMetricRow";
import ExecutiveDivider from "../executive/ExecutiveDivider";

const RevenueSummary: React.FC = () => {
    return (
        <ExecutiveCard>

            <ExecutiveCardHeader
                title="REVENUE INTELLIGENCE"
                icon={Landmark}
                color="text-emerald-400"
                bgColor="bg-emerald-500/10"
                borderColor="border-emerald-400/20"
            />

            <ExecutiveCardBody>

                <ExecutiveHeroMetric
                    label="Today's Revenue"
                    value="₹2.84 Cr"
                    change="▲ 12% vs Yesterday"
                />

                <ExecutiveDivider />

                <div className="space-y-2">

                    <ExecutiveMetricRow
                        label="Collection Efficiency"
                        value="94%"
                        valueColor="text-emerald-400"
                    />

                    <ExecutiveMetricRow
                        label="Outstanding"
                        value="₹128 Cr"
                        valueColor="text-amber-400"
                    />

                    <ExecutiveMetricRow
                        label="Top Revenue Source"
                        value="Property Tax"
                        valueColor="text-cyan-400"
                    />

                </div>

            </ExecutiveCardBody>

            <ExecutiveCardFooter
                leftLabel="Updated"
                leftValue="2 min ago"
                rightLabel="Data Quality"
                rightValue="98%"
            />

        </ExecutiveCard>
    );
};

export default RevenueSummary;