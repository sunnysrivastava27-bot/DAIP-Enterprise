interface CoordinateHelperProps {
  onMove?: (x: number, y: number) => void;
}

export default function CoordinateHelper({
  onMove,
}: CoordinateHelperProps) {
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = Number(
          (((e.clientX - rect.left) / rect.width) * 100).toFixed(1)
        );

        const y = Number(
          (((e.clientY - rect.top) / rect.height) * 100).toFixed(1)
        );

        onMove?.(x, y);
      }}
      style={{
        position: "absolute",
        inset: 0,
        cursor: "crosshair",
        zIndex: 500,
      }}
    />
  );
}