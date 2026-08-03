import Background from "../components/login/Background";
import Header from "../components/login/Header";
import HeroMap from "../components/login/HeroMap";
import LoginCard from "../components/login/LoginCard";
import FeatureBar from "../components/login/FeatureBar";
import DepartmentBar from "../components/login/DepartmentBar";

export default function LoginPage() {
  return (
    <Background>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ================= HEADER ================= */}

        <div
          style={{
            height: 110,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Header />
        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
            padding: "0 40px",
            gap: 40,
          }}
        >
          {/* LEFT SIDE */}

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <HeroMap />
          </div>

          {/* RIGHT SIDE */}

          <div
            style={{
              width: 470,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LoginCard />
          </div>
        </div>

        {/* ================= FEATURE BAR ================= */}

        <div
          style={{
            flexShrink: 0,
          }}
        >
          <FeatureBar />
        </div>

        {/* ================= DEPARTMENT BAR ================= */}

        <div
          style={{
            flexShrink: 0,
          }}
        >
          <DepartmentBar />
        </div>
      </div>
    </Background>
  );
}