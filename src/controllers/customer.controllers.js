const { customerServices } = require("../services");
const logger = require("../utils/logger");

async function getCustomers(req, res) {
  try {
    const result = await customerServices.getCustomers();
    res.status(200).json({
      status: "Success",
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

async function getCustomerById(req, res) {
  try {
    const result = await customerServices.getCustomerById(req.userData.id);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "User Customer not found",
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

async function updateCustomerById(req, res) {
  const id = req.userData.id;
  const { email, password, fullname, telephone, address } = req.body;

  try {
    await customerServices.updateCustomerById(id, {
      email,
      password,
      fullname,
      telephone,
      address,
    });
    res.status(200).json({
      status: "Success",
      message: "Data Berhasil Diperbarui",
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "User Tidak Ditemukan",
      });
    } else if (err.message === "Email already exists") {
      logger.error({ status: 409, error: err });
      res.status(409).json({
        status: "Failed",
        message: "Email Sudah Digunakan",
      });
    } else if (err.message === "Phone Number already used") {
      logger.error({ status: 409, error: err });
      res.status(409).json({
        status: "Failed",
        message: "No Hp Sudah Digunakan",
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
  getCustomers,
  getCustomerById,
  updateCustomerById,
};
