const { Router } = require("express");
const { authMiddleware } = require("../middlewares");
const { ROLES } = require("../constants");
const { orderControllers } = require("../controllers");

const router = Router();

router
  .route("/payment")
  .get([authMiddleware.authenticate], orderControllers.getOrderByStatus)
  .post(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    orderControllers.processOrder
  );

router
  .route("/")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.ADMIN)],
    orderControllers.getOrders
  )
  .post(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    orderControllers.createOrder
  );

router
  .route("/customer_id")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.CUSTOMER)],
    orderControllers.getOrderByCustomerId
  );

router
  .route("/status")
  .get([authMiddleware.authenticate], orderControllers.getOrderStatusById);

router
  .route("/status/:id")
  .get([authMiddleware.authenticate], orderControllers.getTransactionStatus)
  .put([authMiddleware.authenticate], orderControllers.updateOrderStatus);

module.exports = router;
