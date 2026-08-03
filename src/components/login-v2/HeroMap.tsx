import OldHeroMap from "../login/HeroMap";

export default function HeroMap() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OldHeroMap />
    </div>
  );
}