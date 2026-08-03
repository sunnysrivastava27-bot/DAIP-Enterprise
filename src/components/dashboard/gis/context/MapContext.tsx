import { createContext } from "react";

/* ============================================================
   MAP TYPES
============================================================ */

export interface MapCoordinate {
  lat: number;
  lng: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapProject {
  id: string;
  name: string;
}

export interface MapOfficer {
  id: string;
  name: string;
}

export interface MapComplaint {
  id: string;
  title: string;
}

export interface LayerVisibility {
  projects: boolean;
  officers: boolean;
  complaints: boolean;
  revenue: boolean;
  encroachments: boolean;
  aiHotspots: boolean;
  heatmap: boolean;
}

/* ============================================================
   MAP CONTEXT CONTRACT
============================================================ */

export interface MapContextType {

  /* ----------------------------------------------------------
     Selection
  ----------------------------------------------------------- */

  selectedProject?: MapProject;

  selectedOfficer?: MapOfficer;

  selectedComplaint?: MapComplaint;

  selectedWard?: string;

  selectedSector?: string;

  /* ----------------------------------------------------------
     Hover
  ----------------------------------------------------------- */

  hoveredId?: string;

  /* ----------------------------------------------------------
     Map State
  ----------------------------------------------------------- */

  zoom: number;

  center: MapCoordinate;

  bearing: number;

  pitch: number;

  /* ----------------------------------------------------------
     Layer Visibility
  ----------------------------------------------------------- */

  layers: LayerVisibility;

  /* ----------------------------------------------------------
     Modes
  ----------------------------------------------------------- */

  liveMode: boolean;

  aiMode: boolean;

  playbackMode: boolean;

  /* ----------------------------------------------------------
     Timeline
  ----------------------------------------------------------- */

  timeline: Date;

  playbackSpeed: number;

  /* ----------------------------------------------------------
     Selection Actions
  ----------------------------------------------------------- */

  selectProject(project?: MapProject): void;

  selectOfficer(officer?: MapOfficer): void;

  selectComplaint(complaint?: MapComplaint): void;

  selectWard(ward?: string): void;

  selectSector(sector?: string): void;

  hover(id?: string): void;

  /* ----------------------------------------------------------
     Map Actions
  ----------------------------------------------------------- */

  zoomIn(): void;

  zoomOut(): void;

  setZoom(level: number): void;

  panTo(center: MapCoordinate): void;

  fitBounds(bounds: MapBounds): void;

  rotate(bearing: number): void;

  tilt(pitch: number): void;

  /* ----------------------------------------------------------
     Layer Actions
  ----------------------------------------------------------- */

  toggleLayer(layer: keyof LayerVisibility): void;

  enableLayer(layer: keyof LayerVisibility): void;

  disableLayer(layer: keyof LayerVisibility): void;

  /* ----------------------------------------------------------
     Mode Actions
  ----------------------------------------------------------- */

  enableLiveMode(): void;

  disableLiveMode(): void;

  enableAIMode(): void;

  disableAIMode(): void;

  startPlayback(): void;

  stopPlayback(): void;

  setPlaybackSpeed(speed: number): void;

  /* ----------------------------------------------------------
     Reset
  ----------------------------------------------------------- */

  reset(): void;
}

/* ============================================================
   CONTEXT
============================================================ */

export const MapContext = createContext<MapContextType | null>(null);