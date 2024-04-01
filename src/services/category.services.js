const { categoryRepositories } = require("../repositories");

async function getCategories() {
  const categories = await categoryRepositories.getCategories();

  if (categories.length === 0) {
    throw new Error("Not Found");
  }

  return categories;
}

async function addCategory(name) {
  if (!name) {
    throw new Error("Name is required");
  }

  const category = await categoryRepositories.addCategory(name);

  return category;
}

async function updateCategoryById(id, name) {
  if (!id) {
    throw new Error("Id is required");
  }

  if (!name) {
    throw new Error("Name is required");
  }

  const category = await categoryRepositories.updateCategoryById(id, name);

  return category;
}

async function deleteCategoryById(id) {
  if (!id) {
    throw new Error("Id is required");
  }

  const category = await categoryRepositories.deleteCategoryById(id);

  return category;
}

module.exports = {
  getCategories,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
};
