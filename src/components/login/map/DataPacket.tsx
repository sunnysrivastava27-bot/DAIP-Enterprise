import { useEffect, useState } from "react";

interface DataPacketProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  color?: string;
  duration?: number;
}

export default function DataPacket({
  startX,
  startY,
  endX,
  endY,
  delay = 0,
  color = "#00E5FF",
  duration = 6500,
}: DataPacketProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const startTime = performance.now() + delay * 600;

    const animate = (time: number) => {
      if (time < startTime) {
        frame = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (time - startTime) % duration;
      setProgress(elapsed / duration);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [duration, delay]);

  const x = startX + (endX - startX) * progress;
  const y = startY + (endY - startY) * progress;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: `radial-gradient(circle, #ffffff 0%, ${color} 35%, rgba(0, 229, 255, 0.22) 100%)`,
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow:`0 0 6px ${color},0 0 14px ${color}`,
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: `rgba(0, 229, 255, 0.10)`,
          filter: "blur(5px)",
          pointerEvents: "none",
          zIndex: 45,
        }}
      />
    </>
  );
}