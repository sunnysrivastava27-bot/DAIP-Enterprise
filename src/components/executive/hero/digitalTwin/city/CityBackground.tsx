export default function CityBackground() {
  return (
    <>
      {/* Background */}

      <rect
        width="1000"
        height="650"
        fill="#07111F"
      />

      {/* Top Glow */}

      <ellipse
        cx="500"
        cy="90"
        rx="420"
        ry="140"
        fill="#0A3A57"
        opacity="0.18"
      />

      {/* Center Glow */}

      <ellipse
        cx="500"
        cy="330"
        rx="280"
        ry="180"
        fill="#00C2FF"
        opacity="0.05"
      />

      {/* Bottom Glow */}

      <ellipse
        cx="500"
        cy="610"
        rx="380"
        ry="90"
        fill="#0B2740"
        opacity="0.22"
      />
    </>
  );
}