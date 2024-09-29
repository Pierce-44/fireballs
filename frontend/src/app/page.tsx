"use client";

import { Canvas } from "@react-three/fiber";
import Earth from "./components/earth";
import Sun from "./components/sun";

export default function Home() {
  return (
    <div className="h-full w-full font-[family-name:var(--font-geist-sans)]">
      <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }}>
        <Sun />
        <Earth />
      </Canvas>
    </div>
  );
}
