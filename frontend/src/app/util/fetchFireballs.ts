export default async function fetchFireballs() {
  // const url = "https://ssd-api.jpl.nasa.gov/fireball.api?limit=50";
  const url = "https://ssd-api.jpl.nasa.gov/fireball.api?www=1&vel-comp=true";

  const response = await fetch(url);

  const responseJson = await response.json();

  return Promise.resolve(responseJson);
}
