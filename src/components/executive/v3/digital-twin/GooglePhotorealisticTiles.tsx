import { useEffect, useRef } from "react";

import {
  TilesRenderer,
  TilesPlugin,
  TilesAttributionOverlay,
} from "3d-tiles-renderer/r3f";

import {
  GoogleCloudAuthPlugin,
  ReorientationPlugin,
} from "3d-tiles-renderer/plugins";

const GOOGLE_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

const ROAD_ORIGIN_LON = 80.3220000;
const ROAD_ORIGIN_LAT = 26.4610000;

/* FROZEN GOOGLE CALIBRATION — DO NOT CHANGE */
const GOOGLE_REFERENCE_HEIGHT_M = 143.7;
const DAIP_WORLD_SCALE = 0.01;

const REORIENTATION_ARGS = [
  {
    lat: (ROAD_ORIGIN_LAT * Math.PI) / 180,
    lon: (ROAD_ORIGIN_LON * Math.PI) / 180,
    height: GOOGLE_REFERENCE_HEIGHT_M,
    recenter: true,
    azimuth: Math.PI,
    elevation: 0,
    roll: 0,
  },
];

interface GooglePhotorealisticTilesProps {
  onTilesReady?: (tiles: any | null) => void;
}

export default function GooglePhotorealisticTiles({
  onTilesReady,
}: GooglePhotorealisticTilesProps) {
  const tilesRef = useRef<any>(null);

  useEffect(() => {
    let attempts = 0;

    const timer = window.setInterval(() => {
      const tiles = tilesRef.current;
      attempts += 1;

      if (!tiles) {
        if (attempts >= 40) {
          window.clearInterval(timer);
        }
        return;
      }

      /*
       * Required for reliable raycasting against Google
       * Photorealistic Tiles.
       */
      tiles.accelerateRaycast = false;

      if (tiles.lruCache) {
        tiles.lruCache.maxBytesSize = 1024 * 1024 * 1024;
      }

      onTilesReady?.(tiles);
      window.clearInterval(timer);
    }, 250);

    return () => {
      window.clearInterval(timer);
      onTilesReady?.(null);
    };
  }, [onTilesReady]);

  if (!GOOGLE_API_KEY) {
    console.warn(
      "[GooglePhotorealisticTiles] VITE_GOOGLE_MAPS_API_KEY is not configured.",
    );
    return null;
  }

  return (
    <group scale={DAIP_WORLD_SCALE}>
      <TilesRenderer ref={tilesRef}>
        <TilesPlugin
          plugin={GoogleCloudAuthPlugin}
          args={{ apiToken: GOOGLE_API_KEY } as any}
        />

        <TilesPlugin
          plugin={ReorientationPlugin}
          args={REORIENTATION_ARGS}
        />

        <TilesAttributionOverlay />
      </TilesRenderer>
    </group>
  );
}
