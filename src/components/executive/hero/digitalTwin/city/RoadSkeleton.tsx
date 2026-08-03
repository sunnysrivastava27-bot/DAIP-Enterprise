export default function RoadSkeleton() {
  return (
    <g>

      {/* ======================================================
          CENTRAL ROTARY
      ======================================================= */}

      <circle
        cx="500"
        cy="330"
        r="38"
        fill="#0C2236"
        stroke="#3DDCFF"
        strokeWidth="5"
      />

      <circle
        cx="500"
        cy="330"
        r="20"
        fill="#6DE8FF"
      />

      {/* ======================================================
          NORTH ROAD
      ======================================================= */}

      <path
        d="M500 0 L500 292"
        stroke="#37D7FF"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* ======================================================
          SOUTH ROAD
      ======================================================= */}

      <path
        d="M500 368 L500 650"
        stroke="#37D7FF"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* ======================================================
          WEST ROAD
      ======================================================= */}

      <path
        d="M0 330 L462 330"
        stroke="#37D7FF"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* ======================================================
          EAST ROAD
      ======================================================= */}

      <path
        d="M538 330 L1000 330"
        stroke="#37D7FF"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      {/* ======================================================
          NORTH-WEST CURVE
      ======================================================= */}

      <path
        d="M500 330
           C440 280
             360 220
             250 150"
        stroke="#37D7FF"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* ======================================================
          NORTH-EAST CURVE
      ======================================================= */}

      <path
        d="M500 330
           C560 280
             640 220
             750 150"
        stroke="#37D7FF"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* ======================================================
          SOUTH-WEST CURVE
      ======================================================= */}

      <path
        d="M500 330
           C440 380
             360 450
             250 520"
        stroke="#37D7FF"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

      {/* ======================================================
          SOUTH-EAST CURVE
      ======================================================= */}

      <path
        d="M500 330
           C560 380
             640 450
             750 520"
        stroke="#37D7FF"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />

    </g>
  );
}