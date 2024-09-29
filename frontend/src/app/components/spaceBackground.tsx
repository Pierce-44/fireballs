"use client";
import { useLoader, useThree } from "@react-three/fiber";
import React from "react";
import { EquirectangularReflectionMapping, TextureLoader } from "three";

// Space background that rotates as the user pans around Earth
export default function SpaceBackground() {
  const { scene } = useThree();
  const texture = useLoader(TextureLoader, "/images/stars.webp");
  texture.mapping = EquirectangularReflectionMapping;

  React.useEffect(() => {
    const prevBackground = scene.background;
    scene.background = texture;
    return () => {
      scene.background = prevBackground;
    };
  }, [texture, scene]);

  return null;
}
