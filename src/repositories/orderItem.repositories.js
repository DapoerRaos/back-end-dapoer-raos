const { orderItemModel } = require("../models");

async function createOrderItem(items) {
  return await orderItemModel.bulkCreate(
    items.map((item) => ({
      order_id: item.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.total_price,
    }))
  );
}

module.exports = {
  createOrderItem,
};
