const { categoryServices } = require("../services");
const logger = require("../utils/logger");

async function getCategories(req, res) {
  try {
    const result = await categoryServices.getCategories();
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

async function addCategory(req, res) {
  try {
    const { name } = req.body;
    const result = await categoryServices.addCategory(name);
    res.status(200).json({
      status: "Success",
      message: "Category Berhasil Ditambahkan",
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

async function updateCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await categoryServices.updateCategoryById(id, name);
    res.status(200).json({
      status: "Success",
      message: "Category Berhasil Diupdate",
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

async function deleteCategoryById(req, res) {
  try {
    const { id } = req.params;
    const result = await categoryServices.deleteCategoryById(id);
    res.status(200).json({
      status: "Success",
      message: "Category Berhasil Dihapus",
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

module.exports = {
  getCategories,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
};
