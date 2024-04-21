const { body, param } = require("express-validator");

const requirements = {
  updateCustomer: [
    body("email")
      .optional()
      .custom((value, { req }) => {
        if (value === "") return true;
        return req.check("email").isEmail();
      }),
    body("password").optional().isString(),
    body("fullname").optional().isString(),
    body("telephone").optional().isMobilePhone("id-ID"),
    body("address").optional().isString(),
  ],
};

module.exports = requirements;
