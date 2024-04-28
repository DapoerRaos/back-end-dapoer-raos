const {
  cartDetailServices,
  cartServices,
  productServices,
  customerServices,
} = require("../services");
const logger = require("../utils/logger");

async function getCartDetailByCartId(req, res) {
  try {
    const user_id = req.userData.id;
    const customer = await customerServices.getCustomerById(user_id);

    const customer_id = customer.id;
    const cart = await cartServices.getCartByUserId(customer_id);

    const cart_id = cart.cart.cart_id;

    const cartDetail = await cartDetailServices.getCartDetailByCartId(cart_id);
    res.status(200).json({
      status: "Success",
      data: cartDetail,
    });
  } catch (err) {
    if (err.message === "Cart Empty") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "Keranjang Masih Kosong",
      });
    } else {
      logger.error({ status: 500, error: err });
      res.status(500).json({
        status: "Failed",
        message: "Internal server error",
      });
    }
  }
}

async function getCartDetailById(req, res) {
  try {
    const { id } = req.params;
    const cartDetail = await cartDetailServices.getCartDetailById(id);
    res.status(200).json({
      status: "Success",
      data: cartDetail,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function addCartItem(req, res) {
  try {
    const user_id = req.userData.id;
    const customer = await customerServices.getCustomerById(user_id);

    const customer_id = customer.id;

    const { product_id } = req.body;

    const cart = await cartServices.getCartByUserId(customer_id);
    const cart_id = cart.cart.cart_id;

    const price = await productServices.getProductById(product_id);

    const cartItem = await cartDetailServices.addCartItem({
      cart_id: cart_id,
      product_id,
      total_price: price.price,
    });
    res.status(201).json({
      status: "Success",
      message: "Item Berhasil Ditambahkan ke Keranjang",
      data: cartItem,
    });
  } catch (err) {
    if (err.message === "There's data missing") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "Ada data yang kosong",
      });
    } else if (err.message === "Product already on cart") {
      logger.error({ status: 404, error: err });
      res.status(409).json({
        status: "Failed",
        message: "Product sudah ada di keranjang",
      });
    } else {
      logger.error({ status: 500, error: err });
      res.status(500).json({
        status: "Failed",
        message: "Internal server error",
      });
    }
  }
}

async function updateQuantityCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const getCartItem = await cartDetailServices.getCartDetailById(id);

    const total_price = quantity * getCartItem.Product.price;

    const updateCartItem = await cartDetailServices.updateQuantityCartItem(id, {
      quantity,
      total_price,
    });

    res.status(200).json({
      status: "Success",
      message: "Item Berhasil Diperbarui",
      data: updateCartItem,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { id } = req.params;
    const result = await cartDetailServices.deleteCartItem(id);
    res.status(200).json({
      status: "Success",
      message: "Item Berhasil Dihapus",
      data: result,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function deleteCartItemByCartId(req, res) {
  try {
    const { cart_id } = req.params;
    const result = await cartDetailServices.deleteCartItemByCartId(cart_id);
    res.status(200).json({
      status: "Success",
      message: "Cart Items Berhasil Dihapus",
      data: result,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

module.exports = {
  getCartDetailByCartId,
  getCartDetailById,
  addCartItem,
  updateQuantityCartItem,
  deleteCartItem,
  deleteCartItemByCartId,
};
