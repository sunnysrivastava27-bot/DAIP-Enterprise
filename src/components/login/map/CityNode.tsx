import type { LabelOffset } from "./CitiesData";

export type LabelPosition = "left" | "right" | "top" | "bottom";

interface CityNodeProps {
  x: number;
  y: number;
  city: string;
  subtitle: string;
  color: string;
  labelOffset: LabelOffset;
  labelPosition: LabelPosition;
}

export default function CityNode({
  x,
  y,
  city,
  subtitle,
  color,
  labelOffset,
  labelPosition,
}: CityNodeProps) {
  const getLabelStyle = () => {
    const base = {
      position: "absolute" as const,
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      padding: "6px 10px",
      borderRadius: 10,
      background:
        "linear-gradient(180deg, rgba(8,24,44,.78), rgba(5,18,34,.62))",
      border: "1px solid rgba(120,210,255,.16)",
      backdropFilter: "blur(10px)",
      boxShadow:
        "0 12px 28px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05)",
    };

    switch (labelPosition) {
      case "left":
        return {
          ...base,
          right: `${Math.abs(labelOffset.x)}px`,
          top: `${labelOffset.y}px`,
          transform: "translateY(-50%)",
          textAlign: "right" as const,
        };

      case "top":
        return {
          ...base,
          left: `${labelOffset.x}px`,
          bottom: `${Math.abs(labelOffset.y)}px`,
          transform: "translateX(-50%)",
          textAlign: "center" as const,
        };

      case "bottom":
        return {
          ...base,
          left: `${labelOffset.x}px`,
          top: `${labelOffset.y}px`,
          transform: "translateX(-50%)",
          textAlign: "center" as const,
        };

      default:
        return {
          ...base,
          left: `${labelOffset.x}px`,
          top: `${labelOffset.y}px`,
          transform: "translateY(-50%)",
          textAlign: "left" as const,
        };
    }
  };

  return (
    <>
      <style>{`
        @keyframes nodePulse {

          0%{
            transform:translate(-50%,-50%) scale(1);
            opacity:.30;
          }

          50%{
            transform:translate(-50%,-50%) scale(1.8);
            opacity:.08;
          }

          100%{
            transform:translate(-50%,-50%) scale(1);
            opacity:.30;
          }

        }

        @keyframes coreBlink{

          0%,100%{
            transform:scale(1);
          }

          50%{
            transform:scale(1.2);
          }

        }

      `}</style>

      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
	          {/* Pulse */}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: color,
            filter: "blur(22px)",
            animation: "nodePulse 2.6s ease-in-out infinite",
          }}
        />

        {/* Halo */}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 42,
            height: 42,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            border: `1px solid ${color}55`,
          }}
        />

        {/* Node */}

        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5,20,36,.95)",
            boxShadow: `
              0 0 18px ${color},
              0 0 36px ${color}55
            `,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: color,
              animation: "coreBlink 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Label */}

        <div style={getLabelStyle()}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent:
                labelPosition === "left" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 10px ${color}`,
                order: labelPosition === "left" ? 2 : 1,
              }}
            />

            <div
              style={{
                color: "#F8FCFF",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: ".2px",
                order: labelPosition === "left" ? 1 : 2,
              }}
            >
              {city}
            </div>
          </div>

          <div
            style={{
              marginTop: 4,
              color: "#8FCBFF",
              fontSize: 10,
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </>
  );
}