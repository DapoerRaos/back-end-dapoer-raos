const { categoryModel } = require("../models");

async function getCategories() {
  return await categoryModel.findAll({
    attributes: ["id", "name"],
  });
}

async function addCategory(name) {
  return await categoryModel.create({
    name,
  });
}

async function updateCategoryById(id, name) {
  return await categoryModel.update(
    {
      name,
    },
    {
      where: {
        id,
      },
    }
  );
}

async function deleteCategoryById(id) {
  return await categoryModel.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  getCategories,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
};
