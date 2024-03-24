const morganMiddleware = require("./morgan.middleware");
const errorHandler = require("./errorHandler.middleware");
const validator = require("./validator");
const authMiddleware = require("./auth.middleware");
const multerMiddleware = require("./multer.middleware");

module.exports = {
  morganMiddleware,
  errorHandler,
  validator,
  authMiddleware,
  multerMiddleware,
};
