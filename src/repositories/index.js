const userRepositories = require("./user.repositories");
const customerRepositories = require("./customer.repositories");
const productRepositories = require("./product.repositories");
const categoryRepositories = require("./category.repositories");
const cartRepositories = require("./cart.repositories");
const cartDetailRepositories = require("./cartDetail.repositories");
const orderRepositories = require("./order.repositories");
const orderItemRepositories = require("./orderItem.repositories");
const shippingRepositories = require("./shipping.repositories");

module.exports = {
  userRepositories,
  customerRepositories,
  productRepositories,
  categoryRepositories,
  cartRepositories,
  cartDetailRepositories,
  orderRepositories,
  orderItemRepositories,
  shippingRepositories,
};
