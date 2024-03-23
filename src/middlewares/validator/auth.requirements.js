const { body } = require("express-validator");

const requirements = {
  login: [
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isString().isLength({ min: 8 }),
  ],
  registerCustomer: [
    body("fullname").notEmpty().isString(),
    body("email").notEmpty().isEmail(),
    body("password").notEmpty().isString().isLength({ min: 8 }),
    body("telephone").notEmpty().isMobilePhone("id-ID"),
    body("address").notEmpty().isString(),
  ],
};

module.exports = requirements;
