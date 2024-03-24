const { body, param } = require("express-validator");

const requirements = {
  addCategory: [body("name").notEmpty().isString()],
  updateCategory: [param("id").isInt({ min: 1 }), body("name").isString()],
  deleteCategory: [param("id").isInt({ min: 1 })],
};

module.exports = requirements;
