const {
  userModel,
  customerModel,
  productModel,
  categoryModel,
} = require("../models");
const { userSeeders, customerSeeders, categorySeeders } = require("../seeders");
const logger = require("../utils/logger");

async function migrateTables() {
  await userModel.sync({ force: true });
  await customerModel.sync({ force: true });
  await categoryModel.sync({ force: true });
  await productModel.sync({ force: true });
}

async function seedData() {
  await userSeeders();
  await customerSeeders();
  await categorySeeders();
}

async function syncDatabase() {
  try {
    await migrateTables();
    await seedData();
    logger.info("Database seeded successfully");
  } catch (error) {
    logger.error("Error seeding database:", error);
  }
}

syncDatabase();
