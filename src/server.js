const express = require("express");
const { API } = require("./config");
const routes = require("./routes");
const { morganMiddleware, errorHandler } = require("./middlewares");
const cookieParser = require("cookie-parser");

function createServer() {
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morganMiddleware);
  app.use(`/${API}`, routes);
  app.use(errorHandler);

  return app;
}

module.exports = createServer;
