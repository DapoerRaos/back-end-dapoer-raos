const { productRepositories } = require("../repositories");

async function getProducts({ page = 1, keyword = "" }) {
  const limit = 8;
  const products = await productRepositories.getProducts({
    page,
    keyword,
  });

  if (!products.rows.length) {
    throw new Error("Not Found");
  }

  const totalPages = Math.ceil(products.count / limit);

  return {
    products: products.rows,
    pagination: {
      page: page,
      perpage: limit,
      total: products.count,
      totalPages: totalPages,
    },
  };
}

async function getProductById(id) {
  const product = await productRepositories.getProductById(id);

  if (!product) {
    throw new Error("Not Found");
  }

  return product;
}

async function addProduct(data) {
  const { category_id, name, description, price, stock, image_path } = data;

  if (!category_id || !name || !price || !stock || !image_path) {
    throw new Error("Fields are required");
  }

  const product = await productRepositories.addProduct({
    category_id,
    name,
    description,
    price,
    stock,
    image_path,
  });

  return product;
}

async function updateProductById(id, data) {
  const { category_id, name, description, price, stock, image_path } = data;

  if (!id) {
    throw new Error("Invalid Id");
  }

  const product = await productRepositories.updateProductById(id, {
    category_id,
    name,
    description,
    price,
    stock,
    image_path,
  });

  return product;
}

async function updateStockById(id, stock) {
  if (!id) {
    throw new Error("Invalid Id");
  }

  const product = await productRepositories.updateStockById(id, stock);
  return product;
}

async function deleteProductById(id) {
  if (!id) {
    throw new Error("Invalid Id");
  }

  const product = await productRepositories.deleteProductById(id);

  return product;
}

async function decreaseStockWhenCheckout(productStock) {
  if (productStock.length === 0) {
    throw new Error("Products cannot be empty");
  }

  return await productRepositories.decreaseStockWhenCheckout(productStock);
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
