const { Router } = require("express");
const userRoutes = require("./user.routes");
const customerRoutes = require("./customer.routes");
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
