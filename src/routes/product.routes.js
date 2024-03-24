const { Router } = require("express");
const {
  multerMiddleware,
  validator,
  authMiddleware,
} = require("../middlewares");
const { productControllers } = require("../controllers");
const { ROLES } = require("../constants");

const router = Router();
const { validate, requirements } = validator;

router
  .route("/")
  .get([validate(requirements.getProducts)], productControllers.getProducts)
  .post(
    [
      multerMiddleware,
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.ADMIN),
      validate(requirements.addProduct),
    ],
    productControllers.addProduct
  );

router
  .route("/:id")
  .get(
    [validate(requirements.getProductById)],
    productControllers.getProductById
  )
  .put(
    [
      multerMiddleware,
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.ADMIN),
      validate(requirements.updateProduct),
    ],
    productControllers.updateProductById
  )
  .delete(
    [
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.ADMIN),
      validate(requirements.deleteProduct),
    ],
    productControllers.deleteProductById
  );

module.exports = router;
