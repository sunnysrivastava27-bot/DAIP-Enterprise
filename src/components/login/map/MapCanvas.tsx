import IndiaOutline from "./IndiaOutline";

interface MapCanvasProps {
  children?: React.ReactNode;
}

export default function MapCanvas({ children }: MapCanvasProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",

          /*
           * Keep the canvas natural.
           * Do NOT stretch vertically.
           */
          width: "100%",
          height: "100%",
           transform: "none",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          /*
           * Utilize the unused area below the header.
           * Shift slightly left and upward.
           */
          

          /*
           * Premium enterprise glow.
           */
          background: `
            radial-gradient(
              ellipse at center,
              rgba(0,229,255,.14) 0%,
              rgba(0,229,255,.08) 30%,
              rgba(0,229,255,.03) 55%,
              transparent 82%
            )
          `,

          borderRadius: "50%",

          filter: "saturate(1.25)",
        }}
      >
        <IndiaOutline />

        {children}
      </div>
    </div>
  );
}