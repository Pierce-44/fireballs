export default function Sun() {
  const sunRadius = 20;

  return (
    <>
      {/* Sunlight Effect */}
      <directionalLight
        intensity={3}
        position={[500, 0, 500]} // Sun's position in space
        castShadow
      />
      {/* Very low ambient light for space environment */}
      <ambientLight intensity={0.7} />

      <mesh position={[500, 0, 500]}>
        <sphereGeometry args={[sunRadius, 64, 64]} />
        <meshBasicMaterial color="yellow" />
      </mesh>

      {/* Added Glow Effect */}
      <mesh position={[500, 0, 500]}>
        <sphereGeometry args={[sunRadius * 1.05, 64, 64]} />{" "}
        <meshBasicMaterial color="yellow" transparent opacity={0.3} />
      </mesh>
    </>
  );
}
