const { orderItemRepositories } = require("../repositories");

async function createOrderItem(items) {
  if (items.length === 0) {
    throw new Error("Items cannot be empty");
  }
  return await orderItemRepositories.createOrderItem(items);
}

module.exports = {
  createOrderItem,
};
