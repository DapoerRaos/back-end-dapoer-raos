const { customerModel } = require("../models");
const logger = require("../utils/logger");

const customers = [];

const createCustomers = (user_id, fullname, telephone) => {
  const customer = {
    user_id,
    fullname,
    telephone,
  };
  customers.push(customer);
};

createCustomers(2, "Aswangga Bhanu Rizqullah", "081320909411");
createCustomers(3, "Leandra Chika Gayatri", "085973987950");
createCustomers(4, "Raul Aksal", "085697963945");

const seedCustomers = async () => {
  try {
    await customerModel.bulkCreate(customers);
    logger.info("Customer seeded successfully");
  } catch (error) {
    logger.error("Error seeding customer:", error);
  }
};

module.exports = seedCustomers;
