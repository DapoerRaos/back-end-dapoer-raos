const { col, Op, where } = require("sequelize");
const { productModel, categoryModel } = require("../models");
const fs = require("fs");
const path = require("path");

async function getProducts({ page, keyword }) {
  const offset = (page - 1) * 8;

  let whereClause = [
    {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      ],
    },
  ];

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
    where: whereClause,
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
  return productModel.findByPk(id, {
    attributes: [
      "id",
      [col("Category.id"), "category_id"],
      [col("Category.name"), "category_name"],
      "name",
      "description",
      "price",
      "stock",
      "image_path",
    ],
    include: {
      model: categoryModel,
      required: true,
      attributes: [],
      as: "Category",
    },
  });
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

async function updateStockById(id, stock) {
  return productModel.update(
    {
      stock,
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

async function decreaseStockWhenCheckout(productStock) {
  for (const product of productStock) {
    const { product_id, stock } = product;

    await productModel.update({ stock: stock }, { where: { id: product_id } });
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProductById,
  updateStockById,
  deleteProductById,
  decreaseStockWhenCheckout,
};
