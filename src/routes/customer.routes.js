const { Router } = require("express");
const { authMiddleware, validator } = require("../middlewares");
const { customerControllers } = require("../controllers");
const { ROLES } = require("../constants");

const router = Router();
const { validate, requirements } = validator;

router
  .route("/")
  .get([authMiddleware.authenticate], customerControllers.getCustomerById)
  .put(
    [
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.CUSTOMER),
      validate(requirements.updateCustomer),
    ],
    customerControllers.updateCustomerById
  );

router
  .route("/:id")
  .get(
    [authMiddleware.authenticate],
    customerControllers.getCustomerDetailById
  );

router
  .route("/all")
  .get(
    [authMiddleware.authenticate, authMiddleware.authorize(ROLES.ADMIN)],
    customerControllers.getCustomers
  );

module.exports = router;
