import daipLogo from "../../assets/logos/daip-header-logo.png";
import emblem from "../../assets/logos/government-emblem.png";

export default function Header() {
  return (
    <header
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 128,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(2, 10, 24, 0.85) 0%, rgba(2, 12, 26, 0.7) 55%, rgba(3, 18, 35, 0.35) 100%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes travelGlow {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.25;
          }
          50% {
            transform: translateX(102px);
            opacity: 0.78;
          }
        }
      `}</style>

      <img
        src={daipLogo}
        alt="DAIP"
        style={{
          position: "absolute",
          left: 48,
          top: 24,
          width: 260,
          height: "auto",
          objectFit: "contain",
          objectPosition: "left center",
          pointerEvents: "auto",
          filter: "drop-shadow(0 16px 34px rgba(2, 12, 27, 0.38))",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 288,
          top: 24,
          width: 1,
          height: 86,
          background: "rgba(125, 211, 252, 0.26)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 312,
          top: 18,
          display: "flex",
          alignItems: "center",
          gap: 24,
          minHeight: 92,
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            minHeight: 92,
            paddingTop: 10,
            paddingBottom: 16,
            paddingLeft: 8,
            paddingRight: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          <img
            src={emblem}
            alt="Government of India"
            style={{
              height: 72,
              width: "auto",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
              opacity: 0.96,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            minWidth: 160,
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.95)",
              fontFamily: "Segoe UI, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "1.5px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              whiteSpace: "pre-line",
            }}
          >
            GOVERNMENT
            OF INDIA
          </div>

          <div
            style={{
              position: "relative",
              width: 110,
              height: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                height: 2,
                width: 110,
                borderRadius: 999,
                background: "linear-gradient(90deg, #ff9933 0%, #ffb366 100%)",
              }}
            />
            <div
              style={{
                height: 2,
                width: 110,
                borderRadius: 999,
                background: "#ffffff",
              }}
            />
            <div
              style={{
                height: 2,
                width: 110,
                borderRadius: 999,
                background: "#138808",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 10,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.74)",
                boxShadow: "0 0 10px rgba(255,255,255,0.42)",
                animation: "travelGlow 6s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 34,
          width: 760,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#F9FCFF",
            fontFamily: "Segoe UI, sans-serif",
            fontSize: 42,
            fontWeight: 300,
            letterSpacing: "8px",
            whiteSpace: "nowrap",
            textTransform: "uppercase",
          }}
        >
          UNITED • INTELLIGENT • CONNECTED
        </div>

        <div
          style={{
            marginTop: 8,
            color: "#55E7F6",
            fontFamily: "Segoe UI, sans-serif",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Building Smart, Sustainable & Inclusive Urban India
        </div>
      </div>
    </header>
  );
}