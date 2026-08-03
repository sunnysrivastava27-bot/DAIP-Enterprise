export default function GISLegend() {
  const Item = ({
    color,
    text,
  }: {
    color: string;
    text: string;
  }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
        }}
      />

      <span
        style={{
          color: "#A7C0D9",
          fontSize: 13,
        }}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 22,
        padding: "14px 24px",
      }}
    >
      <Item color="#33D8FF" text="Projects" />
      <Item color="#FFD54A" text="Revenue" />
      <Item color="#52F287" text="Completed" />
      <Item color="#FF6A6A" text="Critical Alerts" />
    </div>
  );
}