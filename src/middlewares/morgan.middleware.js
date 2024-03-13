const morgan = require("morgan");
const logger = require("../utils/logger");
const { IS_DEVELOPMENT } = require("../config");

const skip = () => {
  return !IS_DEVELOPMENT;
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: { write: (message) => logger.http(message) },
    skip,
  }
);

module.exports = morganMiddleware;
