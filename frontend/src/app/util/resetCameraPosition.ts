/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vector3 } from "three";
import { animateCameraZoom } from "./animateCameraZoom";

export function resetCameraPosition(controlsRef: any) {
  const startPosition = controlsRef.current.object.position.clone();
  const initialPosition = new Vector3(0, 0, 5);
  const initialTarget = new Vector3(0, 0, 0);
  const endPosition = initialPosition.clone();

  // Animate camera back to the original position
  animateCameraZoom(startPosition, endPosition, 1000, controlsRef);

  // Set the target back to the initial target
  controlsRef.current.target.copy(initialTarget);
  controlsRef.current.update();
}
