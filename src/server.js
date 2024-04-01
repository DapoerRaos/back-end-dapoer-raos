const express = require("express");
const { API } = require("./config");
const routes = require("./routes");
const { morganMiddleware, errorHandler } = require("./middlewares");
const cookieParser = require("cookie-parser");
const cors = require("cors");

function createServer() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.static("uploads"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morganMiddleware);
  app.use(errorHandler);
  app.use(`/${API}`, routes);

  return app;
}

module.exports = createServer;
