const logger = require("../utils/logger");
const { authServices } = require("../services");

async function login(req, res) {
  try {
    const token = await authServices.login(req.body);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        status: "Success",
        message: "Login Berhasil",
        token,
      });
  } catch (err) {
    handleAuthError(err, res);
  }
}

async function registerCustomer(req, res) {
  const { email, password, fullname, telephone, address } = req.body;
  try {
    await authServices.registerCustomer({
      email,
      password,
      fullname,
      telephone,
      address,
    });
    res.status(201).json({
      status: "Success",
      message: "Registrasi Berhasil",
    });
  } catch (err) {
    handleAuthError(err, res);
  }
}

function handleAuthError(err, res) {
  if (err.message === "Unauthorized") {
    logger.error({ status: 401, error: err });
    res.status(401).json({
      status: "Failed",
      message: "Email atau Password Salah",
    });
  } else if (err.message === "All fields are required") {
    logger.error({ status: 409, error: err });
    res.status(409).json({
      status: "Failed",
      message: "Semua Kolom Wajib Diisi",
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
      message: "Terjadi Error Pada Server",
    });
  }
}

module.exports = {
  login,
  registerCustomer,
};
