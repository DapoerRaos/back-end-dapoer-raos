const { col } = require("sequelize");
const { productModel, categoryModel } = require("../models");
const fs = require("fs");
const path = require("path");

async function getProducts({ page }) {
  const offset = (page - 1) * 8;

  return productModel.findAndCountAll({
    attributes: [
      "id",
      [col("Category.name"), "category_name"],
      "name",
      "description",
      "price",
      "stock",
      "image_path",
    ],
    offset,
    limit: 8,
    order: [["id", "ASC"]],
    include: {
      model: categoryModel,
      required: true,
      attributes: [],
      as: "Category",
    },
  });
}

async function getProductById(id) {
  return productModel.findByPk(id);
}

async function addProduct(data) {
  const { category_id, name, description, price, stock, image_path } = data;

  return productModel.create({
    category_id,
    name,
    description,
    price,
    stock,
    image_path,
  });
}

async function updateProductById(id, data) {
  const { category_id, name, description, price, stock, image_path } = data;

  return productModel.update(
    {
      category_id,
      name,
      description,
      price,
      stock,
      image_path,
    },
    {
      where: {
        id,
      },
    }
  );
}

async function deleteProductById(id) {
  const existingData = await productModel.findByPk(id);

  const imageDir = path.join(
    "C:\\Users\\aswan\\Documents\\Bhanu\\Project\\DapoerRaos\\back-end-dapoer-raos\\uploads\\products\\",
    existingData.image_path
  );
  fs.unlinkSync(imageDir);

  return productModel.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
