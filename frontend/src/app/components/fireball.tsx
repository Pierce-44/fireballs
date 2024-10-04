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
  impactEnergyUpperValue: number;
  colourUpperValue: number;
  velocityFactor: number;
  startingDistance: number;
  setShowInfo: React.Dispatch<
    React.SetStateAction<{
      lat: string;
      latPosition: string;
      lon: string;
      lonPosition: string;
      fireballVelocity: number;
      impactEnergy: number;
      left: number;
      top: number;
    } | null>
  >;
}

export default function Fireball({
  lat,
  latPosition,
  lon,
  lonPosition,
  fireballVelocity,
  impactEnergy,
  impactEnergyUpperValue,
  colourUpperValue,
  velocityFactor,
  startingDistance,
  setShowInfo,
}: Props) {
  const fireball = useFireball({
    lat,
    latPosition,
    lon,
    lonPosition,
    fireballVelocity,
    velocityFactor,
    startingDistance,
  });

  function normalizeToRange(number: number, min: number, max: number): number {
    // Ensure the number is within the min and max range
    if (number < min) number = min;
    if (number > max) number = max;

    return 1 + ((number - min) / (max - min)) * (max - min);
  }

  const impactEnergyNormalized = normalizeToRange(
    impactEnergy,
    1,
    impactEnergyUpperValue,
  );

  return (
    <>
      {/* Fireball */}
      <mesh
        ref={fireball.fireballRef}
        onPointerOver={(e) =>
          setShowInfo({
            lat,
            latPosition,
            lon,
            lonPosition,
            fireballVelocity,
            impactEnergy,
            left: e.clientX,
            top: e.clientY,
          })
        }
        onPointerOut={() => setShowInfo(null)}
      >
        <sphereGeometry args={[0.02 * impactEnergyNormalized, 32, 32]} />
        <meshStandardMaterial
          color={handleFireballColour(impactEnergy, 1, colourUpperValue)}
        />

        {/* Glow Effect */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.02 * impactEnergyNormalized, 32, 32]} />
          <meshBasicMaterial
            color={handleFireballColour(impactEnergy, 1, colourUpperValue)}
            transparent
            opacity={0.5}
          />
        </mesh>
      </mesh>

      {/* Render Explosion when triggered */}
      {fireball.explosionPosition ? (
        <FireballExplosion
          position={fireball.explosionPosition}
          onAnimationComplete={() => {
            fireball.setExplosionPosition(null);
          }}
          impactEnergy={impactEnergy}
          impactEnergyNormalized={impactEnergyNormalized}
          minColour={1}
          maxColour={colourUpperValue}
        />
      ) : (
        ""
      )}
    </>
  );
}
