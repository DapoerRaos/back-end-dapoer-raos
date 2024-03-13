const { Router } = require("express");
const userRoutes = require("./users.routes");
const customerRoutes = require("./customers.routes");
const authRoutes = require("./auth.routes");

const router = Router();

router.use("/users", userRoutes);
router.use("/customers", customerRoutes);
router.use("/auth", authRoutes);

module.exports = router;
