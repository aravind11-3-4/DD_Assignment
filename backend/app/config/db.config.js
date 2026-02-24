module.exports = {
  // Prefer the environment variable injected by Docker Compose;
  // fall back to localhost for plain local development.
  url: process.env.MONGO_URL || "mongodb://localhost:27017/dd_db"
};
