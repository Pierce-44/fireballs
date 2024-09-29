import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Earth() {
  const earthTexture = useLoader(TextureLoader, "/images/earthTexture.webp");

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
}
