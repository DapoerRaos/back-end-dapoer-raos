const {
  userModel,
  customerModel,
  productModel,
  categoryModel,
  cartModel,
  cartDetailModel,
  orderModel,
  orderItemModel,
} = require("../models");
const {
  userSeeders,
  customerSeeders,
  categorySeeders,
  productSeeders,
  cartSeeders,
} = require("../seeders");
const logger = require("../utils/logger");

async function migrateTables() {
  await userModel.sync({ force: true });
  await customerModel.sync({ force: true });
  await categoryModel.sync({ force: true });
  await productModel.sync({ force: true });
  await cartModel.sync({ force: true });
  await cartDetailModel.sync({ force: true });
  await orderModel.sync({ force: true });
  await orderItemModel.sync({ force: true });
}

async function seedData() {
  await userSeeders();
  await customerSeeders();
  await categorySeeders();
  await productSeeders();
  await cartSeeders();
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
