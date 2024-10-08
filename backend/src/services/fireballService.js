const axios = require("axios");
const { getRedisClient } = require("../middleware/initialiseRedisClient");
require("dotenv").config();

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

    const baseUrl = "https://ssd-api.jpl.nasa.gov/fireball.api";
    const apiKey = process.env.NASA_API_KEY;

    // If no cached data, fetch it from the external API
    const response = await axios.get(`${baseUrl}&api_key=${apiKey}`);
    const data = response.data;

    // only store values with latitude, longitude and velocity values
    const dataWithValues = data.data.filter(
      (fireball) => fireball[3] && fireball[5] && fireball[8]
    );

    // Cache data in Redis for 1 week (7 days in seconds)
    await client.set("externalApiData", JSON.stringify(dataWithValues), {
      EX: 604800,
    });
    console.log("Data fetched and cached in Redis");

    return dataWithValues;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data.");
  }
};
