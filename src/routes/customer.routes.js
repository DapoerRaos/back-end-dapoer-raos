const { Router } = require("express");
const { authMiddleware, validator } = require("../middlewares");
const { customerControllers } = require("../controllers");
const { ROLES } = require("../constants");

const router = Router();
const { validate, requirements } = validator;

router
  .route("/")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.ADMIN)],
    customerControllers.getCustomers
  )
  .get([authMiddleware.authenticate], customerControllers.getCustomerById);

router
  .route("/")
  .put(
    [
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.CUSTOMER),
      validate(requirements.updateCustomer),
    ],
    customerControllers.updateCustomerById
  );

module.exports = router;
