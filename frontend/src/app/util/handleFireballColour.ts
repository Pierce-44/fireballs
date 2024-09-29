export default function handleFireballColour(
  value: number,
  min: number,
  max: number,
) {
  // Normalize the value between 0 and 1
  const normalized = (value - min) / (max - min);

  // Red stays at 255 (#FF), blue stays at 0 (#00), and green decreases from 255 to 0
  const r = 255; // Red is always at 255 (maximum)
  const g = Math.round(255 * (1 - normalized)); // Green decreases from 255 (yellow) to 0 (red)
  const b = 0; // Blue is always 0 (no blue component)

  // Convert to hex format and return the color
  return `rgb(${r}, ${g}, ${b})`;
}
