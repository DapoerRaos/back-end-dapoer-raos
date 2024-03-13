const logger = require("../utils/logger");
const { authServices } = require("../services");

async function login(req, res) {
  try {
    const token = await authServices.login(req.body);
    res.cookie("token", token);
    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
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
      message: "User successfully registered",
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
      message: "Incorrect Email or Password",
    });
  } else if (err.message === "All fields are required") {
    logger.error({ status: 422, error: err });
    res.status(422).json({
      status: "Failed",
      message: "All fields are required",
    });
  } else if (err.message === "Email already exists") {
    logger.error({ status: 422, error: err });
    res.status(422).json({
      status: "Failed",
      message: "Email already exists",
    });
  } else {
    logger.error({ status: 500, error: err });
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  login,
  registerCustomer,
};
