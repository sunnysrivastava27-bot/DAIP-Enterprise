import Background from "../components/login-v2/Background";
import Header from "../components/login-v2/Header";
import HeroMap from "../components/login-v2/HeroMap";
import LoginCard from "../components/login-v2/LoginCard";
import Footer from "../components/login-v2/Footer";

export default function LoginPageV2() {
  return (
    <Background>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ================= HEADER ================= */}

        <div
          style={{
            height: 96,
            flexShrink: 0,
            position: "relative",
            zIndex: 100,
          }}
        >
          <Header />
        </div>

        {/* ================= MAIN ================= */}

        <main
          className="
            flex-1
            min-h-0
            overflow-hidden
            px-9
            pt-0
            pb-2
          "
        >
          <div
            className="
              flex
              h-full
              min-h-0
              items-stretch
              gap-8
            "
          >
            {/* ================= MAP ================= */}

            <section
              className="
                relative
                flex-1
                min-w-0
                min-h-0
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >
              <HeroMap />
            </section>

            {/* ================= LOGIN ================= */}

            <aside
              className="
                w-[430px]
                shrink-0
                flex
                items-start
                justify-center
                pt-2
              "
            >
              <LoginCard />
            </aside>
          </div>
        </main>

        {/* ================= FOOTER ================= */}

        <div
          style={{
            height: 54,
            flexShrink: 0,
          }}
        >
          <Footer />
        </div>
      </div>
    </Background>
  );
}