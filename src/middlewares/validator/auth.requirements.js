const { body } = require("express-validator");

const requirements = {
  login: [
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
  ],
  registerCustomer: [
    body("fullname").isString().notEmpty(),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 8 }),
    body("telephone").isMobilePhone().notEmpty(),
    body("address").isString().notEmpty(),
  ],
};

module.exports = requirements;
