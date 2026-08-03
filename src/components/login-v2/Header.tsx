import daipLogo from "../../assets/logos/daip-header-logo.png";
import emblem from "../../assets/logos/government-emblem.png";

export default function Header() {
  return (
    <>
      <style>{`

      *{
        box-sizing:border-box;
      }

      @keyframes travelGlow{

        0%{
          left:0;
          opacity:.35;
        }

        50%{
          left:145px;
          opacity:1;
        }

        100%{
          left:0;
          opacity:.35;
        }

      }

      @keyframes titleGlow{

        0%,100%{
          text-shadow:
            0 0 6px rgba(39,231,245,.08);
        }

        50%{
          text-shadow:
            0 0 18px rgba(39,231,245,.28);
        }

      }

      `}</style>

      <header
        style={{

          width:"100%",

          height:132,

          padding:"8px 28px 10px 22px",

          display:"grid",

          gridTemplateColumns:"285px 320px 1fr",

          alignItems:"center",

          columnGap:22,

          overflow:"hidden",

        }}
      >
	          {/* =========================================================
            COLUMN 1 : DAIP BRAND
        ========================================================== */}

        
        {/* =========================================================
    COLUMN 1 : DAIP BRAND
========================================================== */}

<div
  style={{
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
  }}
>
  {/* DAIP Logo */}

  <img
    src={daipLogo}
    alt="DAIP"
    draggable={false}
    style={{
      position: "relative",

      left: -44,

      top: -32,

      width: 310,

      height: "auto",

      objectFit: "contain",

      display: "block",

      userSelect: "none",

      filter:
        "drop-shadow(0 10px 26px rgba(0,180,255,.18))",
    }}
  />

  {/* Divider */}

  <div
    style={{
      position: "absolute",

      left: 200,

      top: -2,

      width: 2,

      height: 98,

      borderRadius: 10,

      background:
        "linear-gradient(to bottom,rgba(255,255,255,.65),rgba(255,255,255,.12))",
    }}
  />
</div>
		        {/* =========================================================
            COLUMN 2 : GOVERNMENT OF INDIA
        ========================================================== */}

        <div
  style={{
    position: "relative",

    left: -95,
    top: 16,

    height: "100%",

    display: "flex",

    flexDirection: "column",

    justifyContent: "flex-start",

    alignItems: "flex-start",
  }}
>
          {/* Emblem + Text */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <img
              src={emblem}
              alt="Government of India"
              draggable={false}
              style={{
                width: 60,
                height: 60,
                objectFit: "contain",
                display: "block",
                userSelect: "none",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.15,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color:"#FFFFFF",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                Government of
              </span>

              <span
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color:"#FFFFFF",
                  letterSpacing: ".02em",
                }}
              >
                India
              </span>
            </div>
          </div>

          {/* Animated Tricolor Ribbon */}

         {/* Animated Tricolor Ribbon */}

<div
  style={{
    position: "relative",

    marginTop: 6,

    marginLeft: 64, // Starts below "Government of India"

    width: 170,

    height: 2,

    borderRadius: 20,

    overflow: "hidden",

    background: "rgba(255,255,255,.15)",
  }}
>
  {/* Tricolor Strip */}

  <div
    style={{
      width: "100%",

      height: "100%",

      borderRadius: 20,

      background:
        "linear-gradient(90deg,#FF9933 0%,#FFFFFF 50%,#138808 100%)",
    }}
  />

  {/* Moving Glow */}

  <div
    style={{
      position: "absolute",

      top: -2,

      left: 0,

      width: 24,

      height: 6,

      borderRadius: 20,

      background: "rgba(255,255,255,.95)",

      filter: "blur(4px)",

      animation: "travelGlow 3.2s linear infinite",
    }}
  />
</div>
        </div>
		        {/* =========================================================
            COLUMN 3 : EXECUTIVE COMMAND CENTER
        ========================================================== */}

        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: 4,
            alignItems: "flex-start",
            overflow: "hidden",
          }}
        >
          {/* Main Title */}

      

          {/* Tagline */}

          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#0EA5E9",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              UNITED
            </span>

            <span
              style={{
                color: "#CBD5E1",
                fontSize: 14,
              }}
            >
              •
            </span>

            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#10B981",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              INTELLIGENT
            </span>

            <span
              style={{
                color: "#CBD5E1",
                fontSize: 14,
              }}
            >
              •
            </span>

            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#F97316",
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              CONNECTED
            </span>
          </div>

          {/* Subtitle */}

          <div
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 500,
              color:"rgba(255,255,255,.92)",
              letterSpacing: ".02em",
            }}
          >
            Building Smart, Sustainable & Citizen-Centric Development Authorities
          </div>
        </div>
		      </header>
    </>
  );
}