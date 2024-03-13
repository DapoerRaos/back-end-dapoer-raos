require("dotenv").config();

const config = {
  IS_DEVELOPMENT: ["development", "dev", "local"].includes(process.env.SERVER),
  PORT: parseInt(process.env.PORT) || 3001,
  API: process.env.API_PATH || "api/v1",
  SECRET_KEY: process.env.SECRET_KEY,
};

module.exports = config;
