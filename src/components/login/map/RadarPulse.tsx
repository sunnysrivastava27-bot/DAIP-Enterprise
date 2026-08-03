import { useEffect, useState } from "react";

interface RadarPulseProps {
  x: number;
  y: number;
  color?: string;
}

export default function RadarPulse({
  x,
  y,
  color = "#FFD54A",
}: RadarPulseProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setRotation((r) => (r + 0.8) % 360);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%,-50%)",
        width: 90,
        height: 90,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* Outer Ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          opacity: 0.15,
        }}
      />

      {/* Middle Ring */}
      <div
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          opacity: 0.22,
        }}
      />

      {/* Inner Ring */}
      <div
        style={{
          position: "absolute",
          inset: 24,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          opacity: 0.35,
        }}
      />

      {/* Rotating Sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `conic-gradient(
              from ${rotation}deg,
              rgba(255,213,74,0.55),
              rgba(255,213,74,0.18),
              transparent 70%
          )`,
        }}
      />
    </div>
  );
}