import { useEffect, useState } from "react";
import { cities } from "./CitiesData";
import { networkRoutes } from "./NetworkData";

interface AnimatedLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  speed?: number;
  priority?: "national" | "state" | "regional";
}

function AnimatedLine({
  startX,
  startY,
  endX,
  endY,
  speed = 1,
  priority = "regional",
}: AnimatedLineProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame: number;
    let last = performance.now();

    const animate = (time: number) => {
      const delta = time - last;
      last = time;

      setOffset((value) => (value + delta * 0.012 * speed) % 60);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [speed]);

  // Enterprise line widths
  const strokeWidth =
    priority === "national"
      ? 0.75
      : priority === "state"
      ? 0.60
      : 0.45;

  // Very subtle base network
  const baseOpacity =
    priority === "national"
      ? 0.18
      : priority === "state"
      ? 0.12
      : 0.08;

  return (
    <>
      {/* Static Network */}
      <line
        x1={`${startX}%`}
        y1={`${startY}%`}
        x2={`${endX}%`}
        y2={`${endY}%`}
        stroke={`rgba(120,220,255,${baseOpacity})`}
        strokeWidth={strokeWidth}
      />

      {/* Moving Data */}
      <line
        x1={`${startX}%`}
        y1={`${startY}%`}
        x2={`${endX}%`}
        y2={`${endY}%`}
        stroke="url(#flowGradient)"
        strokeWidth={strokeWidth + 0.08}
        strokeLinecap="round"
        strokeDasharray="3 44"
        strokeDashoffset={-offset}
        filter="url(#flowGlow)"
      />
    </>
  );
}

export default function NetworkLines() {
  const findCity = (name: string) =>
    cities.find((city) => city.city === name);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient
          id="flowGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#3EDCFF" />
          <stop offset="45%" stopColor="#BDF7FF" />
          <stop offset="100%" stopColor="#3EDCFF" />
        </linearGradient>

        <filter
          id="flowGlow"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur
            stdDeviation="0.08"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {networkRoutes.map((route) => {
        const fromCity = findCity(route.from);
        const toCity = findCity(route.to);

        if (!fromCity || !toCity) return null;

        return (
          <AnimatedLine
            key={route.id}
            startX={fromCity.x}
            startY={fromCity.y}
            endX={toCity.x}
            endY={toCity.y}
            speed={route.flowSpeed}
            priority={route.priority}
          />
        );
      })}
    </svg>
  );
}