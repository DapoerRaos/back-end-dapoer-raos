const { body, param } = require("express-validator");

const requirements = {
  updateCustomer: [
    body("email").optional().isEmail(),
    body("password").optional().isString().isLength({ min: 8 }),
    body("fullname").optional().isString(),
    body("telephone").optional().isMobilePhone("id-ID"),
    body("address").optional().isString(),
  ],
};

module.exports = requirements;
