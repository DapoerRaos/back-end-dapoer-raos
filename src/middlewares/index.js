const morganMiddleware = require("./morgan.middleware");
const errorHandler = require("./errorHandler.middleware");
const validator = require("./validator");
const authMiddleware = require("./auth.middleware");

module.exports = {
  morganMiddleware,
  errorHandler,
  validator,
  authMiddleware,
};
