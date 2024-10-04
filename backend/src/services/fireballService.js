const axios = require("axios");
const { getRedisClient } = require("../middleware/initialiseRedisClient");

exports.getCachedData = async () => {
  // No need to listen for the 'ready' event here
  const client = getRedisClient();

  // Make sure the client is connected
  if (!client.isOpen) {
    throw new Error("Redis client is not connected.");
  }

  try {
    // Try to get the cached data
    const cachedData = await client.get("externalApiData");

    if (cachedData) {
      console.log("Returning cached data from Redis");
      return JSON.parse(cachedData);
    }

    // If no cached data, fetch it from the external API
    const response = await axios.get(
      "https://ssd-api.jpl.nasa.gov/fireball.api?www=1&vel-comp=true"
    );
    const data = response.data;

    // Cache data in Redis for 1 week (7 days in seconds)
    await client.set("externalApiData", JSON.stringify(data), { EX: 604800 });
    console.log("Data fetched and cached in Redis");

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data.");
  }
};
