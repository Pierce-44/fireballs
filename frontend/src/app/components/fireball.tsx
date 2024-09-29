"use client";
import React from "react";
import useFireball from "../hooks/useFireball";
import FireballExplosion from "./fireballExplosion";
import handleFireballColour from "../util/handleFireballColour";

interface Props {
  lat: string;
  latPosition: string;
  lon: string;
  lonPosition: string;
  fireballVelocity: number;
  impactEnergy: number;
}

export default function Fireball({
  lat,
  latPosition,
  lon,
  lonPosition,
  fireballVelocity,
  impactEnergy,
}: Props) {
  const fireball = useFireball({
    lat,
    latPosition,
    lon,
    lonPosition,
    fireballVelocity,
  });

  const impactEnergyNormalized = (impactEnergy - 0) / (1.5 - 0);

  return (
    <>
      {/* Fireball */}
      <mesh ref={fireball.fireballRef}>
        <sphereGeometry args={[0.02 * impactEnergyNormalized, 32, 32]} />
        <meshStandardMaterial
          color={handleFireballColour(impactEnergy, 0, 2)}
        />

        {/* Glow Effect */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.02 * impactEnergyNormalized, 32, 32]} />
          <meshBasicMaterial
            color={handleFireballColour(impactEnergy, 0, 2)}
            transparent
            opacity={0.5}
          />
        </mesh>
      </mesh>

      {/* Render Explosion when triggered */}
      {fireball.explosionPosition && (
        <FireballExplosion
          position={fireball.explosionPosition}
          onAnimationComplete={() => fireball.setExplosionPosition(null)}
          impactEnergy={impactEnergy}
        />
      )}
    </>
  );
}
