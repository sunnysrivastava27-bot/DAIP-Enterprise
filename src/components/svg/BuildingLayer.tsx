import { motion } from "framer-motion";

export default function BuildingLayer() {
  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        {/* =====================================================
            BUILDING GLOW
        ====================================================== */}

        <filter id="buildingGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* =====================================================
            WINDOW GLOW
        ====================================================== */}

        <filter id="windowGlow">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* =====================================================
            GOVERNMENT FACADE
        ====================================================== */}

        <linearGradient id="govFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.65" />
          <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.96" />
        </linearGradient>

        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#CFFAFE" />
          <stop offset="100%" stopColor="#155E75" />
        </linearGradient>
      </defs>

      {/* =====================================================
          EXECUTIVE GOVERNMENT COMPLEX
      ====================================================== */}

      <g filter="url(#buildingGlow)">

        {/* LEFT WING */}

        <polygon
          points="360,255 470,205 470,455 360,505"
          fill="url(#govFront)"
          stroke="#22D3EE"
          strokeWidth="1.5"
        />

        {/* RIGHT WING */}

        <polygon
          points="730,205 840,255 840,505 730,455"
          fill="url(#govFront)"
          stroke="#22D3EE"
          strokeWidth="1.5"
        />

        {/* CENTER BLOCK */}

        <polygon
          points="470,160 730,160 730,455 470,455"
          fill="url(#govFront)"
          stroke="#7DD3FC"
          strokeWidth="2.2"
        />

        {/* ROOF */}

        <polygon
          points="430,132 770,132 730,160 470,160"
          fill="#0EA5E9"
          opacity=".45"
        />

        {/* FRONT PLATFORM */}

        <polygon
          points="480,455 720,455 780,500 420,500"
          fill="#071827"
          opacity=".92"
        />

        {/* MAIN ENTRANCE */}

        <rect
          x="565"
          y="315"
          width="70"
          height="140"
          rx="3"
          fill="url(#glass)"
        />

      </g>

      {/* =====================================================
          EXECUTIVE BEACON
      ====================================================== */}

      <motion.circle
        cx="600"
        cy="132"
        r="12"
        fill="#7DD3FC"
        animate={{
          opacity: [0.35, 1, 0.35],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
        }}
      />

      {/* =====================================================
          EXECUTIVE PLAZA
      ====================================================== */}

      <polygon
        points="410,500 790,500 930,610 270,610"
        fill="#07111F"
        opacity=".94"
      />

      {/* PLAZA GRID */}

      {Array.from({ length: 22 }).map((_, i) => (

        <line
          key={i}
          x1={290 + i * 30}
          y1={610}
          x2={430 + i * 17}
          y2={500}
          stroke="#38BDF8"
          strokeOpacity=".10"
        />

      ))}
	        {/* =====================================================
          EXECUTIVE BOULEVARD
      ====================================================== */}

      <polygon
        points="535,610 665,610 715,700 485,700"
        fill="#081220"
      />

      <line
        x1="600"
        y1="610"
        x2="600"
        y2="700"
        stroke="#22D3EE"
        strokeDasharray="10 8"
        strokeWidth="2"
        opacity=".45"
      />

      {/* =====================================================
          INSTITUTIONAL DISTRICT (WEST)
      ====================================================== */}

      {[0, 1, 2, 3].map((i) => (

        <g
          key={`inst-left-${i}`}
          transform={`translate(${165 + i * 72},${345 - i * 14})`}
        >

          <polygon
            points="0,38 46,14 46,125 0,150"
            fill="#163C59"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />

          <polygon
            points="46,14 92,38 92,150 46,125"
            fill="#21587A"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />

          <polygon
            points="0,38 46,14 92,38 46,60"
            fill="#67E8F9"
            opacity=".30"
          />

        </g>

      ))}

      {/* =====================================================
          INSTITUTIONAL DISTRICT (EAST)
      ====================================================== */}

      {[0, 1, 2, 3].map((i) => (

        <g
          key={`inst-right-${i}`}
          transform={`translate(${945 + i * 72},${345 - i * 14})`}
        >

          <polygon
            points="0,38 46,14 46,125 0,150"
            fill="#163C59"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />

          <polygon
            points="46,14 92,38 92,150 46,125"
            fill="#21587A"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />

          <polygon
            points="0,38 46,14 92,38 46,60"
            fill="#67E8F9"
            opacity=".30"
          />

        </g>

      ))}

      {/* =====================================================
          COMMERCIAL DISTRICT (WEST)
      ====================================================== */}

      {[0, 1, 2, 3, 4].map((i) => (

        <g
          key={`commercial-west-${i}`}
          transform={`translate(${35 + i * 56},${500 - i * 8})`}
        >

          <polygon
            points="0,28 32,12 32,105 0,122"
            fill="#14532D"
            stroke="#34D399"
            strokeWidth="1"
          />

          <polygon
            points="32,12 64,28 64,122 32,105"
            fill="#0F766E"
            stroke="#34D399"
            strokeWidth="1"
          />

          <polygon
            points="0,28 32,12 64,28 32,42"
            fill="#6EE7B7"
            opacity=".35"
          />

        </g>

      ))}

      {/* =====================================================
          COMMERCIAL DISTRICT (EAST)
      ====================================================== */}

      {[0, 1, 2, 3, 4].map((i) => (

        <g
          key={`commercial-east-${i}`}
          transform={`translate(${940 + i * 56},${500 - i * 8})`}
        >

          <polygon
            points="0,28 32,12 32,105 0,122"
            fill="#14532D"
            stroke="#34D399"
            strokeWidth="1"
          />

          <polygon
            points="32,12 64,28 64,122 32,105"
            fill="#0F766E"
            stroke="#34D399"
            strokeWidth="1"
          />

          <polygon
            points="0,28 32,12 64,28 32,42"
            fill="#6EE7B7"
            opacity=".35"
          />

        </g>

      ))}

      {/* =====================================================
          RESIDENTIAL DISTRICT
      ====================================================== */}

      {[
        [170, 610],
        [255, 640],
        [355, 615],
        [765, 615],
        [865, 640],
        [960, 610],
      ].map(([x, y], index) => (

        <g
          key={index}
          transform={`translate(${x},${y})`}
        >

          <polygon
            points="0,18 22,6 44,18 22,32"
            fill="#A5F3FC"
            opacity=".45"
          />

          <polygon
            points="0,18 22,6 22,62 0,76"
            fill="#1E3A5F"
          />

          <polygon
            points="22,6 44,18 44,76 22,62"
            fill="#3B82A6"
          />

        </g>

      ))}
	        {/* =====================================================
          WINDOW LIGHTS
      ====================================================== */}

      {Array.from({ length: 14 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, col) => (

          <motion.rect
            key={`${row}-${col}`}
            x={500 + col * 26}
            y={185 + row * 18}
            width="11"
            height="9"
            rx="1.5"
            fill="#A5F3FC"
            filter="url(#windowGlow)"
            animate={{
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: 3,
              delay: (row + col) * 0.08,
              repeat: Infinity,
            }}
          />

        ))
      )}

      {/* =====================================================
          CENTRAL PARKS
      ====================================================== */}

      {[
        [450, 575],
        [750, 575],
        [400, 635],
        [800, 635],
      ].map(([cx, cy], index) => (

        <g key={index}>

          <circle
            cx={cx}
            cy={cy}
            r="28"
            fill="#14532D"
            opacity=".65"
          />

          <circle
            cx={cx}
            cy={cy}
            r="14"
            fill="#4ADE80"
            opacity=".78"
          />

        </g>

      ))}

      {/* =====================================================
          WATER BODY
      ====================================================== */}

      <ellipse
        cx="1035"
        cy="645"
        rx="135"
        ry="42"
        fill="#0284C7"
        opacity=".16"
      />

      <ellipse
        cx="1035"
        cy="645"
        rx="112"
        ry="30"
        fill="#38BDF8"
        opacity=".24"
      />

      {/* =====================================================
          CITY AMBIENT GLOW
      ====================================================== */}

      <ellipse
        cx="600"
        cy="455"
        rx="470"
        ry="230"
        fill="#22D3EE"
        opacity=".06"
      />

      <ellipse
        cx="600"
        cy="455"
        rx="340"
        ry="165"
        fill="#67E8F9"
        opacity=".09"
      />

      {/* =====================================================
          BUILDING SHADOW
      ====================================================== */}

      <ellipse
        cx="600"
        cy="480"
        rx="245"
        ry="46"
        fill="#000000"
        opacity=".28"
      />

      {/* =====================================================
          EXECUTIVE ENERGY CORE
      ====================================================== */}

      <motion.circle
        cx="600"
        cy="315"
        r="20"
        fill="#7DD3FC"
        animate={{
          opacity: [0.3, 1, 0.3],
          r: [18, 25, 18],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.circle
        cx="600"
        cy="315"
        r="48"
        fill="none"
        stroke="#22D3EE"
        strokeWidth="2"
        strokeOpacity=".30"
        animate={{
          r: [46, 58, 46],
          opacity: [0.2, 0.55, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </motion.svg>
  );
}
