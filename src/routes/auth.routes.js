const { Router } = require("express");
const { validator, authMiddleware } = require("../middlewares");
const { authControllers } = require("../controllers");

const router = Router();
const { validate, requirements } = validator;

router
  .route("/register")
  .post(
    [validate(requirements.registerCustomer)],
    authControllers.registerCustomer
  );

router
  .route("/login")
  .post([validate(requirements.login)], authControllers.login);

router.route("/change-password").put(authControllers.changePassword);

router
  .route("/logout")
  .post([authMiddleware.authenticate], authControllers.logout);

module.exports = router;
