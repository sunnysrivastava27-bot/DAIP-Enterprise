interface BackgroundProps {
  children: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",

        background: `
          radial-gradient(circle at 30% 50%, rgba(0,180,255,0.18), transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(0,120,255,0.10), transparent 45%),
          linear-gradient(90deg,#03111F 0%,#071E31 45%,#0A2940 100%)
        `,
      }}
    >
      {/* Grid Overlay */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {children}
    </div>
  );
}