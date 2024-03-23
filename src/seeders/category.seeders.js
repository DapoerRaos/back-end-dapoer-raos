const { categoryModel } = require("../models");
const logger = require("../utils/logger");

const categories = [];

const createCategory = (name) => {
  const category = {
    name,
  };
  categories.push(category);
};

createCategory("Kue Kering");
createCategory("Frozen Food");

const seedCategories = async () => {
  try {
    await categoryModel.bulkCreate(categories);
    logger.info("Categories seeded successfully");
  } catch (error) {
    logger.error("Error seeding categories:", error);
  }
};

module.exports = seedCategories;
