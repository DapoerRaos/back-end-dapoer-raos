const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { userControllers } = require("../controllers");

const router = Router();

router
  .route("/")
  .get([authMiddleware.authenticate], userControllers.getUserById);

module.exports = router;
