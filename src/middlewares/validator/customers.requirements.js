const { body, param } = require("express-validator");

const requirements = {
  updateCustomer: [
    body("email")
      .optional({ checkFalsy: true })
      .isEmail()
      .withMessage("Masukkan email yang valid"),
    body("password").optional().isString(),
    body("fullname").optional().isString(),
    body("telephone").optional().isMobilePhone("id-ID"),
  ],
};

module.exports = requirements;
