const bcrypt = require("bcrypt");
const { userModel } = require("../models");
const logger = require("../utils/logger");

const users = [];

const createUser = (email, password, role) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { email, password: hashedPassword, role };
  users.push(user);
};

createUser("dapoerraos@gmail.com", "dapoerraoswenak", "admin");
createUser("aswangga27@gmail.com", "customer123", "customer");
createUser("leandra14@gmail.com", "customer123", "customer");
createUser("raulaksal@gmail.com", "customer123", "customer");

const seedUsers = async () => {
  try {
    await userModel.bulkCreate(users);
    logger.info("User seeded successfully");
  } catch (error) {
    logger.error("Error seeding user:", error);
  }
};

module.exports = seedUsers;
