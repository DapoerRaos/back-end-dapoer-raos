const { userServices } = require("../services");
const logger = require("../utils/logger");

async function getUserById(req, res) {
  try {
    const result = await userServices.getUserById(req.userData.id);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "User Tidak Ditemukan",
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
  getUserById,
};
