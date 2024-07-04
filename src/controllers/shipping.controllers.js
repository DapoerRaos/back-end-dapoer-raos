const { shippingServices } = require("../services");
const logger = require("../utils/logger");

async function createShipping(req, res) {
  try {
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
    } = req.body;
    console.log(req.body);
    const shipping = await shippingServices.createShipping({
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
    res.status(201).json({
      status: "Success",
      message: "Shipping Berhasil Ditambahkan",
      data: shipping,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ status: "Failed", error: error.message });
    console.log(error);
  }
}

module.exports = { createShipping };
