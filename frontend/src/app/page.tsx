"use client";

import { Canvas } from "@react-three/fiber";
import Earth from "./components/earth";
import Sun from "./components/sun";
import { OrbitControls } from "@react-three/drei";
import SpaceBackground from "./components/spaceBackground";
import { Physics } from "@react-three/cannon";
import Fireball from "./components/fireball";

export default function Home() {
  return (
    <div className="h-full w-full font-[family-name:var(--font-geist-sans)]">
      <div className="h-full cursor-grab">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }}>
          <OrbitControls zoomSpeed={0.3} />
          <SpaceBackground />
          <Sun />
          <Earth />
          <Physics allowSleep={false}>
            {/* Asteroid Impact Simulation */}
            <Fireball
              lat="50"
              latPosition="N"
              lon="60"
              lonPosition="E"
              fireballVelocity={20}
            />
            <Fireball
              lat="57"
              latPosition="N"
              lon="172"
              lonPosition="E"
              fireballVelocity={20}
            />
            <Fireball
              lat="35"
              latPosition="N"
              lon="30"
              lonPosition="W"
              fireballVelocity={20}
            />
            <Fireball
              lat="34"
              latPosition="S"
              lon="174"
              lonPosition="W"
              fireballVelocity={20}
            />
          </Physics>
        </Canvas>
      </div>
    </div>
  );
}
