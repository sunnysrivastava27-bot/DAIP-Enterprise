export default function AuthorityBoundary() {
  return (
    <svg
    viewBox="120 40 900 650"
      preserveAspectRatio="xMidYMid meet"
      style={{
    width: "100%",
    height: "100%",
    display: "block",
}}
    >
      {/* Background Glow */}

      <defs>
        <radialGradient id="bgGlow">
          <stop offset="0%" stopColor="#18D7FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#071A2F" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="road">
          <stop offset="0%" stopColor="#18D7FF" />
          <stop offset="100%" stopColor="#44E6FF" />
        </linearGradient>

        <filter id="shadow">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Background */}

      <rect
        width="1200"
        height="700"
        fill="#081C33"
      />

      <circle
        cx="600"
        cy="350"
        r="260"
        fill="url(#bgGlow)"
      />

      {/* Authority Boundary */}

      <path
        d="
        M220 170
        L420 90
        L670 120
        L920 220
        L980 420
        L860 600
        L610 640
        L360 600
        L220 470
        L170 320
        Z
        "
        fill="rgba(27,110,170,.10)"
        stroke="#36D8FF"
        strokeWidth="2"
      />

      {/* Sector Boundaries */}

      <line
        x1="350"
        y1="180"
        x2="770"
        y2="520"
        stroke="#15496B"
      />

      <line
        x1="560"
        y1="110"
        x2="520"
        y2="620"
        stroke="#15496B"
      />

      <line
        x1="260"
        y1="420"
        x2="910"
        y2="300"
        stroke="#15496B"
      />

      {/* Roads */}

      <path
        d="M260 300 L520 250 L730 330 L900 260"
        stroke="url(#road)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M350 500 L520 420 L720 500"
        stroke="url(#road)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Project Nodes */}

      <circle
        cx="430"
        cy="260"
        r="8"
        fill="#44E6FF"
      />

      <circle
        cx="620"
        cy="430"
        r="8"
        fill="#44E6FF"
      />

      <circle
        cx="770"
        cy="310"
        r="8"
        fill="#44E6FF"
      />

      {/* Revenue */}

      <circle
        cx="560"
        cy="250"
        r="9"
        fill="#FFD84A"
      />

      {/* Encroachment */}

      <circle
        cx="760"
        cy="470"
        r="9"
        fill="#FF6262"
      />

      {/* AI Hotspot */}

      <circle
        cx="600"
        cy="350"
        r="18"
        fill="#18D7FF"
        opacity=".45"
        filter="url(#shadow)"
      />

      <circle
        cx="600"
        cy="350"
        r="8"
        fill="#18D7FF"
      />
    </svg>
  );
}