export default async function fetchFireballs() {
  const url = process.env.FIREBALLS_API!;

  const response = await fetch(url);

  const responseJson = await response.json();

  return Promise.resolve(responseJson);
}
