import { cities } from "./CitiesData";
import { networkRoutes } from "./NetworkData";

export interface PacketRoute {
  from: string;
  to: string;

  startX: number;
  startY: number;

  endX: number;
  endY: number;

  delay: number;

  flowSpeed: number;
}

const packetRoutes: PacketRoute[] = [];

const findCity = (cityName: string) =>
  cities.find((city) => city.city === cityName);

networkRoutes.forEach((route) => {

  const fromCity = findCity(route.from);
  const toCity = findCity(route.to);

  if (!fromCity || !toCity) {
    console.warn(
      `Network route skipped: ${route.from} → ${route.to}`
    );
    return;
  }

  // Forward packet

  packetRoutes.push({
    from: route.from,
    to: route.to,

    startX: fromCity.x,
    startY: fromCity.y,

    endX: toCity.x,
    endY: toCity.y,

    delay: route.packetDelay ?? 0,
    flowSpeed: route.flowSpeed ?? 1,
  });

  // Reverse packet

  if (route.bidirectional) {

    packetRoutes.push({

      from: route.to,
      to: route.from,

      startX: toCity.x,
      startY: toCity.y,

      endX: fromCity.x,
      endY: fromCity.y,

      delay: (route.packetDelay ?? 0) + 0.45,
      flowSpeed: route.flowSpeed ?? 1,
    });

  }

});

export { packetRoutes };