"use client";

import { Canvas } from "@react-three/fiber";
import Earth from "./components/earth";
import Sun from "./components/sun";
import { OrbitControls } from "@react-three/drei";
import SpaceBackground from "./components/spaceBackground";

export default function Home() {
  return (
    <div className="h-full w-full font-[family-name:var(--font-geist-sans)]">
      <div className="h-full cursor-grab">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }}>
          <OrbitControls zoomSpeed={0.3} />
          <SpaceBackground />
          <Sun />
          <Earth />
        </Canvas>
      </div>
    </div>
  );
}
