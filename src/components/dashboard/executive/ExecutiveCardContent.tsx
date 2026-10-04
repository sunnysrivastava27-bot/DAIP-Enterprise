import React from "react";

import ExecutiveCardBody from "./ExecutiveCardBody";
import ExecutiveHeroMetric from "./ExecutiveHeroMetric";
import ExecutiveMetricRow from "./ExecutiveMetricRow";
import ExecutiveDivider from "./ExecutiveDivider";
import ExecutiveInfo from "./ExecutiveInfo";

interface MetricRow {
    label: string;
    value: string;
    valueColor?: string;
}

interface ExecutiveCardContentProps {
    hero: {
        label: string;
        value: string;
        change?: string;
        changeColor?: string;
    };

    metrics: MetricRow[];

    info: {
        label: string;
        value: string;
    };
}

const ExecutiveCardContent: React.FC<ExecutiveCardContentProps> = ({
    hero,
    metrics,
    info,
}) => {
    return (
        <ExecutiveCardBody>

            <div
                className="
                    h-full
                    min-h-0
                    flex
                    flex-col
                "
            >

                {/* HERO METRIC */}
                <ExecutiveHeroMetric
                    label={hero.label}
                    value={hero.value}
                    change={hero.change}
                    changeColor={hero.changeColor}
                />

                <ExecutiveDivider />

                {/* SECONDARY METRICS */}
                <div className="flex flex-col gap-1.5">

                    {metrics.map((metric, index) => (
    <ExecutiveMetricRow
        key={metric.label}
        label={metric.label}
        value={metric.value}
        valueColor={metric.valueColor}
        className={index === 2 ? "-mt-1" : ""}
    />
))}

                </div>

                <ExecutiveDivider />

                {/* STATUS */}
                <ExecutiveInfo
                    label={info.label}
                    value={info.value}
                />

            </div>

        </ExecutiveCardBody>
    );
};

export default ExecutiveCardContent;