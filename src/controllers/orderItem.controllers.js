const { orderItemServices } = require("../services");
const logger = require("../utils/logger");

async function createOrderItem(req, res) {
  try {
    const { items } = req.body;
    const orderItems = items.map((item) => ({
      order_id: item.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.total_price,
    }));

    const response = await orderItemServices.createOrderItem(orderItems);

    res.status(201).json({
      status: "Success",
      message: "Order Item Berhasil Ditambahkan",
      data: response,
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
  createOrderItem,
};
