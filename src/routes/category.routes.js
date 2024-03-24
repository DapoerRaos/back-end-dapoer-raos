const { Router } = require("express");
const { authMiddleware, validator } = require("../middlewares");
const { categoryControllers } = require("../controllers");
const { ROLES } = require("../constants");

const router = Router();
const { validate, requirements } = validator;

router
  .route("/")
  .get(categoryControllers.getCategories)
  .post(
    [
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.ADMIN),
      validate(requirements.addCategory),
    ],
    categoryControllers.addCategory
  );

router
  .route("/:id")
  .put(
    [
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.ADMIN),
      validate(requirements.updateCategory),
    ],
    categoryControllers.updateCategoryById
  )
  .delete(
    [
      authMiddleware.authenticate,
      authMiddleware.authorize(ROLES.ADMIN),
      validate(requirements.deleteCategory),
    ],
    categoryControllers.deleteCategoryById
  );

module.exports = router;
