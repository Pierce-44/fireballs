"use client";

import { Canvas } from "@react-three/fiber";
import Earth from "./components/earth";
import Sun from "./components/sun";
import { OrbitControls } from "@react-three/drei";
import SpaceBackground from "./components/spaceBackground";
import { Physics } from "@react-three/cannon";
import Fireball from "./components/fireball";
import useQueryFireballs from "./hooks/useQueryFireballs";

export default function Home() {
  const fireballsData = useQueryFireballs();

  const fireballs = fireballsData.data?.data;

  return (
    <div className="h-full w-full font-[family-name:var(--font-geist-sans)]">
      <div className="h-full cursor-grab">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 30 }}>
          <OrbitControls zoomSpeed={0.3} />
          <SpaceBackground />
          <Sun />
          <Earth />

          {/* Asteroid Impact Simulation */}
          <Physics allowSleep={false}>
            {fireballs?.map((fireball, index) =>
              // If the response has lat and long values
              fireballs[3] && fireballs[5] ? (
                <Fireball
                  key={index}
                  lat={fireball[3]}
                  latPosition={fireball[4]}
                  lon={fireball[5]}
                  lonPosition={fireball[6]}
                  fireballVelocity={Number(fireball[8]) || 20}
                  impactEnergy={
                    Math.log(Number(fireball[2]) / Math.log(2)) || 1
                  }
                />
              ) : (
                ""
              ),
            )}
          </Physics>
        </Canvas>
      </div>
    </div>
  );
}
