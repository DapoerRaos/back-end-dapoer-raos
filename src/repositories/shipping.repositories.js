const { shippingModel } = require("../models");

async function createShipping(shipping) {
  const {
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
  } = shipping;
  return await shippingModel.create({
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
