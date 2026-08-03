import indiaOutline from "../../../assets/maps/india-outline.svg";

export default function IndiaOutline() {
  return (
    <img
      src={indiaOutline}
      alt="India"
      draggable={false}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        pointerEvents: "none",
        userSelect: "none",
        filter: `
          drop-shadow(0 0 10px #00BFFF)
          drop-shadow(0 0 30px #00BFFF)
          drop-shadow(0 0 60px #0088FF)
        `,
      }}
    />
  );
}