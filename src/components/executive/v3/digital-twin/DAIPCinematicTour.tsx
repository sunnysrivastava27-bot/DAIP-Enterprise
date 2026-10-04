import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface DAIPCinematicTourProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  tilesRef: React.RefObject<any | null>;
}

const CAMERA_HEIGHT = 1.8;
const WALK_SPEED = 4.5;
const FAST_SPEED = 14;
const VERTICAL_SPEED = 4;

const MIN_SURFACE_Y = -20;
const MAX_SURFACE_Y = 30;

const DAIPCityNavigator: React.FC<DAIPCinematicTourProps> = ({
  controlsRef,
  tilesRef,
}) => {
  const { camera, gl } = useThree();

  const keysRef = useRef<Set<string>>(new Set());
  const pointerLockedRef = useRef(false);
  const initializedRef = useRef(false);

  const yawRef = useRef(0);
  const pitchRef = useRef(-0.18);

  const raycasterRef = useRef(new THREE.Raycaster());
  const rayOriginRef = useRef(new THREE.Vector3());
  const rayDirectionRef = useRef(new THREE.Vector3(0, -1, 0));
  const intersectionsRef = useRef<any[]>([]);

  const getGoogleSurfaceY = (
    x: number,
    z: number,
    rayHeight: number,
  ): number | null => {
    const tiles = tilesRef.current;

    if (!tiles) {
      return null;
    }

    const raycaster = raycasterRef.current;
    const origin = rayOriginRef.current;
    const intersections = intersectionsRef.current;

    origin.set(x, rayHeight, z);
    raycaster.set(origin, rayDirectionRef.current);
    raycaster.near = 0;
    raycaster.far = 150;

    intersections.length = 0;

    try {
      tiles.raycast(raycaster, intersections);
    } catch {
      return null;
    }

    for (const hit of intersections) {
      if (!hit?.point) {
        continue;
      }

      const y = hit.point.y;

      if (y >= MIN_SURFACE_Y && y <= MAX_SURFACE_Y) {
        return y;
      }
    }

    return null;
  };

  const updateLook = () => {
    const direction = new THREE.Vector3(
      Math.sin(yawRef.current) * Math.cos(pitchRef.current),
      Math.sin(pitchRef.current),
      Math.cos(yawRef.current) * Math.cos(pitchRef.current),
    );

    camera.lookAt(camera.position.clone().add(direction));
  };

  /* ============================================================
     FREE NAVIGATION IS ACTIVE IMMEDIATELY.

     There is deliberately NO:
     - FREE EXPLORE button
     - cinematic fly mode
     - double-click fly-to
     - automatic camera tour
     - navigation overlay
     ============================================================ */
  useEffect(() => {
    const controls = controlsRef.current;

    if (controls) {
      controls.enabled = false;
    }

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    yawRef.current = Math.atan2(direction.x, direction.z);
    pitchRef.current = Math.asin(
      THREE.MathUtils.clamp(direction.y, -1, 1),
    );

    initializedRef.current = true;
    updateLook();

    return () => {
      keysRef.current.clear();
      pointerLockedRef.current = false;

      if (document.pointerLockElement === gl.domElement) {
        document.exitPointerLock();
      }

      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    };
  }, [camera, controlsRef, gl.domElement]);

  /* ============================================================
     CLICK CANVAS → POINTER LOOK
     ============================================================ */
  useEffect(() => {
    const canvas = gl.domElement;

    const handleCanvasClick = () => {
      if (!initializedRef.current) {
        return;
      }

      canvas.requestPointerLock?.();
    };

    const handlePointerLockChange = () => {
      pointerLockedRef.current =
        document.pointerLockElement === canvas;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!pointerLockedRef.current) {
        return;
      }

      yawRef.current -= event.movementX * 0.0025;
      pitchRef.current -= event.movementY * 0.0025;

      pitchRef.current = THREE.MathUtils.clamp(
        pitchRef.current,
        -1.2,
        1.2,
      );

      updateLook();
    };

    canvas.addEventListener("click", handleCanvasClick);
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl.domElement]);

  /* ============================================================
     KEYBOARD MOVEMENT
     ============================================================ */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        [
          "w",
          "a",
          "s",
          "d",
          "q",
          "e",
          "shift",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ].includes(key)
      ) {
        event.preventDefault();
        keysRef.current.add(key);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  /* ============================================================
     FREE CITY MOVEMENT
     ============================================================ */
  useFrame((_, delta) => {
    if (!initializedRef.current) {
      return;
    }

    const keys = keysRef.current;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;

    if (forward.lengthSq() > 0) {
      forward.normalize();
    }

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up);

    if (right.lengthSq() > 0) {
      right.normalize();
    }

    const movement = new THREE.Vector3();
    const speed = keys.has("shift") ? FAST_SPEED : WALK_SPEED;

    if (keys.has("w") || keys.has("arrowup")) {
      movement.addScaledVector(forward, speed * delta);
    }

    if (keys.has("s") || keys.has("arrowdown")) {
      movement.addScaledVector(forward, -speed * delta);
    }

    if (keys.has("d") || keys.has("arrowright")) {
      movement.addScaledVector(right, speed * delta);
    }

    if (keys.has("a") || keys.has("arrowleft")) {
      movement.addScaledVector(right, -speed * delta);
    }

    if (keys.has("e")) {
      movement.y += VERTICAL_SPEED * delta;
    }

    if (keys.has("q")) {
      movement.y -= VERTICAL_SPEED * delta;
    }

    if (movement.lengthSq() === 0) {
      return;
    }

    const candidate = camera.position.clone().add(movement);

    /*
     * For normal horizontal movement, keep the camera attached to
     * the loaded Google surface at eye height.
     * Q/E remain available for deliberate vertical inspection.
     */
    const verticalInput =
      (keys.has("e") ? 1 : 0) -
      (keys.has("q") ? 1 : 0);

    if (verticalInput === 0) {
      const surfaceY = getGoogleSurfaceY(
        candidate.x,
        candidate.z,
        Math.max(candidate.y + 25, 20),
      );

      if (surfaceY !== null) {
        candidate.y = surfaceY + CAMERA_HEIGHT;
      }
    }

    camera.position.copy(candidate);
    updateLook();
  });

  return null;
};

export default DAIPCityNavigator;
