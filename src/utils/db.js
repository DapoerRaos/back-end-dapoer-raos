const { userModel, customerModel } = require("../models");
const { userSeeders, customerSeeders } = require("../seeders");
const logger = require("../utils/logger");

async function migrateTables() {
  await userModel.sync({ force: true });
  await customerModel.sync({ force: true });
}

async function seedData() {
  await userSeeders();
  await customerSeeders();
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
