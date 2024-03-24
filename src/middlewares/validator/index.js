const { validationResult } = require("express-validator");
const logger = require("../../utils/logger");
const authRequirements = require("./auth.requirements");
const customersRequirements = require("./customers.requirements");
const productRequirements = require("./product.requirements");
const categoryRequirements = require("./category.requirements");

const requirements = {
  ...authRequirements,
  ...customersRequirements,
  ...productRequirements,
  ...categoryRequirements,
};

function validate(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    logger.error({
      error: errors.array(),
    });

    const error = errors.array()[0].msg;

    if (error === "No file uploaded or file type is incorrect") {
      return res.status(400).json({
        status: "failed",
        message: error,
      });
    }

    return res.status(400).json({
      status: "failed",
      message: "Invalid Input",
    });
  };
}

module.exports = {
  requirements,
  validate,
};
