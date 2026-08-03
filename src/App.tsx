import { Routes, Route } from "react-router-dom";

import LoginPageV2 from "./pages/LoginPageV2";
import ChairmanDashboard from "./pages/ChairmanDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPageV2 />} />

      <Route
        path="/dashboard"
        element={<ChairmanDashboard />}
      />
    </Routes>
  );
}