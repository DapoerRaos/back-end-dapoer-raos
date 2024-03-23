const express = require("express");
const { API } = require("./config");
const routes = require("./routes");
const { morganMiddleware, errorHandler } = require("./middlewares");
const cookieParser = require("cookie-parser");
const cors = require("cors");

function createServer() {
  const app = express();

  const corsOption = {
    origin: "*",
    credentials: true,
  };

  app.use(cors(corsOption));
  app.use(express.static("uploads"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morganMiddleware);
  app.use(`/${API}`, routes);
  app.use(errorHandler);

  return app;
}

module.exports = createServer;
