import CityNode from "./CityNode";
import { usePosition } from "./PositionContext";

export default function Cities() {
  const { cities } = usePosition();

  return (
    <>
      {cities.map((city) => (
        <CityNode
          key={city.city}
          city={city.city}
          subtitle={city.subtitle}
          x={city.x}
          y={city.y}
          color={city.color}
          labelOffset={city.labelOffset}
          labelPosition={city.labelPosition}
        />
      ))}
    </>
  );
}