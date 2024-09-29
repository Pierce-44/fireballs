import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

export default function FireballExplosion({
  position,
  onAnimationComplete,
}: {
  position: THREE.Vector3;
  onAnimationComplete: () => void;
}) {
  // starting values
  const [scale, setScale] = React.useState(0.1);
  const [opacity, setOpacity] = React.useState(1);

  const explosionRef = React.useRef<THREE.Mesh>(null);

  // Animate the explosion, expand and fade out
  useFrame(() => {
    if (explosionRef.current) {
      // Increase scale for explosion expansion
      setScale((prev) => prev + 0.01);

      // Reduce opacity for fade-out effect
      setOpacity((prev) => {
        const newOpacity = Math.max(prev - 0.02, 0);
        // animation finished
        if (newOpacity === 0) {
          onAnimationComplete();
        }
        return newOpacity;
      });
    }
  });

  return (
    <mesh ref={explosionRef} position={position} scale={scale}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial color="red" transparent opacity={opacity} />
    </mesh>
  );
}
