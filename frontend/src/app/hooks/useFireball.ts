"use client";
import React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { convertLatLonToCartesian } from "../util/convertLatLonToCartesian";

interface Props {
  lat: string;
  latPosition: string;
  lon: string;
  lonPosition: string;
  fireballVelocity: number;
}

export default function useFireball({
  lat,
  latPosition,
  lon,
  lonPosition,
  fireballVelocity,
}: Props) {
  const fireballRef = React.useRef<THREE.Mesh>(null);
  const positionRef = React.useRef(new THREE.Vector3());

  const [explosionPosition, setExplosionPosition] =
    React.useState<THREE.Vector3 | null>(null);

  // Convert longitude and latitude to Cartesian coordinates
  const impactVector = convertLatLonToCartesian(
    lat,
    latPosition,
    lon,
    lonPosition,
  );
  const impactX = impactVector.x;
  const impactY = impactVector.y;
  const impactZ = impactVector.z;

  const impactPosition = new THREE.Vector3(impactX, impactY, impactZ);

  // Calculate the normal vector (direction from Earth's center to the impact point)
  const normalVector = new THREE.Vector3(impactX, impactY, impactZ).normalize();

  // Store the initial position (1.1 units above the Earth's surface)
  // otherwise it starts moving further off into space after each impact
  const initialOffsetPosition = impactPosition
    .clone()
    .add(normalVector.multiplyScalar(1.1));

  // Set the initial position of the fireball
  React.useEffect(() => {
    if (fireballRef.current) {
      // Offset the fireball by 1 unit outward along the normal vector
      fireballRef.current.position.copy(initialOffsetPosition); // Set the fireball's position
      positionRef.current.copy(initialOffsetPosition); // Set initial position in ref
    }
  }, [impactX, impactY, impactZ]);

  const moveFireball = () => {
    const speed = fireballVelocity / 5000;

    // Calculate direction vector from fireball to the impact point
    const direction = new THREE.Vector3()
      .subVectors(impactPosition, positionRef.current)
      .normalize();

    // Move fireball along the direction vector
    positionRef.current.add(direction.multiplyScalar(speed));

    // Update the fireball's position
    fireballRef.current?.position.copy(positionRef.current);
  };

  const resetFireBallPosition = () => {
    // Reset the position above Earth after impact
    fireballRef.current?.position.copy(initialOffsetPosition);
    positionRef.current.copy(initialOffsetPosition);

    // Trigger explosion
    setExplosionPosition(new THREE.Vector3(impactX, impactY, impactZ));
  };

  useFrame(() => {
    if (fireballRef.current) {
      // Calculate distance from the fireball to the Earth's center
      // Length gives the distance from the origin (Earth's center)
      const fireballDistanceFromCenter = positionRef.current.length();

      const earthRadius = 1;

      // Check if the fireball has fully entered the Earth
      if (fireballDistanceFromCenter <= earthRadius + 0.001) {
        resetFireBallPosition();
      } else {
        moveFireball();
      }
    }
  });

  return {
    fireballRef,
    positionRef,
    explosionPosition,
    setExplosionPosition,
  };
}
