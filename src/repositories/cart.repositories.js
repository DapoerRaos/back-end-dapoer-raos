const {
  cartModel,
  cartDetailModel,
  productModel,
  customerModel,
} = require("../models");

async function getCarts() {
  return await cartModel.findAll();
}

async function getCartByUserId(customer_id) {
  return await cartModel.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: cartDetailModel,
        as: "CartDetails",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
        include: [
          {
            model: productModel,
            as: "Product",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
      {
        model: customerModel,
        as: "Customer",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    ],
    where: {
      customer_id: customer_id,
    },
  });
}

async function createCart(customer_id) {
  const cart = await cartModel.create({
    customer_id: customer_id,
  });
  return cart;
}

module.exports = {
  getCarts,
  getCartByUserId,
  createCart,
};
