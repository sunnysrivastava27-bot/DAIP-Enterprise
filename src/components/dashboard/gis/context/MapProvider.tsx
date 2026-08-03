import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { MapContext } from "./MapContext";
import type {
  LayerVisibility,
  MapBounds,
  MapCoordinate,
  MapComplaint,
  MapOfficer,
  MapProject,
} from "./MapContext";

interface MapProviderProps {
  children: ReactNode;
}

const defaultCenter: MapCoordinate = {
  lat: 26.4499,
  lng: 80.3319,
};

const defaultLayers: LayerVisibility = {
  projects: true,
  officers: true,
  complaints: true,
  revenue: true,
  encroachments: true,
  aiHotspots: true,
  heatmap: false,
};

export function MapProvider({
  children,
}: MapProviderProps) {

  /* =====================================================
      Selection State
  ===================================================== */

  const [selectedProject, setSelectedProject] =
    useState<MapProject>();

  const [selectedOfficer, setSelectedOfficer] =
    useState<MapOfficer>();

  const [selectedComplaint, setSelectedComplaint] =
    useState<MapComplaint>();

  const [selectedWard, setSelectedWard] =
    useState<string>();

  const [selectedSector, setSelectedSector] =
    useState<string>();

  const [hoveredId, setHoveredId] =
    useState<string>();

  /* =====================================================
      Map State
  ===================================================== */

  const [zoom, setZoomState] =
    useState<number>(12);

  const [center, setCenter] =
    useState<MapCoordinate>(defaultCenter);

  const [bearing, setBearing] =
    useState<number>(0);

  const [pitch, setPitch] =
    useState<number>(0);

  /* =====================================================
      Layer State
  ===================================================== */

  const [layers, setLayers] =
    useState<LayerVisibility>(defaultLayers);

  /* =====================================================
      Modes
  ===================================================== */

  const [liveMode, setLiveMode] =
    useState(true);

  const [aiMode, setAiMode] =
    useState(false);

  const [playbackMode, setPlaybackMode] =
    useState(false);

  /* =====================================================
      Timeline
  ===================================================== */

  const [timeline, setTimeline] =
    useState<Date>(new Date());

  const [playbackSpeed, setPlaybackSpeedState] =
    useState<number>(1);
	  /* =====================================================
      Selection Actions
  ===================================================== */

  const selectProject = useCallback(
    (project?: MapProject) => {
      setSelectedProject(project);
    },
    []
  );

  const selectOfficer = useCallback(
    (officer?: MapOfficer) => {
      setSelectedOfficer(officer);
    },
    []
  );

  const selectComplaint = useCallback(
    (complaint?: MapComplaint) => {
      setSelectedComplaint(complaint);
    },
    []
  );

  const selectWard = useCallback(
    (ward?: string) => {
      setSelectedWard(ward);
    },
    []
  );

  const selectSector = useCallback(
    (sector?: string) => {
      setSelectedSector(sector);
    },
    []
  );

  const hover = useCallback(
    (id?: string) => {
      setHoveredId(id);
    },
    []
  );

  /* =====================================================
      Map Actions
  ===================================================== */

  const zoomIn = useCallback(() => {
    setZoomState((previous) => previous + 1);
  }, []);

  const zoomOut = useCallback(() => {
    setZoomState((previous) => Math.max(previous - 1, 1));
  }, []);

  const setZoom = useCallback((level: number) => {
    setZoomState(level);
  }, []);

  const panTo = useCallback((coordinate: MapCoordinate) => {
    setCenter(coordinate);
  }, []);

  const fitBounds = useCallback((bounds: MapBounds) => {

    const centerLat =
      (bounds.north + bounds.south) / 2;

    const centerLng =
      (bounds.east + bounds.west) / 2;

    setCenter({
      lat: centerLat,
      lng: centerLng,
    });

  }, []);

  const rotate = useCallback((angle: number) => {
    setBearing(angle);
  }, []);

  const tilt = useCallback((angle: number) => {
    setPitch(angle);
  }, []);
    /* =====================================================
      Layer Actions
  ===================================================== */

  const toggleLayer = useCallback(
    (layer: keyof LayerVisibility) => {
      setLayers((previous) => ({
        ...previous,
        [layer]: !previous[layer],
      }));
    },
    []
  );

  const enableLayer = useCallback(
    (layer: keyof LayerVisibility) => {
      setLayers((previous) => ({
        ...previous,
        [layer]: true,
      }));
    },
    []
  );

  const disableLayer = useCallback(
    (layer: keyof LayerVisibility) => {
      setLayers((previous) => ({
        ...previous,
        [layer]: false,
      }));
    },
    []
  );

  /* =====================================================
      Mode Actions
  ===================================================== */

  const enableLiveMode = useCallback(() => {
    setLiveMode(true);
  }, []);

  const disableLiveMode = useCallback(() => {
    setLiveMode(false);
  }, []);

  const enableAIMode = useCallback(() => {
    setAiMode(true);
  }, []);

  const disableAIMode = useCallback(() => {
    setAiMode(false);
  }, []);

  const startPlayback = useCallback(() => {
    setPlaybackMode(true);
  }, []);

  const stopPlayback = useCallback(() => {
    setPlaybackMode(false);
  }, []);

  const setPlaybackSpeed = useCallback(
    (speed: number) => {
      const value = Math.max(0.25, Math.min(speed, 10));
      setPlaybackSpeedState(value);
    },
    []
  );

  /* =====================================================
      Reset Engine
  ===================================================== */

  const reset = useCallback(() => {

    setSelectedProject(undefined);
    setSelectedOfficer(undefined);
    setSelectedComplaint(undefined);

    setSelectedWard(undefined);
    setSelectedSector(undefined);

    setHoveredId(undefined);

    setZoomState(12);

    setCenter(defaultCenter);

    setBearing(0);

    setPitch(0);

    setLayers(defaultLayers);

    setLiveMode(true);

    setAiMode(false);

    setPlaybackMode(false);

    setTimeline(new Date());

    setPlaybackSpeedState(1);

  }, []);
    /* =====================================================
      Context Value
  ===================================================== */

  const value = useMemo(
    () => ({
      /* Selection */
      selectedProject,
      selectedOfficer,
      selectedComplaint,
      selectedWard,
      selectedSector,

      /* Hover */
      hoveredId,

      /* Map */
      zoom,
      center,
      bearing,
      pitch,

      /* Layers */
      layers,

      /* Modes */
      liveMode,
      aiMode,
      playbackMode,

      /* Timeline */
      timeline,
      playbackSpeed,

      /* Selection Actions */
      selectProject,
      selectOfficer,
      selectComplaint,
      selectWard,
      selectSector,
      hover,

      /* Map Actions */
      zoomIn,
      zoomOut,
      setZoom,
      panTo,
      fitBounds,
      rotate,
      tilt,

      /* Layer Actions */
      toggleLayer,
      enableLayer,
      disableLayer,

      /* Mode Actions */
      enableLiveMode,
      disableLiveMode,
      enableAIMode,
      disableAIMode,
      startPlayback,
      stopPlayback,
      setPlaybackSpeed,

      /* Reset */
      reset,
    }),
    [
      selectedProject,
      selectedOfficer,
      selectedComplaint,
      selectedWard,
      selectedSector,
      hoveredId,
      zoom,
      center,
      bearing,
      pitch,
      layers,
      liveMode,
      aiMode,
      playbackMode,
      timeline,
      playbackSpeed,
      selectProject,
      selectOfficer,
      selectComplaint,
      selectWard,
      selectSector,
      hover,
      zoomIn,
      zoomOut,
      setZoom,
      panTo,
      fitBounds,
      rotate,
      tilt,
      toggleLayer,
      enableLayer,
      disableLayer,
      enableLiveMode,
      disableLiveMode,
      enableAIMode,
      disableAIMode,
      startPlayback,
      stopPlayback,
      setPlaybackSpeed,
      reset,
    ]
  );

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}

export default MapProvider;