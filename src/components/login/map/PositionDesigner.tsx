import { useState } from "react";
import { usePosition } from "./PositionContext";

export default function PositionDesigner() {
  const { cities, updateCity } = usePosition();

  const [selectedCity, setSelectedCity] = useState(cities[0]?.city ?? "");
  const [step, setStep] = useState(0.5);

  const selected = cities.find((c) => c.city === selectedCity);

  if (!selected) return null;

  const move = (dx: number, dy: number) => {
    updateCity(
      selected.city,
      Number((selected.x + dx).toFixed(2)),
      Number((selected.y + dy).toFixed(2))
    );
  };

  const copyCoordinates = async () => {
    const text = `{ city: "${selected.city}", x: ${selected.x}, y: ${selected.y} }`;

    await navigator.clipboard.writeText(text);

    alert("Coordinates copied.");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        width: 280,
        padding: 16,
        background: "#0f172a",
        color: "white",
        borderRadius: 12,
        zIndex: 99999,
        pointerEvents: "auto",
        boxShadow: "0 0 25px rgba(0,0,0,.45)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h3 style={{ marginBottom: 12 }}>
        DAIP Position Designer
      </h3>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 12,
          color: "#000",
        }}
      >
        {cities.map((city) => (
          <option key={city.city} value={city.city}>
            {city.city}
          </option>
        ))}
      </select>

      <div style={{ marginBottom: 8 }}>
        X : {selected.x}
      </div>

      <div style={{ marginBottom: 16 }}>
        Y : {selected.y}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 6,
          marginBottom: 16,
        }}
      >
        <div />

        <button onClick={() => move(0, -step)}>
          ↑
        </button>

        <div />

        <button onClick={() => move(-step, 0)}>
          ←
        </button>

        <button onClick={() => move(step, 0)}>
          →
        </button>

        <div />

        <button onClick={() => move(0, step)}>
          ↓
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Step</label>

        <select
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{
            width: "100%",
            padding: 8,
            marginTop: 6,
            color: "#000",
          }}
        >
          <option value={0.1}>0.1</option>
          <option value={0.5}>0.5</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </div>

      <button
        onClick={copyCoordinates}
        style={{
          width: "100%",
          padding: 10,
          cursor: "pointer",
        }}
      >
        Copy Coordinates
      </button>
    </div>
  );
}