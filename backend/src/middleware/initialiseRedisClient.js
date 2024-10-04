const { createClient } = require("redis");

let redisClient;

async function initializeRedisClient() {
  const redisURL = "redis://localhost:6379";

  redisClient = createClient({ url: redisURL });

  redisClient.on("error", (e) => {
    console.error("Failed to create the Redis client:", e);
  });

  try {
    // Connect to the Redis server
    await redisClient.connect();
    console.log("Connected to Redis successfully!");
  } catch (e) {
    console.error("Connection to Redis failed:", e);
  }
}

module.exports = {
  initializeRedisClient,
  getRedisClient: () => redisClient, // To access the client
};
