import MapCanvas from "./map/MapCanvas";
import NetworkLines from "./map/NetworkLines";
import Cities from "./map/Cities";
import DataPacket from "./map/DataPacket";
import { packetRoutes } from "./map/PacketRoutes";
import { PositionProvider } from "./map/PositionContext";

export default function HeroMap() {
  return (
    <PositionProvider>
      <div
        className="absolute overflow-hidden"
        style={{
          pointerEvents: "none",

          /*
           * Reserve space for the header.
           */
          top: 20,
          left: 0,
          right: 0,
          bottom: 0,

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Master Stage */}
        <div
          style={{
            position: "relative",

            width: "100%",
            height: "100%",

            /*
             * ONLY THIS COMPONENT
             * controls the entire map.
             */
            transform: "translate(-35px,8px) scale(1.07)",
            transformOrigin: "center center",
          }}
        >
          <MapCanvas>
            <NetworkLines />

            {packetRoutes.map((route, index) => (
              <DataPacket
                key={index}
                startX={route.startX}
                startY={route.startY}
                endX={route.endX}
                endY={route.endY}
                delay={route.delay}
              />
            ))}

            <Cities />
          </MapCanvas>
        </div>
      </div>
    </PositionProvider>
  );
}