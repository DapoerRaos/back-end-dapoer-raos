const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { ROLES } = require("../constants");
const { shippingControllers } = require("../controllers");

const router = Router();

router
  .route("/")
  .post(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    shippingControllers.createShipping
  );

module.exports = router;
