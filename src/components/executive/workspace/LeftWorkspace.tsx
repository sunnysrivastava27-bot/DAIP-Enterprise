import React from "react";

import AIExecutiveAdvisor from "../AIExecutiveAdvisor";
import DecisionsRequired from "../DecisionsRequired";
import CityHealth from "../CityHealth";
import OvernightChanges from "../OvernightChanges";
import LiveCitySnapshot from "../hero/LiveCitySnapshot";
import RevenueOpportunity from "../RevenueOpportunity";
import QuickLaunchWorkspace from "../QuickLaunchWorkspace";

const LeftWorkspace: React.FC = () => {
  return (
    <div className="space-y-6">

      <AIExecutiveAdvisor />

      <DecisionsRequired />

      <CityHealth />

      <OvernightChanges />

      <LiveCitySnapshot />

      <RevenueOpportunity />

      <QuickLaunchWorkspace />

    </div>
  );
};

export default LeftWorkspace;