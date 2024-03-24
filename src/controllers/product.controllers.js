const { productServices } = require("../services");
const logger = require("../utils/logger");
const fs = require("fs");
const path = require("path");

async function getProducts(req, res) {
  try {
    const result = await productServices.getProducts(req.query);
    res.status(200).json({
      status: "Success",
      pagination: result.pagination,
      data: result.products,
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "Produk Tidak Ditemukan",
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

async function getProductById(req, res) {
  try {
    const result = await productServices.getProductById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (err) {
    if (err.message === "Not Found") {
      logger.error({ status: 404, error: err });
      res.status(404).json({
        status: "Failed",
        message: "Product Tidak Ditemukan",
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

async function addProduct(req, res) {
  try {
    const { category_id, name, description, price, stock } = req.body;
    const image_path = req.file ? req.file.filename : "";
    const result = await productServices.addProduct({
      category_id,
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image_path,
    });
    res.json({
      status: "Success",
      message: "Produk Berhasil Ditambahkan",
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

async function updateProductById(req, res) {
  try {
    const { category_id, name, description, price, stock } = req.body;

    const existingData = await productServices.getProductById(req.params.id);

    let existingCategoryId = category_id || existingData.category_id;
    let existingName = name || existingData.name;
    let existingDescription = description || existingData.description;
    let existingPrice = price || existingData.price;
    let existingStock = stock || existingData.stock;

    let existingImage;
    if (req.file) {
      existingImage = req.file.filename;
      const imageDir = path.join(
        "C:\\Users\\aswan\\Documents\\Bhanu\\Project\\DapoerRaos\\back-end-dapoer-raos\\uploads\\products\\",
        existingData.image_path
      );
      fs.unlinkSync(imageDir);
    } else {
      existingImage = existingData.image_path;
    }

    const result = await productServices.updateProductById(req.params.id, {
      category_id: existingCategoryId,
      name: existingName,
      description: existingDescription,
      price: parseFloat(existingPrice),
      stock: parseInt(existingStock),
      image_path: existingImage,
    });
    res.status(200).json({
      status: "Success",
      message: "Produk Berhasil Diperbarui",
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

async function deleteProductById(req, res) {
  try {
    const result = await productServices.deleteProductById(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Produk Berhasil Dihapus",
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
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
