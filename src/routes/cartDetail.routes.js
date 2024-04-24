const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { cartDetailControllers } = require("../controllers");

const { ROLES } = require("../constants");
const router = Router();

router
  .route("/")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartDetailControllers.getCartDetailByCartId
  )
  .post(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartDetailControllers.addCartItem
  );

router
  .route("/:id")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartDetailControllers.getCartDetailById
  )
  .put(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartDetailControllers.updateQuantityCartItem
  )
  .delete(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartDetailControllers.deleteCartItem
  );

router
  .route("/cart-id/:cart_id")
  .delete(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    cartDetailControllers.deleteCartItemByCartId
  );

module.exports = router;
