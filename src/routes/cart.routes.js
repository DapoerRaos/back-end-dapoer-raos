const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { cartControllers } = require("../controllers");
const { ROLES } = require("../constants");

const router = Router();

router
  .route("/all")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.ADMIN)],
    cartControllers.getCarts
  );

router
  .route("/")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartControllers.getCartByUserId
  );

module.exports = router;
