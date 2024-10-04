/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vector3 } from "three";

export function animateCameraZoom(
  startPosition: Vector3,
  endPosition: Vector3,
  duration: number,
  controlsRef: any,
) {
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    // Interpolate between start and end positions
    const currentPosition = startPosition.clone().lerp(endPosition, progress);
    controlsRef.current.object.position.copy(currentPosition);

    // Check if animation is still in progress
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure the camera ends exactly at the final position
      controlsRef.current.object.position.copy(endPosition);
    }
  };

  requestAnimationFrame(animate);
}
