import { motion } from "framer-motion";

interface PerspectiveGridProps {
  className?: string;
  opacity?: number;
  glow?: boolean;
  animated?: boolean;
}

export default function PerspectiveGrid({
  className = "",
  opacity = 0.35,
  glow = true,
  animated = true,
}: PerspectiveGridProps) {
  const verticalLines = Array.from({ length: 25 }, (_, i) => i);
  const horizontalLines = Array.from({ length: 18 }, (_, i) => i);

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* =======================================================
              MAIN GRID GLOW
          ======================================================== */}

          <linearGradient
            id="gridFade"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="40%" stopColor="#38bdf8" stopOpacity=".45" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity=".12" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="horizontalFade"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="#38bdf8" />
            <stop offset="90%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <filter
            id="gridGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="floorGlow">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity=".20" />
            <stop offset="55%" stopColor="#38bdf8" stopOpacity=".08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* =======================================================
            FLOOR GLOW
        ======================================================== */}

        {glow && (
          <ellipse
            cx="600"
            cy="610"
            rx="520"
            ry="160"
            fill="url(#floorGlow)"
            opacity={opacity}
          />
        )}

        {/* =======================================================
            HORIZONTAL GRID
        ======================================================== */}

        {horizontalLines.map((line, index) => {
          const y = 650 - index * 26;

          return (
            <line
              key={`h-${line}`}
              x1="110"
              y1={y}
              x2="1090"
              y2={y}
              stroke="url(#horizontalFade)"
              strokeWidth={index === 0 ? 1.8 : 1}
              opacity={opacity * (1 - index * 0.045)}
              filter="url(#gridGlow)"
            />
          );
        })}

        {/* =======================================================
            PERSPECTIVE LINES
        ======================================================== */}

        {verticalLines.map((line) => {
          const x = (1200 / 24) * line;

          return (
            <line
              key={`v-${line}`}
              x1={x}
              y1="700"
              x2="600"
              y2="120"
              stroke="url(#gridFade)"
              strokeWidth=".9"
              opacity={opacity}
              filter="url(#gridGlow)"
            />
          );
        })}
		        {/* =======================================================
            HORIZON LINE
        ======================================================== */}

        <line
          x1="180"
          y1="120"
          x2="1020"
          y2="120"
          stroke="#38bdf8"
          strokeOpacity=".25"
          strokeWidth="1"
          filter="url(#gridGlow)"
        />

        {/* =======================================================
            VANISHING POINT
        ======================================================== */}

        <motion.g
          animate={
            animated
              ? {
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 1, 0.5],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle
            cx="600"
            cy="120"
            r="8"
            fill="#38bdf8"
            opacity=".9"
          />

          <circle
            cx="600"
            cy="120"
            r="18"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity=".35"
            strokeWidth="1"
          />

          <circle
            cx="600"
            cy="120"
            r="32"
            fill="none"
            stroke="#38bdf8"
            strokeOpacity=".15"
            strokeWidth="1"
          />
        </motion.g>

        {/* =======================================================
            SCANNING SWEEP
        ======================================================== */}

        {animated && (
          <motion.rect
            x="0"
            y="0"
            width="1200"
            height="24"
            fill="url(#horizontalFade)"
            opacity=".12"
            animate={{
              y: [80, 650, 80],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}

        {/* =======================================================
            CENTER ENERGY
        ======================================================== */}

        <motion.circle
          cx="600"
          cy="610"
          r="10"
          fill="#38bdf8"
          animate={
            animated
              ? {
                  r: [8, 14, 8],
                  opacity: [0.4, 1, 0.4],
                }
              : {}
          }
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="600"
          cy="610"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          animate={
            animated
              ? {
                  r: [12, 42, 12],
                  opacity: [0.35, 0.05, 0.35],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
