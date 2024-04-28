const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");
const customerControllers = require("./customer.controllers");
const productControllers = require("./product.controllers");
const categoryControllers = require("./category.controllers");
const cartControllers = require("./cart.controllers");
const cartDetailControllers = require("./cartDetail.controllers");
const orderControllers = require("./order.controllers");
const orderItemControllers = require("./orderItem.controllers");

module.exports = {
  authControllers,
  userControllers,
  customerControllers,
  productControllers,
  categoryControllers,
  cartControllers,
  cartDetailControllers,
  orderControllers,
  orderItemControllers,
};
