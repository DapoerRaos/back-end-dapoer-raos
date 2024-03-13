const { Router } = require("express");
const { validator } = require("../middlewares");
const { authControllers } = require("../controllers");

const router = Router();
const { validate, requirements } = validator;

router
  .route("/login")
  .post([validate(requirements.login)], authControllers.login);

router
  .route("/register")
  .post(
    [validate(requirements.registerCustomer)],
    authControllers.registerCustomer
  );

module.exports = router;
