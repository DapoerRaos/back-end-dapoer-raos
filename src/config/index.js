require("dotenv").config();

const config = {
  IS_DEVELOPMENT: ["development", "dev", "local"].includes(process.env.SERVER),
  PORT: parseInt(process.env.PORT) || 3001,
  API: process.env.API_PATH || "api/v1",
  SECRET_KEY: process.env.SECRET_KEY,
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
  RAJAONGKIR_API_KEY: process.env.RAJAONGKIR_API_KEY,
  APP_MAIL: process.env.APP_MAIL,
  APP_PASSWORD: process.env.APP_PASSWORD,
};

module.exports = config;
