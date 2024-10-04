export default function handleFireballColour(
  value: number,
  minValue: number,
  maxValue: number,
) {
  function getColorForValue(value: number) {
    // Ensure the value is between the specified range
    value = Math.max(minValue, Math.min(value, maxValue));

    // Define the RGB values for yellow, orange, and red
    const yellow = [255, 255, 0]; // Yellow (for minValue)
    const orange = [255, 165, 0]; // Orange (for midValue)
    const red = [255, 0, 0]; // Red (for maxValue)

    let color = [];
    const midValue = (minValue + maxValue) / 2; // Calculate the middle point of the range

    if (value <= midValue) {
      // Interpolate between yellow and orange
      const ratio = (value - minValue) / (midValue - minValue); // Normalize value between 0 and 1 for lower half
      color = yellow.map((c, i) => Math.round(c + ratio * (orange[i] - c)));
    } else {
      // Interpolate between orange and red
      const ratio = (value - midValue) / (maxValue - midValue); // Normalize value between 0 and 1 for upper half
      color = orange.map((c, i) => Math.round(c + ratio * (red[i] - c)));
    }

    // Convert RGB array to hex color code
    return `#${color.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
  }

  return getColorForValue(value);
}
