const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { usersControllers } = require("../controllers");

const router = Router();

router
  .route("/")
  .get([authMiddleware.authenticate], usersControllers.getUserById);

module.exports = router;
