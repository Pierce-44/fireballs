"use client";
import React from "react";
import useFireball from "../hooks/useFireball";
import FireballExplosion from "./fireballExplosion";

interface Props {
  lat: string;
  latPosition: string;
  lon: string;
  lonPosition: string;
  fireballVelocity: number;
}

export default function Fireball({
  lat,
  latPosition,
  lon,
  lonPosition,
  fireballVelocity,
}: Props) {
  const fireball = useFireball({
    lat,
    latPosition,
    lon,
    lonPosition,
    fireballVelocity,
  });

  return (
    <>
      {/* Fireball */}
      <mesh ref={fireball.fireballRef}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial color="orange" />

        {/* Glow Effect */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.02, 32, 32]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </mesh>

      {/* Render Explosion when triggered */}
      {fireball.explosionPosition && (
        <FireballExplosion
          position={fireball.explosionPosition}
          onAnimationComplete={() => fireball.setExplosionPosition(null)}
        />
      )}
    </>
  );
}
