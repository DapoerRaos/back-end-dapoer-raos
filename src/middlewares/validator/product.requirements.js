const { body, query, param } = require("express-validator");

const requirements = {
  getProducts: [query("page").isInt({ min: 1 }).optional()],
  getProductById: [param("id").isInt({ min: 1 })],
  addProduct: [
    body("category_id").notEmpty().isInt(),
    body("name").notEmpty().isString(),
    body("description").optional().isString(),
    body("price").notEmpty().isDecimal(),
    body("stock").notEmpty().isInt(),
  ],
  updateProduct: [
    param("id").isInt({ min: 1 }),
    body("category_id").optional(),
    body("name").optional().isString(),
    body("description").optional().isString(),
    body("price").optional(),
    body("stock").optional(),
  ],
  deleteProduct: [param("id").isInt({ min: 1 })],
};

module.exports = requirements;
