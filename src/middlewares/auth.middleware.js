const { verify } = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { usersServices } = require("../services");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  let user;

  try {
    user = verify(token, SECRET_KEY);
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid or expired token",
    });
    return;
  }

  const getUser = await usersServices.getUserById(user.id);
  if (!getUser) {
    res.status(404).json({
      status: "Failed",
      message: "User not found",
    });
    return;
  }
  req.userData = getUser;

  next();
};

const authorize = (...roles) => {
  return async (req, res, next) => {
    const userData = req.userData;
    if (!userData) {
      res.status(403).json({
        status: "Failed",
        message: "You don't have access",
      });
      return;
    }

    const isRoleValid = roles.includes(userData.roles);

    if (!isRoleValid) {
      res.status(403).json({
        status: "Failed",
        message: "You don't have access",
      });
      return;
    }
    next();
  };
};

const verifyUser = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.userData;

  if (userData.id != id) {
    res.status(403).json({
      status: "Failed",
      message: "You don't have access",
    });
    return;
  }
  next();
};

module.exports = {
  authenticate,
  authorize,
  verifyUser,
};
