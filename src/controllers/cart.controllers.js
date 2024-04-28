const { cartServices, customerServices } = require("../services");
const logger = require("../utils/logger");

async function getCarts(req, res) {
  try {
    const carts = await cartServices.getCarts();
    res.status(200).json({
      status: "Success",
      data: carts,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
}

async function getCartByUserId(req, res) {
  try {
    const user_id = req.userData.id;
    const customer = await customerServices.getCustomerById(user_id);

    const customer_id = customer.id;

    const cart = await cartServices.getCartByUserId(customer_id);
    res.status(200).json({
      status: "Success",
      data: cart,
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "Keranjang Tidak Ditemukan",
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

module.exports = {
  getCarts,
  getCartByUserId,
};
