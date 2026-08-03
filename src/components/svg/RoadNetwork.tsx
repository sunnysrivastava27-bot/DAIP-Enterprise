import { motion } from "framer-motion";

interface RoadNetworkProps {
  className?: string;
  opacity?: number;
  animated?: boolean;
}

export default function RoadNetwork({
  className = "",
  opacity = 0.9,
  animated = true,
}: RoadNetworkProps) {
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
          {/* =====================================================
              ROAD GLOW
          ===================================================== */}

          <filter
            id="roadGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient
            id="roadStroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stopColor="#0ea5e9"
              stopOpacity="0"
            />

            <stop
              offset="15%"
              stopColor="#38bdf8"
            />

            <stop
              offset="85%"
              stopColor="#38bdf8"
            />

            <stop
              offset="100%"
              stopColor="#0ea5e9"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* =====================================================
            PRIMARY RING ROAD
        ===================================================== */}

        <path
          d="
             M250 520
             C350 440 470 400 600 390
             C730 400 850 440 950 520
          "
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity={opacity}
          filter="url(#roadGlow)"
        />

        {/* =====================================================
            NORTH CONNECTOR
        ===================================================== */}

        <path
          d="
             M600 390
             L600 210
          "
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={opacity}
          filter="url(#roadGlow)"
        />

        {/* =====================================================
            EAST CONNECTOR
        ===================================================== */}

        <path
          d="
             M760 430
             C840 400 905 360 980 280
          "
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity={opacity}
          filter="url(#roadGlow)"
        />

        {/* =====================================================
            WEST CONNECTOR
        ===================================================== */}

        <path
          d="
             M440 430
             C360 400 295 360 220 280
          "
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity={opacity}
          filter="url(#roadGlow)"
        />

        {/* =====================================================
            SOUTH CONNECTOR
        ===================================================== */}

        <path
          d="
             M600 390
             L600 610
          "
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={opacity}
          filter="url(#roadGlow)"
        />
		        {/* =====================================================
            SECONDARY ROADS
        ===================================================== */}

        <path
          d="M350 470 L470 340"
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={opacity * 0.75}
          filter="url(#roadGlow)"
        />

        <path
          d="M730 340 L850 470"
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={opacity * 0.75}
          filter="url(#roadGlow)"
        />

        <path
          d="M470 520 L600 450 L730 520"
          fill="none"
          stroke="url(#roadStroke)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={opacity * 0.7}
          filter="url(#roadGlow)"
        />

        {/* =====================================================
            INTERSECTIONS
        ===================================================== */}

        {[
          [600, 390],
          [440, 430],
          [760, 430],
          [600, 520],
          [470, 340],
          [730, 340],
        ].map(([cx, cy], index) => (
          <g key={index}>
            <circle
              cx={cx}
              cy={cy}
              r="5"
              fill="#38bdf8"
              opacity={0.9}
            />

            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="none"
              stroke="#38bdf8"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* =====================================================
            DATA FLOW
        ===================================================== */}

        {animated && (
          <>
            <motion.circle
              r="4"
              fill="#67e8f9"
              animate={{
                offsetDistance: ["0%", "100%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="
                  M250 520
                  C350 440 470 400 600 390
                  C730 400 850 440 950 520
                "
              />
            </motion.circle>

            <motion.circle
              r="4"
              fill="#67e8f9"
            >
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M600 610 L600 210"
              />
            </motion.circle>
          </>
        )}
      </svg>
    </motion.div>
  );
}
