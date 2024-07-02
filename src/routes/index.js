const { Router } = require("express");
const userRoutes = require("./user.routes");
const customerRoutes = require("./customer.routes");
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");
const cartRoutes = require("./cart.routes");
const cartDetailRoutes = require("./cartDetail.routes");
const orderRoutes = require("./order.routes");
const orderItemRoutes = require("./orderItem.routes");
const shippingRoutes = require("./shipping.routes");
const rajaongkirRoutes = require("./rajaOngkir.routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/carts", cartRoutes);
router.use("/carts/detail", cartDetailRoutes);
router.use("/orders", orderRoutes);
router.use("/orders/items", orderItemRoutes);
router.use("/shipping", shippingRoutes);
router.use("/rajaongkir", rajaongkirRoutes);

module.exports = router;
