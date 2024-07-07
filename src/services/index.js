const authServices = require("./auth.services");
const userServices = require("./user.services");
const customerServices = require("./customer.services");
const productServices = require("./product.services");
const categoryServices = require("./category.services");
const cartServices = require("./cart.services");
const cartDetailServices = require("./cartDetail.services");
const orderServices = require("./order.services");
const orderItemServices = require("./orderItem.services");
const shippingServices = require("./shipping.services");
const rajaOngkirServices = require("./rajaOngkir.services");

module.exports = {
  authServices,
  userServices,
  customerServices,
  productServices,
  categoryServices,
  cartServices,
  cartDetailServices,
  orderServices,
  orderItemServices,
  shippingServices,
  rajaOngkirServices,
};
