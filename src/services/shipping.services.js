const { shippingRepositories } = require("../repositories");

async function createShipping({
  id,
  courier,
  service,
  status,
  type,
  cost,
  province,
  city,
  address,
  etd,
}) {
  if (!id || !status || !type) {
    throw new Error("Id, Status and Type are required");
  }

  return await shippingRepositories.createShipping({
    id,
    courier,
    service,
    status,
    type,
    cost,
    province,
    city,
    address,
    etd,
  });
}

module.exports = {
  createShipping,
};
