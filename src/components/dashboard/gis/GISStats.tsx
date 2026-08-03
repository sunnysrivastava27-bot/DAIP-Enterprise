export default function GISStats() {
  const Box = (title: string, value: string) => (
    <div
      style={{
        flex: 1,
        textAlign: "center",
      }}
    >
      <div
        style={{
          color: "#7FA5C6",
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#FFFFFF",
          fontSize: 24,
          fontWeight: 700,
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        padding: "18px 24px 22px",
      }}
    >
      {Box("Projects", "148")}
      {Box("Delayed", "12")}
      {Box("Revenue", "₹42.8Cr")}
      {Box("Complaints", "286")}
    </div>
  );
}