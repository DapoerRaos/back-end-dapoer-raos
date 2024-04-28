const { cartDetailRepositories } = require("../repositories");

async function getCartDetailByCartId(cart_id) {
  const getCartDetail = await cartDetailRepositories.getCartDetailByCartId(
    cart_id
  );

  if (getCartDetail.length === 0) {
    throw new Error("Cart Empty");
  }

  return {
    total_items: getCartDetail.length,
    cart_items: getCartDetail,
  };
}

async function getCartDetailById(id) {
  const getCartItem = await cartDetailRepositories.getCartDetailById(id);

  if (getCartItem.length === 0) {
    throw new Error("Cart Item Not Found");
  }

  return getCartItem;
}

async function addCartItem(data) {
  const { cart_id, product_id, total_price } = data;

  if (!cart_id || !product_id || !total_price) {
    throw new Error("There's data missing");
  }

  const existingProductOnCart = await cartDetailRepositories.checkProductOnCart(
    cart_id,
    product_id
  );

  if (existingProductOnCart) {
    throw new Error("Product already on cart");
  }

  const addCartItem = await cartDetailRepositories.addCartItem({
    cart_id,
    product_id,
    total_price,
  });

  return addCartItem;
}

async function updateQuantityCartItem(id, data) {
  const { quantity, total_price } = data;

  if (!id) {
    throw new Error("Invalid Id");
  }

  if (!quantity || !total_price) {
    throw new Error("There's data missing");
  }

  const updateCartItem = await cartDetailRepositories.updateQuantityCartItem(
    id,
    {
      quantity,
      total_price,
    }
  );

  return updateCartItem;
}

async function deleteCartItem(id) {
  if (!id) {
    throw new Error("Invalid Id");
  }

  const deleteCartItem = await cartDetailRepositories.deleteCartItem(id);

  return deleteCartItem;
}

async function deleteCartItemByCartId(cart_id) {
  if (!cart_id) {
    throw new Error("Invalid Id");
  }

  const deleteCartItem = await cartDetailRepositories.deleteCartItemByCartId(
    cart_id
  );

  return deleteCartItem;
}

module.exports = {
  getCartDetailByCartId,
  getCartDetailById,
  addCartItem,
  updateQuantityCartItem,
  deleteCartItem,
  deleteCartItemByCartId,
};
