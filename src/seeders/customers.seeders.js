const { customerModel } = require("../models");
const logger = require("../utils/logger");

const customers = [];

const createCustomers = (user_id, fullname, telephone, address) => {
  const customer = {
    user_id,
    fullname,
    telephone,
    address,
  };
  customers.push(customer);
};

createCustomers(2, "Customer 1", "081345678910", "Address 1");
createCustomers(3, "Customer 2", "081245678910", "Address 2");
createCustomers(4, "Customer 3", "081234567893", "Address 3");

const seedCustomers = async () => {
  try {
    await customerModel.bulkCreate(customers);
    logger.info("Customer seed data inserted successfully");
  } catch (error) {
    logger.error("Error seeding customer data:", error);
  }
};

module.exports = seedCustomers;
