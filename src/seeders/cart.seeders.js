const { cartModel } = require("../models");
const logger = require("../utils/logger");

const carts = [];

const createCart = (customer_id) => {
  const cart = {
    customer_id,
  };
  carts.push(cart);
};

createCart(1);
createCart(2);
createCart(3);

const seedCarts = async () => {
  try {
    await cartModel.bulkCreate(carts);
    logger.info("Cart seeded successfully");
  } catch (err) {
    logger.error("Error seeding cart:", err);
  }
};

module.exports = seedCarts;
