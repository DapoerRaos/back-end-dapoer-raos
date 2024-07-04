const { rajaOngkirServices } = require("../services");
const logger = require("../utils/logger");

async function getProvinces(req, res) {
  try {
    const provinces = await rajaOngkirServices.getProvinces();
    res.status(200).json({
      status: "Success",
      data: provinces,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
}

async function getCities(req, res) {
  try {
    const cities = await rajaOngkirServices.getCities(req.query.province);
    res.status(200).json({
      status: "Success",
      data: cities,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
}

async function postCost(req, res) {
  try {
    const { origin, destination, weight, courier } = req.body;
    const cost = await rajaOngkirServices.postCost({
      origin,
      destination,
      weight,
      courier,
    });
    res.status(200).json({
      status: "Success",
      data: cost,
    });
  } catch (err) {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  getProvinces,
  getCities,
  postCost,
};
