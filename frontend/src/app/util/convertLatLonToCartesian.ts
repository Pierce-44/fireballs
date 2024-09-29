import * as THREE from "three";

export function convertLatLonToCartesian(
  lat: string,
  latPosition: string,
  lon: string,
  lonPosition: string,
) {
  // Convert latitude and longitude to numbers
  const latDegrees = parseFloat(lat);
  const lonDegrees = parseFloat(lon);

  const RADIUS = 1;

  // Adjust for the hemisphere
  const latitude = latPosition === "S" ? -latDegrees : latDegrees;
  const longitude = lonPosition === "W" ? -lonDegrees : lonDegrees;

  // Convert to radians
  const latRadians = THREE.MathUtils.degToRad(latitude);
  const lonRadians = THREE.MathUtils.degToRad(longitude);

  // Calculate Cartesian coordinates
  // Adjust longitude by 90 degrees (π/2 radians)
  // This was due to an offset between my earth sphere and lan lon coords
  const x = RADIUS * Math.cos(latRadians) * Math.sin(lonRadians + Math.PI / 2);
  const y = RADIUS * Math.sin(latRadians);
  const z = RADIUS * Math.cos(latRadians) * Math.cos(lonRadians + Math.PI / 2);

  return new THREE.Vector3(x, y, z);
}
