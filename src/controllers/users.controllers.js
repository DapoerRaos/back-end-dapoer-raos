const { usersServices } = require("../services");

async function getUserById(req, res) {
  try {
    const result = await usersServices.getUserById(req.userData.id);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    } else {
      logger.error({ status: 500, error: err });
      res.status(500).json({
        status: "failed",
        message: "Internal server error",
      });
    }
  }
}

module.exports = {
  getUserById,
};
