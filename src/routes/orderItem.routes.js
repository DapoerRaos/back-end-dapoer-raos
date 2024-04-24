const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { ROLES } = require("../constants");
const { orderItemControllers } = require("../controllers");

const router = Router();

router
  .route("/")
  // .get(orderItemControllers.getOrderItems)
  .post(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    orderItemControllers.createOrderItem
  );

module.exports = router;
