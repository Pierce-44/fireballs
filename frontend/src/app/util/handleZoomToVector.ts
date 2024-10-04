/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vector3 } from "three";
import { animateCameraZoom } from "./animateCameraZoom";

export function handleZoomToVector(
  impactX: number,
  impactY: number,
  impactZ: number,
  zoomFactor: number,
  controlsRef: any,
) {
  const normalVector = new Vector3(impactX, impactY, impactZ).normalize();
  const zoomPosition = normalVector.clone().multiplyScalar(zoomFactor); // Adjust distance as needed

  // Get current camera position
  const startPosition = controlsRef.current.object.position.clone();
  const endPosition = zoomPosition;

  // Animate camera zooming
  animateCameraZoom(startPosition, endPosition, 1000, controlsRef); // 1000ms for animation duration

  // Set the target for controls
  controlsRef.current.target.copy(normalVector);
  controlsRef.current.update();
}
