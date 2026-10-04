import { Routes, Route } from "react-router-dom";

import LoginPageV2 from "./pages/LoginPageV2";
import ChairmanDashboardV2 from "./pages/ChairmanDashboardV2";
import ChairmanDashboardV3 from "./pages/ChairmanDashboardV3";

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPageV2 />} />

      {/* Existing Dashboard */}
      <Route
        path="/dashboard"
        element={<ChairmanDashboardV2 />}
      />

      {/* New Enterprise V3 */}
      <Route
        path="/dashboard-v3"
        element={<ChairmanDashboardV3 />}
      />
    </Routes>
  );
}