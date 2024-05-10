const { cartDetailModel, productModel } = require("../models");

async function getCartDetailByCartId(cart_id) {
  return await cartDetailModel.findAll({ where: { cart_id: cart_id } });
}

async function getCartDetailById(id) {
  return await cartDetailModel.findByPk(id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: {
      model: productModel,
      as: "Product",
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });
}

async function checkProductOnCart(cart_id, product_id) {
  return await cartDetailModel.findOne({
    where: {
      cart_id,
      product_id,
    },
  });
}

async function addCartItem(data) {
  const { cart_id, product_id, total_price } = data;

  return await cartDetailModel.create({
    cart_id,
    product_id,
    total_price,
  });
}

async function updateQuantityCartItem(id, data) {
  const { quantity, total_price } = data;

  return await cartDetailModel.update(
    {
      quantity,
      total_price,
    },
    {
      where: {
        id,
      },
    }
  );
}

async function deleteCartItem(id) {
  return await cartDetailModel.destroy({
    where: {
      id,
    },
  });
}

async function deleteCartItemByCartId(cart_id) {
  return await cartDetailModel.destroy({
    where: {
      cart_id: cart_id,
    },
  });
}

module.exports = {
  getCartDetailByCartId,
  getCartDetailById,
  checkProductOnCart,
  addCartItem,
  updateQuantityCartItem,
  deleteCartItem,
  deleteCartItemByCartId,
};
