const express = require("express");
const cors = require("cors");
const exampleRoutes = require("./routes/fireballApiRoutes");
const { initializeRedisClient } = require("./middleware/initialiseRedisClient");

async function initializeExpressServer() {
  const app = express();
  app.use(express.json());

  // Enable CORS for all routes
  app.use(cors());

  // connect to Redis
  await initializeRedisClient();

  app.use("/api/fireballs", exampleRoutes);

  // start the server
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = initializeExpressServer;

// Starts the server immediately when this file is run
initializeExpressServer().catch((err) => {
  console.error("Failed to start the server:", err);
});
