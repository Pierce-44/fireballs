const express = require("express");
const exampleRoutes = require("./routes/fireballApiRoutes");
const { initializeRedisClient } = require("./middleware/initialiseRedisClient");

async function initializeExpressServer() {
  const app = express();
  app.use(express.json());

  // connect to Redis
  await initializeRedisClient();

  app.use("/api/fireballs", exampleRoutes);

  // start the server
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = initializeExpressServer;

// Starts the server immediately when this file is run
initializeExpressServer().catch((err) => {
  console.error("Failed to start the server:", err);
});
