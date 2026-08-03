import DecisionHeader from "./sections/DecisionHeader";
import ExecutiveSummary from "./sections/ExecutiveSummary";
import DecisionQueue from "./sections/DecisionQueue";
import RiskAssessment from "./sections/RiskAssessment";
import PredictiveAnalytics from "./sections/PredictiveAnalytics";
import LiveMonitoring from "./sections/LiveMonitoring";
import AIRecommendations from "./sections/AIRecommendations";
import DecisionConfidence from "./sections/DecisionConfidence";
import AIEngineHealth from "./sections/AIEngineHealth";

export default function DecisionIntelligence() {
  return (
    <section className="space-y-8">

      <DecisionHeader />

      <ExecutiveSummary />

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <DecisionQueue />

        <RiskAssessment />

      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <PredictiveAnalytics />

        <LiveMonitoring />

      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <AIRecommendations />

        <DecisionConfidence />

      </div>

      <AIEngineHealth />

    </section>
  );
}